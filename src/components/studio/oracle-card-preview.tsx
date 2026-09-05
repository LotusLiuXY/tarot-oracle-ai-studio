"use client";

import { Moon, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OracleCardDraft } from "@/lib/studio/types";

export function OracleCardPreview({ card, featured = false }: { card: OracleCardDraft; featured?: boolean }) {
  const { t } = useTranslation();

  return (
    <article className={`relative grid overflow-hidden rounded-[40px] border border-primary/25 bg-[linear-gradient(160deg,rgba(255,248,239,.98),rgba(238,231,244,.88))] p-6 shadow-[var(--shadow-md)] dark:bg-[linear-gradient(160deg,rgba(255,248,239,.95),rgba(167,134,200,.20))] ${featured ? "min-h-[640px] lg:min-h-[760px]" : "min-h-[390px]"}`} data-el="oracle-card-preview">
      <div className="pointer-events-none absolute inset-[-1px] animate-[border-glow_7s_var(--motion-ease)_infinite] rounded-[36px] bg-[var(--satin-sheen)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-3 rounded-[30px] border border-primary/15" />
      <div className="relative flex items-center justify-between text-xs text-muted-foreground" data-el="card-preview-header">
        <span className="rounded-full border border-border/60 bg-card/62 px-3 py-1">{t("cards.aiDraft")}</span>
        <span className="font-heading text-5xl text-secondary">{card.number}</span>
      </div>
      <div className="relative my-6 grid flex-1 place-items-center" aria-hidden>
        <div className={`${featured ? "size-80 rounded-[88px] md:size-[25rem]" : "size-44 rounded-[44px]"} grid place-items-center bg-[radial-gradient(circle_at_50%_42%,rgba(255,248,239,.98),rgba(167,134,200,.34)_43%,rgba(61,40,78,.06)_73%),linear-gradient(135deg,rgba(167,134,200,.20),rgba(255,248,239,.86))] shadow-[inset_0_0_34px_rgba(255,255,255,.66),0_22px_48px_rgba(61,40,78,.13)]`}>
          <div className={`${featured ? "h-52 w-36" : "h-28 w-20"} relative rounded-[50%_50%_46%_46%] border border-secondary/25`}>
            <Moon className={`${featured ? "left-9 top-9 size-28" : "left-5 top-5 size-12"} absolute text-primary drop-shadow-[0_0_14px_rgba(167,134,200,.75)]`} />
            <Sparkles className={`${featured ? "-right-3 bottom-4 size-7" : "-right-2 bottom-2 size-5"} absolute text-primary/70`} />
            <span className="absolute bottom-[-34px] left-1/2 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
      <div className="relative text-center" data-el="card-preview-title">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{card.deck}</p>
        <h2 className={`${featured ? "text-4xl md:text-5xl" : "text-3xl"} mt-2 font-heading font-semibold text-secondary`}>{card.name}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">{card.keywords.join(" · ")}</p>
      </div>
    </article>
  );
}
