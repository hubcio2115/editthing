"use client";

import ProjectForm from "~/components/create-project/project-form";

export default async function CreateProjectPage() {
  function onSuccess() {}

  return (
    <div className="container flex max-w-[800px] flex-1 flex-col items-center pb-11">
      <ProjectForm onSuccess={onSuccess} />
    </div>
  );
}
