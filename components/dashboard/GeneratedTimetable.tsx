"use client";

import Link from "next/link";
import { useState } from "react";
import { CardItem } from "@/components/dashboard/";
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
    const [year, setYear] = useState(new Date().getFullYear());

    const handleYearChange = (newYear: number) => {
        setYear(newYear);
    };

    return (
        <Card className="bg-black/[0.96] bg-grid-white[0.02] border-purple-400">
            <CardHeader>
                <CardTitle>Transaction Analytics</CardTitle>
                <CardDescription>
                    Line Chart showing analytics for your monthly transactions in {year}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {SalesData.map((d, i) => (
                    <CardItem
                        key={i}
                        accountName={d.name}
                        email={d.email}
                        amount={d.amount}
                        username="Colin"
                        description="Some description"
                    />
                ))}
                <Link className="flex justify-end text-blue-400" href="#">
                    See all
                </Link>
            </CardContent>
        </Card>
    );
}
