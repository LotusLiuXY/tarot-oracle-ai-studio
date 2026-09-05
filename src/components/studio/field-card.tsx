import { ChevronRight } from "lucide-react";

export type FieldGroupKey = "basic" | "visual" | "reading" | "source";

type FieldCardProps = {
  label: string;
  summary: string;
  active?: boolean;
  onClick?: () => void;
};

export function FieldCard({ label, summary, active, onClick }: FieldCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-el="field-group-card"
      className={`group w-full rounded-[28px] border p-4 text-left shadow-[var(--shadow-sm)] transition duration-200 ${
        active
          ? "border-primary/55 bg-card/92 text-foreground"
          : "border-border/55 bg-card/52 text-foreground hover:border-primary/35 hover:bg-card/75"
      }`}
    >
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-secondary">
        {label}
        <ChevronRight className={`size-4 text-primary transition ${active ? "rotate-90" : ""}`} />
      </span>
      <span className="mt-2 line-clamp-2 block text-xs leading-5 text-muted-foreground">{summary}</span>
    </button>
  );
}
