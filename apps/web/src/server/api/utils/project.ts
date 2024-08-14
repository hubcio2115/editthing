import { youtube, type youtube_v3 } from "@googleapis/youtube";
import { env } from "~/env";
import type { Result } from "~/lib/utils";

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
