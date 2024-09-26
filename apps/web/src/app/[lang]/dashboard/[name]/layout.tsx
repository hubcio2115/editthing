import { type PropsWithChildren } from "react";

import Dashnav from "~/components/dashboard/dashnav";
import Navbar from "~/components/navbar";
import type { SupportedLanguages } from "~/app/i18n/settings";

type DashboardLayoutProps = PropsWithChildren<{
  params: {
    name: string;
    lang: SupportedLanguages;
  };
}>;

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <div className="flex flex-col items-center justify-between border-b border-slate-200 bg-slate-100 p-2 pb-0">
        <Navbar lang={params.lang} />

        <Dashnav orgName={params.name} lang={params.lang} />
      </div>

      {children}
    </div>
  );
}
