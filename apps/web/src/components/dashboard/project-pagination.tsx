"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import type { Organization } from "~/lib/validators/organization";
import { useProjectsPaginatedQuery } from "~/lib/queries/useProjectsQuery";
import type { SupportedLanguages } from "~/i18n/settings";
import { useTranslation } from "~/i18n/client";

interface ProjectPaginationProps {
  organizationName: Organization["name"];
  lang: SupportedLanguages;
}

export default function ProjectPagination({
  organizationName,
  lang,
}: ProjectPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation(lang, "overview", { keyPrefix: "" });

  const page = searchParams.get("page") ?? "1";
  const query = searchParams.get("q") ?? "";

  const { data } = useProjectsPaginatedQuery(organizationName, +page!, query!);

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    router.push(pathname + "?" + params.toString());
  }

  return (
    data &&
    data.projects.length !== 0 &&
    data.total > 12 && (
      <Pagination className="mx-auto max-w-[700px]">
        <PaginationContent className="grid grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-6 @container w-full">
          <PaginationItem className="order-1 md:order-none">
            <PaginationPrevious
              onClick={() => {
                if (+page! > 1) changePage(+page! - 1);
              }}
            >
              {t("next_page_button")}
            </PaginationPrevious>
          </PaginationItem>

          <div className="flex order-0 col-span-2 md:col-span-4 mx-auto relative -left-5 @[20.5rem]:static">
            <PaginationItem>
              <PaginationLink
                isActive={page === "1"}
                onClick={() => {
                  changePage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {+page! > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {(() => {
              const pages = [];
              let leftBoundry = +page! - 2 > 1 ? +page! - 2 : 2;
              let rightBoundry =
                +page! + 2 < Math.ceil(data.total / 12)
                  ? +page! + 2
                  : Math.ceil(data.total / 12);

              if (rightBoundry - leftBoundry < 4) {
                if (leftBoundry === 2) {
                  rightBoundry = Math.min(7, Math.ceil(data.total / 12));
                } else {
                  leftBoundry = Math.max(2, Math.ceil(data.total / 12) - 6);
                }
              }

              for (let i = leftBoundry; i <= rightBoundry; i++) {
                if (i > 1 && i < Math.ceil(data.total / 12)) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={i === +page! + 1}
                        onClick={() => {
                          changePage(i);
                        }}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>,
                  );
                }
              }
              return pages;
            })()}

            {+page! < Math.floor(data.total / 12) - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  changePage(Math.ceil(data.total / 12));
                }}
              >
                {Math.ceil(data.total / 12)}
              </PaginationLink>
            </PaginationItem>
          </div>

          <PaginationItem className="order-1 flex justify-end md:order-none">
            <PaginationNext
              onClick={() => {
                if (data.hasNextPage) changePage(+page! + 1);
              }}
            >
              {t("previous_page_button")}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}
