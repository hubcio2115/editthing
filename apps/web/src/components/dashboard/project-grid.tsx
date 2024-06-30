"use client";

import { SearchIcon, StretchHorizontal } from "lucide-react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import { Button } from "~/components/ui/button";
import ProjectSmallCard from "./project-small-card";
import ProjectCard from "./project-card";
import type { Organization } from "~/lib/validators/organization";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { projectSchema } from "~/lib/validators/project";
import { cn } from "~/lib/utils";
import { env } from "~/env.mjs";
import Image from "next/image";

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

  const [listDisplayType, setListDisplayType] = useState<"grid" | "list">(
    "grid",
  );

  return (
    <div className="mx-auto flex flex-col flex-1 items-center md:px-2">
      <div className="flex w-full max-w-[920px] flex-col justify-center gap-4">
        <div className="flex">
          <div className="flex flex-1">
            <div className="rounded-lg rounded-r-none border border-r-0">
              <SearchIcon className="m-2 h-5 w-6" />
            </div>
            <Input className="mr-2 rounded-l-none border-l-0 focus:outline-none" />
          </div>

          <Toggle
            variant="outline"
            onClick={() => {
              setListDisplayType((prev) => {
                switch (prev) {
                  case "grid":
                    return "list";
                  case "list":
                    return "grid";
                }
              });
            }}
            className="mr-2"
          >
            <StretchHorizontal />
          </Toggle>

          <Link href={`/dashboard/${organization.name}/create-project`}>
            <Button variant="outline">Add video</Button>
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <EmptyProjectsInfo />
      ) : (
        <div
          className={cn(
            "my-5",
            listDisplayType === "list"
              ? "flex flex-col justify-center gap-4"
              : "grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:w-[1300px] 2xl:grid-cols-3",
          )}
        >
          {projects.map((project) =>
            listDisplayType === "list" ? (
              <ProjectSmallCard key={project.id} project={project} />
            ) : (
              <ProjectCard key={project.id} project={project} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
