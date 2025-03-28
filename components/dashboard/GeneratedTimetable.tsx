"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CardItem } from "@/components/dashboard/";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import { useGetTimetableNamesQuery } from "@/redux/features/timetableSlice";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

export default function GeneratedTimetable() {
    const { data: user } = useRetrieveUserQuery();
    const { lastJsonMessage } = useWebSocketContext();
    const { data: timetableNames, refetch } = useGetTimetableNamesQuery();


    useEffect(() => {
        refetch();
    }, [lastJsonMessage]);

    if (!timetableNames) return null;
    return (
        <>
            {timetableNames.length > 0 && (
                <Card className="bg-black/[0.96] bg-grid-white[0.02] border-purple-400">
                    <CardHeader>
                        <CardTitle>Your Generated Timetables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {timetableNames.slice(0, 6).map((d, i) => (
                            <CardItem
                                key={i}
                                id={d.batch_id}
                                username={user?.username[0] || "U"}
                                timetableName={d.name}
                            />
                        ))}
                        {timetableNames.length > 5 && (
                            <Link className="flex justify-end text-blue-400" href="#">
                                See all
                            </Link>
                        )}
                    </CardContent>
                </Card>
            )}
        </>

    );
}
