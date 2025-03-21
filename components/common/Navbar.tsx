"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { LogOut, Settings } from "lucide-react";
import { BadgeDollarSign, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation, useRetrieveUserQuery, } from "@/redux/features/authApiSlice";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
              <Link href="/" className="flex justify-between">
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/dashboard/create/account"
                className="flex justify-between"
              >
                <BadgeDollarSign className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Billing</span>
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