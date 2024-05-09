ALTER TABLE "editthing_app_usersToOrganizations" DROP CONSTRAINT "editthing_app_usersToOrganizations_memberId_editthing_app_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToOrganizations" ADD CONSTRAINT "editthing_app_usersToOrganizations_memberId_editthing_app_user_id_fk" FOREIGN KEY ("memberId") REFERENCES "editthing_app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
