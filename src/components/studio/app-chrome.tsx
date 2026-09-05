"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Folder, GalleryVerticalEnd, MoonStar, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UserBadge } from "@/components/user-profile/user-badge";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ThemeToggle } from "@/components/studio/theme-toggle";
import { cn } from "@/utils/utils";

const NAV_ITEMS = [
  { href: "/", key: "workspace", icon: Sparkles },
  { href: "/projects", key: "projects", icon: Folder },
  { href: "/cards", key: "cards", icon: GalleryVerticalEnd },
  { href: "/export", key: "export", icon: Code2 },
] as const;

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground" data-el="app-shell">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[image:var(--studio-bg-image)] bg-cover bg-center opacity-90" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,248,239,.82),rgba(238,231,244,.50)_45%,rgba(61,40,78,.08)),radial-gradient(circle_at_50%_38%,rgba(255,248,239,.62),transparent_42%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <span className="absolute left-[-36%] top-[8%] h-[14%] w-[170%] rotate-[-18deg] animate-[moon-sheen_8s_var(--motion-ease)_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.54),rgba(167,134,200,.18),transparent)] blur-2xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-border/60 bg-[rgba(255,248,239,.64)] px-4 pt-[max(18px,env(safe-area-inset-top,0px))] pb-3 backdrop-blur-2xl" data-el="global-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" data-el="brand-home-link">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-card/70 text-primary shadow-[var(--shadow-sm)]">
              <MoonStar className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-xl font-semibold leading-tight text-secondary">
                {t("app.name")}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {t("app.tagline")}
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2" data-el="header-actions">
            <LanguageSwitcher />
            <UserBadge />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-[calc(92px+env(safe-area-inset-bottom,0px))] pt-4 md:pb-10" data-el="page-content">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-[rgba(255,248,239,.78)] px-3 pb-[max(12px,env(safe-area-inset-bottom,0px))] pt-2 backdrop-blur-2xl md:hidden" aria-label={t("nav.label")} data-el="mobile-tab-nav">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-full border border-border/70 bg-card/60 p-1 shadow-[var(--shadow-md)]">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-el={`nav-${item.key}`}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium text-muted-foreground transition",
                  active && "bg-secondary text-accent shadow-[var(--shadow-sm)]"
                )}
              >
                <Icon className="size-4" />
                <span>{t(`nav.${item.key}`)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="mx-auto hidden w-full max-w-6xl px-4 pb-6 md:block" aria-label={t("nav.label")} data-el="desktop-tab-nav">
        <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-full border border-border/70 bg-[rgba(255,248,239,.76)] p-2 shadow-[var(--shadow-md)] backdrop-blur-2xl">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-el={`desktop-nav-${item.key}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition",
                  active && "bg-secondary text-accent"
                )}
              >
                <Icon className="size-4" />
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
