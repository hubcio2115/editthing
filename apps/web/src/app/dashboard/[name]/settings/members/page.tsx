"use client";

import { usePathname } from "next/navigation";
import React from "react";

function SettingsMembersView() {
  const pathname = usePathname();
  const organizationFromPathname = pathname.split("/").at(2);

  return (
    <div className="rounded-md border bg-gray-100 px-2">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="w-full text-left">
              Member
            </th>
            <th scope="col" className="whitespace-nowrap text-left">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SettingsMembersView;
