'use client';

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTimetableSchema } from "@/lib/schemas";
import { useGenerateTimetableMutation } from "@/redux/features/timtableSlice";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormControl,
} from "@/components/ui/form";

interface Props {
    batchId: string;
}

export default function CreateTransactionForm({ batchId }: Props) {
    const router = useRouter();
    const [generateTimetable] = useGenerateTimetableMutation();

    const form = useForm<z.infer<typeof createTimetableSchema>>({
        resolver: zodResolver(createTimetableSchema),
        defaultValues: {
            batch_id: batchId,
            start_time: "",
            end_time: "",
            first_constrain: "",
            second_constrain: "",
            duration: "",
            prompt: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof createTimetableSchema>) => {
        generateTimetable(data)
            .unwrap()
            .then(() => {
                toast.success("timetable created successfully");
                // router.push("/dashboard");
            }).catch((err) => {
                toast.error("failed to create timetable");
                console.log("BatchId", batchId);
                console.log("Error", err);
            });
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <input type="hidden" name="batch_id" value={batchId} />

                    {/* Wrap Start Time & End Time in a flex container */}
                    <div className="flex gap-x-4">
                        {/* Start Time Field */}
                        <FormField
                            control={form.control}
                            name="start_time"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
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
                            name="end_time"
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
                                name="first_constrain"
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
                                name="second_constrain"
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
                        name="duration"
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
                        name="prompt"
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