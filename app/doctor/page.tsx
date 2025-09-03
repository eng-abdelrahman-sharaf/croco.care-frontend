"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";
import {
    Send,
    Heart,
    Activity,
    Thermometer,
    Droplets,
    Brain,
    Stethoscope,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";

// Sample patient data
const heartRateData = [
    { time: "6:00", value: 72 },
    { time: "9:00", value: 78 },
    { time: "12:00", value: 85 },
    { time: "15:00", value: 82 },
    { time: "18:00", value: 75 },
    { time: "21:00", value: 70 },
];

const bloodPressureData = [
    { time: "6:00", systolic: 120, diastolic: 80 },
    { time: "9:00", systolic: 125, diastolic: 82 },
    { time: "12:00", systolic: 130, diastolic: 85 },
    { time: "15:00", systolic: 128, diastolic: 83 },
    { time: "18:00", systolic: 122, diastolic: 81 },
    { time: "21:00", systolic: 118, diastolic: 78 },
];

const temperatureData = [
    { time: "6:00", value: 36.5 },
    { time: "9:00", value: 36.8 },
    { time: "12:00", value: 37.1 },
    { time: "15:00", value: 37.0 },
    { time: "18:00", value: 36.9 },
    { time: "21:00", value: 36.6 },
];

export default function DoctorPage() {
    // Scripted doctor replies in order
    const doctorReplies = [
        "Hello! I’m Dr. Bot, your AI health assistant. How can I help you today?",
        "I’m sorry to hear that. Let’s see if I can help you. Could you describe the pain for me? Is it sharp, dull, or aching?",
        "Got it. Does the pain radiate anywhere else, like down your legs, or does it stay in your back?",
        "Thanks for the details. Based on what you’re describing, it might be related to a muscle strain, poor posture, or even something like a slipped disc. Can you tell me if you recently lifted anything heavy or had a sudden movement that might have triggered the pain?",
    ];

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: doctorReplies[0],
            sender: "doctor",
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isDoctorTyping, setIsDoctorTyping] = useState(false);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputMessage,
                sender: "user",
            };
            setMessages([...messages, newMessage]);
            setInputMessage("");

            // Simulate doctor response from the scripted flow
            setIsDoctorTyping(true);
            setTimeout(() => {
                setMessages((prev) => {
                    // Determine how many doctor replies have already been sent
                    const doctorCount = prev.filter(
                        (m) => m.sender === "doctor"
                    ).length;
                    const reply =
                        doctorReplies[doctorCount] ||
                        "Thanks for the information. Avoid heavy lifting for now, try gentle stretches, and if the pain persists or worsens, please consult an in-person physician.";
                    const updated = [
                        ...prev,
                        {
                            id: prev.length + 1,
                            text: reply,
                            sender: "doctor",
                        },
                    ];
                    return updated;
                });
                setIsDoctorTyping(false);
            }, 800);
        }
    };

    const vitalSigns = [
        {
            title: "Heart Rate",
            value: "75",
            unit: "bpm",
            status: "normal",
            icon: Heart,
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            trend: "stable",
        },
        {
            title: "Blood Pressure",
            value: "120/80",
            unit: "mmHg",
            status: "normal",
            icon: Activity,
            color: "text-cyan-600",
            bgColor: "bg-cyan-50",
            borderColor: "border-cyan-200",
            trend: "down",
        },
        {
            title: "SpO₂ (Oxygen)",
            value: "98",
            unit: "%",
            status: "excellent",
            icon: Droplets,
            color: "text-cyan-600",
            bgColor: "bg-cyan-50",
            borderColor: "border-cyan-200",
            trend: "up",
        },
        {
            title: "Temperature",
            value: "36.8",
            unit: "°C",
            status: "normal",
            icon: Thermometer,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            trend: "stable",
        },
        {
            title: "Biological Age",
            value: "28",
            unit: "years",
            status: "excellent",
            icon: Brain,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            trend: "down",
        },
        {
            title: "Respiratory Rate",
            value: "16",
            unit: "breaths/min",
            status: "normal",
            icon: Stethoscope,
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            trend: "stable",
        },
    ];

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up":
                return <TrendingUp className="h-4 w-4 text-green-600" />;
            case "down":
                return <TrendingDown className="h-4 w-4 text-red-600" />;
            default:
                return <Minus className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "excellent":
                return "text-green-600";
            case "normal":
                return "text-cyan-600";
            case "warning":
                return "text-yellow-600";
            case "critical":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Medical Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Comprehensive health monitoring and AI medical
                        assistance
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* AI Doctor Chat */}
                    <Card className="border-cyan-200 p-0 overflow-hidden">
                        <CardHeader className="bg-cyan-50 py-6 border-b border-cyan-200">
                            <CardTitle className="flex items-center gap-2 text-cyan-900">
                                <Stethoscope className="h-5 w-5" />
                                AI Medical Assistant
                            </CardTitle>
                            <CardDescription className="text-cyan-700">
                                Chat with Dr. Sarah for medical insights and
                                health guidance
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 grow flex flex-col">
                            <ScrollArea className="h-96 p-4 grow">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${
                                                message.sender === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}>
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${
                                                    message.sender === "user"
                                                        ? "bg-cyan-600 text-white"
                                                        : "bg-white border border-cyan-200 text-gray-900"
                                                }`}>
                                                <p className="text-sm">
                                                    {message.text}
                                                </p>
                                                {/* Timestamp removed as requested */}
                                            </div>
                                        </div>
                                    ))}
                                    {isDoctorTyping && (
                                        <div className="flex justify-start">
                                            <div className="max-w-[80%] rounded-lg p-3 bg-white border border-cyan-200 text-gray-900">
                                                <p className="text-sm text-gray-600">
                                                    Doctor is typing…
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t border-cyan-200 bg-cyan-50">
                                <div className="flex gap-2">
                                    <Input
                                        value={inputMessage}
                                        onChange={(e) =>
                                            setInputMessage(e.target.value)
                                        }
                                        placeholder="Ask about your health metrics..."
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                        className="border-cyan-300 focus:border-cyan-500"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        className="bg-cyan-600 hover:bg-cyan-700">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vital Signs Overview */}
                    <Card className="border-cyan-200 p-0 overflow-hidden">
                        <CardHeader className="bg-cyan-50 border-b border-cyan-200 py-6">
                            <CardTitle className="text-cyan-900">
                                Current Vital Signs
                            </CardTitle>
                            <CardDescription className="text-cyan-700">
                                Real-time health metrics and status
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {vitalSigns.map((vital, index) => {
                                    const Icon = vital.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border ${vital.borderColor} ${vital.bgColor}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <Icon
                                                    className={`h-5 w-5 ${vital.color}`}
                                                />
                                                {getTrendIcon(vital.trend)}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-700">
                                                    {vital.title}
                                                </p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {vital.value}
                                                    <span className="text-sm font-normal text-gray-600 ml-1">
                                                        {vital.unit}
                                                    </span>
                                                </p>
                                                <p
                                                    className={`text-xs font-medium ${getStatusColor(
                                                        vital.status
                                                    )}`}>
                                                    {vital.status.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Health Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Heart Rate Chart */}
                    <Card className="border-red-200 p-0 overflow-hidden">
                        <CardHeader className="bg-red-50 border-b border-red-200 py-6">
                            <CardTitle className="flex items-center gap-2 text-red-900">
                                <Heart className="h-5 w-5" />
                                Heart Rate Trend
                            </CardTitle>
                            <CardDescription className="text-red-700">
                                24-hour heart rate monitoring
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={heartRateData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#fecaca"
                                    />
                                    <XAxis dataKey="time" stroke="#991b1b" />
                                    <YAxis stroke="#991b1b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fef2f2",
                                            border: "1px solid #fecaca",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#dc2626"
                                        strokeWidth={2}
                                        dot={{
                                            fill: "#dc2626",
                                            strokeWidth: 2,
                                            r: 4,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Blood Pressure Chart */}
                    <Card className="border-cyan-200 p-0 overflow-hidden">
                        <CardHeader className="bg-cyan-50 border-b border-cyan-200 py-6">
                            <CardTitle className="flex items-center gap-2 text-cyan-900">
                                <Activity className="h-5 w-5" />
                                Blood Pressure
                            </CardTitle>
                            <CardDescription className="text-cyan-700">
                                Systolic and diastolic pressure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={bloodPressureData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#bfdbfe"
                                    />
                                    <XAxis dataKey="time" stroke="#1e40af" />
                                    <YAxis stroke="#1e40af" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#eff6ff",
                                            border: "1px solid #bfdbfe",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="systolic"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        name="Systolic"
                                        dot={{
                                            fill: "#2563eb",
                                            strokeWidth: 2,
                                            r: 4,
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="diastolic"
                                        stroke="#60a5fa"
                                        strokeWidth={2}
                                        name="Diastolic"
                                        dot={{
                                            fill: "#60a5fa",
                                            strokeWidth: 2,
                                            r: 4,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Temperature Chart */}
                    <Card className="border-orange-200 p-0 overflow-hidden">
                        <CardHeader className="bg-orange-50 border-b border-orange-200 py-6">
                            <CardTitle className="flex items-center gap-2 text-orange-900">
                                <Thermometer className="h-5 w-5" />
                                Body Temperature
                            </CardTitle>
                            <CardDescription className="text-orange-700">
                                Temperature variations throughout the day
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={temperatureData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#fed7aa"
                                    />
                                    <XAxis dataKey="time" stroke="#c2410c" />
                                    <YAxis
                                        stroke="#c2410c"
                                        domain={[
                                            "dataMin - 0.5",
                                            "dataMax + 0.5",
                                        ]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fff7ed",
                                            border: "1px solid #fed7aa",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#ea580c"
                                        fill="#fb923c"
                                        fillOpacity={0.3}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
