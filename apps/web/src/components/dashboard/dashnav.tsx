"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";

import { cn } from "~/lib/utils";

interface DashnavProps {
  orgName: string;
  lang: SupportedLanguages;
}

export default function Dashnav({ orgName, lang }: DashnavProps) {
  const pathname = usePathname();
  const { t } = useTranslation(lang, "translation", { keyPrefix: "dashnav" });

  const links = [
    {
      path: `/${lang}/dashboard/${orgName}/overview`,
      label: t("overview_button"),
    },
    {
      path: `/${lang}/dashboard/${orgName}/settings`,
      label: t("settings_button"),
    },
  ];

  return (
    <nav className="flex justify-center bg-slate-100">
      {links.map((link) => (
        <div
          key={link.path}
          className={cn(
            "border-transparent px-2 pb-2 capitalize border-b",
            pathname.startsWith(link.path)
              ? "border-b border-b-fuchsia-900 text-fuchsia-900"
              : "hover:border-slate-300 ",
          )}
        >
          <Link href={link.path}>{link.label}</Link>
        </div>
      ))}
    </nav>
  );
}
