import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

function Skeleton({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
