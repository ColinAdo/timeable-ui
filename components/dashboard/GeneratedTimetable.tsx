"use client";

import Link from "next/link";
import { CardItem } from "@/components/dashboard/";
import { useGetTimetableNamesQuery } from "@/redux/features/timetableSlice";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

export default function GeneratedTimetable() {
    const { data: timetableNames } = useGetTimetableNamesQuery();

    if (!timetableNames) return null;

    return (
        <Card className="bg-black/[0.96] bg-grid-white[0.02] border-purple-400">
            <CardHeader>
                <CardTitle>Generated Timetables</CardTitle>
            </CardHeader>
            <CardContent>
                {timetableNames.slice(0, 6).map((d, i) => (
                    <CardItem
                        key={i}
                        id={d.batch_id}
                        username="Colin"
                        timetableName={d.batch_id}
                    />
                ))}
                {timetableNames.length > 5 && (
                    <Link className="flex justify-end text-blue-400" href="#">
                        See all
                    </Link>
                )}
            </CardContent>
        </Card>
    );
}
