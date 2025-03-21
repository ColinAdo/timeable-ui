'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditTimetableSchema } from "@/lib/schemas";
import { TimetableType } from "@/types/exports";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


interface Props {
    data: TimetableType;
}

export default function CreateTransactionForm({ data }: Props) {
    const { sendJsonMessage } = useWebSocketContext();
    const router = useRouter();

    const form = useForm<z.infer<typeof EditTimetableSchema>>({
        resolver: zodResolver(EditTimetableSchema),
        defaultValues: {
            start_time: data.start_time || "",
            end_time: data.end_time || "",
            day: data.day || "",
            unit_name: data.unit_name || "",
            unit_code: data.unit_code || "",
            lecturer: data.lecturer || "",
            campus: data.campus || "",
            mode: data.mode_of_study || "",
            room: data.lecture_room || "",
            group: data.group || "",
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

                    <div className="flex gap-x-4">
                        {/* day Field */}
                        <FormField
                            control={form.control}
                            name="day"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Class Day
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* unit code Field */}
                        <FormField
                            control={form.control}
                            name="unit_code"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Unit code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-x-4">
                        {/* Room Field */}
                        <FormField
                            control={form.control}
                            name="room"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Room
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="E.g BR 101"

                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Mode Field */}
                        <FormField
                            control={form.control}
                            name="mode"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Mode
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="E.g Online"

                                            {...field}
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-x-4">
                        {/* Campus Field */}
                        <FormField
                            control={form.control}
                            name="campus"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Campus
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="E.g BR 101"

                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Group Field */}
                        <FormField
                            control={form.control}
                            name="group"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Group
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="E.g 1"

                                            {...field}
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-x-4">
                        {/* Unit name Field */}
                        <FormField
                            control={form.control}
                            name="unit_name"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Unit name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="E.g Software Enginerring"

                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Lecturer Field */}
                        <FormField
                            control={form.control}
                            name="lecturer"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                        Lecturer
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="E.g Prof. Colin Ado"

                                            {...field}
                                            className="text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );

}