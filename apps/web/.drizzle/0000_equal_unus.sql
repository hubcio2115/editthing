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
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user', 'owner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "editthing_app_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_organization" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"ownerId" varchar(255) NOT NULL,
	"defaultOrg" boolean DEFAULT false NOT NULL,
	CONSTRAINT "editthing_app_organization_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_post" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdById" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_project" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"projectName" varchar(256) NOT NULL,
	"projectDescription" varchar(512),
	"title" varchar(256),
	"description" varchar(512),
	"categoryId" varchar(128),
	"defaultLanguage" varchar(128),
	"embeddable" boolean,
	"license" "license",
	"privacyStatus" "privacyStatus",
	"publicStatsViewable" boolean,
	"publishAt" date,
	"selfDeclaredMadeForKids" boolean,
	"videoEntryId" bigint,
	"organizationId" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp (3) DEFAULT CURRENT_TIMESTAMP(3),
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_usersToOrganizations" (
	"memberId" varchar(255) NOT NULL,
	"role" "role" NOT NULL,
	"organizationId" bigint NOT NULL,
	CONSTRAINT "editthing_app_usersToOrganizations_memberId_role_organizationId_pk" PRIMARY KEY("memberId","role","organizationId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "editthing_app_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editthing_app_videoEntry" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uploadId" varchar(256) NOT NULL,
	"assetId" varchar(255),
	"url" varchar(256),
	"playbackId" varchar(256),
	"userId" varchar(255)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "editthing_app_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdById_idx" ON "editthing_app_post" ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "editthing_app_post" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "editthing_app_session" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_organization" ADD CONSTRAINT "editthing_app_organization_ownerId_editthing_app_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "editthing_app_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToOrganizations" ADD CONSTRAINT "editthing_app_usersToOrganizations_memberId_editthing_app_user_id_fk" FOREIGN KEY ("memberId") REFERENCES "editthing_app_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editthing_app_usersToOrganizations" ADD CONSTRAINT "editthing_app_usersToOrganizations_organizationId_editthing_app_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "editthing_app_organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
