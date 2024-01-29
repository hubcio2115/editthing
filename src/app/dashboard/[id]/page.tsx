"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrganizationView() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => router.push(`${pathname}/overview`));
  return <div></div>;
}
