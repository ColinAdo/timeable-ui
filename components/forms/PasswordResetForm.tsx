"use client";

import { usePasswordReset } from "@/hooks";
import { Form } from "@/components/forms";

export default function PasswordResetForm() {
  const { email, isLoading, onChange, onSubmit } = usePasswordReset();
  const config = [
    {
      labelText: "Email Address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
  ];
  return (
    <Form
      config={config}
      btnText="Request reset password"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
