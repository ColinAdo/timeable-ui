"use client";

import {
  PageTitle,
  UploadFile,
  GeneratedTimetable,
} from "@/components/dashboard";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 w-full mt-12">
      <PageTitle title="Dashboard" />
      <UploadFile />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 transition-all">
        <GeneratedTimetable />
      </section>
    </div>
  );
}
