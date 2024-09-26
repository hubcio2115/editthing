import type { youtube_v3 } from "@googleapis/youtube";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import ky from "ky";
import type { SupportedLanguages } from "~/i18n/settings";

type UseLanguagesSuspenseQueryOptions = Omit<
  UseSuspenseQueryOptions<
    youtube_v3.Schema$I18nLanguage[],
    Error,
    youtube_v3.Schema$I18nLanguage[],
    ["youtubeLanguages", SupportedLanguages]
  >,
  "queryKey" | "queryFn"
>;

export function useLanguagesSuspenseQuery(
  lang: SupportedLanguages,
  options: UseLanguagesSuspenseQueryOptions = {},
) {
  return useSuspenseQuery({
    queryKey: ["youtubeLanguages", lang],
    queryFn: async () =>
      ky
        .get<youtube_v3.Schema$I18nLanguage[]>(`/api/youtube/languages/${lang}`)
        .json(),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}

type UseLanguagesQueryOptions = Omit<
  UseQueryOptions<
    youtube_v3.Schema$I18nLanguage[],
    Error,
    youtube_v3.Schema$I18nLanguage[],
    ["youtubeLanguages", SupportedLanguages]
  >,
  "queryKey" | "queryFn"
>;

export function useLanguagesQuery(
  lang: SupportedLanguages,
  options: UseLanguagesQueryOptions = {},
) {
  return useQuery({
    queryKey: ["youtubeLanguages", lang],
    queryFn: async () =>
      ky
        .get<youtube_v3.Schema$I18nLanguage[]>(`/api/youtube/languages/${lang}`)
        .json(),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}
