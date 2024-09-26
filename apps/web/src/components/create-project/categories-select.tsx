"use client";

import { useState } from "react";
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
import { useCategoriesSuspenseQuery } from "~/lib/queries/useCategoriesQuery";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";

interface CategorySelectProps extends Omit<ControllerRenderProps, "ref"> {
  lang: SupportedLanguages;
}

export default function CategorySelect({
  value,
  onChange,
  disabled,
  lang,
}: CategorySelectProps) {
  const { data: categories } = useCategoriesSuspenseQuery(lang);

  const [open, setOpen] = useState(false);

  const { t } = useTranslation(lang, "project-form", {
    keyPrefix: "category_select",
  });

  const displayedValue = categories.find((category) => category.id === value)
    ?.snippet?.title;

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
          {displayedValue ?? t("placeholder")}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command
          filter={(value, search) => {
            const category = categories.find(
              (category) => category.id === value,
            );

            return category?.snippet?.title
              ?.toLowerCase()
              .includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput placeholder={t("search_placeholder")} />

          <CommandList>
            <CommandEmpty>{t("not_found")}</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id!}
                  onSelect={(newValue) => {
                    onChange(newValue === value ? "" : newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === category.id ? "opacity-100" : "opacity-0",
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
