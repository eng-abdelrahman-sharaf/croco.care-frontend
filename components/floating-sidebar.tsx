"use client";

import { useState } from "react";
import {
    Stethoscope,
    Home,
    Dumbbell,
    FileText,
    UserCheck,
    User,
    LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoIcon } from "./icons/logo";
import { SloganIcon } from "./icons/slogan";
import { usePathname } from "next/navigation";

const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    {
        icon: Stethoscope,
        label: "Doctor",
        href: "/doctor",
    },
    { icon: Dumbbell, label: "Coach", href: "/coach" },
    { icon: FileText, label: "Reports", href: "/reports" },
];

export default function FloatingSidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false); // This would come from your auth state
    const page = "/" + usePathname().split("/")[1];
    return (
        <div
            className={cn(
                "fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col bg-white border border-cyan-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out",
                isExpanded ? "w-64" : "w-16"
            )}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}>
            {/* Header with Logo */}
            <div className="flex items-center p-4 cursor-pointer relative border-b border-cyan-200">
                <LogoIcon className="w-8 h-8 shrink-0" />
                <SloganIcon
                    className={cn(
                        "ml-3 transition-all duration-300 ease-in-out text-2xl",
                        isExpanded
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-4 pointer-events-none"
                    )}
                />
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-2 space-y-1">
                {navigationItems.map((item) => (
                    <Link
                        href={item.href}
                        key={item.label}
                        className={cn(
                            "w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-700 group",
                            "focus:outline-none",
                            page === item.href && "ring-2 ring-cyan-500"
                        )}>
                        <item.icon className="w-5 h-5 text-cyan-500 group-hover:text-cyan-700 flex-shrink-0" />
                        <span
                            className={cn(
                                "ml-3 text-sm font-medium transition-all duration-300 ease-in-out text-cyan-900",
                                isExpanded
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4 pointer-events-none"
                            )}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Footer - Sign In / Profile */}
            <div className="p-2 border-t border-cyan-200">
                {isSignedIn ? (
                    <button
                        className={cn(
                            "w-full flex items-center p-2 rounded-lg text-left transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-700 group",
                            "focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        )}>
                        <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div
                            className={cn(
                                "ml-3 transition-all duration-300 ease-in-out text-nowrap",
                                isExpanded
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4 pointer-events-none"
                            )}>
                            <p className="text-sm font-medium text-cyan-900">
                                Dr. Smith
                            </p>
                            <p className="text-xs text-cyan-600">
                                View Profile
                            </p>
                        </div>
                    </button>
                ) : (
                    <Button
                        className={cn(
                            "w-full justify-start transition-all duration-300 bg-cyan-600 hover:bg-cyan-700 text-white",
                            !isExpanded && "px-3"
                        )}
                        onClick={() => setIsSignedIn(true)} // This would handle actual sign in
                    >
                        <LogIn className="w-5 h-5 flex-shrink-0" />
                        <span
                            className={cn(
                                "ml-3 transition-all duration-300 ease-in-out",
                                isExpanded
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4 pointer-events-none"
                            )}>
                            Sign In
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
}
