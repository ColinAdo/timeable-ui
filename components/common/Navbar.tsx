"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation, useRetrieveUserQuery, } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { CircleFadingArrowUp, GraduationCap, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { data: user } = useRetrieveUserQuery();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };

  return (
    <div
      className="bg-black/[0.96] sticky top-0 z-50 flex items-center justify-between md:px-10 px-2 py-4 backdrop-blur-md bg-black/50 border-b border-white/10"
    >

      <Link href="/dashboard">
        <GraduationCap className="w-8 h-8 text-purple-500" />
      </Link>

      <div className="flex item-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarFallback className="text-black bg-pink-300 font-bold">
                {user?.username[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black/[0.96] mr-8 rounded border-purple-400">
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard" className="flex justify-between">
                <LayoutDashboard className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/dashboard/pricing"
                className="flex justify-between"
              >
                <CircleFadingArrowUp className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Upgrade</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-[1.2rem] w-[1.2rem]" />
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}