import { SearchIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import VideoCard from "~/components/videoCard";
import mockdata from "~/lib/mockdata";

export default function Overview() {
  return (
    <div className="mx-auto ">
      <div className="flex flex-row justify-center gap-4 ">
        <Button variant="outline" size="icon">
          <SearchIcon className="mx-2" />
        </Button>
        <div className="flex w-full">
          <Input className="ml-1 mr-5" />
          <Button variant="outline">Add video</Button>
        </div>
      </div>
      <div className=" mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {mockdata.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );
}
