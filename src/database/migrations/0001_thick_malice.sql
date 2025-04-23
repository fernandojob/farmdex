ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "farms" ADD COLUMN "updated_at" timestamp DEFAULT now();