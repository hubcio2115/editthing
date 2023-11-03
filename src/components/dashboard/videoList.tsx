"use client";

import { SearchIcon } from "lucide-react";
import { StretchHorizontal } from "lucide-react";
import { useState } from "react";

import VideoCard from "~/components/dashboard/videoCard";
import VideoSmallCard from "~/components/dashboard/videoSmallCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import mockdata from "~/lib/mockdata";

export default function VideoList() {
  const [search, setSearch] = useState(false);
  return (
    <div>
      <div className="flex flex-row justify-center gap-4 ">
        <div className="flex w-full">
          <div className="flex w-full ">
            <div className="rounded-lg rounded-r-none border border-r-0">
              <SearchIcon className="m-2 h-5 w-6" />
            </div>
            <Input className="mr-2 rounded-l-none border-l-0" />
          </div>
          <Toggle
            variant="outline"
            onClick={() => {
              setSearch(!search);
            }}
            className="mr-2"
          >
            <StretchHorizontal />
          </Toggle>
          <Button variant="outline">Add video</Button>
        </div>
      </div>
      {search && (
        <div className="my-5 flex flex-col justify-center gap-4">
          {mockdata.map((video, index) => (
            <VideoSmallCard key={index} video={video} />
          ))}
        </div>
      )}
      {!search && (
        <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {mockdata.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
