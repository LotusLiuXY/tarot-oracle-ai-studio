"use client";

import { useMemo, useState } from "react";
import { FileCode2, PenLine, Plus, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppChrome } from "@/components/studio/app-chrome";
import { CommunityShareButton } from "@/components/studio/community-share-button";
import { FieldCard } from "@/components/studio/field-card";
import { HtmlTemplatePreview } from "@/components/studio/html-template-preview";
import { OracleCardPreview } from "@/components/studio/oracle-card-preview";
import { TimelineStrip } from "@/components/studio/timeline-strip";
import { buildCardHtml, cardDrafts, timelineEntries } from "@/lib/studio/mock-data";

const FIELD_KEYS = [
  "number",
  "name",
  "deck",
  "type",
  "element",
  "keywords",
  "image",
  "composition",
  "symbols",
  "palette",
  "prompt",
  "avoid",
  "upright",
  "reversed",
  "story",
  "sourceSummary",
  "action",
] as const;

type FieldKey = (typeof FIELD_KEYS)[number];

function getFieldValue(card: typeof cardDrafts[number], key: FieldKey) {
  const values: Record<FieldKey, string> = {
    number: card.number,
    name: card.name,
    deck: card.deck,
    type: card.cardType,
    element: card.element,
    keywords: card.keywords.join(" · "),
    image: card.imageDescription,
    composition: card.composition,
    symbols: card.symbols.join("、"),
    palette: card.palette,
    prompt: card.prompt,
    avoid: card.avoid,
    upright: card.upright,
    reversed: card.reversed,
    story: card.story,
    sourceSummary: card.sourceSummary,
    action: card.action,
  };
  return values[key];
}

