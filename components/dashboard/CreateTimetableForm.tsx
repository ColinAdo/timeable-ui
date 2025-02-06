'use client';

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema } from "@/lib/schemas";
// import { useWebSocketContext } from "@/hooks/WebSocketContext";
// import { useGetAccountsQuery } from "@/redux/features/accountSlice";

import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormControl,
} from "@/components/ui/form";

export default function CreateTransactionForm() {
    //   const { data: accounts } = useGetAccountsQuery();
    //   const { sendJsonMessage } = useWebSocketContext();
    const router = useRouter();

    const form = useForm<z.infer<typeof createTransactionSchema>>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            accountName: "",
            transactionType: "",
            description: "",
            amount: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
        // sendJsonMessage({
        //   event: "create_transaction",
        //   data,
        // });
        // toast.success("transaction created successfully");
        // router.push("/dashboard");
        // console.log("Submitted data :", data)
    };

    //   if (!accounts) {
    //     return
    //   }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Wrap Start Time & End Time in a flex container */}
                    <div className="flex gap-x-4">
                        {/* Start Time Field */}
                        <FormField
                            control={form.control}
                            name="accountName"
                            render={({ field }) => (
                                <FormItem className="w-1/2"> {/* Each field takes half width */}
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Start time
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            {...field}
                                            className="dark:bg-zinc-950 text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* End Time Field */}
                        <FormField
                            control={form.control}
                            name="accountName"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        End time
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            {...field}
                                            className="dark:bg-zinc-950 text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* No classes shoul take place by */}
                    <div className="border p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
                        <span className="mt-2 block text-sm uppercase text-xs font-bold text-zinc-500 dark:text-white">
                            No class should be
                        </span>

                        {/* Flex container for Start and End Time */}
                        <div className="flex gap-x-4 mt-4">
                            {/* Start Time Field */}
                            <FormField
                                control={form.control}
                                name="accountName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                            From
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                className="dark:bg-zinc-950 text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* End Time Field */}
                            <FormField
                                control={form.control}
                                name="accountName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                            To
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                className="dark:bg-zinc-950 text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* duration field */}
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Class Durations
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter account amount"
                                        {...field}
                                        className="dark:bg-zinc-950  text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Additional constrain Field */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Add prompt
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="E.g Make ucc 101 be on mondays"
                                        {...field}
                                        className="dark:bg-zinc-950 text-black dark:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button className="w-full dark:text-black font-bold dark:bg-white">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );

}