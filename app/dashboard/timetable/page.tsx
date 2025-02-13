import { Metadata } from "next"
import { TimeTable } from "@/components/dashboard/timetable"

export const metadata: Metadata = {
    title: "Timeable | Table",
    description: "Generated timetable",
}

export default function Page() {
    return (
        <main className="container mx-auto py-10">
            <h1 className="text-3xl text-gray-300 font-bold mb-6">Timetable</h1>
            <TimeTable />
        </main>
    )
}

