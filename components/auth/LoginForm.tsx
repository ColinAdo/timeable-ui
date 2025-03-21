"use client";

import Link from "next/link";
import { useLogin } from "@/hooks";
import SocialButtons from "./SocialButtons";
import { Spinner } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
    const { form, isLoading, onSubmit } = useLogin();

    return (
        <Card className="bg-black">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Sign in into your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Email"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center">
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                            Password
                                        </FormLabel>
                                        <Link
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                            href="/password-reset"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter Password"
                                            {...field}
                                            className="bg-black/10 dark:bg-zinc-950  text-blak dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                            {isLoading ? <Spinner sm /> : "Submit"}
                        </Button>
                    </form>
                    <div className="relative flex items-center my-3 font-bold">
                        <span className="flex-grow border-t border-white"></span>
                        <span className="mx-3">OR</span>
                        <span className="flex-grow border-t border-white"></span>
                    </div>
                    <SocialButtons />
                </Form>
            </CardContent>
        </Card>
    );
}