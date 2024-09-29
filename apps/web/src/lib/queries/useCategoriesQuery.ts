import type { youtube_v3 } from "@googleapis/youtube";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import ky from "ky";
import type { SupportedLanguages } from "~/i18n/settings";

type UseCategoriesSuspenseQueryOptions = Omit<
  UseSuspenseQueryOptions<
    youtube_v3.Schema$VideoCategory[],
    Error,
    youtube_v3.Schema$VideoCategory[],
    ["youtubeVideoCategories", SupportedLanguages]
  >,
  "queryKey" | "queryFn"
>;

export function useCategoriesSuspenseQuery(
  lang: SupportedLanguages,
  options: UseCategoriesSuspenseQueryOptions = {},
) {
  return useSuspenseQuery({
    queryKey: ["youtubeVideoCategories", lang],
    queryFn: async () =>
      ky
        .get<youtube_v3.Schema$VideoCategory[]>(`/api/youtube/categories/${lang}`)
        .json(),
    select: (data) => data.filter((category) => category.snippet?.assignable),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}

type UseCategoriesQueryOptions = Omit<
  UseQueryOptions<
    youtube_v3.Schema$VideoCategory[],
    Error,
    youtube_v3.Schema$VideoCategory[],
    ["youtubeVideoCategories", SupportedLanguages]
  >,
  "queryKey" | "queryFn"
>;

export function useCategoriesQuery(lang: SupportedLanguages, options: UseCategoriesQueryOptions = {}) {
  return useQuery({
    queryKey: ["youtubeVideoCategories", lang],
    queryFn: async () =>
      ky
        .get<youtube_v3.Schema$VideoCategory[]>(`/api/youtube/categories/${lang}`)
        .json(),
    select: (data) => data.filter((category) => category.snippet?.assignable),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}
