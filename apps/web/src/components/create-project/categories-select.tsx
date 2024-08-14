"use client";

import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { env } from "~/env";
import type { youtube_v3 } from "@googleapis/youtube";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";
import { Button } from "../ui/button";

export default function CategoriesSelect({
  value,
  onChange,
  disabled,
}: Omit<ControllerRenderProps, "ref">) {
  const { data: categories } = useSuspenseQuery({
    queryKey: ["youtubeVideoCategories"],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/youtube/categories`,
      );

      if (res.ok) {
        const data = await res.json();

        return (data as youtube_v3.Schema$VideoCategory[]).filter(
          (category) => category.snippet?.assignable,
        );
      }

      const err = (await res.json()) as { message: string };
      throw new Error(err.message);
    },
  });

  const [open, setOpen] = useState(false);

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
          {value
            ? categories.find((category) => category.snippet?.title === value)
                ?.snippet?.title
            : "Select a category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search a category..." />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.snippet?.title!}
                  onSelect={(newValue) => {
                    onChange(newValue === value ? "" : newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === category.snippet?.title
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />

                  {category.snippet?.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
