import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

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
                    Dropdown here
                </span>
            </div>
        </div>
    );
}
