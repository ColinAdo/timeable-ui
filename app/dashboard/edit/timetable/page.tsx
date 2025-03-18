"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormDialog, EditTimetableForm } from "@/components/dashboard";
import { useRetrieveTimetableDataQuery } from "@/redux/features/timetableSlice";

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const rowId = searchParams.get("rowId");
    const { data } = useRetrieveTimetableDataQuery(rowId || "");

    const isEditPage = pathname === "/dashboard/edit/timetable";
    const onOpenChange = (open = isEditPage) => {
        !open && router.back();
    };

    if (!rowId || !data) {
        return null;
    }

    return (
        <div>
            <FormDialog
                requiredRoute={isEditPage}
                onOpenChange={onOpenChange}
                dialogTitle="Update Timetable Data"
            >
                <EditTimetableForm data={data} />
            </FormDialog>
        </div>
    );
}