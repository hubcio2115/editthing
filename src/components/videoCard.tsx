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

export default function VideoCard({ video }: VideoCardProps) {
  return (
    // TODO - implement onclick to open video details
    <Card className="w-[420px] hover:cursor-pointer hover:bg-slate-50">
      <CardHeader>
        <CardTitle style={{ height: "1.5rem", overflow: "hidden" }}>
          {video.title}
        </CardTitle>
        <CardDescription style={{ height: "3rem", overflow: "hidden" }}>
          {video.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <img
            src={video.thumbnail}
            alt="Video Thumbnail"
            className="h-40 w-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-black p-2 text-white">
            {video.duration}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Label>Editor: {video.editor}</Label>
        <Label>{video.uploaded}</Label>
      </CardFooter>
    </Card>
  );
}
