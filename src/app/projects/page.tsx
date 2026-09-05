"use client";

import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppChrome } from "@/components/studio/app-chrome";
import { ProjectCard } from "@/components/studio/project-card";
import { projects } from "@/lib/studio/mock-data";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <AppChrome>
      <div className="grid gap-5" data-el="projects-page">
        <section className="rounded-[32px] border border-border/70 bg-[rgba(255,248,239,.62)] p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl md:p-7" data-el="projects-hero">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">{t("projects.eyebrow")}</p>
              <h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-secondary md:text-6xl">{t("projects.title")}</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">{t("projects.intro")}</p>
            </div>
            <button className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-accent shadow-[var(--shadow-md)]" data-el="create-project-button">
              <Plus className="size-4" /> {t("projects.create")}
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3" data-el="project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </section>

        <section className="rounded-[32px] border border-primary/25 bg-secondary p-5 text-accent shadow-[var(--shadow-md)]" data-el="weekly-focus-card">
          <p className="text-sm text-accent/70">{t("projects.focus")}</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">Luna · 9月梦境阶段</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-accent/80">{t("projects.focusBody")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["门", "潮水", "灯", "月光", "旧屋"].map((symbol) => <span key={symbol} className="rounded-full border border-accent/20 px-3 py-1 text-xs">{symbol}</span>)}
          </div>
        </section>
      </div>
    </AppChrome>
  );
}
