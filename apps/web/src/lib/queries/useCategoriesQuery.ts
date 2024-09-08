import type { youtube_v3 } from "@googleapis/youtube";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import ky from "ky";

type UseCategoriesSuspenseQueryOptions = Omit<
  UseSuspenseQueryOptions<
    youtube_v3.Schema$VideoCategory[],
    Error,
    youtube_v3.Schema$VideoCategory[],
    ["youtubeVideoCategories"]
  >,
  "queryKey" | "queryFn"
>;

export function useCategoriesSuspenseQuery(
  options: UseCategoriesSuspenseQueryOptions = {},
) {
  return useSuspenseQuery({
    queryKey: ["youtubeVideoCategories"],
    queryFn: async () =>
      ky
        .get<youtube_v3.Schema$VideoCategory[]>(`/api/youtube/categories`)
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
    ["youtubeVideoCategories"]
  >,
  "queryKey" | "queryFn"
>;

export function useCategoriesQuery(options: UseCategoriesQueryOptions = {}) {
  return useQuery({
    queryKey: ["youtubeVideoCategories"],
    queryFn: async () =>
      ky
        .get<youtube_v3.Schema$VideoCategory[]>(`/api/youtube/categories`)
        .json(),
    select: (data) => data.filter((category) => category.snippet?.assignable),
    staleTime: Number.POSITIVE_INFINITY,
    ...options,
  });
}
