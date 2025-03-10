import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RenameTimetable } from "@/components/dashboard";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Props {
    id: string;
    username: string;
    timetableName: string;
}

export default function CardItem(props: Props) {
    const { sendJsonMessage } = useWebSocketContext();
    const [open, setOpen] = useState(false);

    const onDelete = () => {
        const sendData = {
            batch_id: props.id,
        }
        sendJsonMessage({
            event: "delete_timetable",
            sendData,
        });
        toast.success("Timetable deleted successfully");
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
                            <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>

                {/* Dialog for renaming */}
                <RenameTimetable id={props.id} name={props.timetableName} open={open} setOpen={setOpen} />

            </div>
        </div>
    );
}
