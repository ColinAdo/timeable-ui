"use client";

import {
  PageTitle,
  UploadFile,
  GeneratedTimetable,
} from "@/components/dashboard";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 py-10 w-full mt-12">
      <PageTitle title="Dashboard" />
      <UploadFile />
      <section >
        <GeneratedTimetable />
      </section>
    </div>
  );
}
