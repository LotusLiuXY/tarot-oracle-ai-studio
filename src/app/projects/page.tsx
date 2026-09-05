"use client";

import { CalendarDays, FolderPlus, Sparkles, Tags, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppChrome } from "@/components/studio/app-chrome";
import { ProjectCard } from "@/components/studio/project-card";
import { useStudioSnapshot } from "@/components/studio/use-studio-snapshot";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { snapshot, loading, user, login } = useStudioSnapshot();

  return (
    <AppChrome>
      {!user && !loading ? (
        <section className="rounded-[36px] border border-border/50 bg-card/58 p-6 text-center shadow-[var(--shadow-sm)] backdrop-blur-xl" data-el="login-gate">
          <h1 className="font-heading text-4xl text-secondary">{t("projects.title")}</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t("projects.intro")}</p>
          <button onClick={() => void login()} className="mt-5 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-accent">{t("common.signIn")}</button>
        </section>
      ) : loading || !snapshot ? (
        <div className="rounded-[36px] border border-border/50 bg-card/58 p-8 text-center text-muted-foreground shadow-[var(--shadow-sm)]">{t("common.loading")}</div>
      ) : (
        <div className="grid gap-5" data-el="projects-page">
          <section className="rounded-[36px] border border-border/50 bg-card/54 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl md:p-7" data-el="projects-hero">
            <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-stretch">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary">{t("projects.eyebrow")}</p>
                <h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-secondary md:text-6xl">{t("projects.title")}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{t("projects.intro")}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["client", "theme", "firstRecord"].map((key) => (
                    <span key={key} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-secondary">{t(`projects.quick.${key}`)}</span>
                  ))}
                </div>
              </div>

              <aside className="rounded-[30px] border border-primary/25 bg-card/74 p-4 shadow-[var(--shadow-sm)]" data-el="create-project-panel">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{t("projects.createLabel")}</p>
                    <h2 className="mt-1 font-heading text-2xl font-semibold text-secondary">{t("projects.createTitle")}</h2>
                  </div>
                  <span className="grid size-11 place-items-center rounded-full bg-secondary text-accent"><FolderPlus className="size-5" /></span>
                </div>
                <div className="mt-4 grid gap-2">
                  <label className="flex items-center gap-2 rounded-2xl border border-border/55 bg-card/78 px-3 py-2 text-sm text-muted-foreground"><UserRound className="size-4 text-primary" />{t("projects.form.client")}</label>
                  <label className="flex items-center gap-2 rounded-2xl border border-border/55 bg-card/78 px-3 py-2 text-sm text-muted-foreground"><Tags className="size-4 text-primary" />{t("projects.form.theme")}</label>
                  <label className="flex items-center gap-2 rounded-2xl border border-border/55 bg-card/78 px-3 py-2 text-sm text-muted-foreground"><CalendarDays className="size-4 text-primary" />{t("projects.form.rhythm")}</label>
                </div>
                <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-accent shadow-[var(--shadow-md)]" data-el="create-project-button">
                  <Sparkles className="size-4" /> {t("projects.create")}
                </button>
              </aside>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3" data-el="project-grid">
            {snapshot.projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </section>

          <section className="rounded-[36px] border border-primary/25 bg-secondary p-5 text-accent shadow-[var(--shadow-md)]" data-el="weekly-focus-card">
            <p className="text-sm text-accent/70">{t("projects.focus")}</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">{snapshot.weeklyFocusTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-accent/80">{t("projects.focusBody")}</p>
            <div className="mt-4 flex flex-wrap gap-2">{snapshot.weeklySymbols.map((symbol) => <span key={symbol} className="rounded-full border border-accent/20 px-3 py-1 text-xs">{symbol}</span>)}</div>
          </section>
        </div>
      )}
    </AppChrome>
  );
}
