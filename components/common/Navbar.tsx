"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { ThemeToggler } from "@/components/common";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout as setLogout } from "@/redux/features/authSlice";
import {
  LogOut,
  Settings,
  BadgePlus,
  DiamondPlus,
  BadgeDollarSign
} from "lucide-react";
import {
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
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
    <div className="text-black px-5 flex justify-between">
      <Link href="/dashboard">
        <GraduationCap className="dark:text-white" />
      </Link>

      <div className="flex item-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarFallback className="text-black bg-slate-300 font-bold">
                {user?.username[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
                <BadgePlus className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Create</span>
              </Link>
            </DropdownMenuItem>
            <div className="ml-2 dark:ml-1 mt-2">
              <ThemeToggler />
            </div>
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