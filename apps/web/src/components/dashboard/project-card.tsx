"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "~/lib/validators/project";
import { useVideoSuspenseQuery } from "~/lib/queries/useVideoQuery";
import { useParams } from "next/navigation";
import { useChannelSuspenseQuery } from "~/lib/queries/useChannelQuery";

interface ProjectCardProps {
  project: Project;
}

export default function VideoCard({ project }: ProjectCardProps) {
  const { name } = useParams() as { name: string };

  const { data: video } = useVideoSuspenseQuery(project.videoId!, name);
  const { data: channel } = useChannelSuspenseQuery(project.channelId);

  return (
    <div className="max-w-[350px] sm:max-w-96 mx-auto">
      <Link
        href={`/dashboard/${name}/project/${project.id}`}
        className="flex items-center max-h-min flex-col gap-2"
      >
        <div className="h-60 w-[320px] sm:w-96 rounded-lg overflow-hidden">
          <Image
            className="h-60 w-[320px] sm:w-96"
            alt="project thumbnail"
            src={video.snippet?.thumbnails?.standard?.url ?? ""}
            width={video.snippet?.thumbnails?.standard?.width ?? 320}
            height={video.snippet?.thumbnails?.standard?.height ?? 180}
          />
        </div>

        <div className="flex w-full gap-2">
          <Image
            className="w-10 h-10 rounded-full"
            alt="channel thumbnail"
            src={channel.snippet?.thumbnails?.default?.url ?? ""}
            width={40}
            height={40}
          />

          <div className="flex flex-col gap-1 w-full">
            <p className="font-bold">{project.title}</p>
            <p className="text-sm text-slate-500">{channel.snippet?.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
