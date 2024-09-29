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
import type { SupportedLanguages } from "~/i18n/settings";
import { useTranslation } from "~/i18n/client";

interface ProjectDisplayProps {
  project: Project;
  channel: youtube_v3.Schema$Channel;
  lang: SupportedLanguages;
}

function ProjectDisplay({ channel, project, lang }: ProjectDisplayProps) {
  const [showWholeDescription, setShowWholeDescription] = useState(false);
  const descriptionLines = project.description.split("\n");

  const { t } = useTranslation(lang, "project-page", {
    keyPrefix: "project_display",
  });

  const { data: languages } = useLanguagesQuery(lang);
  const language = languages?.find(
    (language) => language.id === project.defaultLanguage,
  );

  const { data: categories } = useCategoriesQuery(lang);
  const category = categories?.find(
    (category) => category.id === project.categoryId,
  );

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
          {t("subscribe")}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {showWholeDescription ? (
          descriptionLines.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{descriptionLines[0]}</p>
        )}

        <Button
          className="rounded-full w-max"
          onClick={() => setShowWholeDescription((prev) => !prev)}
        >
          {showWholeDescription ? t("show_less") : t("show_more")}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-2 flex-col">
          <h2 className="font-bold">{t("tags.label")}:</h2>
          <p>{project.tags || t("tags.empty")}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("license.label")}:</h2>
          <p>{t(`license.${project.license}`)}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("embeddable.label")}:</h2>
          <p>{project.embeddable ? t("yes") : t("no")}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("language.label")}:</h2>
          <p>{language?.snippet?.name}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("stats.label")}:</h2>
          <p>
            {project.publicStatsViewable
              ? t("stats.public")
              : t("stats.private")}
          </p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("made_for_kids.label")}:</h2>
          <p>{project.selfDeclaredMadeForKids ? t("yes") : t("no")}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("notify_subscribers.label")}:</h2>
          <p>{project.notifySubscribers ? t("yes") : t("no")}</p>
        </div>

        <div className="flex gap-2">
          <h2 className="font-bold">{t("category.label")}</h2>
          <p>{category?.snippet?.title}</p>
        </div>
      </div>

      <div className="container flex justify-end gap-4">
        <Button variant="destructive" className="gap-2">
          <GitPullRequestClosed className="size-4" />
          {t("close_button")}
        </Button>

        <Button className="gap-2">
          <Merge className="size-4" />
          {t("publish_button")}
        </Button>
      </div>
    </>
  );
}

interface ProjectViewProps {
  project: Project;
  channel: youtube_v3.Schema$Channel;
  languages: youtube_v3.Schema$I18nLanguage[];
  categories: youtube_v3.Schema$VideoCategory[];
  lang: SupportedLanguages;
}

export default function ProjectView({
  project,
  channel,
  languages,
  categories,
  lang,
}: ProjectViewProps) {
  const [isEdititng, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const { t } = useTranslation(lang, "project-page");

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
          <p>{t("status.label")}: </p>
          <Badge variant="secondary">{t("status.unlisted")}</Badge>
        </div>

        <Button
          variant="outline"
          className="self-end"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEdititng ? t("edit.stop_button") : t("edit.start_button")}
        </Button>
      </div>

      <iframe
        src={`https://www.youtube.com/embed/${project.videoId}`}
        className="border-none relative w-full aspect-video"
        title={t("video_player_title")}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      <div className="self-start flex flex-col gap-2 container">
        {isEdititng ? (
          <ProjectForm lang={lang} mutate={mutate} defaultValues={project} />
        ) : (
          <ProjectDisplay lang={lang} project={project} channel={channel} />
        )}
      </div>
    </div>
  );
}
