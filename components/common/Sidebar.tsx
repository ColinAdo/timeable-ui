"use client";

import { Nav } from "@/components/ui/nav";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import {
    Brain,
    LogOut,
    Trash2,
    Settings,
    BadgePlus,
    DiamondPlus,
    ChevronRight,
    LayoutDashboard,
    BadgeDollarSign,
    CircleFadingArrowUp,
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
        <div className="relative min-w-[80px] px-8 pt-20 pb-10 mt-12">

            {!mobilewidth && (
                <div className="left-10 absolute top-7">
                    <Button
                        onClick={toggleSidebar}
                        className="flex justify-center w-[40px] bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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
                        title: "Billing",
                        label: "",
                        icon: BadgeDollarSign,
                        variant: "ghost",
                        href: "/dashboard/pricing",
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
                        title: "Ask AI",
                        label: "",
                        icon: Brain,
                        variant: "ghost",
                        href: "#",
                    },
                    {
                        title: "Upgrade",
                        label: "",
                        icon: CircleFadingArrowUp,
                        variant: "ghost",
                        href: "/dashboard/pricing",
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