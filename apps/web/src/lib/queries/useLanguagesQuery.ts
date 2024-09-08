import type { youtube_v3 } from "@googleapis/youtube";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import ky from "ky";

type UseLanguagesSuspenseQueryOptions = Omit<
  UseSuspenseQueryOptions<
    youtube_v3.Schema$I18nLanguage[],
    Error,
    youtube_v3.Schema$I18nLanguage[],
    ["youtubeLanguages"]
  >,
  "queryKey" | "queryFn"
>;

export function useLanguagesSuspenseQuery(
  options: UseLanguagesSuspenseQueryOptions = {},
) {
  return useSuspenseQuery({
    queryKey: ["youtubeLanguages"],
    queryFn: async () =>
      ky.get<youtube_v3.Schema$I18nLanguage[]>("/api/youtube/languages").json(),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}

type UseLanguagesQueryOptions = Omit<
  UseQueryOptions<
    youtube_v3.Schema$I18nLanguage[],
    Error,
    youtube_v3.Schema$I18nLanguage[],
    ["youtubeLanguages"]
  >,
  "queryKey" | "queryFn"
>;

export function useLanguagesQuery(options: UseLanguagesQueryOptions = {}) {
  return useQuery({
    queryKey: ["youtubeLanguages"],
    queryFn: async () =>
      ky.get<youtube_v3.Schema$I18nLanguage[]>("/api/youtube/languages").json(),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}
