"use client";

import type { youtube_v3 } from "@googleapis/youtube";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "~/lib/validators/project";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectForm from "./project-form";
import { Badge } from "../ui/badge";
import { GitPullRequestClosed, Merge } from "lucide-react";
import { useLanguagesQuery } from "~/lib/queries/useLanguagesQuery";
import { useCategoriesQuery } from "~/lib/queries/useCategoriesQuery";

interface ProjectDisplayProps {
  project: Project;
  channel: youtube_v3.Schema$Channel;
}

function ProjectDisplay({ channel, project }: ProjectDisplayProps) {
  const [showWholeDescription, setShowWholeDescription] = useState(false);
  const descriptionLines = project.description.split("\n");

  const { data: languages } = useLanguagesQuery();
  const language = languages?.find(
    (language) => language.id === project.defaultLanguage,
  );

  const { data: categories } = useCategoriesQuery();
  const category = categories?.find(
    (category) => category.id === project.categoryId,
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useProjectStatusMutation(project.id, {
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["project", project.id] });
    },
  });

  return (
    <>
      <h1 className="font-bold text-xl">{project.title}</h1>

      <div className="flex gap-2">
        <div className="rounded-full overflow-hidden">
          <Image
            alt="Channel profile picture"
            src={channel.snippet?.thumbnails?.default?.url ?? ""}
            height={60}
            width={60}
          />
        </div>

        <div>
          <p className="font-bold text-lg">{channel.snippet?.title}</p>
          <div className="w-20 h-5 bg-slate-100 rounded-md" />
        </div>

        <Button
          variant="secondary"
          disabled
          className="rounded-full my-auto disabled:opacity-100"
        >
          Subscribe
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {showWholeDescription ? (
          descriptionLines.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{descriptionLines[0]}</p>
        )}

        {descriptionLines.length > 1 && (
        <Button
          className="rounded-full w-max"
          onClick={() => setShowWholeDescription((prev) => !prev)}
        >
          {showWholeDescription ? "Show less" : "Show more"}
        </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-2 flex-col">
          <h2 className="font-bold">Tags:</h2>
          <p>{project.tags || "None"}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">License:</h2>
          <p>
            {(() => {
              switch (project.license) {
                case "youtube":
                  return "Standard YouTube License";
                case "creativeCommon":
                  return "Creative Commons - Attribution";
              }
            })()}
          </p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">Embeddable:</h2>
          <p>{project.embeddable ? "Yes" : "No"}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">Language:</h2>
          <p>{language?.snippet?.name}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">Stats:</h2>
          <p>{project.publicStatsViewable ? "Public" : "Private"}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">'Made for Kids':</h2>
          <p>{project.selfDeclaredMadeForKids ? "Yes" : "No"}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">Notify Subscribers:</h2>
          <p>{project.notifySubscribers ? "Yes" : "No"}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">Category</h2>
          <p>{category?.snippet?.title}</p>
        </div>
      </div>

      <div className="container flex justify-end gap-4">
        {project.status === "unlisted" ? (
          <>
            <Button
              variant="destructive"
              className="gap-2"
              disabled={isPending}
              onClick={() => {
                mutate("closed");
              }}
            >
              {isPending ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
          <GitPullRequestClosed className="size-4" />
              )}
          Close
        </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="gap-2" disabled>
          <Merge className="size-4" />
          Publish
        </Button>
                </TooltipTrigger>

                <TooltipContent>
                  We are currently unable to allow you to publish your project.
                  This feature is locked for unauthorized applications that use
                  YouTube API. We're currently in a process of passing a Google
                  audit. For now you can publish your project manually form
                  YouTube Studio.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <Button
            className="gap-2"
            disabled={isPending}
            onClick={() => {
              mutate("unlisted");
            }}
          >
            {isPending && <Loader2 className="animate-spin size-4" />}
            Reopen
          </Button>
        )}
      </div>
    </>
  );
}

interface ProjectViewProps {
  project: Project;
  channel: youtube_v3.Schema$Channel;
  languages: youtube_v3.Schema$I18nLanguage[];
  categories: youtube_v3.Schema$VideoCategory[];
}

export default function ProjectView({
  project,
  channel,
  languages,
  categories,
}: ProjectViewProps) {
  const [isEdititng, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!queryClient.getQueryData(["youtubeVideoCategories"])) {
      queryClient.setQueryData(["youtubeVideoCategories"], categories);
    }

    if (!queryClient.getQueryData(["youtubeLanguages"])) {
      queryClient.setQueryData(["youtubeLanguages"], languages);
    }
  }, []);

  const { mutate } = useMutation({});

  return (
    <div className="mx-auto flex w-full flex-col flex-1 pb-10 gap-4 max-w-[1260px]">
      <div className="container flex justify-between">
        <div className="flex items-center gap-2">
          <p>Status: </p>
          {(() => {
            switch (project!.status) {
              case "public":
                return <Badge variant="default">Public</Badge>;
              case "unlisted":
                return <Badge variant="secondary">Unlisted</Badge>;
              case "closed":
                return <Badge variant="destructive">Closed</Badge>;
            }
          })()}
        </div>

        {project?.status === "unlisted" && (
        <Button
          variant="outline"
          className="self-end"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEdititng ? "Stop Editing" : "Edit"}
        </Button>
        )}
      </div>

      <iframe
        src={`https://www.youtube.com/embed/${project!.videoId}`}
        className="border-none relative w-full aspect-video"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      <div className="self-start flex flex-col gap-2 container">
        {isEdititng ? (
          <ProjectForm
            mutate={mutate}
            isPending={isPending}
            defaultValues={project!}
          />
        ) : (
          <ProjectDisplay project={project!} channel={channel} />
        )}
      </div>
    </div>
  );
}
