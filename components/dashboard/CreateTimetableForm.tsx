'use client';

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTimetableSchema } from "@/lib/schemas";
import { useGenerateTimetableMutation } from "@/redux/features/timetableSlice";
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
    const [generateTimetable, { isLoading }] = useGenerateTimetableMutation();

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
        const start = new Date(`1970-01-01T${data.start_time}`);
        const end = new Date(`1970-01-01T${data.end_time}`);

        const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        console.log("durationInHours:", durationInHours);
        const normalizedDuration = durationInHours < 0 ? durationInHours + 24 : durationInHours;

        if (data.start_time === data.end_time) {
            toast.error("Start time and end time must be different");
            return;
        }

        if (normalizedDuration > 12) {
            toast.error("Time range must not exceed 12 hours");
            return;
        }

        generateTimetable(data)
            .unwrap()
            .then(() => {
                toast.success("timetable created successfully");
                router.push(`/dashboard/timetable?batchId=${batchId}`);
            }).catch((err) => {
                if (err.status === 500) {
                    console.log("500 Error", err);
                    toast.error("Internal server error, contact admin");
                } else if (data["start_time"] === data["end_time"]) {
                    toast.error("Start time and end time must be different");
                } else {
                    toast.error("failed to create timetable");
                }
            });
    };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Spinner md />
                </div>
            ) : (
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
                                                className="bg-purple-300 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
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
                                                className="bg-purple-300 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* No classes shoul take place by */}
                        <div className="border border-purple-400 p-4 rounded bg-black/[0.96] dark:bg-zinc-800">
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
                                                    className="bg-purple-300 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
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
                                                    className="bg-purple-300 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
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
                                            placeholder="Enter class durations"
                                            {...field}
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button className="w-full bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            {isLoading ? <Spinner sm /> : "Submit"}
                        </Button>
                    </form>
                </Form>
            )}
        </>
    );

}