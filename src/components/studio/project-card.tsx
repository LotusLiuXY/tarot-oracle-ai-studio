import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/lib/studio/types";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <article className="rounded-[30px] border border-border/55 bg-card/60 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl" data-el="project-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{project.lastUpdated}</p>
          <h2 className="mt-1 truncate font-heading text-2xl font-semibold text-secondary">{project.name}</h2>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
          <ShieldCheck className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.theme}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-3xl bg-primary/10 p-3"><b className="block text-secondary">{project.records}</b><span className="text-muted-foreground">{t("projects.records")}</span></div>
        <div className="rounded-3xl bg-primary/10 p-3"><b className="block text-secondary">{project.cards}</b><span className="text-muted-foreground">{t("projects.cards")}</span></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => <span key={tag} className="rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs text-secondary">{tag}</span>)}
      </div>
    </article>
  );
}
