import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import FloatingSidebar from "@/components/floating-sidebar";
import "./globals.css";
import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
    title: "Croco Care",
    description:
        "An all-in-one health and fitness platform featuring an AI-powered coach, AI doctor, personalized reports, and more to help you stay healthy, fit, and informed every day.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`font-sans bg-cyan-50/60 ${GeistSans.variable} ${GeistMono.variable}`}>
                <FloatingSidebar />
                <ScrollArea className="ml-20 h-dvh">{children}</ScrollArea>
                <Analytics />
            </body>
        </html>
    );
}
