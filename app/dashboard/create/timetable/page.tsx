"use client";

import { FormDialog, CreateTimetableForm } from "@/components/dashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const batchId = searchParams.get("batchId");

    const isCreatePage = pathname === "/dashboard/create/timetable";
    const onOpenChange = (open = isCreatePage) => {
        !open && router.back();
    };

    if (!batchId) {
        return null;
    }

    return (
        <div>
            <FormDialog
                requiredRoute={isCreatePage}
                onOpenChange={onOpenChange}
                dialogTitle="Generate Timetable"
            >
                <CreateTimetableForm batchId={batchId} />
            </FormDialog>
        </div>
    );
}