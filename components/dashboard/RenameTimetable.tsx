import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { renameSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
} from "@/components/ui/dialog";
import {
    FormItem,
    FormField,
    FormControl,
    FormMessage
} from "@/components/ui/form";

interface Props {
    id: string;
    open: boolean;
    name: string;
    setOpen: (open: boolean) => void;
}

export default function RenameTimetable({ id, open, name, setOpen }: Props) {
    const { sendJsonMessage } = useWebSocketContext();
    const router = useRouter();


    const form = useForm<z.infer<typeof renameSchema>>({
        resolver: zodResolver(renameSchema),
        defaultValues: {
            name: name,
        },
    });

    const onSubmit = async (data: z.infer<typeof renameSchema>) => {
        const sendData = {
            name: data.name,
            batch_id: id,
        }
        sendJsonMessage({
            event: "rename_timetable",
            sendData,
        });
        toast.success("Timetable renamed successfully");
        setOpen(false);

    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[460px] bg-black !rounded border-purple-400">
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
        </>
    )
}