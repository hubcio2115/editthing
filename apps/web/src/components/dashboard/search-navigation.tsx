"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import type { SupportedLanguages } from "~/i18n/settings";
import { useTranslation } from "~/i18n/client";

interface ProjectGridProps {
  orgName: string;
  lang: SupportedLanguages;
}

export default function SearchNavigation({ orgName, lang }: ProjectGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { t } = useTranslation(lang, "overview");

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("q", debouncedQuery);

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedQuery]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <div className="flex max-w-[700px] w-full">
      <div className="flex flex-1">
        <div className="rounded-lg rounded-r-none border border-r-0">
          <SearchIcon className="m-2 h-5 w-6" />
        </div>

        <Input
          onChange={onChange}
          className="mr-2 rounded-l-none border-l-0 focus:outline-none"
          placeholder={t("search_placeholder")}
        />
      </div>

      <Link href={`/dashboard/${orgName}/create-project`}>
        <Button variant="outline">{t("create_project_button")}</Button>
      </Link>
    </div>
  );
}
