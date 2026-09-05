"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppChrome } from "@/components/studio/app-chrome";
import { OracleCardPreview } from "@/components/studio/oracle-card-preview";
import { cardDrafts } from "@/lib/studio/mock-data";

export default function CardsPage() {
  const { t } = useTranslation();

  return (
    <AppChrome>
      <div className="grid gap-5" data-el="cards-page">
        <section className="rounded-[32px] border border-border/70 bg-[rgba(255,248,239,.62)] p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl md:p-7" data-el="cards-hero">
          <p className="text-sm font-semibold text-primary">{t("cards.eyebrow")}</p>
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-semibold leading-tight text-secondary md:text-6xl">{t("cards.title")}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{t("cards.intro")}</p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2" data-el="card-draft-grid">
          {cardDrafts.map((card) => (
            <article key={card.number} className="grid gap-4 rounded-[34px] border border-border/70 bg-[rgba(255,248,239,.58)] p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl md:grid-cols-[240px_1fr]" data-el="card-draft-item">
              <OracleCardPreview card={card} />
              <div className="flex flex-col justify-between gap-4 min-w-0">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-secondary">{t("cards.ready")}</span>
                    <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs text-muted-foreground">{t("cards.count", { count: 17 })}</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-semibold text-secondary">{card.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.story}</p>
                  <div className="mt-4 grid gap-2 text-sm">
                    <p className="rounded-2xl bg-primary/10 p-3"><b className="text-secondary">{t("fields.image")}：</b>{card.imageDescription}</p>
                    <p className="rounded-2xl bg-primary/10 p-3"><b className="text-secondary">{t("fields.upright")}：</b>{card.upright}</p>
                    <p className="rounded-2xl bg-primary/10 p-3"><b className="text-secondary">{t("fields.reversed")}：</b>{card.reversed}</p>
                  </div>
                </div>
                <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-accent" data-el="open-card-editor-link">
                  {t("cards.open")} <ChevronRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AppChrome>
  );
}
