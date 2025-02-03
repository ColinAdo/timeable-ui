"use client";

import { Nav } from "@/components/ui/nav";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import {
    Brain,
    LogOut,
    Trash2,
    Archive,
    Settings,
    BadgePlus,
    DiamondPlus,
    ChevronRight,
    LayoutDashboard,
    BadgeDollarSign
} from "lucide-react";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobilewidth, setMobileWidth] = useState(false);
    const onlyWidth = useWindowWidth();

    useEffect(() => {
        // Update mobilewidth state when window width changes
        setMobileWidth(onlyWidth < 768);
    }, [onlyWidth]);

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className="relative min-w-[80px] border-r px-3 pt-20 pb-10 mt-12">
            {!mobilewidth && (
                <div className="absolute top-7">
                    <Button
                        onClick={toggleSidebar}
                        className="dark:bg-zinc-800 dark:text-white text-white hover:text-white hover:bg-black"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}
            <Nav
                isCollapsed={mobilewidth ? true : isCollapsed}
                links={[
                    {
                        title: "Dashboard",
                        icon: LayoutDashboard,
                        variant: "default",
                        href: "/dashboard",
                    },
                    {
                        title: "Create",
                        icon: BadgePlus,
                        variant: "ghost",
                        href: "/dashboard/create/account",
                    },
                    {
                        title: "Pricing",
                        label: "",
                        icon: BadgeDollarSign,
                        variant: "ghost",
                        href: "/dashboard/pricing",
                    },
                    {
                        title: "Transact",
                        icon: DiamondPlus,
                        variant: "ghost",
                        href: "/dashboard/create/transaction",
                    },
                    {
                        title: "Settings",
                        label: "",
                        icon: Settings,
                        variant: "ghost",
                        href: "/users",
                    },
                    {
                        title: "Trash",
                        label: "23",
                        icon: Trash2,
                        variant: "ghost",
                        href: "#",
                    },
                    {
                        title: "Archive",
                        label: "",
                        icon: Archive,
                        variant: "ghost",
                        href: "#",
                    },
                    {
                        title: "Ask AI",
                        label: "",
                        icon: Brain,
                        variant: "ghost",
                        href: "#",
                    },
                    {
                        title: "Log out",
                        label: "",
                        icon: LogOut,
                        variant: "ghost",
                        href: "#",
                    },
                ]}
            />
        </div>
    );
}