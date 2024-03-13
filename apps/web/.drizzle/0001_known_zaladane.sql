DO $$ BEGIN
 CREATE TYPE "license" AS ENUM('youtube', 'creativeCommon');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "privacyStatus" AS ENUM('public', 'unlisted', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
