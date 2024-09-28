import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { type Project } from "../validators/project";
import type { HTTPError } from "ky";
import ky from "ky";
import { env } from "~/env";
import type { youtube_v3 } from "@googleapis/youtube";
import type { Organization } from "../validators/organization";

type UseProjectsQueryOptions = Omit<
  UseSuspenseQueryOptions<
    youtube_v3.Schema$Video,
    HTTPError,
    youtube_v3.Schema$Video,
    ["video", Project["videoId"]]
  >,
  "queryKey" | "queryFn"
>;

export function useVideoSuspenseQuery(
  videoId: Project["videoId"],
  organizationName: Organization["name"],
  options: UseProjectsQueryOptions = {},
) {
  return useSuspenseQuery({
    queryKey: ["video", videoId],
    queryFn: async () => {
      const res = await ky
        .get<youtube_v3.Schema$Video>(
          `${env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationName}/projects/video/${videoId}`,
        )
        .json();

      return res;
    },
    ...options,
  });
}
