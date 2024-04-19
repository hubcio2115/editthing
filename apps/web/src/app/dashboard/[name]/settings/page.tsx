"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsView() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.push(`${pathname}/general`);
  });
  return <></>;
}
