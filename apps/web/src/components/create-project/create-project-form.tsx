"use client";

import type { Upload } from "@mux/mux-node/resources/video/uploads.mjs";
import MuxUploader from "@mux/mux-uploader-react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { Organization } from "~/lib/validators/organization";
import type { InsertProject, Project } from "~/lib/validators/project";
import { createProject, deleteProjectById } from "~/server/actions/project";
import { createVideoEntry } from "~/server/actions/videoEntry";
import type { InsertVideoEntry, VideoEntry } from "~/lib/validators/videoEntry";

type VideUploadFormProps = {
  upload: Upload;
  org: Organization;
};

export default function VideUploadForm({ upload, org }: VideUploadFormProps) {
  const session = useSession();
  const router = useRouter();

  const { data: newProject, mutate: createProjectMutation } = useMutation<
    Project | null,
    Error,
    InsertProject
  >({
    mutationKey: ["create-project"],
    mutationFn: async (data) => {
      const [newProject, err] = await createProject(data);

      if (err !== null) {
        console.error(err);
      }

      return newProject;
    },
  });
  
  console.log(newProject);

  const { mutate: createVideoEntryMutation } = useMutation<
    VideoEntry | null,
    Error,
    InsertVideoEntry
  >({
    mutationKey: ["create-video-entry"],
    mutationFn: async (data) => {
      const [newEntry, err] = await createVideoEntry(data);

      if (err !== null) {
        console.error(err);
      } else {
        createProjectMutation({
          organizationId: org.id,
          videoEntryId: newEntry.id,
        });
      }

      return newEntry;
    },
  });

  const { mutate: deleteProjectMutation } = useMutation<
    Project | null,
    Error,
    Project["id"]
  >({
    mutationKey: ["delete-project"],
    mutationFn: async (id) => {
      const [deletedProject, err] = await deleteProjectById(id);

      if (err !== null) {
        console.error(err);
      }

      return deletedProject;
    },
  });

  function onUploadStart(_: CustomEvent<{ file: File; chunkSize: number }>) {
    createVideoEntryMutation({
      userId: session.data?.user.id,
      uploadId: upload.id,
      assetId: upload.asset_id,
    });
  }

  function onUploadError(
    err: CustomEvent<{
      message: string;
      chunkNumber?: number | undefined;
      attempts?: number | undefined;
    }>,
  ) {
    deleteProjectMutation(newProject!.id);
    console.error(err.detail.message);
  }

  function onSuccess(_: CustomEvent<null | undefined>) {
    router.push(`/dashboard/${org.name}/project/${newProject?.id}`);
  }

  return (
    <div className="container flex max-w-[800px] flex-1 flex-col items-center justify-center">
      <MuxUploader
        id="uploader"
        className="w-full"
        endpoint={upload.url}
        onUploadStart={onUploadStart}
        onUploadError={onUploadError}
        onSuccess={onSuccess}
      />
    </div>
  );
}
