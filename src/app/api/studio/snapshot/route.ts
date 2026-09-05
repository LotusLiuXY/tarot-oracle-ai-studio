import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { createOracleCard, createProject, createTimelineRecord, listOracleCards, listProjects, listTimelineRecords } from "@/lib/db/queries";
import { DEFAULT_SNAPSHOT } from "@/lib/studio/default-content";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;
  const userId = auth.user.id;
  let projects = await listProjects(userId);
  if (projects.length === 0) {
    const project = await createProject(userId, { name: DEFAULT_SNAPSHOT.projects[0].name, theme: DEFAULT_SNAPSHOT.projects[0].theme, privacy: "private", tags: DEFAULT_SNAPSHOT.projects[0].tags });
    await Promise.all(DEFAULT_SNAPSHOT.timelineEntries.map((entry, index) => createTimelineRecord(userId, { projectId: project.id, type: entry.type, title: entry.title, content: entry.excerpt, mood: entry.mood, symbols: entry.symbols, intensity: entry.intensity, recordedAt: new Date(Date.now() - index * 86400000) })));
    await createOracleCard(userId, { ...DEFAULT_SNAPSHOT.cardDrafts[0], projectId: project.id, sourceRecordIds: [] });
    projects = await listProjects(userId);
  }
  const project = projects[0];
  const records = await listTimelineRecords(userId, project.id);
  const cards = await listOracleCards(userId, project.id);
  return NextResponse.json({
    ...DEFAULT_SNAPSHOT,
    projects: projects.map((p) => ({ id: p.id, name: p.name, theme: p.theme, lastUpdated: p.updatedAt.toLocaleString("zh-CN"), cards: cards.length, records: records.length, privacy: p.privacy, tags: p.tags })),
    timelineEntries: records.map((r) => ({ id: r.id, day: String(r.recordedAt.getDate()).padStart(2, "0"), type: r.type, title: r.title, excerpt: r.content, mood: r.mood, symbols: r.symbols, intensity: r.intensity })),
    cardDrafts: cards.map((c) => ({ id: c.id, number: c.number, name: c.name, deck: c.deck, cardType: c.cardType, element: c.element, keywords: c.keywords, imageDescription: c.imageDescription, composition: c.composition, symbols: c.symbols, palette: c.palette, prompt: c.prompt, avoid: c.avoid, upright: c.upright, reversed: c.reversed, story: c.story, sourceSummary: c.sourceSummary, action: c.action })),
  });
}
