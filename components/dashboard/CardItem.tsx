import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    id: string;
    username: string;
    timetableName: string;
}

export default function CardItem(props: Props) {
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState("");

    const handleRename = () => {
        console.log("New name:", newName); // Replace with API call or state update
        toast.success("Timetable renamed successfully");
        setOpen(false); // Close the dialog after renaming
    };

    return (
        <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-3 p-2">
                <Avatar>
                    <AvatarFallback className="text-black bg-slate-300 font-bold">
                        {props.username[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="mt-3 text-sm">
                    <Link href={`/dashboard/timetable?batchId=${props.id}`}>
                        <p>{props.timetableName}</p>
                    </Link>
                </div>
            </section>
            <div className="mt-3 flex flex-col items-center">
                <span className="hidden sm:block text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-500">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded">
                                <MoreHorizontal className="h-4 w-4 text-purple-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded border-purple-500">
                            <DropdownMenuItem onClick={() => setOpen(true)}>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>

                {/* Dialog for renaming */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="w-[460px] bg-black !rounded">
                        <DialogHeader>
                            <DialogTitle className="text-white">Rename Item</DialogTitle>
                        </DialogHeader>
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Enter new name"
                            className="mt-2 rounded text-gray-200"
                        />
                        <DialogFooter>
                            <div className="w-full flex justify-between">
                                <Button className="text-white rounded" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button
                                    className=" bg-gradient-to-r from-purple-500 rounded to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                    onClick={handleRename}
                                >
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>


                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
