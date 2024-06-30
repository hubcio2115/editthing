import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Project } from "~/lib/validators/project";

interface ProjectCardProps {
  project: Project;
}

export default function VideoCard({ project }: ProjectCardProps) {
  return (
    <Card className="max-w-[460px] hover:cursor-pointer hover:bg-slate-50">
      <CardHeader>
        <CardTitle className="h-6 text-base sm:text-2xl">
          {project.title}
        </CardTitle>

        <CardDescription className="h-10 overflow-hidden">
          {project.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
