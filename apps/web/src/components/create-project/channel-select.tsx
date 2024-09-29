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
import { useParams } from "next/navigation";
import Image from "next/image";
import ky from "ky";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";

interface ChannelSelectProps extends Omit<ControllerRenderProps, "ref"> {
  lang: SupportedLanguages;
}

export default function ChannelSelect({
  value,
  onChange,
  disabled,
  lang,
}: ChannelSelectProps) {
  const { name } = useParams();

  const { t } = useTranslation(lang, "project-form", {
    keyPrefix: "channel_select",
  });

  const [open, setOpen] = useState(false);

  const { data: channels } = useSuspenseQuery({
    queryKey: ["ownerChannels", name],
    queryFn: async () => {
      const data = await ky
        .get<
          youtube_v3.Schema$Channel[]
        >(`${env.NEXT_PUBLIC_API_URL}/api/organizations/${name}/owner-channels`)
        .json();

      return data.filter((category) => category.snippet);
    },
  });

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
          role="combobox channels"
          aria-expanded={open}
          className="w-full justify-between h-12"
        >
          {(() => {
            if (value) {
              const channel = channels.find(
                (channel) => channel.snippet?.title === value,
              );

              return (
                <div className="flex gap-2 items-center">
                  <Image
                    className="rounded-full size-8"
                    alt="channel profile picture"
                    src={channel?.snippet?.thumbnails?.default?.url ?? ""}
                    width={60}
                    height={60}
                  />

                  <p>{channel?.snippet?.title}</p>
                </div>
              );
            }

            return <p>{t("placeholder")}</p>;
          })()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start">
        <Command>
          <CommandInput placeholder={t("placeholder")} />

          <CommandList>
            <CommandEmpty>{t("not_found")}</CommandEmpty>

            <CommandGroup>
              {channels.map((channel) => (
                <CommandItem
                  key={channel.id}
                  value={channel.snippet?.title!}
                  onSelect={(newValue) => {
                    onChange(newValue === value ? "" : newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === channel.snippet?.title
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />

                  <div className="flex gap-2 items-center">
                    <Image
                      className="rounded-full size-8"
                      alt="channel profile picture"
                      src={channel.snippet?.thumbnails?.default?.url ?? ""}
                      width={60}
                      height={60}
                    />

                    <p>{channel.snippet?.title}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
