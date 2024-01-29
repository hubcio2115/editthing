"use client";

import { SearchIcon } from "lucide-react";
import { StretchHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import VideoCard from "~/components/dashboard/videoCard";
import VideoSmallCard from "~/components/dashboard/videoSmallCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import mockdata from "~/lib/mock/organizationOverview";
import { api } from "~/trpc/react";

export default function Dashboard() {
  // todo: replace mocks with db queries
  // const { data: organizations } =
  //   api.organization.getOwnOrganizations.useQuery();

  const organizationFromPathname = usePathname().split("/").at(2);
  const mockData = mockdata.find((d) => d.orgId === organizationFromPathname);
  const projects = mockData?.projects;

  const [listDisplay, setListDisplay] = useState(false);

  return (
    organizationFromPathname && (
      <div className="mx-auto flex flex-col items-center md:px-2">
        <div className="flex w-full max-w-[920px] flex-col justify-center gap-4 ">
          <div className="flex">
            <div className="flex flex-1">
              <div className="rounded-lg  rounded-r-none border border-r-0">
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

            <Button variant="outline">Add video</Button>
          </div>
        </div>

        {listDisplay ? (
          <div className="my-5 flex flex-col justify-center gap-4">
            {projects?.map((video, index) => (
              <VideoSmallCard key={index} video={video} />
            ))}
          </div>
        ) : (
          <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:w-[1300px] 2xl:grid-cols-3">
            {projects?.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
          </div>
        )}
      </div>
    )
  );
}
