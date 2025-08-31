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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
    Lightbulb,
    Dumbbell,
    UtensilsCrossed,
    Heart,
    Activity,
    Thermometer,
    Droplets,
    Eye,
    EyeOff,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

// Sample data for charts
const bloodPressureData = [
    { day: "Mon", systolic: 120, diastolic: 80 },
    { day: "Tue", systolic: 118, diastolic: 78 },
    { day: "Wed", systolic: 122, diastolic: 82 },
    { day: "Thu", systolic: 119, diastolic: 79 },
    { day: "Fri", systolic: 121, diastolic: 81 },
    { day: "Sat", systolic: 117, diastolic: 77 },
    { day: "Sun", systolic: 120, diastolic: 80 },
];

const heartRateData = [
    { time: "6AM", rate: 65 },
    { time: "9AM", rate: 72 },
    { time: "12PM", rate: 78 },
    { time: "3PM", rate: 75 },
    { time: "6PM", rate: 82 },
    { time: "9PM", rate: 68 },
];

export default function HomePage() {
    const [reminders, setReminders] = useState([
        { id: 1, type: "workout", name: "Push Workout", completed: false },
        { id: 2, type: "workout", name: "Cardio Session", completed: false },
        { id: 3, type: "meal", name: "Meatballs with Pasta", completed: true },
        { id: 4, type: "meal", name: "Protein Shake", completed: false },
        { id: 5, type: "meal", name: "Apple Snack", completed: false },
    ]);

    const [hideCompleted, setHideCompleted] = useState(false);

    const toggleReminder = (id: number) => {
        setReminders((prev) =>
            prev.map((reminder) =>
                reminder.id === id
                    ? { ...reminder, completed: !reminder.completed }
                    : reminder
            )
        );
    };

    const filteredReminders = hideCompleted
        ? reminders.filter((reminder) => !reminder.completed)
        : reminders;

    const todaysTips = [
        "Stay hydrated! Aim for 8-10 glasses of water throughout the day.",
        "Take a 5-minute walk every hour to boost circulation and energy.",
        "Practice deep breathing for 2 minutes to reduce stress and improve focus.",
        "Eat protein with every meal to maintain stable blood sugar levels.",
        "Get 7-9 hours of quality sleep for optimal recovery and health.",
    ];

    const randomTip = todaysTips[Math.floor(Math.random() * todaysTips.length)];

    return (
        <div className="min-h-screen">
            <main className="p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Good Morning!
                            </h1>
                            <p className="text-muted-foreground">
                                Here's your health overview for today
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                                Today
                            </p>
                            <p className="text-lg font-semibold text-blue-600">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Today's Tip Section */}
                    <Card className="border-blue-200 bg-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Lightbulb className="h-5 w-5" />
                                Today's Health Tip
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-blue-800 font-medium">
                                {randomTip}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Reminders Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-blue-700">
                                    Today's Reminders
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setHideCompleted(!hideCompleted)
                                        }
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                        {hideCompleted ? (
                                            <Eye className="h-4 w-4 mr-1" />
                                        ) : (
                                            <EyeOff className="h-4 w-4 mr-1" />
                                        )}
                                        {hideCompleted
                                            ? "Show All"
                                            : "Hide Done"}
                                    </Button>
                                </div>
                            </div>
                            <CardDescription>
                                {reminders.filter((r) => r.completed).length} of{" "}
                                {reminders.length} completed
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {filteredReminders.map((reminder) => (
                                    <div
                                        key={reminder.id}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                                        <Checkbox
                                            checked={reminder.completed}
                                            onCheckedChange={() =>
                                                toggleReminder(reminder.id)
                                            }
                                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                        />
                                        <div className="flex items-center gap-2 flex-1">
                                            {reminder.type === "workout" ? (
                                                <Dumbbell className="h-4 w-4 text-blue-600" />
                                            ) : (
                                                <UtensilsCrossed className="h-4 w-4 text-green-600" />
                                            )}
                                            <span
                                                className={`${
                                                    reminder.completed
                                                        ? "line-through text-muted-foreground"
                                                        : "text-foreground"
                                                }`}>
                                                {reminder.name}
                                            </span>
                                        </div>
                                        <Badge
                                            variant={
                                                reminder.type === "workout"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                reminder.type === "workout"
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                            }>
                                            {reminder.type}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Essential Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Vital Signs Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="border-red-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
                                        <Heart className="h-4 w-4" />
                                        Blood Pressure
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">
                                        120/80
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <TrendingDown className="h-3 w-3 text-green-500" />
                                        Normal range
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                                        <Activity className="h-4 w-4" />
                                        Heart Rate
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">
                                        72 BPM
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        Resting rate
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-purple-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                                        <Droplets className="h-4 w-4" />
                                        SpO₂
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-600">
                                        98%
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Excellent
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-orange-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                                        <Thermometer className="h-4 w-4" />
                                        Bio Age
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-600">
                                        28 yrs
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        2 yrs younger
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Progress Charts */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-red-700">
                                        Blood Pressure Trend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={120}>
                                        <LineChart data={bloodPressureData}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#f0f0f0"
                                            />
                                            <XAxis
                                                dataKey="day"
                                                tick={{ fontSize: 10 }}
                                            />
                                            <YAxis
                                                domain={[70, 130]}
                                                tick={{ fontSize: 10 }}
                                            />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="systolic"
                                                stroke="#dc2626"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="diastolic"
                                                stroke="#f97316"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-blue-700">
                                        Heart Rate Today
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={120}>
                                        <AreaChart data={heartRateData}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#f0f0f0"
                                            />
                                            <XAxis
                                                dataKey="time"
                                                tick={{ fontSize: 10 }}
                                            />
                                            <YAxis
                                                domain={[60, 90]}
                                                tick={{ fontSize: 10 }}
                                            />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="rate"
                                                stroke="#2563eb"
                                                fill="#3b82f6"
                                                fillOpacity={0.2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
