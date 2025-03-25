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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


export default function SubscribeForm() {
    const { sendJsonMessage } = useWebSocketContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isYearly = searchParams.get("yearly") === "true";
    const calculatedAmount = isYearly ? 140 * 12 : 150;


    const form = useForm<z.infer<typeof SubscribeSchema>>({
        resolver: zodResolver(SubscribeSchema),
        defaultValues: {
            phone_number: "",
            amount: calculatedAmount.toString(),
        },
    });

    const onSubmit = async (editData: z.infer<typeof SubscribeSchema>) => {
        const sendData = {
            dataSet: editData,

        }
        sendJsonMessage({
            event: "edit_row",
            sendData,
        });
        // router.back();
        toast.success("Please enter your Mpesa PIN on your phone");
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
                        Pay Now
                    </Button>
                </form>
            </Form>
        </>
    );

}