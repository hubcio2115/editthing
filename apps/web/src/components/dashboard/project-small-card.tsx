import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Project } from "~/lib/validators/project";

interface VideoCardProps {
  project: Project;
}

export default function ProjectSmallCard({ project }: VideoCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:cursor-pointer hover:bg-slate-50 sm:flex-row 2xl:w-[1000px]">
      <div className="m-0 flex flex-col sm:flex-row">
        <CardHeader className="py-0 sm:py-5">
          <CardTitle className="text-base sm:text-2xl">
            {project.title}
          </CardTitle>

          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
}
