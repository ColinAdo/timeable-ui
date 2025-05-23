"use client";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { useEffect } from "react";
import { CardItem } from "@/components/dashboard/";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useGetTimetableNamesQuery } from "@/redux/features/timetableSlice";

export default function Page() {
    const { data: user } = useRetrieveUserQuery();
    const { lastJsonMessage } = useWebSocketContext();
    const { data: timetableNames, refetch } = useGetTimetableNamesQuery();

    useEffect(() => {
        refetch();
    }, [lastJsonMessage]);

    if (timetableNames?.length === 0) {
        return (
            <div className="py-16 mt-16">
                <h1 className="flex justify-center text-3xl font-bold text-pink-400">No Timetable Generated Yet</h1>
                <p className="text-gray-500 flex justify-center">
                    Generated timetables will appear here.
                </p>
            </div>
        )
    }

    return (
        <>
            <Card className="mt-12 bg-black/[0.96] bg-grid-white[0.02] border-purple-400">
                <CardHeader>
                    <CardTitle>Your Generated Timetables</CardTitle>
                </CardHeader>
                <CardContent>
                    {timetableNames?.map((d, i) => (
                        <CardItem
                            key={i}
                            id={d.batch_id}
                            username={user?.username[0] || "U"}
                            timetableName={d.name}
                        />
                    ))}
                </CardContent>
            </Card>
        </>
    )
}