"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/65 px-3 py-1.5 text-xs font-semibold text-secondary shadow-[var(--shadow-sm)] backdrop-blur-xl transition hover:bg-card"
      data-el="theme-toggle"
      aria-label={isDark ? t("theme.switchToDay") : t("theme.switchToNight")}
    >
      {isDark ? <Sun className="size-3.5 text-primary" /> : <Moon className="size-3.5 text-primary" />}
      <span className="hidden sm:inline">{isDark ? t("theme.night") : t("theme.day")}</span>
    </button>
  );
}
