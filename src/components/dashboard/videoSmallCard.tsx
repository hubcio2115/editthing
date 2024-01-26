import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

interface VideoCardProps {
  video: {
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    uploaded: string;
    editor: string;
  };
}

export default function VideoSmallCard({ video }: VideoCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:cursor-pointer hover:bg-slate-50 sm:flex-row 2xl:w-[1000px]">
      <div className="m-0 flex flex-col sm:flex-row">
        <CardContent>
          <div className="relative mt-5 hidden h-16 w-28 sm:flex">
            <Image
              src={video.thumbnail}
              alt="Video Thumbnail"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black text-white ">
              {video.duration}
            </div>
          </div>
        </CardContent>
        <CardHeader className="py-0 sm:py-5">
          <CardTitle className="text-base sm:text-2xl">{video.title}</CardTitle>
          <CardDescription>{video.description}</CardDescription>
        </CardHeader>
      </div>
      <CardFooter className="flex flex-col items-end justify-between sm:mt-5">
        <Label className="whitespace-nowrap">Editor: {video.editor}</Label>
        <Label>{video.uploaded}</Label>
      </CardFooter>
    </Card>
  );
}
