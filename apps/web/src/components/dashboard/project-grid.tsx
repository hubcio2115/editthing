"use client";

import Link from "next/link";
import ProjectCard from "./project-card";
import type { Organization } from "~/lib/validators/organization";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useProjectsPaginatedQuery } from "~/lib/queries/useProjectsQuery";
import ProjectsSkeleton from "./project-grid-skeleton";

function EmptyProjectsInfo() {
  return (
    <div className="my-auto text-center col-span-full row-span-full">
      <Image
        src="/img/suprised_pikachu.png"
        alt="suprised pikachu"
        width={300}
        height={200}
        className="mx-auto"
      />

      <h1 className="font-bold text-3xl">You don't have any projects yet!</h1>

      <p>
        You can create your very first project by clicking{" "}
        <Link href="create-project" className="text-fuchsia-900 font-bold">
          here
        </Link>
        .
      </p>
    </div>
  );
}

interface ProjectGridProps {
  organization: Organization;
}

export default function ProjectGrid({ organization }: ProjectGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  if (page === null || isNaN(parseInt(page))) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    router.push(pathname + "?" + params.toString());
  }

  const query = searchParams.get("q");
  if (query === null) {
    const params = new URLSearchParams(searchParams);
    params.set("q", "");

    router.push(pathname + "?" + params.toString());
  }

  const { data } = useProjectsPaginatedQuery(
    organization.name,
    page ? +page : 0,
    query ?? "",
  );

  if (!data?.projects) {
    return <ProjectsSkeleton />;
  }

  if (data.projects?.length === 0) {
    return <EmptyProjectsInfo />;
  }

  return data.projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));
}
