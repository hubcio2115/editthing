ALTER TABLE "editthing_app_project" DROP CONSTRAINT "editthing_app_project_videoEntryId_editthing_app_videoEntry_id_fk";
--> statement-breakpoint
ALTER TABLE "editthing_app_project" DROP CONSTRAINT "editthing_app_project_organizationId_editthing_app_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "editthing_app_videoEntry" ADD COLUMN "userId" varchar(255);