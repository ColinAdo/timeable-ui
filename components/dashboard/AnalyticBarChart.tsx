"use client";

import {
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Tooltip,
    XAxis,
    Legend,
    YAxis, Bar
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function Chart() {
    const [year, setYear] = useState(new Date().getFullYear());

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Analytics</CardTitle>
                    <CardDescription>
                        Bar Chart showing analytics for your monthly transactions in {year}
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="gray" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
