"use client";

import { SearchIcon, StretchHorizontal } from "lucide-react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import { Button } from "~/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProjectGridProps {
  orgName: string;
}

export default function SearchNavigation({ orgName }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const listDisplayType = searchParams.get("listType");

  return (
    <div className="flex">
      <div className="flex flex-1">
        <div className="rounded-lg rounded-r-none border border-r-0">
          <SearchIcon className="m-2 h-5 w-6" />
        </div>
        <Input className="mr-2 rounded-l-none border-l-0 focus:outline-none" />
      </div>

      <Toggle
        variant="outline"
        onClick={() => {
          const params = new URLSearchParams(searchParams);

          switch (listDisplayType) {
            case "list":
              params.set("listType", "grid");
              break;
            case "grid":
            default:
              params.set("listType", "list");
              break;
          }

          router.replace(`${pathname}?${params.toString()}`);
        }}
        className="mr-2"
      >
        <StretchHorizontal />
      </Toggle>

      <Link href={`/dashboard/${orgName}/create-project`}>
        <Button variant="outline">Add video</Button>
      </Link>
    </div>
  );
}
