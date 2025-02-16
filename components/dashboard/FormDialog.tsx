"use client";

import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
} from "@/components/ui/dialog";


interface Props {
    requiredRoute: boolean;
    onOpenChange: (open: boolean) => void;
    dialogTitle: string;
    children: React.ReactNode;
}

export default function FormDialog({
    requiredRoute,
    onOpenChange,
    dialogTitle,
    children,
}: Props) {
    return (
        <Dialog open={requiredRoute} onOpenChange={onOpenChange}>
            <DialogContent className="!rounded border-purple-400 bg-black/[0.96] px-4 w-96 mt-7">
                <DialogHeader>
                    <DialogTitle className="text-gray-200">{dialogTitle}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}