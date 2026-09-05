import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { index, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const studioProjects = pgTable("studio_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 128 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  theme: text("theme").notNull().default(""),
  privacy: text("privacy").notNull().default("private"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({ userIdx: index("studio_projects_user_idx").on(table.userId) }));

export const timelineRecords = pgTable("timeline_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 128 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  projectId: uuid("project_id").notNull().references(() => studioProjects.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 32 }).notNull().default("journal"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  mood: text("mood").notNull().default(""),
  symbols: jsonb("symbols").$type<string[]>().notNull().default([]),
  intensity: integer("intensity").notNull().default(50),
  recordedAt: timestamp("recorded_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({ userIdx: index("timeline_records_user_idx").on(table.userId), projectIdx: index("timeline_records_project_idx").on(table.projectId) }));

export const oracleCards = pgTable("oracle_cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 128 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  projectId: uuid("project_id").notNull().references(() => studioProjects.id, { onDelete: "cascade" }),
  sourceRecordIds: jsonb("source_record_ids").$type<string[]>().notNull().default([]),
  number: text("number").notNull(),
  name: text("name").notNull(),
  deck: text("deck").notNull().default(""),
  cardType: text("card_type").notNull().default("oracle"),
  element: text("element").notNull().default(""),
  keywords: jsonb("keywords").$type<string[]>().notNull().default([]),
  imageDescription: text("image_description").notNull().default(""),
  composition: text("composition").notNull().default(""),
  symbols: jsonb("symbols").$type<string[]>().notNull().default([]),
  palette: text("palette").notNull().default(""),
  prompt: text("prompt").notNull().default(""),
  avoid: text("avoid").notNull().default(""),
  upright: text("upright").notNull().default(""),
  reversed: text("reversed").notNull().default(""),
  story: text("story").notNull().default(""),
  sourceSummary: text("source_summary").notNull().default(""),
  action: text("action").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({ userIdx: index("oracle_cards_user_idx").on(table.userId), projectIdx: index("oracle_cards_project_idx").on(table.projectId) }));

export type StudioProject = InferSelectModel<typeof studioProjects>;
export type NewStudioProject = InferInsertModel<typeof studioProjects>;
export type TimelineRecord = InferSelectModel<typeof timelineRecords>;
export type NewTimelineRecord = InferInsertModel<typeof timelineRecords>;
export type OracleCard = InferSelectModel<typeof oracleCards>;
export type NewOracleCard = InferInsertModel<typeof oracleCards>;
