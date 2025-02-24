import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Unit {
    code: string
    name: string
    endTime: string
    startTime: string
    modeOfStudy: string
}

const units: Unit[] = [
    {
        code: "CS101",
        name: "Introduction to Computer Science",
        startTime: "09:00",
        endTime: "11:00",
        modeOfStudy: "Online",
    },
    { code: "MATH201", name: "Advanced Calculus", startTime: "13:00", endTime: "15:00", modeOfStudy: "In-person" },
    { code: "ENG102", name: "Academic Writing", startTime: "10:00", endTime: "12:00", modeOfStudy: "Hybrid" },
    { code: "PHYS301", name: "Quantum Mechanics", startTime: "14:00", endTime: "16:00", modeOfStudy: "In-person" },
]

export function ResponsiveTable() {
    return (
        <div className="lg:w-[880px] mx-auto flex justify-center w-full overflow-auto rounded bg-purple-900/30 backdrop-blur-sm border border-purple-500/50">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-purple-500/50">
                        <TableHead className="w-[100px] text-purple-200 uppercase font-bold">Unit Code</TableHead>
                        <TableHead className="text-purple-200 uppercase font-bold">Unit Name</TableHead>
                        <TableHead className="text-purple-200 uppercase font-bold">Start Time</TableHead>
                        <TableHead className="text-purple-200 uppercase font-bold">End Time</TableHead>
                        <TableHead className="text-purple-200 uppercase font-bold">Mode of Study</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {units.map((unit) => (
                        <TableRow key={unit.code} className="border-b border-purple-500/30">
                            <TableCell className="font-medium text-purple-300">{unit.code}</TableCell>
                            <TableCell className="text-gray-300">{unit.name}</TableCell>
                            <TableCell className="text-gray-300">{unit.startTime}</TableCell>
                            <TableCell className="text-gray-300">{unit.endTime}</TableCell>
                            <TableCell className="text-gray-300">{unit.modeOfStudy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

