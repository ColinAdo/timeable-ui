"use client";

import { Frown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="flex h-full bg-black/[0.96] bg-grid-white/[0.02] flex-col py-52 items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold text-gray-200">404 Not Found</h2>
      <p className="text-gray-200">
        The page you are looking for does not exist. Please check the URL or go
        back.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-gradient-to-r p-2 from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        Go Back
      </button>
    </main>
  );
}