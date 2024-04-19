DO $$ BEGIN
 CREATE TYPE "provider" AS ENUM('google', 'facebook');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" "provider" NOT NULL,
	"provider_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "user_provider_provider_id_pk" PRIMARY KEY("provider","provider_id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
