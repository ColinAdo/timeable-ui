import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Form, FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { renameSchema } from "@/lib/schemas";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    username: string;
    timetableName: string;
}

export default function CardItem(props: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { sendJsonMessage } = useWebSocketContext();


    const form = useForm<z.infer<typeof renameSchema>>({
        resolver: zodResolver(renameSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof renameSchema>) => {
        const sendData = {
            name: data.name,
            batch_id: props.id,
        }
        sendJsonMessage({
            event: "rename_timetable",
            sendData,
        });
        toast.success("Timetable renamed successfully");
        setOpen(false);

    };

    return (
        <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-3 p-2">
                <Avatar>
                    <AvatarFallback className="text-black bg-slate-300 font-bold">
                        {props.username[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="mt-3 text-sm">
                    <Link href={`/dashboard/timetable?batchId=${props.id}`}>
                        <p>{props.timetableName}</p>
                    </Link>
                </div>
            </section>
            <div className="mt-3 flex flex-col items-center">
                <span className="text-ellipsis overflow-hidden whitespace-nowrap w-auto text-gray-500">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded">
                                <MoreHorizontal className="h-4 w-4 text-purple-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded border-purple-500">
                            <DropdownMenuItem onClick={() => setOpen(true)}>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>

                {/* Dialog for renaming */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="w-[460px] bg-black !rounded">
                        <DialogHeader>
                            <DialogTitle className="text-white">Rename timetable</DialogTitle>
                        </DialogHeader>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter new name"
                                                    {...field}
                                                    className="rounded text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="w-full flex justify-between">
                                    <Button type="button" className="text-white rounded" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button
                                        className=" bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
