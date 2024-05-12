ALTER TABLE "editthing_app_organization" DROP CONSTRAINT "editthing_app_organization_ownerId_editthing_app_user_id_fk";
--> statement-breakpoint
ALTER TABLE "editthing_app_organization" DROP COLUMN IF EXISTS "ownerId";