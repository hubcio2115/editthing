import { relations, sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `editthing_app_${name}`);

export const posts = createTable(
  "post",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  videoEntries: many(videoEntries),
  organizations: many(organizations),
  usersToOrganizations: many(usersToOrganizations),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const videoEntries = createTable("videoEntry", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  uploadId: varchar("uploadId", { length: 256 }).notNull(),
  assetId: varchar("assetId", { length: 255 }),
  downloadUrl: varchar("url", { length: 256 }),
  playbackId: varchar("playbackId", { length: 256 }),
  userId: varchar("userId", { length: 255 }),
});

export const videoEntriesRelations = relations(videoEntries, ({ one }) => ({
  user: one(users, {
    fields: [videoEntries.userId],
    references: [users.id],
  }),
}));

export const organizations = createTable("organization", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  owner: varchar("ownerId", { length: 255 })
    .notNull()
    .references(() => users.id),
});

export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    owner: one(users, {
      fields: [organizations.owner],
      references: [users.id],
    }),
    usersToOrganizations: many(usersToOrganizations),
    projects: many(projects),
  }),
);

export const usersToOrganizations = createTable(
  "usersToOrganizations",
  {
    memberId: varchar("memberId", { length: 255 })
      .notNull()
      .references(() => users.id),
    organizationId: bigint("organizationId", { mode: "number" })
      .notNull()
      .references(() => organizations.id),
  },
  (t) => ({ pk: primaryKey({ columns: [t.memberId, t.organizationId] }) }),
);

export const usersToOrganizationsRelations = relations(
  usersToOrganizations,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [usersToOrganizations.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [usersToOrganizations.memberId],
      references: [users.id],
    }),
  }),
);

export const licenseEnum = pgEnum("license", ["youtube", "creativeCommon"]);
export const privacyStatus = pgEnum("privacyStatus", [
  "public",
  "unlisted",
  "private",
]);

export const projects = createTable("project", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  projectName: varchar("projectName", { length: 256 }).notNull(),
  projectDescription: varchar("projectDescription", { length: 512 }),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 512 }),
  categoryId: varchar("categoryId", { length: 128 }),
  defaultLanguage: varchar("defaultLanguage", { length: 128 }),
  embeddable: boolean("embeddable"),
  license: licenseEnum("license"),
  privacyStatus: privacyStatus("privacyStatus"),
  publicStatsViewable: boolean("publicStatsViewable"),
  publishAt: date("publishAt", { mode: "string" }),
  selfDeclaredMadeForKids: boolean("selfDeclaredMadeForKids"),
  videoEntryId: bigint("videoEntryId", { mode: "number" }),
  organizationId: bigint("organizationId", { mode: "number" }).notNull(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  videoEntry: one(videoEntries, {
    fields: [projects.videoEntryId],
    references: [videoEntries.id],
  }),
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
}));
