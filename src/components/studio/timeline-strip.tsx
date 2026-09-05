import { cn } from "@/utils/utils";
import type { TimelineEntry } from "@/lib/studio/mock-data";

export function TimelineStrip({ entries, activeId, onSelect }: { entries: TimelineEntry[]; activeId: string; onSelect?: (id: string) => void }) {
  return (
    <div className="flex min-w-0 gap-3 overflow-x-auto pb-2" data-el="timeline-strip">
      {entries.map((entry) => {
        const active = entry.id === activeId;
        return (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelect?.(entry.id)}
            data-el="timeline-entry"
            className={cn(
              "min-w-[96px] shrink-0 rounded-full border px-4 py-3 text-left transition",
              active
                ? "border-secondary bg-secondary text-accent shadow-[var(--shadow-md)]"
                : "border-border/60 bg-card/60 text-muted-foreground shadow-[var(--shadow-sm)] hover:bg-card/80"
            )}
          >
            <span className="block font-heading text-2xl leading-none">{entry.day}</span>
            <span className="mt-1 block truncate text-xs font-semibold">{entry.title}</span>
          </button>
        );
      })}
    </div>
  );
}
