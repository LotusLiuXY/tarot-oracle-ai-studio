import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { appAi, AppAIUnavailableError } from "@/lib/eazo-ai-billing";
import { createOracleCard, getRecordsByIds, listProjects } from "@/lib/db/queries";

const bodySchema = z.object({ recordIds: z.array(z.string()).min(1).optional(), projectId: z.string().optional(), locale: z.enum(["zh-CN", "en-US"]).default("zh-CN") });

function fallbackCard() {
  return { number: "08", name: "月下回声", deck: "梦境神谕", cardType: "神谕卡", element: "水 · 月亮", keywords: ["回声", "直觉", "温柔边界"], imageDescription: "月光落在安静水面，旧信纸从涟漪中浮起。", composition: "中央水面与月亮形成纵向轴线，边缘保留可绘制符号。", symbols: ["月亮", "水", "信"], palette: "丁香紫、象牙白、银色", prompt: "soft feminine oracle card, moonlit water, archive paper, lilac satin glow", avoid: "避免恐怖或宿命化表达。", upright: "情绪正在以更柔和的方式被听见。", reversed: "旧回声可能暂时盖过真实直觉。", story: "她把未说完的话交给月光，水面替她慢慢保存。", sourceSummary: "由所选记录整理生成。", action: "选一个符号作为下一步绘画核心。" };
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const input = bodySchema.parse(await request.json().catch(() => ({})));
  const projects = await listProjects(auth.user.id);
  const project = projects.find((p) => p.id === input.projectId) ?? projects[0];
  if (!project) return NextResponse.json({ error: "No project" }, { status: 400 });
  const records = await getRecordsByIds(auth.user.id, input.recordIds ?? []);
  const material = records.map((r) => `${r.title}\n${r.content}\n情绪:${r.mood}\n符号:${r.symbols.join("、")}`).join("\n---\n");
  let card = fallbackCard();
  try {
    const result = await appAi.chat({
      capability: "text",
      viewerUserId: auth.user.id,
      messages: [
        { role: "system", content: "你是塔罗/神谕卡创作助手。只返回JSON，字段为 number,name,deck,cardType,element,keywords,imageDescription,composition,symbols,palette,prompt,avoid,upright,reversed,story,sourceSummary,action。语气温柔、非诊断、适合绘画创作。" },
        { role: "user", content: `根据这些日记/梦境记录生成一张结构化神谕卡。语言:${input.locale}\n${material || "围绕月光、旧屋、潮水与边界。"}` },
      ],
      temperature: 0.7,
    });
    const text = result.choices?.[0]?.message?.content ?? "";
    const parsed = JSON.parse(text.replace(/^```json\s*|```$/g, ""));
    card = { ...card, ...parsed, keywords: Array.isArray(parsed.keywords) ? parsed.keywords : card.keywords, symbols: Array.isArray(parsed.symbols) ? parsed.symbols : card.symbols };
  } catch (error) {
    if (!(error instanceof AppAIUnavailableError)) console.error(error);
  }
  const saved = await createOracleCard(auth.user.id, { ...card, projectId: project.id, sourceRecordIds: input.recordIds ?? [] });
  return NextResponse.json({ card: { ...card, id: saved.id } });
}
