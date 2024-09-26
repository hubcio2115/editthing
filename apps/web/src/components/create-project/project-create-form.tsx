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
import CategoriesSelect from "./categories-select";
import InputSkeleton from "../ui/skeletons/input-skeleton";
import LanguagesSelect from "./language-select";
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

interface ProjectFormProps {
  defaultValues: InsertProject;
  mutate: UseCreateProjectMutationResult["mutate"];
  isPending?: UseCreateProjectMutationResult["isPending"];
}

export default function ProjectCreateForm({
  mutate,
  isPending = false,
  defaultValues,
}: ProjectFormProps) {
  const form = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

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
    const formData = new FormData();

    formData.append("license", data.license!);
    formData.append("title", data.title!);
    formData.append("description", data.description!);
    formData.append("categoryId", data.categoryId!);
    formData.append("defaultLanguage", data.defaultLanguage!);
    formData.append("tags", data.tags!);
    formData.append("embeddable", `${data.embeddable!}`);
    formData.append("privacyStatus", data.privacyStatus!);
    formData.append("publicStatsViewable", `${data.publicStatsViewable!}`);
    formData.append(
      "selfDeclaredMadeForKids",
      `${data.selfDeclaredMadeForKids!}`,
    );
    formData.append("notifySubscribers", `${data.notifySubscribers!}`);
    formData.append("channelId", data.channelId);
    formData.append("video", data.video);

    mutate(formData);
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
              <FormLabel className="font-bold text-lg">Channel:</FormLabel>

              <FormControl>
                <Suspense fallback={<InputSkeleton />}>
                  <ChannelsSelect {...field} />
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
              <FormLabel htmlFor="video">Video</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  id="video"
                  placeholder="Choose a file"
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
            <h1 className="text-2xl font-bold">Details</h1>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span>Title: (required)</span>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-4" />
                        </TooltipTrigger>

                        <TooltipContent className="max-w-96">
                          <p>
                            A catchy title can help you to hook viewers. When
                            you create video titles, it's a good idea to include
                            keywords that your audience is likely to use when
                            looking for videos like yours.
                          </p>

                          <br />

                          <a
                            href="https://youtu.be/9DEeMG_Gidw?si=-V-uE7fLaHdx9Laz"
                            target="_blank"
                            className="text-blue-800 underline"
                          >
                            Learn more
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
                      placeholder="Add a title that describes your video (type @ to mention a channel)"
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
                    <span>Description:</span>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-4" />
                        </TooltipTrigger>

                        <TooltipContent className="max-w-96">
                          <p>
                            Writing descriptions with keywords can help viewers
                            to find your videos more easily through search. You
                            can give an overview of your video and place
                            keywords at the beginning of the description.
                          </p>

                          <br />

                          <a
                            href="https://youtu.be/9DEeMG_Gidw?si=-V-uE7fLaHdx9Laz"
                            target="_blank"
                            className="text-blue-800 underline"
                          >
                            Learn more
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
                      placeholder="Tell viewers about your video (type @ to mention a channel)"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <h2 className="font-bold text-lg">Audience</h2>

            <FormField
              name="selfDeclaredMadeForKids"
              control={form.control}
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    Is this video 'Made for Kids'? (required)
                  </FormLabel>

                  <FormDescription>
                    Regardless of your location, you're legally required to
                    comply with the Children's Online Privacy Protection Act
                    (COPPA) and/or other laws. You're required to tell us
                    whether your videos are 'Made for Kids'.{" "}
                    <a
                      href="https://support.google.com/youtube/answer/9528076"
                      target="_blank"
                      className="text-blue-800 underline"
                    >
                      What is 'Made for Kids' content?
                    </a>
                  </FormDescription>

                  <Alert>
                    <Info className="size-4" />

                    <AlertDescription>
                      Features like personalised ads and notifications won't be
                      available on videos 'Made for Kids'. Videos that are set
                      as 'Made for Kids' by you are more likely to be
                      recommended alongside other children's videos.{" "}
                      <a
                        href="https://support.google.com/youtube/answer/9527654"
                        target="_blank"
                        className="text-blue-800 underline"
                      >
                        Learn More
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
                          Yes, it's 'Made for Kids'
                        </FormLabel>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="for-kids-no" />

                        <FormLabel htmlFor="for-kids-no">
                          No, it's not 'Made for Kids'
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
              {showMore ? "Show less" : "Show more"}
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
                            Tags
                          </FormLabel>

                          <FormDescription>
                            Tags can be useful if content in your video is
                            commonly misspelt. Otherwise, tags play a minimal
                            role in helping viewers to find your video.{" "}
                            <a
                              href=""
                              target="_blank"
                              className="text-blue-800 underline"
                            >
                              Learn more
                            </a>
                          </FormDescription>
                        </div>

                        <div>
                          <FormControl>
                            <Input {...field} value={value ?? ""} type="text" />
                          </FormControl>

                          <FormDescription>
                            Enter a comma after each tag {value?.length ?? 0}
                            /500
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
                            Language:
                          </FormLabel>

                          <FormDescription>
                            Select your video's language
                          </FormDescription>
                        </div>

                        <div className="mt-auto mb-0">
                          <FormControl className="mt-auto mb-0">
                            <Suspense fallback={<InputSkeleton />}>
                              <LanguagesSelect
                                {...field}
                                value={value ?? ""}
                                onChange={onChange}
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
                            License
                          </FormLabel>

                          <FormDescription>
                            Learn about{" "}
                            <a
                              href="https://support.google.com/youtube/answer/2797468"
                              className="text-blue-800 underline"
                            >
                              license types
                            </a>
                            .
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
                                  Standard YouTube License
                                </SelectItem>

                                <SelectItem value="creativeCommon">
                                  Creative Commons - Attribution
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
                            Category:
                          </FormLabel>

                          <FormDescription>
                            Add your video to a category so that viewers can
                            find it more easily
                          </FormDescription>
                        </div>

                        <div>
                          <FormControl>
                            <Suspense fallback={<InputSkeleton />}>
                              <CategoriesSelect {...field} />
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
                          Allow embedding
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="size-4" />
                              </TooltipTrigger>

                              <TooltipContent>
                                Allow others to embed your video in their sites.
                                <br />
                                This is required for us to be able to show this
                                video in a project view.
                                <br />
                                <a
                                  href=""
                                  target="_blank"
                                  className="text-blue-800"
                                >
                                  Learn more
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
                          Publish to subscriptions feed and notify subscribers
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <p>Paid promotion, tags and more</p>
            )}

            <Button
              className="max-w-max self-end"
              type="submit"
              disabled={isPending}
            >
              Create project
              {isPending ? (
                <Loader2 className="size-4 animate-spin ml-2" />
              ) : null}
            </Button>
          </>
        ) : null}
      </form>
    </Form>
  );
}
