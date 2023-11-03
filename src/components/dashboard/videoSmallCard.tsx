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
    <Card className="flex justify-between hover:cursor-pointer hover:bg-slate-50 2xl:w-[1000px]">
      <div className="m-0 flex">
        <CardContent>
          <div className="relative mt-5">
            <img
              src={video.thumbnail}
              alt="Video Thumbnail"
              className="h-18 w-32 object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-black  text-white ">
              {video.duration}
            </div>
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
          <CardDescription>{video.description}</CardDescription>
        </CardHeader>
      </div>
      <CardFooter className="mt-5 flex flex-col items-end justify-between">
        <Label>Editor: {video.editor}</Label>
        <Label>{video.uploaded}</Label>
      </CardFooter>
    </Card>
  );
}
