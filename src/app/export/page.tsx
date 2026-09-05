"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppChrome } from "@/components/studio/app-chrome";
import { HtmlTemplatePreview } from "@/components/studio/html-template-preview";
import { buildCardHtml, cardDrafts } from "@/lib/studio/mock-data";

export default function ExportPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"single" | "batch">("single");
  const html = useMemo(
    () => mode === "single" ? buildCardHtml(cardDrafts[0]) : cardDrafts.map(buildCardHtml).join("\n\n"),
    [mode],
  );

  return (
    <AppChrome>
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]" data-el="export-page">
        <section className="rounded-[32px] border border-border/70 bg-[rgba(255,248,239,.62)] p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl md:p-7" data-el="export-hero">
          <p className="text-sm font-semibold text-primary">{t("export.eyebrow")}</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-secondary md:text-5xl">{t("export.title")}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("export.intro")}</p>
          <div className="mt-5 flex gap-2 rounded-full border border-border/70 bg-card/60 p-1" data-el="export-mode-toggle">
            {(["single", "batch"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === item ? "bg-secondary text-accent" : "text-muted-foreground"}`}
                type="button"
              >
                {t(`export.${item}`)}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-border/70 bg-card/60 p-4" data-el="template-structure-card">
            <p className="font-heading text-2xl text-secondary">{t("export.structure")}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("export.structureBody")}</p>
            <div className="mt-4 grid gap-2">
              {["card-number", "card-name", "image-description", "upright-meaning", "reversed-meaning", "story-reading", "drawing-prompt"].map((field) => (
                <span key={field} className="rounded-2xl border border-border/70 bg-primary/10 px-3 py-2 font-mono text-xs text-secondary">section.field.{field}</span>
              ))}
            </div>
          </div>
        </section>
        <HtmlTemplatePreview html={html} title={mode === "single" ? cardDrafts[0].name : "Luna 梦境神谕"} />
      </div>
    </AppChrome>
  );
}
