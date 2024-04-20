CREATE TABLE IF NOT EXISTS "editthing_app_usersToRolesToOrganizations" (
	"memberId" varchar(255) NOT NULL,
	"role" "role" NOT NULL,
	"organizationId" bigint NOT NULL,
	CONSTRAINT "editthing_app_usersToRolesToOrganizations_memberId_role_organizationId_pk" PRIMARY KEY("memberId","role","organizationId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToRolesToOrganizations" ADD CONSTRAINT "editthing_app_usersToRolesToOrganizations_memberId_editthing_app_user_id_fk" FOREIGN KEY ("memberId") REFERENCES "editthing_app_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToRolesToOrganizations" ADD CONSTRAINT "editthing_app_usersToRolesToOrganizations_role_editthing_app_role_role_fk" FOREIGN KEY ("role") REFERENCES "editthing_app_role"("role") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToRolesToOrganizations" ADD CONSTRAINT "editthing_app_usersToRolesToOrganizations_organizationId_editthing_app_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "editthing_app_organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
