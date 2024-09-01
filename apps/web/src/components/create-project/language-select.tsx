"use client";

import { useState, type PropsWithChildren } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { env } from "~/env";
import type { youtube_v3 } from "@googleapis/youtube";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { ControllerRenderProps } from "react-hook-form";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "~/lib/utils";
import ky from "ky";

export default function LanguagesSelect({
  value,
  onChange,
  disabled,
}: PropsWithChildren<Omit<ControllerRenderProps, "ref">>) {
  const { data: languages } = useSuspenseQuery({
    queryKey: ["youtubeLanguages"],
    queryFn: async () =>
      ky
        .get<
          youtube_v3.Schema$I18nLanguage[]
        >(`${env.NEXT_PUBLIC_API_URL}/api/youtube/languages`)
        .json(),
  });

  const [open, setOpen] = useState(false);

  const displayedValue = languages.find((language) => language.id === value)
    ?.snippet?.name;

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (!disabled) setOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox categories"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {displayedValue ?? "Select a language..."}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search a category..." />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.id}
                  value={language.id!}
                  onSelect={(newValue) => {
                    onChange(newValue === value ? "" : newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === language.id ? "opacity-100" : "opacity-0",
                    )}
                  />

                  {language.snippet?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
