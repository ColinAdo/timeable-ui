"use client";

import { CardItem } from "@/components/dashboard/";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useGetTimetableNamesQuery } from "@/redux/features/timetableSlice";
import Link from "next/link";

interface Props {
    name: string;
    email: string;
    amount: string;
}



export default function AnalyticCard() {
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
                        username="Colin"
                        create_at="12/Jan/2024"
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
