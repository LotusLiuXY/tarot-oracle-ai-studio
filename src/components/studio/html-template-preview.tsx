"use client";

import { useState } from "react";
import { Copy, FileCode2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HtmlTemplatePreview({ html, title }: { html: string; title: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard?.writeText(html);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="rounded-[32px] border border-border/60 bg-secondary p-4 text-accent shadow-[var(--shadow-md)]" data-el="html-template-preview">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-accent/70">{t("export.templateLabel")}</p>
          <h2 className="font-heading text-2xl font-semibold">{title}</h2>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
          <FileCode2 className="size-5" />
        </span>
      </div>
      <pre className="max-h-[340px] overflow-auto rounded-[28px] border border-accent/15 bg-[#26182F] p-4 text-xs leading-5 text-accent/95 dark:bg-[#1B1022]" data-el="html-code-block">
        <code>{html}</code>
      </pre>
      <button type="button" onClick={handleCopy} className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-secondary" data-el="copy-html-button">
        <Copy className="size-4" />
        {copied ? t("export.copied") : t("export.copy")}
      </button>
    </section>
  );
}
