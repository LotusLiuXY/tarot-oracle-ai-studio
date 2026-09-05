"use client";

import { useEffect, useMemo, useState } from "react";
import { EazoCoverReady } from "@/components/eazo-cover/eazo-cover-ready";

export const COVER_PREVIEW_DATA = [
  { day: "18", title: "门后潮汐", mood: "柔软", card: "门后的潮汐" },
  { day: "21", title: "旧屋灯光", mood: "牵挂", card: "旧屋的灯" },
  { day: "25", title: "白兔时钟", mood: "急促", card: "迟到白兔" },
];

export function CoverPreview() {
  const [step, setStep] = useState(0);
  const active = COVER_PREVIEW_DATA[step % COVER_PREVIEW_DATA.length];

  useEffect(() => {
    const timer = window.setInterval(() => setStep((value) => value + 1), 1300);
    return () => window.clearInterval(timer);
  }, []);

  const htmlLines = useMemo(
    () => ["<article>", `  <h1>${active.card}</h1>`, `  <section>${active.title}</section>`, "</article>"],
    [active]
  );

  return (
    <EazoCoverReady>
      <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#EEE7F4] p-5 text-[#26182F]">
        <div className="absolute inset-0 bg-[image:var(--studio-bg-image)] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,239,.85),rgba(238,231,244,.42)),radial-gradient(circle_at_50%_35%,rgba(255,248,239,.7),transparent_46%)]" />
        <div className="relative w-full max-w-[350px] rounded-[34px] border border-[rgba(61,40,78,.18)] bg-[rgba(255,248,239,.68)] p-4 shadow-[0_22px_70px_rgba(61,40,78,.18)] backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7B6888]">月光档案</p>
              <h1 className="font-serif text-3xl text-[#3D284E]">记录成牌</h1>
            </div>
            <span className="rounded-full bg-[#3D284E] px-3 py-1 text-xs text-[#FFF8EF]">AI</span>
          </div>
          <div className="grid gap-3">
            <div className="flex gap-2 overflow-hidden">
              {COVER_PREVIEW_DATA.map((item, index) => (
                <div key={item.day} className={`shrink-0 rounded-2xl border px-3 py-2 transition-all duration-500 ${index === step % COVER_PREVIEW_DATA.length ? "border-[#A786C8] bg-[#3D284E] text-[#FFF8EF]" : "border-[rgba(61,40,78,.16)] bg-[#FFF8EF]/65 text-[#7B6888]"}`}>
                  <b className="block text-sm">{item.day}</b>
                  <span className="text-[11px]">{item.mood}</span>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-[#A786C8]/35 bg-[linear-gradient(160deg,#FFF8EF,#EEE7F4)] p-4 text-center">
              <div className="absolute inset-[-30%] animate-[cover-sheen_3.9s_ease-in-out_infinite] bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.68),rgba(167,134,200,.18),transparent)]" />
              <p className="relative text-xs text-[#7B6888]">{active.title}</p>
              <div className="relative mx-auto my-4 grid size-28 place-items-center rounded-[34px] bg-[radial-gradient(circle,#FFF8EF,rgba(167,134,200,.36))]">
                <span className="h-16 w-12 rounded-full border border-[#3D284E]/25" />
              </div>
              <h2 className="relative font-serif text-2xl text-[#3D284E]">{active.card}</h2>
            </div>
            <pre className="rounded-2xl bg-[#3D284E] p-3 text-[11px] leading-5 text-[#FFF8EF]">
              {htmlLines.join("\n")}
            </pre>
          </div>
        </div>
        <style jsx>{`@keyframes cover-sheen {0%{transform:translateX(-55%) rotate(-10deg);opacity:.2}55%{opacity:.9}100%{transform:translateX(60%) rotate(-10deg);opacity:.25}}`}</style>
      </div>
    </EazoCoverReady>
  );
}
