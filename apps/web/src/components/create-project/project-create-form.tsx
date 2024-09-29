"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import {
  FILE_INPUT_ACCEPTED_FORMATS,
  projectFormSchema,
  type InsertProject,
  type TProjectForm,
} from "~/lib/validators/project";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Suspense, useEffect, useState } from "react";
import CategorySelect from "./categories-select";
import InputSkeleton from "../ui/skeletons/input-skeleton";
import LanguageSelect from "./language-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { cn } from "~/lib/utils";
import ChannelsSelect from "./channel-select";
import type { UseCreateProjectMutationResult } from "~/lib/mutations/useCreateProjectMutation";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";
import { Trans } from "react-i18next";

interface ProjectFormProps {
  defaultValues: InsertProject;
  mutate: UseCreateProjectMutationResult["mutate"];
  isPending?: UseCreateProjectMutationResult["isPending"];
  lang: SupportedLanguages;
}

export default function ProjectCreateForm({
  mutate,
  isPending = false,
  defaultValues,
  lang,
}: ProjectFormProps) {
  const form = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  const { t } = useTranslation(lang, "project-form");

  const [showMore, setShowMore] = useState(false);

  const video = form.watch("video");
  const channel = form.watch("channelId");

  const [showWholeForm, setShowWholeForm] = useState(false);

  useEffect(() => {
    if (video && channel) {
      setShowWholeForm(true);
    }
  }, [video, channel]);

  function onSuccess(data: TProjectForm) {
    mutate(data);
  }

  function onError(errors: FieldErrors<TProjectForm>) {
    console.error(errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSuccess, onError)}
        className={cn("flex flex-col gap-8 w-full", {
          "justify-center items-center flex-1": !showWholeForm,
        })}
      >
        <FormField
          control={form.control}
          name="channelId"
          render={({ field: { ref: _ref, ...field } }) => (
            <FormItem className="w-full">
              <FormLabel>{t("channel_select.label")}:</FormLabel>

              <FormControl>
                <Suspense fallback={<InputSkeleton />}>
                  <ChannelsSelect lang={lang} {...field} />
                </Suspense>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="video"
          render={({ field: { value, ...field } }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="video">{t("video_picker.label")}:</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  id="video"
                  placeholder={t("video_picker.placeholder")}
                  type="file"
                  accept={FILE_INPUT_ACCEPTED_FORMATS}
                  onChange={(e) => {
                    e.target.files &&
                      form.setValue("video", e.target.files[0]!);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {showWholeForm ? (
          <>
            <h1 className="text-2xl font-bold">{t("details")}</h1>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span>{t("title.label")}:</span>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-4" />
                        </TooltipTrigger>

                        <TooltipContent className="max-w-96">
                          <p>{t("title.tooltip")}</p>

                          <br />

                          <a
                            href="https://youtu.be/9DEeMG_Gidw?si=-V-uE7fLaHdx9Laz"
                            target="_blank"
                            className="text-blue-800 underline"
                          >
                            {t("learn_more")}
                          </a>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      value={field.value ?? ""}
                      placeholder={t("title.placeholder")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span>{t("description.label")}:</span>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-4" />
                        </TooltipTrigger>

                        <TooltipContent className="max-w-96">
                          <p>{t("description.tooltip")}</p>

                          <br />

                          <a
                            href="https://youtu.be/9DEeMG_Gidw?si=-V-uE7fLaHdx9Laz"
                            target="_blank"
                            className="text-blue-800 underline"
                          >
                            {t("learn_more")}
                          </a>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none h-64"
                      value={field.value ?? ""}
                      placeholder={t("description.placeholder")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <h2 className="font-bold text-lg">{t("audience")}</h2>

            <FormField
              name="selfDeclaredMadeForKids"
              control={form.control}
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>{t("made_for_kids.label")}</FormLabel>

                  <FormDescription>
                    <Trans t={t} i18nKey="made_for_kids.description">
                      <a
                        href="https://support.google.com/youtube/answer/9528076"
                        target="_blank"
                        className="text-blue-800 underline"
                      />
                    </Trans>
                  </FormDescription>

                  <Alert>
                    <Info className="size-4" />

                    <AlertDescription>
                      {t("made_for_kids.alert_description")}{" "}
                      <a
                        href="https://support.google.com/youtube/answer/9527654"
                        target="_blank"
                        className="text-blue-800 underline"
                      >
                        {t("learn_more")}
                      </a>
                    </AlertDescription>
                  </Alert>

                  <FormControl>
                    <RadioGroup
                      {...field}
                      onValueChange={(newValue) => {
                        switch (newValue) {
                          case "yes":
                            onChange(true);
                            break;
                          case "no":
                            onChange(false);
                            break;
                        }
                      }}
                      defaultValue=""
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="for-kids-yes" />

                        <FormLabel htmlFor="for-kids-yes">
                          {t("made_for_kids.yes_label")}
                        </FormLabel>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="for-kids-no" />

                        <FormLabel htmlFor="for-kids-no">
                          {t("made_for_kids.no_label")}
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => {
                setShowMore((prev) => !prev);
              }}
              className="rounded-full max-w-max"
            >
              {showMore ? t("show_less") : t("show_more")}
            </Button>

            {showMore ? (
              <>
                <div className="grid lg:grid-cols-2 gap-4 gap-y-8">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field: { value, ...field } }) => (
                      <FormItem className="flex flex-col justify-between">
                        <div>
                          <FormLabel className="font-bold text-lg">
                            {t("tags.label")}
                          </FormLabel>

                          <FormDescription>
                            {t("tags.description")}{" "}
                            <a
                              href=""
                              target="_blank"
                              className="text-blue-800 underline"
                            >
                              {t("learn_more")}
                            </a>
                          </FormDescription>
                        </div>

                        <div>
                          <FormControl>
                            <Input {...field} value={value ?? ""} type="text" />
                          </FormControl>

                          <FormDescription>
                            {t("tags.counter", { counter: value?.length ?? 0 })}
                          </FormDescription>

                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="defaultLanguage"
                    control={form.control}
                    render={({
                      field: { value, onChange, ref: _ref, ...field },
                    }) => (
                      <FormItem className="flex flex-col justify-between">
                        <div>
                          <FormLabel className="font-bold text-lg">
                            {t("language_select.label")}
                          </FormLabel>

                          <FormDescription>
                            {t("language_select.description")}
                          </FormDescription>
                        </div>

                        <div className="mt-auto mb-0">
                          <FormControl className="mt-auto mb-0">
                            <Suspense fallback={<InputSkeleton />}>
                              <LanguageSelect
                                {...field}
                                value={value ?? ""}
                                onChange={onChange}
                                lang={lang}
                              />
                            </Suspense>
                          </FormControl>

                          <FormDescription>&nbsp;</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="license"
                    render={({
                      field: { value, ref: _ref, onChange, ...field },
                    }) => (
                      <FormItem className="flex flex-col justify-between">
                        <div>
                          <FormLabel className="font-bold text-lg">
                            {t("license_select.label")}
                          </FormLabel>

                          <FormDescription>
                            <Trans t={t} i18nKey="license_select.description">
                              <a
                                href="https://support.google.com/youtube/answer/2797468"
                                className="text-blue-800 underline"
                              />
                            </Trans>
                          </FormDescription>
                        </div>

                        <div>
                          <FormControl>
                            <Select
                              value={value ?? ""}
                              onValueChange={(newValue) => {
                                onChange(newValue);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="youtube">
                                  {t("license_select.youtube")}
                                </SelectItem>

                                <SelectItem value="creativeCommon">
                                  {t("license_select.creative_commons")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field: { ref: _ref, ...field } }) => (
                      <FormItem className="flex flex-col justify-between">
                        <div>
                          <FormLabel className="font-bold text-lg">
                            {t("category_select.label")}:
                          </FormLabel>

                          <FormDescription>
                            {t("category_select.description")}
                          </FormDescription>
                        </div>

                        <div>
                          <FormControl>
                            <Suspense fallback={<InputSkeleton />}>
                              <CategorySelect lang={lang} {...field} />
                            </Suspense>
                          </FormControl>

                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="embeddable"
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="h-4">
                        <FormLabel className="inline-flex items-center gap-1 justify-center">
                          <FormControl>
                            <Checkbox
                              disabled
                              checked={value ?? false}
                              onCheckedChange={onChange}
                            />
                          </FormControl>

                          {t("embedding.label")}

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="size-4" />
                              </TooltipTrigger>

                              <TooltipContent>
                                {t("embedding.tooltip")}{" "}
                                <a
                                  href=""
                                  target="_blank"
                                  className="text-blue-800"
                                >
                                  {t("learn_more")}
                                </a>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifySubscribers"
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="h-4">
                        <FormLabel className="inline-flex items-center gap-1 justify-center">
                          <FormControl>
                            <Checkbox
                              checked={value ?? false}
                              onCheckedChange={onChange}
                            />
                          </FormControl>

                          {t("notify_subscribers.label")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <p>{t("paid_promotion_and_more")}</p>
            )}

            <Button
              className="max-w-max self-end"
              type="submit"
              disabled={isPending}
            >
              {t("create_project_button")}
              {isPending && <Loader2 className="size-4 animate-spin ml-2" />}
            </Button>
          </>
        ) : null}
      </form>
    </Form>
  );
}
