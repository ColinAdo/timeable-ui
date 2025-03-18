'use client';

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTimetableSchema } from "@/lib/schemas";
import { TimetableType } from "@/types/exports";
import { useGenerateTimetableMutation } from "@/redux/features/timetableSlice";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { useWebSocketContext } from "@/hooks/webSocketContext";


interface Props {
    data: TimetableType;
}

export default function CreateTransactionForm({ data }: Props) {
    const { sendJsonMessage } = useWebSocketContext();
    const router = useRouter();

    const form = useForm<z.infer<typeof EditTimetableSchema>>({
        resolver: zodResolver(EditTimetableSchema),
        defaultValues: {
            start_time: data.start_time,
            end_time: data.end_time,
            day: data.day,
            unit_name: data.unit_name,
            unit_code: data.unit_code,
        },
    });

    const onSubmit = async (editData: z.infer<typeof EditTimetableSchema>) => {
        const sendData = {
            rowId: data.id,
            dataSet: editData,

        }
        sendJsonMessage({
            event: "edit_row",
            sendData,
        });
        router.back();
        toast.success("Row updated successfully");
    };


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                            value={field.value}
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

                    {/* duration field */}
                    <FormField
                        control={form.control}
                        name="day"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Class Day
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="E.g., Monday"
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
                        name="unit_code"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Unit Code
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="E.g UCC 404"
                                        {...field}
                                        className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unit_name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Unit name
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="E.g Discrete Mathematics"
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
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );

}