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
    <Card className="w-[460px] hover:cursor-pointer hover:bg-slate-50">
      <CardHeader>
        <CardTitle className="h-6 overflow-hidden">{video.title}</CardTitle>
        <CardDescription className="h-10 overflow-hidden">
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
