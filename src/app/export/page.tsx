"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppChrome } from "@/components/studio/app-chrome";
import { HtmlTemplatePreview } from "@/components/studio/html-template-preview";
import { useStudioSnapshot } from "@/components/studio/use-studio-snapshot";
import { buildCardHtml, resolveStudioLocale } from "@/lib/studio/types";

export default function ExportPage() {
  const { t, i18n } = useTranslation();
  const locale = resolveStudioLocale(i18n.resolvedLanguage || i18n.language);
  const { snapshot, loading, user, login } = useStudioSnapshot();
  const [mode, setMode] = useState<"single" | "batch">("single");
  const html = useMemo(() => {
    if (!snapshot) return "";
    return mode === "single" ? buildCardHtml(snapshot.cardDrafts[0], locale) : snapshot.cardDrafts.map((card) => buildCardHtml(card, locale)).join("\n\n");
  }, [snapshot, locale, mode]);
  return <AppChrome>{!user && !loading ? <section className="rounded-[36px] border border-border/50 bg-card/58 p-6 text-center shadow-[var(--shadow-sm)] backdrop-blur-xl" data-el="login-gate"><h1 className="font-heading text-4xl text-secondary">{t("export.title")}</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t("export.intro")}</p><button onClick={() => void login()} className="mt-5 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-accent">{t("common.signIn")}</button></section> : loading || !snapshot ? <div className="rounded-[36px] border border-border/50 bg-card/58 p-8 text-center text-muted-foreground shadow-[var(--shadow-sm)]">{t("common.loading")}</div> : <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]" data-el="export-page"><section className="rounded-[36px] border border-border/50 bg-card/54 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl md:p-7" data-el="export-hero"><p className="text-sm font-semibold text-primary">{t("export.eyebrow")}</p><h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-secondary md:text-5xl">{t("export.title")}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{t("export.intro")}</p><div className="mt-5 flex gap-2 rounded-full border border-border/60 bg-card/60 p-1" data-el="export-mode-toggle">{(["single", "batch"] as const).map((item) => <button key={item} onClick={() => setMode(item)} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === item ? "bg-secondary text-accent" : "text-muted-foreground"}`} type="button">{t(`export.${item}`)}</button>)}</div><div className="mt-5 rounded-[30px] border border-border/60 bg-card/60 p-4" data-el="template-structure-card"><p className="font-heading text-2xl text-secondary">{t("export.structure")}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{t("export.structureBody")}</p><div className="mt-4 grid gap-2">{["card-number", "card-name", "image-description", "upright-meaning", "reversed-meaning", "story-reading", "drawing-prompt"].map((field) => <span key={field} className="rounded-2xl border border-border/60 bg-primary/10 px-3 py-2 font-mono text-xs text-secondary">section.field.{field}</span>)}</div></div></section><HtmlTemplatePreview html={html} title={mode === "single" ? snapshot.cardDrafts[0].name : snapshot.projects[0].name} /></div>}</AppChrome>;
}
