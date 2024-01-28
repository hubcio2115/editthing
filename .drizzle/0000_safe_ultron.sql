CREATE TABLE IF NOT EXISTS `editthing-app_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `editthing-app_account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_organization` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`ownerId` varchar(255) NOT NULL,
	CONSTRAINT `editthing-app_organization_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`createdById` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `editthing-app_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_project` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`projectName` varchar(256) NOT NULL,
	`projectDescription` varchar(512),
	`title` varchar(256),
	`description` varchar(512),
	`categoryId` varchar(128),
	`defaultLanguage` varchar(128),
	`embeddable` boolean,
	`license` enum('youtube','creativeCommon'),
	`privacyStatus` enum('public','unlisted','private'),
	`publicStatsViewable` boolean,
	`publishAt` date,
	`selfDeclaredMadeForKids` boolean,
	`videoEntryId` bigint,
	`organizationId` bigint NOT NULL,
	CONSTRAINT `editthing-app_project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `editthing-app_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `editthing-app_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_usersToOrganizations` (
	`memberId` varchar(255) NOT NULL,
	`organizationId` bigint NOT NULL,
	CONSTRAINT `editthing-app_usersToOrganizations_memberId_organizationId` PRIMARY KEY(`memberId`,`organizationId`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `editthing-app_verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `editthing-app_videoEntry` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`uploadId` varchar(256) NOT NULL,
	`assetId` varchar(255),
	`url` varchar(256),
	`playbackId` varchar(256),
	CONSTRAINT `editthing-app_videoEntry_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `editthing-app_account` (`userId`);--> statement-breakpoint
CREATE INDEX `createdById_idx` ON `editthing-app_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `editthing-app_post` (`name`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `editthing-app_session` (`userId`);--> statement-breakpoint
ALTER TABLE `editthing-app_organization` ADD CONSTRAINT `editthing-app_organization_ownerId_editthing-app_user_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `editthing-app_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `editthing-app_project` ADD CONSTRAINT `editthing-app_project_videoEntryId_editthing-app_videoEntry_id_fk` FOREIGN KEY (`videoEntryId`) REFERENCES `editthing-app_videoEntry`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `editthing-app_project` ADD CONSTRAINT `editthing-app_project_organizationId_editthing-app_organization_id_fk` FOREIGN KEY (`organizationId`) REFERENCES `editthing-app_organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `editthing-app_usersToOrganizations` ADD CONSTRAINT `editthing-app_usersToOrganizations_memberId_editthing-app_user_id_fk` FOREIGN KEY (`memberId`) REFERENCES `editthing-app_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `editthing-app_usersToOrganizations` ADD CONSTRAINT `editthing-app_usersToOrganizations_organizationId_editthing-app_organization_id_fk` FOREIGN KEY (`organizationId`) REFERENCES `editthing-app_organization`(`id`) ON DELETE no action ON UPDATE no action;
