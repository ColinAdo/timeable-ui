"use client";

import Link from "next/link";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hook";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
        href?: string;
    }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const pathname = usePathname();

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
            });
    };

    return (
        <TooltipProvider>
            <div
                data-collapsed={isCollapsed}
                className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
            >
                <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                    {links.map((link, index) => {
                        const isLogout = link.title === "Log out";

                        // Classes for icons and titles
                        const iconClass = isCollapsed ? "h-4 w-4" : "mr-2 h-4 w-4";
                        const buttonClasses = cn(
                            buttonVariants({
                                variant: link.href === pathname ? "default" : "ghost",
                                size: isCollapsed ? "icon" : "sm",
                            }),
                            isCollapsed ? "h-9 w-9" : "justify-start",
                            link.variant === "default" &&
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                        );

                        if (isLogout) {
                            return isCollapsed ? (
                                <Tooltip key={index} delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <button
                                            className={buttonClasses}
                                            onClick={handleLogout}
                                        >
                                            <link.icon className={iconClass} />
                                            <span className="sr-only">{link.title}</span>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        {link.title}
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <button
                                    key={index}
                                    className={buttonClasses}
                                    onClick={handleLogout}
                                >
                                    <link.icon className={iconClass} />
                                    {link.title}
                                </button>
                            );
                        }

                        return isCollapsed ? (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={link.href || "#"}
                                        className={buttonClasses}
                                    >
                                        <link.icon className={iconClass} />
                                        <span className="sr-only">{link.title}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {link.title}
                                    {link.label && (
                                        <span className="ml-auto text-muted-foreground">
                                            {link.label}
                                        </span>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Link
                                key={index}
                                href={link.href || "#"}
                                className={buttonClasses}
                            >
                                <link.icon className={iconClass} />
                                {link.title}
                                {link.label && (
                                    <span
                                        className={cn(
                                            "ml-auto",
                                            link.variant === "default" &&
                                            "text-background dark:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </TooltipProvider>
    );


}