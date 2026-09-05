import { cn } from "@/utils/utils";
import type { TimelineEntry } from "@/lib/studio/mock-data";

export function TimelineStrip({ entries, activeId }: { entries: TimelineEntry[]; activeId: string }) {
  return (
    <div className="flex min-w-0 gap-3 overflow-x-auto pb-2" data-el="timeline-strip">
      {entries.map((entry) => {
        const active = entry.id === activeId;
        return (
          <button
            key={entry.id}
            type="button"
            data-el="timeline-entry"
            className={cn(
              "min-w-[92px] shrink-0 rounded-2xl border p-3 text-left transition",
              active
                ? "border-secondary bg-secondary text-accent shadow-[var(--shadow-md)]"
                : "border-border/70 bg-card/60 text-muted-foreground shadow-[var(--shadow-sm)]"
            )}
          >
            <span className="block font-heading text-2xl leading-none">{entry.day}</span>
            <span className="mt-2 block truncate text-xs font-semibold">{entry.title}</span>
            <span className="mt-1 block text-[11px] opacity-80">{entry.mood}</span>
          </button>
        );
      })}
    </div>
  );
}
