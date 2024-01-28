import { Monitor, Moon, Sun } from "lucide-react";

import { Toggle } from "./ui/toggle";

export default function Footer() {
  return (
    <nav className="flex items-center justify-between border-t border-slate-300 bg-slate-200 p-2">
      <h1 className="text-l font-bold text-gray-900">
        ©2023 <span className="text-fuchsia-900">Edit</span>
        thing
      </h1>
      <div className="mr-3 flex">
        <Toggle size="sm" className="mr-1">
          <Moon size={16} />
        </Toggle>
        <Toggle size="sm" className="mr-1">
          <Sun size={16} />
        </Toggle>
        <Toggle size="sm" className="mr-1">
          <Monitor size={16} />
        </Toggle>
      </div>
    </nav>
  );
}
