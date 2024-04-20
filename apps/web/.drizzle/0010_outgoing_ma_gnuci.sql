DROP TABLE "editthing_app_usersToRolesToOrganizations";--> statement-breakpoint
ALTER TABLE "editthing_app_usersToOrganizations" DROP CONSTRAINT "editthing_app_usersToOrganizations_memberId_organizationId_pk";--> statement-breakpoint
ALTER TABLE "editthing_app_usersToOrganizations" ADD COLUMN "role" "role" NOT NULL;--> statement-breakpoint
ALTER TABLE "editthing_app_usersToOrganizations" ADD CONSTRAINT "editthing_app_usersToOrganizations_memberId_role_organizationId_pk" PRIMARY KEY("memberId","role","organizationId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToOrganizations" ADD CONSTRAINT "editthing_app_usersToOrganizations_role_editthing_app_role_role_fk" FOREIGN KEY ("role") REFERENCES "editthing_app_role"("role") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
