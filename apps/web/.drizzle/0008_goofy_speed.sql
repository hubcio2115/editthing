DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user', 'owner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_role" (
	"role" "role" PRIMARY KEY NOT NULL
);
