CREATE TABLE IF NOT EXISTS "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"full_name" text NOT NULL,
	"address_1" text NOT NULL,
	"address_2" text,
	"city" text NOT NULL,
	"postal_code" text NOT NULL,
	"country" text NOT NULL,
	"phone_number" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
