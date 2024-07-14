"use client";

import Link from "next/link";
import ProjectSmallCard from "./project-small-card";
import ProjectCard from "./project-card";
import type { Organization } from "~/lib/validators/organization";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { projectSchema } from "~/lib/validators/project";
import { env } from "~/env";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function EmptyProjectsInfo() {
  return (
    <div className="my-auto text-center">
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
  const { data: projects } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/organizations/${organization.name}/projects`,
        {
          credentials: "include",
        },
      );

      if (res.ok) {
        const data = z.array(projectSchema).safeParse(await res.json());

        if (data.error) {
          throw data.error;
        }

        return data.data;
      }

      return [];
    },
  });

  const searchParams = useSearchParams();

  const listDisplayType = searchParams.get("listType");

  return projects.length === 0 ? (
    <EmptyProjectsInfo />
  ) : listDisplayType === null || searchParams.get("listType") === "list" ? (
    <div className="my-5 flex flex-col justify-center gap-4">
      {projects.map((project) => (
        <ProjectSmallCard key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:w-[1300px] 2xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
