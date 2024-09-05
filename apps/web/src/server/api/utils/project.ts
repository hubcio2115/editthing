import { youtube, type youtube_v3 } from "@googleapis/youtube";
import { env } from "~/env";
import type { Result } from "~/lib/utils";
import type { Organization } from "~/lib/validators/organization";
import { OAuth2Client } from "google-auth-library";
import { getOwnerAccount, getOwnerId } from "./organizations";

const youtubeClient = youtube("v3");

export async function getYoutubeCategories(): Promise<
  Result<youtube_v3.Schema$VideoCategory[]>
> {
  try {
    const categories: youtube_v3.Schema$VideoCategoryListResponse =
      (await youtubeClient.videoCategories
        .list({
          // @ts-expect-error Types from google libraries are awful
          part: "snippet",
          regionCode: "PL",
          key: env.YOUTUBE_DATA_API_KEY,
        })
        .then((res) => res.data)) as any;

    return [categories.items!, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

export async function getYoutubeSupportedLanguages(): Promise<
  Result<youtube_v3.Schema$I18nLanguage[]>
> {
  const youtubeClient = youtube("v3");

  try {
    const languages: youtube_v3.Schema$I18nLanguageListResponse =
      (await youtubeClient.i18nLanguages
        .list({
          // @ts-expect-error Types from google libraries are awful
          part: "snippet",
          key: env.YOUTUBE_DATA_API_KEY,
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
  const youtubeClient = youtube("v3");

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
        // @ts-expect-error Types from google libraries are awful
        part: "snippet",
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
