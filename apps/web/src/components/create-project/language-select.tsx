"use client";

import { useState, type PropsWithChildren } from "react";
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
import { useLanguagesSuspenseQuery } from "~/lib/queries/useLanguagesQuery";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";

interface LanguageSelectProps
  extends PropsWithChildren<Omit<ControllerRenderProps, "ref">> {
  lang: SupportedLanguages;
}

export default function LanguageSelect({
  value,
  onChange,
  disabled,
  lang,
}: LanguageSelectProps) {
  const { data: languages } = useLanguagesSuspenseQuery(lang);

  const [open, setOpen] = useState(false);

  const { t } = useTranslation(lang, "project-form", {
    keyPrefix: "language_select",
  });

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
          {displayedValue ?? t("placeholder")}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <CommandInput placeholder={t("search_placeholder")} />

          <CommandList>
            <CommandEmpty>{t("not_found")}</CommandEmpty>

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
