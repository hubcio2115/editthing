"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { videoSchema, type Video } from "~/lib/validators/youtubeVideo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectItem } from "../ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { projectSchema } from "~/lib/validators/project";

export default function ProjectForm() {
  const form = useForm<Video>({
    resolver: zodResolver(videoSchema),
  });

  function onSuccess(data: Video) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSuccess)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>

              <FormControl>
                <Input type="text" value={value ?? ""} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  value={value ?? ""}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Category Id:</FormLabel>

              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="defaultLanguage"
          control={form.control}
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Default language:</FormLabel>

              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="embeddable"
          control={form.control}
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <Checkbox checked={value ?? false} {...field} />

              <FormLabel>Embeddable</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          name="license"
          control={form.control}
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>License</FormLabel>

              <FormControl>
                <Select value={value ?? ""} {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a license" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.values(
                      projectSchema.shape.license.unwrap().Values,
                    ).map((license) => (
                      <SelectItem value={license}>
                        {license === "youtube" ? "YouTube" : "Creative Common"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacyStatus"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Privacy Status:</FormLabel>

              <FormControl>
                <Select value={value ?? ""} {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a privacy status" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.values(videoSchema.shape.privacyStatus.unwrap().Values).map(
                      (status) => (
                        <SelectItem value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicStatsViewable"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <Checkbox checked={value ?? false} {...field} />

              <FormLabel>Public Stats Viewable</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish date:</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selfDeclaredMadeForKids"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <Checkbox checked={value ?? false} {...field} />

              <FormLabel>Is this made for kids?</FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