export default function Home() {
  const { t } = useTranslation();
  const [activeEntry, setActiveEntry] = useState("tide");
  const [activeField, setActiveField] = useState<FieldKey>("image");
  const [isGenerated, setIsGenerated] = useState(false);
  const [fieldValues, setFieldValues] = useState(() =>
    Object.fromEntries(FIELD_KEYS.map((key) => [key, getFieldValue(cardDrafts[0], key)])) as Record<FieldKey, string>,
  );

  const selectedRecord = timelineEntries.find((entry) => entry.id === activeEntry) ?? timelineEntries[0];
  const card = useMemo(
    () => ({
      ...cardDrafts[0],
      number: fieldValues.number,
      name: fieldValues.name,
      deck: fieldValues.deck,
      cardType: fieldValues.type,
      element: fieldValues.element,
      keywords: fieldValues.keywords.split(" · ").filter(Boolean),
      imageDescription: fieldValues.image,
      composition: fieldValues.composition,
      symbols: fieldValues.symbols.split("、").filter(Boolean),
      palette: fieldValues.palette,
      prompt: fieldValues.prompt,
      avoid: fieldValues.avoid,
      upright: fieldValues.upright,
      reversed: fieldValues.reversed,
      story: fieldValues.story,
      sourceSummary: fieldValues.sourceSummary,
      action: fieldValues.action,
    }),
    [fieldValues],
  );
  const html = buildCardHtml(card);
  const shareText = [
    "Community share",
    "Scenario: oracle_card_draft",
    "App: 月光档案",
    `Headline: ${card.name}`,
    `Result: ${card.number} · ${card.keywords.join(" / ")}`,
    `Detail: ${card.imageDescription}`,
    `Detail: ${card.upright}`,
    "Community angle: 邀请其他创作者一起讨论这张牌的画面符号与解析方向。",
  ].join("\n");

  return (
    <AppChrome>
      <div className="grid gap-5" data-el="workspace-page">
        <section className="rounded-[32px] border border-border/70 bg-[rgba(255,248,239,.58)] p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl md:p-7" data-el="workspace-hero">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">{t("workspace.eyebrow")}</p>
              <h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-secondary md:text-6xl">{t("workspace.title")}</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">{t("workspace.intro")}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-secondary" data-el="add-record-button">
                <Plus className="size-4" /> {t("workspace.addRecord")}
              </button>
              <button
                onClick={() => setIsGenerated(true)}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-accent shadow-[var(--shadow-md)]"
                data-el="generate-card-button"
              >
                <Sparkles className="size-4" /> {isGenerated ? t("workspace.generated") : t("workspace.generate")}
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]" data-el="workspace-main-grid">
          <div className="grid gap-5 min-w-0">
            <div className="rounded-[32px] border border-border/70 bg-[rgba(255,248,239,.58)] p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl" data-el="timeline-panel">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-secondary">{t("workspace.timeline")}</h2>
                  <p className="text-xs text-muted-foreground">{t("workspace.visibleTimeline")}</p>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-secondary">{selectedRecord.mood}</span>
              </div>
              <div onClick={(event) => {
                const target = (event.target as HTMLElement).closest("button");
                const index = target ? Array.from(target.parentElement?.children ?? []).indexOf(target) : -1;
                if (index >= 0) {
                  setActiveEntry(timelineEntries[index]?.id ?? "tide");
                  setIsGenerated(false);
                }
              }}>
                <TimelineStrip entries={timelineEntries} activeId={activeEntry} />
              </div>
              <article className="mt-3 rounded-3xl border border-border/70 bg-card/62 p-4" data-el="selected-record-card">
                <p className="text-xs font-semibold text-primary">{t("workspace.source")}</p>
                <h3 className="mt-1 font-heading text-2xl text-secondary">{selectedRecord.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedRecord.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedRecord.symbols.map((symbol) => <span key={symbol} className="rounded-full border border-border/70 bg-primary/10 px-3 py-1 text-xs text-secondary">{symbol}</span>)}
                </div>
              </article>
            </div>
            <OracleCardPreview card={card} />
          </div>

          <div className="grid gap-5 min-w-0">
            <section className="rounded-[32px] border border-border/70 bg-[rgba(255,248,239,.62)] p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl" data-el="field-editor-panel">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-secondary">{t("workspace.fieldEditor")}</h2>
                  <p className="text-xs leading-5 text-muted-foreground">{t("workspace.fieldHint")}</p>
                </div>
                <PenLine className="mt-1 size-5 shrink-0 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3" data-el="field-block-grid">
                {FIELD_KEYS.map((key) => (
                  <FieldCard
                    key={key}
                    label={t(`fields.${key}`)}
                    value={fieldValues[key]}
                    active={activeField === key}
                    multiline={["image", "composition", "prompt", "upright", "reversed", "story"].includes(key)}
                    onClick={() => setActiveField(key)}
                  />
                ))}
              </div>
              <label className="mt-4 block" data-el="active-field-editor">
                <span className="mb-2 block text-xs font-semibold tracking-[0.18em] text-primary">{t(`fields.${activeField}`)}</span>
                <textarea
                  value={fieldValues[activeField]}
                  onChange={(event) => setFieldValues((current) => ({ ...current, [activeField]: event.target.value }))}
                  className="min-h-32 w-full resize-y rounded-3xl border border-primary/30 bg-card/80 p-4 text-sm leading-6 text-foreground outline-none ring-primary/20 transition focus:ring-4"
                />
              </label>
            </section>

            <section className="rounded-[32px] border border-border/70 bg-card/60 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl" data-el="share-panel">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl text-secondary">{t("workspace.shareTitle")}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("workspace.shareBody")}</p>
                </div>
                <CommunityShareButton text={shareText} targetPath="/cards" />
              </div>
              <p className="mt-3 rounded-2xl bg-primary/10 px-3 py-2 text-xs leading-5 text-muted-foreground">{t("workspace.privacy")}</p>
            </section>
          </div>
        </section>

        <HtmlTemplatePreview html={html} title={card.name} />
      </div>
    </AppChrome>
  );
}
