import { Skeleton } from "../ui/skeleton";

export default function ProjectsSkeleton() {
  return (
    <>
      {(() => {
        const projects = [];
        for (let i = 0; i < 12; i++) {
          projects.push(
            <div
              key={i}
              className="flex items-center flex-col max-w-[350px] sm:max-w-96 mx-auto gap-2"
            >
              <Skeleton className="h-60 w-[320px] sm:w-96 rounded-lg" />

              <div className="w-full flex gap-2">
                <Skeleton className="min-w-10 w-10 h-10 rounded-full" />

                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-64 h-5" />
                  <Skeleton className="w-32 h-5" />
                </div>
              </div>
            </div>,
          );
        }

        return projects;
      })()}
    </>
  );
}
