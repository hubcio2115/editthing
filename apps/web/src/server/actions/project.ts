"use server";

import { asc, eq, inArray } from "drizzle-orm";

import type { Result } from "~/lib/utils";
import type { InsertProject, Project } from "~/lib/validators/project";

import { db } from "../db";
import { projects as projectTable } from "../db/schema";
import { auth } from "../auth";
import { getOwnOrganizationByName, getOwnOrganizations } from "./organization";
import {
  getOwnerAccount,
  getOwnerId,
  isUserInOrganization,
} from "../api/utils/organizations";
import { youtube, youtube_v3 } from "@googleapis/youtube";
import { env } from "~/env";
import { Readable } from "stream";
import { OAuth2Client } from "google-auth-library";

export async function createProject(
  formData: FormData,
): Promise<Result<Project>> {
  const session = await auth();
  const organizationName = formData.get("organizationName") as string;

  const [organization, err] = await getOwnOrganizationByName(organizationName);

  if (err !== null) {
    return [null, "ORGANIZATION_NOT_FOUND"];
  }

  const isUserAuthorized =
    session && (await isUserInOrganization(session.user.id, organizationName));
  if (!isUserAuthorized) {
    return [null, "UNAUTHORIZED"];
  }

  const owner = await getOwnerId(organizationName);
  if (!owner) {
    return [null, "OWNER_NOT_FOUND"];
  }

  const ownerAccount = (await getOwnerAccount(owner.id))!;

  // Create a new OAuth2Client for authorization
  const youtubeClient = youtube("v3");

  const oauth2Client = new OAuth2Client({
    clientSecret: env.AUTH_GOOGLE_SECRET,
    clientId: env.AUTH_GOOGLE_ID,

    credentials: {
      access_token: ownerAccount?.access_token,
      refresh_token: ownerAccount?.refresh_token,
    },
  });
  const project: InsertProject = {
    categoryId: formData.get("categoryId") as string,
    channelId: formData.get("channelId") as string,
    defaultLanguage: formData.get("defaultLanguage") as string,
    description: formData.get("description") as string,
    embeddable: formData.get("embeddable") === "true",
    license: formData.get("license") as Project["license"],
    notifySubscribers: formData.get("notifySubscribers") === "true",
    privacyStatus: formData.get("privacyStatus") as Project["privacyStatus"],
    publicStatsViewable: formData.get("publicStatsViewable") === "true",

    selfDeclaredMadeForKids: formData.get("selfDeclaredMadeForKids") === "true",
    tags: formData.get("tags") as string,
    title: formData.get("title") as string,
    organizationId: organization.id,

    videoId: null,
    publishAt: null,
  };

  const videoFile = formData.get("video") as File;

  try {
    var video = (await youtubeClient.videos
      .insert({
        part: ["snippet", "status", "id"],
        auth: oauth2Client,
        media: {
          // @ts-expect-error ReadableStream<Uint8Array> is assignable to ReadableStream<any>
          body: Readable.fromWeb(videoFile.stream()),
          mimeType: "video/*",
        },
        requestBody: {
          snippet: {
            title: project.title,
            description: project.description,
            tags: project.tags?.split(","),
            categoryId: project.categoryId,
            defaultLanguage: project.defaultLanguage,
            channelId: project.channelId,
          },
          status: {
            license: project.license,
            embeddable: project.embeddable,
            privacyStatus: project.privacyStatus,

            publicStatsViewable: project.publicStatsViewable,
            selfDeclaredMadeForKids: project.selfDeclaredMadeForKids,
          },
        },
      })
      .then((res) => res.data)) as youtube_v3.Schema$Video;
  } catch (e) {
    return [null, (e as Error).message];
  }

  project.videoId = video.id;
  project.publishAt = video.status?.publishAt;

  const newProject = (
    await db.insert(projectTable).values(project).returning()
  ).at(0)!;

  return [newProject, null];
}

export async function getProjectById(
  id: Project["id"],
): Promise<Result<Project | null>> {
  const session = await auth();

  if (!session) {
    return [null, "UNAUTHORIZED"];
  }

  const organization = await db
    .select({
      id: organizations.id,
    })
    .from(organizations)
    .leftJoin(projectTable, eq(organizations.id, projectTable.organizationId))
    .where(eq(projectTable.id, id));

  if (organization.length === 0) {
    return [null, "PROJECT_NOT_FOUND"];
  }

  const isAuthorized = await isUserInOrganization(
    session.user.id,
    organization[0]!.id,
  );

  if (!isAuthorized) {
    return [null, "UNAUTHORIZED"];
  }

  const project =
    (await db.select().from(projectTable).where(eq(projectTable.id, id)))[0] ??
    null;

  return [project, null];
}

export async function deleteProjectById(
  id: Project["id"],
): Promise<Result<Project>> {
  try {
    const deletedProject = (
      await db.delete(projectTable).where(eq(projectTable.id, id)).returning()
    )[0];

    return [deletedProject!, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}

export async function getPaginatedProjects(
  page: number,
): Promise<Result<Project[]>> {
  try {
    const projects = await db
      .select()
      .from(projectTable)
      .orderBy(asc(projectTable.createdAt))
      .limit(10)
      .offset(page);

    return [projects, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}

export async function updateProjectStatus(
  id: Project["id"],
  status: Project["status"],
): Promise<Result<Project>> {
  const session = await auth();

  if (!session) {
    return [null, "UNAUTHORIZED"];
  }

  const organization = await db
    .select({
      id: organizations.id,
    })
    .from(organizations)
    .leftJoin(projectTable, eq(organizations.id, projectTable.organizationId))
    .where(eq(projectTable.id, id));

  if (organization.length === 0) {
    return [null, "PROJECT_NOT_FOUND"];
  }

  const isUserAuthorized = await isUserInOrganization(
    session.user.id,
    organization[0]!.id,
  );

  if (!isUserAuthorized) {
    return [null, "UNAUTHORIZED"];
  }

  const updatedProject = (
    await db
      .update(projectTable)
      .set({ status })
      .where(eq(projectTable.id, id))
      .returning()
  )[0];

  return [updatedProject!, null];
}

