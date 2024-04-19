DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user', 'owner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_role" (
	"role" "role" PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "editthing_app_usersToOrganizations" DROP CONSTRAINT "editthing_app_usersToOrganizations_memberId_organizationId_pk";--> statement-breakpoint
ALTER TABLE "editthing_app_usersToOrganizations" ADD COLUMN "role" varchar(128);
ALTER TABLE "editthing_app_usersToOrganizations" ADD CONSTRAINT "editthing_app_usersToOrganizations_memberId_role_organizationId_pk" PRIMARY KEY("memberId","role","organizationId");--> statement-breakpoint
