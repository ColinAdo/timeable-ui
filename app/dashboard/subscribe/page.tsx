"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog, SubscribeForm } from "@/components/dashboard";

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();

    const isSubscribePage = pathname === "/dashboard/subscribe";
    const onOpenChange = (open = isSubscribePage) => {
        !open && router.back();
    };


    return (
        <div>
            <FormDialog
                requiredRoute={isSubscribePage}
                onOpenChange={onOpenChange}
                dialogTitle="Subscribe to Timeable using Mpesa"
            >
                <SubscribeForm />
            </FormDialog>
        </div>
    );
}