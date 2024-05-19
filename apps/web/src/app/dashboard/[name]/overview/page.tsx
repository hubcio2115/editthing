"use client";

import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { StretchHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import VideoCard from "~/components/dashboard/videoCard";
import VideoSmallCard from "~/components/dashboard/videoSmallCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import { useToast } from "~/components/ui/use-toast";
import projectMockData from "~/lib/mock/organizationOverview";
import { getOwnOrganizations } from "~/server/actions/organization";

type DashboardOverviewProps = {
  params: {
    name: string;
  };
};

export default function DashboardOverviewPage({
  params,
}: DashboardOverviewProps) {
  const { toast } = useToast();

  const { data: organizations, isLoading } = useQuery({
    queryKey: ["organizations", params.name],
    queryFn: async () => {
      const [organizations, err] = await getOwnOrganizations();


      if (err !== null) {
        toast({
          title: "Error",
          description: `Failed to fetch organizations: ${err.message}`,
        });
        router.push("/dashboard");
        return [];
      }

      return organizations;
    },
  });

  const router = useRouter();

  const [listDisplay, setListDisplay] = useState(false);
  const isCanBeRendered =
    !isLoading && !organizations?.map((org) => org.name).includes(params.name);

  useEffect(() => {
    console.log(organizations);
    if (isCanBeRendered) {
      router.push("/dashboard");
    }
  }, [organizations, router]);

  return (
    !isLoading &&
    organizations!.map((org) => org.name).includes(params.name) &&
    params.name && (
      <div className="mx-auto flex flex-col items-center md:px-2">
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
                setListDisplay(!listDisplay);
              }}
              className="mr-2"
            >
              <StretchHorizontal />
            </Toggle>

            <Link href={`/dashboard/${params.name}/create-project`}>
              <Button variant="outline">Add video</Button>
            </Link>
          </div>
        </div>

        {listDisplay ? (
          <div className="my-5 flex flex-col justify-center gap-4">
            {projectMockData?.map((video, index) => (
              <VideoSmallCard key={index} video={video} />
            ))}
          </div>
        ) : (
          <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:w-[1300px] 2xl:grid-cols-3">
            {projectMockData?.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
          </div>
        )}
      </div>
    )
  );
}
