import { useState, ChangeEvent, FormEvent } from "react";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function usePasswordReset() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [email, setEmail] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPassword(email)
      .unwrap()
      .then(() => {
        toast.success("Please check your email to reset your password");
      })
      .catch(() => {
        toast.error("Failed send email");
      });
  };
  return {
    email,
    isLoading,
    onChange,
    onSubmit,
  };
}
