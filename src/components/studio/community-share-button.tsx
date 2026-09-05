"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { share } from "@eazo/sdk";
import { useTranslation } from "react-i18next";

export function CommunityShareButton({ text, targetPath }: { text: string; targetPath?: string }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);

  const handleShare = async () => {
    setFailed(false);
    try {
      await share.compose({
        text,
        sourceAppId: process.env.NEXT_PUBLIC_EAZO_APP_ID || undefined,
        targetPath,
      });
    } catch {
      setFailed(true);
    }
  };

  return (
    <div className="space-y-1" data-el="community-share-card">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-4 py-2 text-sm font-semibold text-secondary shadow-[var(--shadow-sm)] transition hover:bg-card"
        data-el="community-share-button"
      >
        <Share2 className="size-4" />
        {t("share.openComposer")}
      </button>
      {failed ? <p className="text-xs text-muted-foreground" role="status">{t("share.retry")}</p> : null}
    </div>
  );
}
