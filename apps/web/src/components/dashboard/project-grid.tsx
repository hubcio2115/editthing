"use client";

import Link from "next/link";
import ProjectCard from "./project-card";
import type { Organization } from "~/lib/validators/organization";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useProjectsPaginatedQuery } from "~/lib/queries/useProjectsQuery";
import ProjectsSkeleton from "./project-grid-skeleton";
import type { SupportedLanguages } from "~/i18n/settings";
import { useTranslation } from "~/i18n/client";
import { Trans } from "react-i18next";

function EmptyProjectsInfo({ lang }: { lang: SupportedLanguages }) {
  const { t } = useTranslation(lang, "overview", {
    keyPrefix: "empty_project_info",
  });

  return (
    <div className="my-auto text-center col-span-full row-span-full">
      <Image
        src="/img/suprised_pikachu.png"
        alt="suprised pikachu"
        width={300}
        height={200}
        className="mx-auto"
      />

      <h1 className="font-bold text-3xl">{t("title")}</h1>

      <p>
        <Trans t={t} i18nKey="empty_project_info">
          <Link href="create-project" className="text-fuchsia-900 font-bold" />
        </Trans>
      </p>
    </div>
  );
}

function NoProjectFound({ lang }: { lang: SupportedLanguages }) {
  const { t } = useTranslation(lang, "overview", {
    keyPrefix: "no_project_found",
  });

  return (
    <div className="my-auto text-center col-span-full row-span-full">
      <h1 className="font-bold text-3xl">{t("title")}</h1>

      <p>{t("description")}</p>
    </div>
  );
}

interface ProjectGridProps {
  organization: Organization;
  lang: SupportedLanguages;
}

export default function ProjectGrid({ organization, lang }: ProjectGridProps) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const query = searchParams.get("q") ?? "";

  const { data } = useProjectsPaginatedQuery(
    organization.name,
    page ? +page : 1,
    query ?? "",
  );

  if (!data?.projects) {
    return <ProjectsSkeleton />;
  }

  if (data.projects?.length === 0 && query.length > 0) {
    return <NoProjectFound lang={lang} />;
  }

  if (data.projects?.length === 0) {
    return <EmptyProjectsInfo lang={lang} />;
  }

  return data.projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));
}
