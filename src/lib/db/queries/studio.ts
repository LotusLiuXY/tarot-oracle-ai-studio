import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { oracleCards, studioProjects, timelineRecords, type NewOracleCard, type NewStudioProject, type NewTimelineRecord } from "@/lib/db/schema";

export async function listProjects(userId: string) {
  return db.select().from(studioProjects).where(eq(studioProjects.userId, userId)).orderBy(desc(studioProjects.updatedAt));
}

export async function createProject(userId: string, input: Pick<NewStudioProject, "name" | "theme" | "privacy" | "tags">) {
  const [project] = await db.insert(studioProjects).values({ ...input, userId }).returning();
  return project;
}

export async function listTimelineRecords(userId: string, projectId?: string) {
  return db
    .select()
    .from(timelineRecords)
    .where(projectId ? and(eq(timelineRecords.userId, userId), eq(timelineRecords.projectId, projectId)) : eq(timelineRecords.userId, userId))
    .orderBy(desc(timelineRecords.recordedAt));
}

export async function createTimelineRecord(userId: string, input: Omit<NewTimelineRecord, "userId">) {
  const [record] = await db.insert(timelineRecords).values({ ...input, userId }).returning();
  return record;
}

export async function listOracleCards(userId: string, projectId?: string) {
  return db
    .select()
    .from(oracleCards)
    .where(projectId ? and(eq(oracleCards.userId, userId), eq(oracleCards.projectId, projectId)) : eq(oracleCards.userId, userId))
    .orderBy(desc(oracleCards.updatedAt));
}

export async function createOracleCard(userId: string, input: Omit<NewOracleCard, "userId">) {
  const [card] = await db.insert(oracleCards).values({ ...input, userId }).returning();
  return card;
}

export async function updateOracleCard(userId: string, id: string, input: Partial<Omit<NewOracleCard, "id" | "userId" | "createdAt">>) {
  const [card] = await db
    .update(oracleCards)
    .set({ ...input, updatedAt: new Date() })
    .where(and(eq(oracleCards.id, id), eq(oracleCards.userId, userId)))
    .returning();
  return card;
}

export async function getRecordsByIds(userId: string, ids: string[]) {
  if (ids.length === 0) return [];
  return db
    .select()
    .from(timelineRecords)
    .where(and(eq(timelineRecords.userId, userId), inArray(timelineRecords.id, ids)));
}
