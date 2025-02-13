"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { initialData, allColumns } from "@/lib/data"
import { RowData } from "@/types/exports"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
    ChevronUp,
    ChevronDown,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Trash2,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function SleekTable() {
    const [data, setData] = useState<RowData[]>(initialData)
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [visibleColumns, setVisibleColumns] = useState(allColumns)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const handleCellEdit = (id: string, field: keyof RowData, value: string) => {
        setData(data.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
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

    const handleRowAction = (action: string, id: string) => {
        switch (action) {
            case "addAbove":
                const indexAbove = data.findIndex((row) => row.id === id)
                const newRowAbove = { ...data[indexAbove], id: Date.now().toString() }
                setData([...data.slice(0, indexAbove), newRowAbove, ...data.slice(indexAbove)])
                break
            case "addBelow":
                const indexBelow = data.findIndex((row) => row.id === id)
                const newRowBelow = { ...data[indexBelow], id: Date.now().toString() }
                setData([...data.slice(0, indexBelow + 1), newRowBelow, ...data.slice(indexBelow + 1)])
                break
            case "delete":
                setData(data.filter((row) => row.id !== id))
                break
        }
    }

    const handleTableAction = (action: string) => {
        switch (action) {
            case "download":
                // Implement download functionality
                console.log("Downloading table...")
                break
            case "export":
                // Implement export to email functionality
                console.log("Exporting table to email...")
                break
            case "delete":
                setData([])
                break
        }
    }

    const handleDeleteSelected = () => {
        setData(data.filter((row) => !selectedRows.includes(row.id)))
        setSelectedRows([])
    }

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    const pageCount = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm text-gray-300 rounded border-purple-400 focus:border-pink-500"
                />
                <div className="flex space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[100px] rounded bg-purple-500/15 text-gray-300 hover:bg-purple-500/20">
                                View
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
                            <Button variant="outline" className="rounded bg-purple-500/15 text-gray-300 hover:bg-purple-500/20">Table Actions</Button>
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
                            {visibleColumns.includes("time") && <TableHead className="uppercase text-gray-200">Time</TableHead>}
                            {visibleColumns.includes("lecturer") && <TableHead className="uppercase text-gray-200">Lecturer</TableHead>}
                            {visibleColumns.includes("campus") && <TableHead className="uppercase text-gray-200">Campus</TableHead>}
                            {visibleColumns.includes("mode") && <TableHead className="uppercase text-gray-200">Mode</TableHead>}
                            {visibleColumns.includes("room") && <TableHead className="uppercase text-gray-200">Room</TableHead>}
                            {visibleColumns.includes("group") && <TableHead className="uppercase text-gray-200">Group</TableHead>}
                            <TableHead className="w-[100px] uppercase text-gray-200">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow key={row.id} className={selectedRows.includes(row.id) ? "bg-gray-600" : ""}>
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
                                    <TableCell>
                                        <Input
                                            value={row.unit_code}
                                            onChange={(e) => handleCellEdit(row.id, "unit_code", e.target.value)}
                                            className="text-gray-300"
                                        />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("unit_name") && (
                                    <TableCell>
                                        <Input
                                            value={row.unit_name}
                                            onChange={(e) => handleCellEdit(row.id, "unit_name", e.target.value)}
                                            className="text-gray-300"
                                        />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("day") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.day} onChange={(e) => handleCellEdit(row.id, "day", e.target.value)} />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("time") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.time} onChange={(e) => handleCellEdit(row.id, "time", e.target.value)} />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("lecturer") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.lecturer} onChange={(e) => handleCellEdit(row.id, "lecturer", e.target.value)} />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("campus") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.campus} onChange={(e) => handleCellEdit(row.id, "campus", e.target.value)} />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("mode") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.mode} onChange={(e) => handleCellEdit(row.id, "mode", e.target.value)} />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("room") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.room} onChange={(e) => handleCellEdit(row.id, "room", e.target.value)} />
                                    </TableCell>
                                )}
                                {visibleColumns.includes("group") && (
                                    <TableCell>
                                        <Input className="text-gray-300" value={row.group} onChange={(e) => handleCellEdit(row.id, "group", e.target.value)} />
                                    </TableCell>
                                )}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded">
                                                <MoreHorizontal className="h-4 w-4 text-purple-300" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded border-purple-500">
                                            <DropdownMenuItem onClick={() => handleRowAction("addAbove", row.id)}>
                                                Add row above
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRowAction("addBelow", row.id)}>
                                                Add row below
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRowAction("delete", row.id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
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

