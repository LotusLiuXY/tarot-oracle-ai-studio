"use client";

import { request } from "@/lib/api/request";
import type { OracleCardDraft, StudioSnapshot } from "@/lib/studio/types";

export async function getStudioSnapshot(): Promise<StudioSnapshot> {
  const res = await request("/api/studio/snapshot");
  if (!res.ok) throw new Error("Failed to load studio data");
  return res.json();
}

export async function generateOracleCard(input: { recordIds: string[]; projectId?: string; locale: "zh-CN" | "en-US" }): Promise<OracleCardDraft> {
  const res = await request("/api/studio/generate-card", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error("Failed to generate card");
  const data = await res.json();
  return data.card;
}
