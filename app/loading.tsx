import { LogoIcon } from "@/components/icons/logo";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col w-full gap-4 h-dvh items-center justify-center">
            <LogoIcon className="h-20 w-20" />
            <Loader2 className="h-20 w-20 animate-spin text-cyan-300" />
        </div>
    );
}
