"use client";

import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import {
    Line,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

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
                <div>
                    <button
                        disabled={year <= 2024}
                        onClick={() => handleYearChange(year - 1)}
                        className={year <= 2024 ? "disable" : ""}
                    >
                        <ChevronsLeft
                            className={`h-4 w-4 ${year <= 2024 ? "text-gray-400" : "text-black dark:text-white"}`}
                        />
                    </button>

                    <span className="p-2 font-bold">{year}</span>
                    <button
                        disabled={year === 2025}
                        onClick={() => handleYearChange(year + 1)}
                        className={year === 2025 ? "disable" : ""}
                    >
                        <ChevronsRight
                            className={`h-4 w-4 ${year === 2025 ? "text-gray-400" : "text-black dark:text-white"}`}
                        />
                    </button>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
