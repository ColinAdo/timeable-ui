import { GraduationCap } from "lucide-react";
import { AuthTabs } from "@/components/auth";

export default function Page() {
    return (
        <>
            <div className="flex min-h-full mt-10 flex-1 flex-col justify-center px-6 py-16 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
                    <GraduationCap className="mx-auto h-10 w-auto" />
                    <h2 className="mt-1 text-center text-2xl dark:text-white font-mono font-bold leading-9 tracking-tight text-gray-900">
                        Timeable
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <AuthTabs />
                </div>
            </div>
        </>
    );
}