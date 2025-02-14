import { RowData } from "@/types/exports"

export const initialData: RowData[] = [
    {
        id: "1",
        unit_code: "CS101",
        unit_name: "Introduction to Computer Science",
        day: "Monday",
        time: "09:00 - 11:00",
        lecturer: "Dr. Smith",
        campus: "Main",
        mode: "In-person",
        room: "A101",
        group: "1",
    },
    {
        id: "2",
        unit_code: "CS102",
        unit_name: "Data Structures and Algorithms",
        day: "Tuesday",
        time: "13:00 - 15:00",
        lecturer: "Prof. Johnson",
        campus: "South",
        mode: "Online",
        room: "Virtual",
        group: "2",
    },
    // Add more initial data as needed
]

export const allColumns = ["unit_code", "unit_name", "day", "time", "lecturer", "campus", "mode", "room", "group"]
