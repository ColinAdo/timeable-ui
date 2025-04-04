"use client"

import * as XLSX from "xlsx";
import { toast } from "sonner";
import TableData from "./TableData";
import { allColumns } from "@/lib/data";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimetableType } from "@/types/exports";
import { useRouter, useSearchParams } from "next/navigation";
import { useWebSocketContext } from "@/hooks/webSocketContext";
import {
    useExportTimetableMutation,
    useRetrieveTimetableQuery
} from "@/redux/features/timetableSlice";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import {
    Eye,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

export default function Timetable() {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [visibleColumns, setVisibleColumns] = useState(allColumns)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const searchParams = useSearchParams();
    const batchId = searchParams.get("batchId");
    const { sendJsonMessage, lastJsonMessage } = useWebSocketContext();

    const router = useRouter();

    const { data: timetableData, refetch } = useRetrieveTimetableQuery(batchId || "");
    const [exportTimetable] = useExportTimetableMutation();
    const [data, setData] = useState<TimetableType[]>([]);

    useEffect(() => {
        if (timetableData) {
            setData(timetableData);
        }
        refetch();
    }, [timetableData, lastJsonMessage]);

    if (!batchId || !timetableData) {
        return null;
    }


    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        setData(
            [...data].sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.day.localeCompare(b.day)
                } else {
                    return b.day.localeCompare(a.day)
                }
            }),
        )
    }

    const onEditRow = (id: string) => {
        router.push(`/dashboard/edit/timetable?rowId=${id}`);

    };

    const onDeleteRow = (id: string) => {
        const sendData = {
            rowId: id,
        }
        sendJsonMessage({
            event: "delete_row",
            sendData,
        });
        toast.success("Row deleted successfully");
    };

    const handleRowAction = (action: string, id: string) => {
        switch (action) {
            case "edit":
                onEditRow(id)
                break
            case "delete":
                onDeleteRow(id)
                break
        }
    }

    const onDelete = () => {
        const sendData = {
            batch_id: batchId,
        }
        sendJsonMessage({
            event: "delete_timetable",
            sendData,
        });
        toast.success("Timetable deleted successfully");
    };

    const handleTableAction = (action: string) => {
        switch (action) {
            case "download":
                // Create a worksheet from timetable data
                const filteredData = timetableData.map(({ id, name, ...rest }) => rest);
                const ws = XLSX.utils.json_to_sheet(filteredData);

                // Create a workbook with the worksheet
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Timetable");

                // Generate an Excel file as a Blob
                const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

                // Create a Blob from the binary string
                const blob = new Blob([s2ab(excelFile)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

                // Create a download link and trigger the download
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `${batchId}.xlsx`;
                link.click();

                toast.success("Downloaded successfully");
                break;

            case "export":
                exportTimetable({ batch_id: batchId, email: "colindeveloper4@gmail.com" })
                    .unwrap()
                    .then(() => {
                        toast.success("Exported successfully");
                    })
                    .catch((error) => {
                        toast.success("Exporte failed");
                        console.log("Exporte failed", error);
                    });
                console.log("Exporting table to email...");
                break;
            case "delete":
                onDelete();
                router.push("/dashboard");
                break;
            default:
                break;
        }
    };

    // Helper function to convert a binary string to an array buffer
    const s2ab = (s: string) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    };

    const handleDeleteSelected = () => {
        const sendData = {
            ids: selectedRows,
        }
        sendJsonMessage({
            event: "delete_selected_rows",
            sendData,
        });
        toast.success("Selected rows deleted successfully")
    }

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    const pageCount = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between gap-2 items-center">
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm text-gray-300 rounded border-purple-400 focus:border-pink-500"
                />
                <div className="flex space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[78px] rounded bg-purple-500/15 text-gray-300 hover:bg-purple-500/20">
                                <Eye />View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50 rounded border-purple-500">
                            <DropdownMenuLabel>View columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {allColumns.map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column}
                                    className="capitalize"
                                    checked={visibleColumns.includes(column)}
                                    onCheckedChange={(checked) => {
                                        setVisibleColumns(
                                            checked ? [...visibleColumns, column] : visibleColumns.filter((col) => col !== column),
                                        )
                                    }}
                                >
                                    {column.replace("_", " ")}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded w-[96px] bg-purple-500/15 text-gray-300 hover:bg-purple-500/20">Table Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded border-purple-500">
                            <DropdownMenuItem onClick={() => handleTableAction("download")}>Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTableAction("export")}>Export to email</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTableAction("delete")}>Delete table</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedRows.length > 0 && (
                        <Button variant="outline" size="icon" onClick={handleDeleteSelected} className="h-9 w-8 rounded">
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    )}
                </div>
            </div>
            <TableData
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handleSort={handleSort}
                handleRowAction={handleRowAction}
                paginatedData={paginatedData} />
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {selectedRows.length} of {filteredData.length} row(s)
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Rows per page</span>
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number.parseInt(value))}>
                            <SelectTrigger className="w-[70px] text-white rounded border-purple-500">
                                <SelectValue placeholder={itemsPerPage.toString()} />
                            </SelectTrigger>
                            <SelectContent className="rounded border-purple-500">
                                {[5, 10, 20, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button className="rounded border-purple-500" variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                            <ChevronsLeft className="h-4 w-4 text-gray-300" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                            className="rounded border-purple-500"
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-300" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {pageCount}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                            disabled={currentPage === pageCount}
                            className="rounded border-purple-500"
                        >
                            <ChevronRight className="h-4 w-4 text-gray-300" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(pageCount)}
                            disabled={currentPage === pageCount}
                            className="rounded border-purple-500"
                        >
                            <ChevronsRight className="h-4 w-4 text-gray-300" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

