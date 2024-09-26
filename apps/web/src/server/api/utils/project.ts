import { youtube, type youtube_v3 } from "@googleapis/youtube";
import { env } from "~/env";
import type { Result } from "~/lib/utils";
import type { Organization } from "~/lib/validators/organization";
import { OAuth2Client } from "google-auth-library";
import { getOwnerAccount, getOwnerId } from "./organizations";
import type { SupportedLanguages } from "~/i18n/settings";

const youtubeClient = youtube("v3");

export async function getYoutubeCategories(
  lang: SupportedLanguages,
): Promise<Result<youtube_v3.Schema$VideoCategory[]>> {
  try {
    const categories: youtube_v3.Schema$VideoCategoryListResponse =
      (await youtubeClient.videoCategories
        .list({
          part: ["snippet"],
          regionCode: "PL",
          key: env.YOUTUBE_DATA_API_KEY,
          hl: lang,
        })
        .then((res) => res.data)) as any;

    return [categories.items!, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

export async function getYoutubeSupportedLanguages(
  lang: SupportedLanguages,
): Promise<Result<youtube_v3.Schema$I18nLanguage[]>> {
  try {
    const languages: youtube_v3.Schema$I18nLanguageListResponse =
      (await youtubeClient.i18nLanguages
        .list({
          part: ["snippet"],
          key: env.YOUTUBE_DATA_API_KEY,
          hl: lang,
        })
        .then((res) => res.data)) as any;

    return [languages.items!, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

export async function getOwnerChannels(
  organizationName: Organization["name"],
): Promise<Result<youtube_v3.Schema$Channel[]>> {
  // Get owner of the organization
  const owner = await getOwnerId(organizationName);
  if (!owner) {
    return [null, "NOT_FOUND"];
  }

  const ownerAccount = (await getOwnerAccount(owner.id))!;

  // Create a new OAuth2Client for authorization
  const oauth2Client = new OAuth2Client({
    clientSecret: env.AUTH_GOOGLE_SECRET,
    clientId: env.AUTH_GOOGLE_ID,

    credentials: {
      access_token: ownerAccount?.access_token,
      refresh_token: ownerAccount?.refresh_token,
    },
  });

  try {
    const channels = await youtubeClient.channels
      .list({
        part: ["snippet"],
        auth: oauth2Client,
        mine: true,
        key: env.YOUTUBE_DATA_API_KEY,
      })
      .then((res) => res.data);

    // @ts-expect-error Types from google libraries are awful
    return [channels.items, null];
  } catch (e) {
    console.error(e);
    return [null, (e as Error).message];
  }
}

export async function getChannel(
  channelId: string,
): Promise<Result<youtube_v3.Schema$Channel>> {
  try {
    const channel = await youtubeClient.channels
      .list({
        part: ["snippet"],
        id: [channelId],
        key: env.YOUTUBE_DATA_API_KEY,
      })
      .then((res) => res.data);

    // @ts-expect-error Types from google libraries are awful
    return [channel.items[0], null];
  } catch (e) {
    console.error(e);
    return [null, (e as Error).message];
  }
}

export async function getVideo(
  organizationName: Organization["name"],
  videoId: string,
): Promise<Result<youtube_v3.Schema$Channel>> {
  // Get owner of the organization
  const owner = await getOwnerId(organizationName);
  if (!owner) {
    return [null, "NOT_FOUND"];
  }

  const ownerAccount = (await getOwnerAccount(owner.id))!;

  // Create a new OAuth2Client for authorization
  const oauth2Client = new OAuth2Client({
    clientSecret: env.AUTH_GOOGLE_SECRET,
    clientId: env.AUTH_GOOGLE_ID,

    credentials: {
      access_token: ownerAccount?.access_token,
      refresh_token: ownerAccount?.refresh_token,
    },
  });

  try {
    const channel = await youtubeClient.videos
      // @ts-expect-error Types from google libraries are awful
      .list({
        part: ["snippet"],
        id: [videoId],
        key: env.YOUTUBE_DATA_API_KEY,
        auth: oauth2Client,
        mine: true,
      })
      .then((res) => res.data);

    // @ts-expect-error Types from google libraries are awful
    return [channel.items[0], null];
  } catch (e) {
    console.error(e);
    return [null, (e as Error).message];
  }
}
