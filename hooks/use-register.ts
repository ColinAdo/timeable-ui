import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/authApiSlice";

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    register(data)
      .unwrap()
      .then(() => {
        toast.success("Please check your email to activate your account");
        router.push("/auth/login");
      })
      .catch((err) => {
        if (err.status === 400) {
          const errorData = err.data;

          if (errorData?.email) {
            toast.error(errorData.email[0]); // e.g. "user with this email already exists."
          } else if (errorData?.password) {
            toast.error(errorData.password[0]); // e.g. "This password is too common."
          } else {
            toast.error("Invalid input. Please check the form.");
          }

          console.error("Registration failed!", err);
        } else if (err.status === 500) {
          toast.error("Server error, please try again later.");
        } else {
          toast.error("An unknown error occurred.");
          console.error("Registration failed!", err);
        }
      });
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}