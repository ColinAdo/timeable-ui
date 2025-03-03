import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props {
    id: string;
    username: string;
    timetableName: string;
}

export default function CardItem(props: Props) {
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
                <span className="hidden sm:block text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-500">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded">
                                <MoreHorizontal className="h-4 w-4 text-purple-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded border-purple-500">
                            {/* <DropdownMenuItem onClick={}> */}
                            <DropdownMenuItem >
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>
            </div>
        </div>
    );
}
