"use client";

import { useSocialAuth } from "@/hooks";
import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "@/components/common";

export default function Page() {
  const [githubAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(githubAuthenticate, "github");

  return (
    <div className="flex justify-center items-center my-8">
      <Spinner lg />
    </div>
  );
}
