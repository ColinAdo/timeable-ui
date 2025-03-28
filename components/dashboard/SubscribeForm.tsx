'use client';

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import { SubscribeSchema } from "@/lib/schemas";
import { useSubscribeMutation } from "@/redux/features/timetableSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Spinner } from "../common";


export default function SubscribeForm() {
    const { sendJsonMessage, lastJsonMessage } = useWebSocketContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isYearly = searchParams.get("yearly") === "true";
    const [subscribe, { isLoading }] = useSubscribeMutation();


    // const calculatedAmount = isYearly ? 140 * 12 : 150;
    const calculatedAmount = isYearly ? 140 * 12 : 1;

    useEffect(() => {
        if (lastJsonMessage?.event === "subscription_updated") {
            console.log("Subscription successful!", lastJsonMessage);
            toast.success("Subscription successful!");
            router.push("/dashboard");
        }
    }, [lastJsonMessage, router]);

    const form = useForm<z.infer<typeof SubscribeSchema>>({
        resolver: zodResolver(SubscribeSchema),
        defaultValues: {
            phone_number: "",
            amount: calculatedAmount.toString(),
        },
    });

    const onSubmit = async (editData: { phone_number: string; amount: string }) => {
        subscribe(editData)
            .unwrap()
            .then((data) => {
                toast.success("Please enter your Mpesa PIN on your phone");
                console.log(data);
            })
            .catch((error) => {
                toast.error("Something went wrong.");
                console.log("ERROR", error);
            });
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Phone Number
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="E.g., 0712345678"
                                        {...field}
                                        className="text-slate-100 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Amount
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="E.g., 1000"
                                        disabled
                                        {...field}
                                        className="text-slate-100 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button className="w-full bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        {isLoading ? <Spinner sm /> : "Pay Now"}
                    </Button>
                </form>
            </Form>
        </>
    );

}