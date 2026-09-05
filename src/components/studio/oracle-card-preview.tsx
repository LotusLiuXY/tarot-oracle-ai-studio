import { Moon, Sparkles } from "lucide-react";
import type { OracleCardDraft } from "@/lib/studio/mock-data";

export function OracleCardPreview({ card }: { card: OracleCardDraft }) {
  return (
    <article className="relative grid min-h-[390px] overflow-hidden rounded-[32px] border border-primary/30 bg-[linear-gradient(160deg,rgba(255,248,239,.96),rgba(238,231,244,.90))] p-5 shadow-[var(--shadow-md)]" data-el="oracle-card-preview">
      <div className="pointer-events-none absolute inset-[-1px] animate-[border-glow_7s_var(--motion-ease)_infinite] rounded-[32px] bg-[var(--satin-sheen)] mix-blend-screen" />
      <div className="relative flex items-center justify-between text-xs text-muted-foreground" data-el="card-preview-header">
        <span className="rounded-full border border-border/80 bg-card/60 px-3 py-1">AI 草案</span>
        <span className="font-heading text-4xl text-secondary">{card.number}</span>
      </div>
      <div className="relative my-5 grid place-items-center" aria-hidden>
        <div className="grid size-44 place-items-center rounded-[44px] bg-[radial-gradient(circle_at_50%_42%,rgba(255,248,239,.95),rgba(167,134,200,.36)_43%,rgba(61,40,78,.07)_73%),linear-gradient(135deg,rgba(167,134,200,.22),rgba(255,248,239,.8))] shadow-[inset_0_0_26px_rgba(255,255,255,.55),0_18px_38px_rgba(61,40,78,.13)]">
          <div className="relative h-28 w-20 rounded-[50%_50%_46%_46%] border border-secondary/25">
            <Moon className="absolute left-5 top-5 size-12 text-primary drop-shadow-[0_0_14px_rgba(167,134,200,.75)]" />
            <Sparkles className="absolute -right-2 bottom-2 size-5 text-primary/70" />
            <span className="absolute bottom-[-30px] left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
      <div className="relative text-center" data-el="card-preview-title">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{card.deck}</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-secondary">{card.name}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{card.keywords.join(" · ")}</p>
      </div>
    </article>
  );
}
