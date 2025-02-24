"use client";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useResetPasswordConfirm } from "@/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

interface Props {
  uid: string;
  token: string;
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
  const { form, isLoading, onSubmit } = useResetPasswordConfirm(uid, token);

  return (
    <Card className="bg-black w-[400px]">
      <CardHeader>
        <CardTitle>Request reset password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    New password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      className="bg-black/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="re_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Confirm new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter confirm new password"
                      {...field}
                      className="bg-black/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spinner sm /> : "Reset password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}