CREATE TABLE "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "oracle_cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"project_id" uuid NOT NULL,
	"source_record_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"deck" text DEFAULT '' NOT NULL,
	"card_type" text DEFAULT 'oracle' NOT NULL,
	"element" text DEFAULT '' NOT NULL,
	"keywords" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"image_description" text DEFAULT '' NOT NULL,
	"composition" text DEFAULT '' NOT NULL,
	"symbols" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"palette" text DEFAULT '' NOT NULL,
	"prompt" text DEFAULT '' NOT NULL,
	"avoid" text DEFAULT '' NOT NULL,
	"upright" text DEFAULT '' NOT NULL,
	"reversed" text DEFAULT '' NOT NULL,
	"story" text DEFAULT '' NOT NULL,
	"source_summary" text DEFAULT '' NOT NULL,
	"action" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "studio_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"name" text NOT NULL,
	"theme" text DEFAULT '' NOT NULL,
	"privacy" text DEFAULT 'private' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeline_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"project_id" uuid NOT NULL,
	"type" varchar(32) DEFAULT 'journal' NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"mood" text DEFAULT '' NOT NULL,
	"symbols" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"intensity" integer DEFAULT 50 NOT NULL,
	"recorded_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "oracle_cards" ADD CONSTRAINT "oracle_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oracle_cards" ADD CONSTRAINT "oracle_cards_project_id_studio_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."studio_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studio_projects" ADD CONSTRAINT "studio_projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_records" ADD CONSTRAINT "timeline_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_records" ADD CONSTRAINT "timeline_records_project_id_studio_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."studio_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "oracle_cards_user_idx" ON "oracle_cards" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "oracle_cards_project_idx" ON "oracle_cards" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "studio_projects_user_idx" ON "studio_projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "timeline_records_user_idx" ON "timeline_records" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "timeline_records_project_idx" ON "timeline_records" USING btree ("project_id");