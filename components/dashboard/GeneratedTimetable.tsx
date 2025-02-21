"use client";

import Link from "next/link";
import { useState } from "react";
import { CardItem } from "@/components/dashboard/";
import { useGetTimetableNamesQuery } from "@/redux/features/timetableSlice";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

interface Props {
    name: string;
    email: string;
    amount: string;
}

const SalesData: Props[] = [
    { name: "Timetable One", email: "annie@gmail.com", amount: "12/Jan/2024" },
    { name: "Timetable One", email: "maggie@gmail.com", amount: "12/Jan/2024" },
    { name: "Timetable Two", email: "george@gmail.com", amount: "12/Jan/2024" },
    { name: "Timetable Three", email: "coco@gmail.com", amount: "12/Jan/2024" },
    { name: "Timetable Four", email: "boo@gmail.com", amount: "12/Jan/2024" },
    { name: "Timetable Five", email: "sasha@gmail.com", amount: "12/Jan/2024" },
];

export default function AnalyticCard() {
    const { data: timetableNames } = useGetTimetableNamesQuery();
    const [year, setYear] = useState(new Date().getFullYear());

    const handleYearChange = (newYear: number) => {
        setYear(newYear);
    };

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
