import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { type Project } from "../validators/project";
import type { HTTPError } from "ky";
import { type ZodError } from "zod";
import ky from "ky";
import type { youtube_v3 } from "@googleapis/youtube";

type UseProjectsQueryOptions = Omit<
  UseSuspenseQueryOptions<
    youtube_v3.Schema$Channel,
    HTTPError | ZodError<Project[]>,
    youtube_v3.Schema$Channel,
    ["channel", Project["channelId"]]
  >,
  "queryKey" | "queryFn"
>;

export function useChannelSuspenseQuery(
  channelId: Project["channelId"],
  options: UseProjectsQueryOptions = {},
) {
  return useSuspenseQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const res = await ky
        .get<youtube_v3.Schema$Channel>(`/api/youtube/channel/${channelId}`)
        .json();

      return res;

      return res;
    },
    ...options,
  });
}
