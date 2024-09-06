"use client";

import { usePasswordResetConfirm } from "@/hooks";
import { Form } from "@/components/forms";

interface Props {
  uid: string;
  token: string;
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } =
    usePasswordResetConfirm(uid, token);
  const config = [
    {
      labelText: "New password",
      labelId: "new_password",
      type: "password",
      value: new_password,
      required: true,
    },
    {
      labelText: "New password confirm",
      labelId: "re_new_password",
      type: "password",
      value: re_new_password,
      required: true,
    },
  ];
  return (
    <Form
      config={config}
      btnText="Reset password"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
