"use client";

import { useEffect, useState } from "react";
import { auth } from "@eazo/sdk";
import { useEazo } from "@eazo/sdk/react";
import { getStudioSnapshot } from "@/lib/api/studio";
import type { StudioSnapshot } from "@/lib/studio/types";

export function useStudioSnapshot() {
  const user = useEazo((s) => s.auth.user);
  const loading = useEazo((s) => s.auth.loading);
  const [snapshot, setSnapshot] = useState<StudioSnapshot | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;
    getStudioSnapshot()
      .then((data) => {
        if (!cancelled) setSnapshot(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  return { snapshot, loading: loading || (!!user && !snapshot && !error), error, user, login: () => auth.login() };
}
