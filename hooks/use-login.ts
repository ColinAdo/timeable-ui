import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setAuth } from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/authApiSlice";

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success("Login successfully");
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Wrong email or password!");
      });
  };

  return {
    isLoading,
    form,
    onSubmit,
  };
}