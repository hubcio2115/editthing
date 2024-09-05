import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "~/server/db/schema";

export const insertProjectSchema = createInsertSchema(projects).extend({
  tags: z
    .string()
    .max(500)
    .regex(
      /^([a-zA-z]*)|([a-zA-Z]+[a-zA-Z,]*)$/,
      "Tags can consist only from latin letters.",
    )
    .nullable(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;

export const projectSchema = createSelectSchema(projects);

export type Project = z.infer<typeof projectSchema>;

export interface TProjectForm extends InsertProject {
  video: File;
  thumbnail: File;
}

export const ACCEPTED_THUMBNAIL_FORMATS = [
  ".jfif",
  ".pjpeg",
  ".jpeg",
  ".pjp",
  ".jpg",
  ".png",
];

/** 2MB */
export const MAX_THUMBNAIL_SIZE = 200_000;

export const ACCEPTED_VIDEO_FORMATS = [".mp4", ".mpeg", ".webm"];

export const FILE_INPUT_ACCEPTED_FORMATS = ACCEPTED_VIDEO_FORMATS.map(
  (format) => {
    return `video/${format.substring(1)}`;
  },
).join(", ");

export const projectFormSchema = insertProjectSchema
  .omit({
    id: true,
    organizationId: true,
    createdAt: true,
    publishAt: true,
    videoId: true,
    title: true,
  })
  .and(
    z.object({
      video: z
        .any()
        .refine(
          (file) => FILE_INPUT_ACCEPTED_FORMATS.includes(file?.type),
          `${ACCEPTED_VIDEO_FORMATS.join(", ")} files are accepted.`,
        ),
      title: z.string().min(3).max(100),
      // TODO: Add thumbnail support for this form
      //  thumbnail: z
      //   .any()
      //   .refine(
      //     (files) => files?.size <= MAX_THUMBNAIL_SIZE,
      //     "Max file size is 2MB.",
      //   )
      //   .refine((file) => {
      //     return (
      //       ACCEPTED_THUMBNAIL_FORMATS.includes(file?.type),
      //       `${ACCEPTED_THUMBNAIL_FORMATS.join(", ")} files are accepted.`
      //     );
      //   }),
    }),
  );
