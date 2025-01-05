import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setAuth } from "@/redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function useSocialAuth(authenticate: any, provider: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const effectRan = useRef(false);

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code && !effectRan.current) {
      authenticate({ provider, state, code })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast.success("Login successful");
          router.push("/dashboard");
        })
        .catch(() => {
          toast.error("Login failed");
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, [authenticate, provider]);
}