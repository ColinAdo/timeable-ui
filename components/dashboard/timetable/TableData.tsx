"use client";

import { useState } from "react";
import { allColumns } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TimetableType } from "@/types/exports";
import {
    ChevronDown,
    ChevronUp,
    MoreHorizontal
} from "lucide-react";

interface Props {
    data: TimetableType[];
    handleSort: () => void;
    paginatedData: TimetableType[];
    handleRowAction: (action: string, id: string) => void;
    selectedRows: string[];
    setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}


export default function TableData({
    data,
    handleSort,
    handleRowAction,
    paginatedData,
    selectedRows,
    setSelectedRows }: Props) {
    const [visibleColumns, setVisibleColumns] = useState(allColumns)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    return (
        <div className="rounded border border-gray-500">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={selectedRows.length === paginatedData.length}
                                onCheckedChange={(checked) => {
                                    setSelectedRows(checked ? paginatedData.map((row) => row.id) : [])
                                }}
                                className="translate-y-[2px] rounded border-purple-400"
                                ref={(input) => {
                                    if (input) {
                                        (input as HTMLInputElement).indeterminate =
                                            selectedRows.length > 0 && selectedRows.length < paginatedData.length
                                    }
                                }}
                            />

                        </TableHead>
                        {visibleColumns.includes("unit_code") && <TableHead className="uppercase text-gray-200">Unit Code</TableHead>}
                        {visibleColumns.includes("unit_name") && <TableHead className="uppercase text-gray-200">Unit Name</TableHead>}
                        {visibleColumns.includes("day") && (
                            <TableHead>
                                <div className="flex uppercase text-gray-200 items-center cursor-pointer" onClick={handleSort}>
                                    Day
                                    {sortOrder === "asc" ? (
                                        <ChevronUp className="ml-2 h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    )}
                                </div>
                            </TableHead>
                        )}
                        {visibleColumns.includes("start_time") && <TableHead className="uppercase text-gray-200">From</TableHead>}
                        {visibleColumns.includes("end_time") && <TableHead className="uppercase text-gray-200">To</TableHead>}
                        {/* {visibleColumns.includes("lecturer") && <TableHead className="uppercase text-gray-200">Lecturer</TableHead>} */}
                        {/* {visibleColumns.includes("campus") && <TableHead className="uppercase text-gray-200">Campus</TableHead>} */}
                        {/* {visibleColumns.includes("mode") && <TableHead className="uppercase text-gray-200">Mode</TableHead>} */}
                        {/* {visibleColumns.includes("room") && <TableHead className="uppercase text-gray-200">Room</TableHead>} */}
                        {/* {visibleColumns.includes("group") && <TableHead className="uppercase text-gray-200">Group</TableHead>} */}
                        <TableHead className="w-[100px] uppercase text-gray-200">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((row) => (
                        <TableRow key={row.id} className={selectedRows.includes(row.id) ? "bg-gray-600" : "border-none"}>
                            <TableCell>
                                <Checkbox
                                    className="border-purple-500 rounded"
                                    checked={selectedRows.includes(row.id)}
                                    onCheckedChange={(checked) => {
                                        setSelectedRows(checked ? [...selectedRows, row.id] : selectedRows.filter((id) => id !== row.id))
                                    }}
                                />
                            </TableCell>
                            {visibleColumns.includes("unit_code") && (
                                <TableCell
                                    className="text-gray-300 w-50  focus:w-50 focus:border-gray-200 focus:rounded"
                                >
                                    {row.unit_code}
                                </TableCell>
                            )}
                            {visibleColumns.includes("unit_name") && (
                                <TableCell
                                    className="text-gray-300 w-50  focus:w-50 focus:border-gray-200 focus:rounded"
                                >
                                    {row.unit_name}
                                </TableCell>
                            )}
                            {visibleColumns.includes("day") && (
                                <TableCell
                                    className="text-gray-300 w-50  focus:w-50 focus:border-gray-200 focus:rounded"
                                >
                                    {row.day}
                                </TableCell>
                            )}
                            {visibleColumns.includes("start_time") && (
                                <TableCell
                                    className="text-gray-300 w-50  focus:w-50 focus:border-gray-200 focus:rounded"
                                >
                                    {row.start_time}
                                </TableCell>
                            )}
                            {visibleColumns.includes("end_time") && (
                                <TableCell
                                    className="text-gray-300 w-50  focus:w-50 focus:border-gray-200 focus:rounded"
                                >
                                    {row.end_time}
                                </TableCell>
                            )}
                            {/* {visibleColumns.includes("lecturer") && (
                                    <TableCell>
                                        <Input value={row.lecturer} onChange={(e) => handleCellEdit(row.id, "lecturer", e.target.value)}
                                            className="text-gray-300 border border-transparent focus:w-50 focus:border-gray-200 focus:rounded"
                                        />
                                    </TableCell>
                                )} */}
                            {/* {visibleColumns.includes("campus") && (
                                    <TableCell>
                                        <Input value={row.campus} onChange={(e) => handleCellEdit(row.id, "campus", e.target.value)}
                                            className="text-gray-300 border border-transparent focus:w-50 focus:border-gray-200 focus:rounded"
                                        />
                                    </TableCell>
                                )} */}
                            {/* {visibleColumns.includes("mode") && (
                                    <TableCell>
                                        <Input value={row.mode} onChange={(e) => handleCellEdit(row.id, "mode", e.target.value)}
                                            className="text-gray-300 border border-transparent focus:w-50 focus:border-gray-200 focus:rounded"
                                        />
                                    </TableCell>
                                )} */}
                            {/* {visibleColumns.includes("room") && (
                                    <TableCell>
                                        <Input value={row.room} onChange={(e) => handleCellEdit(row.id, "room", e.target.value)}
                                            className="text-gray-300 border border-transparent focus:w-50 focus:border-gray-200 focus:rounded"
                                        />
                                    </TableCell>
                                )} */}
                            {/* {visibleColumns.includes("group") && (
                                    <TableCell>
                                        <Input value={row.group} onChange={(e) => handleCellEdit(row.id, "group", e.target.value)}
                                            className="text-gray-300 border border-transparent focus:w-50 focus:border-gray-200 focus:rounded"
                                        />
                                    </TableCell>
                                )} */}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded">
                                            <MoreHorizontal className="h-4 w-4 text-purple-300" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded border-purple-500">
                                        <DropdownMenuItem onClick={() => handleRowAction("edit", row.id)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleRowAction("delete", row.id)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}