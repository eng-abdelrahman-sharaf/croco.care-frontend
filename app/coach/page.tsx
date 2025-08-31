"use client";

import type React from "react";

import { useState } from "react";
import {
    Calendar,
    X,
    Flame,
    Scale,
    TrendingUp,
    Target,
    ChevronLeft,
    ChevronRight,
    Send,
    Bot,
    Utensils,
    Dumbbell,
    Play,
    Clock,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Message {
    id: number;
    text: string;
    sender: "user" | "coach";
    // timestamp: Date;
}

import { dayData, Workout, Meal, DayData } from "@/lib/dayData";
import { cn } from "@/lib/utils";

export default function CoachPage() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const [selectedDay, setDay] = useState<number>(today.getDate());
    const [selectedTab, setSelectedTab] = useState<"workouts" | "meals">(
        dayData[selectedDay].workouts.length ? "workouts" : "meals"
    );

    const setSelectedDay = (day: number) => {
        setSelectedTab(dayData[day].workouts.length ? "workouts" : "meals");
        setDay(day);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Workout | Meal | null>(
        null
    );
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your personal fitness coach. I'm here to help you achieve your health and fitness goals. How are you feeling today?",
            sender: "coach",
            // timestamp: new Date(),
        },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isCoachTyping, setIsCoachTyping] = useState(false);

    // ...existing code...

    const [workoutStatus, setWorkoutStatus] = useState<
        Record<number, "done" | "not-done" | "not-provided">
    >({
        3: "done",
        5: "not-done",
        8: "not-provided",
        10: "done",
        12: "not-done",
        15: "not-provided",
        17: "done",
        19: "not-done",
        22: "not-provided",
        24: "done",
        26: "not-done",
        29: "not-provided",
    });

    const sendMessage = () => {
        if (newMessage.trim()) {
            const userMessage: Message = {
                id: messages.length + 1,
                text: newMessage,
                sender: "user",
                // timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setNewMessage("");

            // Simulate coach response
            // Simulate coach typing effect
            setIsCoachTyping(true);
            setTimeout(() => {
                setIsCoachTyping(false);
                const coachResponse: Message = {
                    id: messages.length + 2,
                    text: "That's great to hear! Based on your recent progress, I recommend focusing on your cardio today. Would you like me to suggest a specific workout routine?",
                    sender: "coach",
                    // timestamp: new Date(),
                };
                setMessages((prev) => [...prev, coachResponse]);
            }, 1200);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    const handleItemClick = (item: Workout | Meal) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleStatusChange = (
        day: number,
        newStatus: "done" | "not-done" | "not-provided"
    ) => {
        setWorkoutStatus((prev) => ({
            ...prev,
            [day]: newStatus,
        }));
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (direction === "prev") {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Deriving workoutDays from dayData keys that have at least one workout
    const workoutDays = Object.keys(dayData)
        .map(Number)
        .filter((day) => dayData[day]?.workouts?.length > 0);

    const analyticsData = [
        {
            title: "Calories Burnt",
            value: "2,450",
            unit: "kcal",
            icon: Flame,
            change: "+12%",
            changeType: "positive" as const,
            color: "red",
        },
        {
            title: "Current Weight",
            value: "72.5",
            unit: "kg",
            icon: Scale,
            change: "-2.1kg",
            changeType: "positive" as const,
            color: "green",
        },
        {
            title: "Calories Gained",
            value: "1,850",
            unit: "kcal",
            icon: TrendingUp,
            change: "+5%",
            changeType: "neutral" as const,
            color: "blue",
        },
        {
            title: "Weekly Goal",
            value: "85",
            unit: "%",
            icon: Target,
            change: "+15%",
            changeType: "positive" as const,
            color: "indigo",
        },
    ];

    const isDayPastOrToday = (day: number) => {
        const selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate <= todayDate;
    };

    return (
        <div className="min-h-screen relative">
            {/* Main Content */}
            <main className="p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-blue-900">
                            Your Coach Dashboard
                        </h1>
                        <Button
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            variant="outline"
                            size="sm"
                            className="border-blue-200 text-blue-600 hover:bg-blue-50">
                            <Calendar className="h-4 w-4 mr-2" />
                            Calendar
                        </Button>
                    </div>

                    {/* Main Grid Layout */}
                    {/* <div className="flex gap-8 justify-between flex-wrap"> */}
                    <div className="grid grid-cols-3 gap-8 ">
                        {/* Coach Chat Interface */}
                        <div className="space-y-6 col-span-2">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">
                                Coach Chat
                            </h2>
                            <Card className="border-blue-200 grow h-96 flex flex-col">
                                <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Bot className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">
                                                AI Coach
                                            </p>
                                            {/* <p className="text-xs text-blue-600">
                                                Online
                                            </p> */}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                                    <ScrollArea className="flex-1 p-4 overflow-y-auto">
                                        <div className="space-y-4">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${
                                                        message.sender ===
                                                        "user"
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}>
                                                    <div
                                                        className={`max-w-[80%] p-3 rounded-lg ${
                                                            message.sender ===
                                                            "user"
                                                                ? "bg-blue-600 text-white"
                                                                : "bg-blue-50 text-blue-900 border border-blue-200"
                                                        }`}>
                                                        <p className="text-sm">
                                                            {message.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {isCoachTyping && (
                                                <div className="flex justify-start">
                                                    <div className="max-w-[80%] p-3 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
                                                        <p className="text-sm flex items-center gap-2">
                                                            <span>
                                                                Coach is typing
                                                            </span>
                                                            <span className="animate-bounce">
                                                                ...
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>
                                    <div className="p-4 border-t border-blue-200">
                                        <div className="flex space-x-2">
                                            <Input
                                                value={newMessage}
                                                onChange={(e) =>
                                                    setNewMessage(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={handleKeyPress}
                                                placeholder="Ask your coach anything..."
                                                className="flex-1 border-blue-200 focus:border-blue-400"
                                            />
                                            <Button
                                                onClick={sendMessage}
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Analytics Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">
                                Analytics Overview
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {analyticsData.map((item, index) => {
                                    const Icon = item.icon;
                                    let cardColor = "";
                                    let iconColor = "";
                                    const valueColor = "";
                                    const unitColor = "";
                                    let changeColor = "";
                                    switch (item.color) {
                                        case "red":
                                            cardColor =
                                                "border-orange-200 hover:shadow-md border-2";
                                            changeColor = "text-orange-600";
                                            iconColor = "text-orange-500";
                                            break;
                                        case "green":
                                            cardColor =
                                                "border-green-200 hover:shadow-md border-2";
                                            changeColor = "text-green-600";
                                            iconColor = "text-green-600";
                                            break;
                                        case "blue":
                                            cardColor =
                                                "border-blue-200 hover:shadow-md border-2";
                                            changeColor = "text-blue-600";
                                            iconColor = "text-blue-600";
                                            break;
                                        case "indigo":
                                            cardColor =
                                                "border-indigo-200 hover:shadow-md border-2";
                                            changeColor = "text-indigo-600";
                                            iconColor = "text-indigo-600";
                                            break;
                                        default:
                                            cardColor =
                                                "border-blue-200 hover:shadow-md border-2";
                                            changeColor = "text-blue-600";
                                            iconColor = "text-blue-600";
                                    }
                                    return (
                                        <Card
                                            key={index}
                                            className={
                                                cardColor + " transition-shadow"
                                            }>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle
                                                    className={
                                                        "text-sm font-medium " +
                                                        valueColor
                                                    }>
                                                    {item.title}
                                                </CardTitle>
                                                <Icon
                                                    className={
                                                        "h-8 w-8 " + iconColor
                                                    }
                                                />
                                            </CardHeader>
                                            <CardContent>
                                                <div
                                                    className={
                                                        "text-2xl font-bold " +
                                                        valueColor
                                                    }>
                                                    {item.value}
                                                    <span
                                                        className={
                                                            "text-sm font-normal ml-1 " +
                                                            unitColor
                                                        }>
                                                        {item.unit}
                                                    </span>
                                                </div>
                                                <p
                                                    className={`text-xs mt-1 ${changeColor}`}>
                                                    {item.change} from last week
                                                </p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Weekly Progress Chart */}
                            <Card className="border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-blue-800">
                                        Weekly Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-blue-790">
                                                Workout Sessions
                                            </span>
                                            <span className="text-sm font-medium text-blue-900">
                                                5/7
                                            </span>
                                        </div>
                                        <div className="w-full bg-blue-100 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: "71%" }}></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-blue-790">
                                                Calorie Goal
                                            </span>
                                            <span className="text-sm font-medium text-blue-900">
                                                2,450/2,500
                                            </span>
                                        </div>
                                        <div className="w-full bg-blue-100 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: "98%" }}></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-blue-700">
                                                Water Intake
                                            </span>
                                            <span className="text-sm font-medium text-blue-900">
                                                2.1/2.5L
                                            </span>
                                        </div>
                                        <div className="w-full bg-blue-100 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: "84%" }}></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            {/* Calendar Right Sidebar */}
            {isCalendarOpen && (
                <div className="inset-y-0 right-0 w-80 fixed bg-white border-l border-blue-200 shadow-lg z-50 flex flex-col">
                    <div className="p-4 border-b border-blue-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-blue-900">
                                Calendar
                            </h3>
                            <Button
                                onClick={() => setIsCalendarOpen(false)}
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:bg-blue-50">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 overflow-y-auto">
                        <div className="p-4">
                            <div className="space-y-4">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between">
                                    <Button
                                        onClick={() => navigateMonth("prev")}
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-600 hover:bg-blue-50">
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <h4 className="text-lg font-semibold text-blue-900">
                                        {monthNames[currentDate.getMonth()]}{" "}
                                        {currentDate.getFullYear()}
                                    </h4>
                                    <Button
                                        onClick={() => navigateMonth("next")}
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-600 hover:bg-blue-50">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {/* Day Headers */}
                                    {dayNames.map((day) => (
                                        <div
                                            key={day}
                                            className="text-center text-xs font-medium text-blue-700 py-2">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Empty cells for days before month starts */}
                                    {Array.from(
                                        { length: firstDay },
                                        (_, i) => (
                                            <div
                                                key={`empty-${i}`}
                                                className="h-8"></div>
                                        )
                                    )}

                                    {/* Calendar Days */}
                                    {Array.from(
                                        { length: daysInMonth },
                                        (_, i) => {
                                            const day = i + 1;
                                            const isToday =
                                                today.getDate() === day &&
                                                today.getMonth() ===
                                                    currentDate.getMonth() &&
                                                today.getFullYear() ===
                                                    currentDate.getFullYear();
                                            const hasWorkout =
                                                workoutDays.includes(day);
                                            const status = workoutStatus[day];

                                            const dayClasses = cn(
                                                "h-8 flex items-center justify-center text-sm rounded cursor-pointer transition-colors",
                                                isToday &&
                                                    "border border-blue-600",
                                                hasWorkout
                                                    ? status === "done"
                                                        ? "bg-green-100 text-green-800 font-medium hover:bg-green-200 border border-green-300"
                                                        : status === "not-done"
                                                        ? "bg-red-100 text-red-800 font-medium hover:bg-red-200 border border-red-300"
                                                        : "bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 border border-gray-300"
                                                    : "text-blue-700 hover:bg-blue-50"
                                            );

                                            return (
                                                <div
                                                    key={day}
                                                    className={dayClasses}
                                                    onClick={() =>
                                                        handleDayClick(day)
                                                    }>
                                                    {day}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>

                                {/* Legend */}
                                <div className="space-y-2 pt-4 border-t border-blue-200">
                                    <h5 className="text-sm font-medium text-blue-800">
                                        Workout Status Legend
                                    </h5>
                                    <div className="flex gap-2 flex-wrap">
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                            <span className="text-blue-700">
                                                Today
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                                            <span className="text-blue-700">
                                                Completed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                                            <span className="text-blue-700">
                                                Not Completed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
                                            <span className="text-blue-700">
                                                No Status
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {selectedDay && (
                                    <div className="space-y-4 pt-4 border-t border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-sm font-medium text-blue-800">
                                                Day {selectedDay} Details
                                            </h5>
                                            <Button
                                                onClick={() =>
                                                    setSelectedDay(
                                                        today.getDay()
                                                    )
                                                }
                                                variant="ghost"
                                                size="sm"
                                                className="text-blue-600 hover:bg-blue-50 h-6 w-6 p-0">
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>

                                        {isDayPastOrToday(selectedDay) &&
                                            dayData[selectedDay]?.workouts
                                                ?.length > 0 && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium text-blue-800">
                                                        Workout Status:
                                                    </label>
                                                    <Select
                                                        value={
                                                            workoutStatus[
                                                                selectedDay
                                                            ] || "not-provided"
                                                        }
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            handleStatusChange(
                                                                selectedDay,
                                                                value as
                                                                    | "done"
                                                                    | "not-done"
                                                                    | "not-provided"
                                                            )
                                                        }>
                                                        <SelectTrigger className="w-full h-8 text-xs">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="done">
                                                                Completed
                                                            </SelectItem>
                                                            <SelectItem value="not-done">
                                                                Not Completed
                                                            </SelectItem>
                                                            <SelectItem value="not-provided">
                                                                No Status
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                        <Tabs
                                            value={selectedTab}
                                            onValueChange={(value) =>
                                                setSelectedTab(
                                                    value as
                                                        | "workouts"
                                                        | "meals"
                                                )
                                            }>
                                            <TabsList
                                                className={`grid w-full rounded-full py-2 gap-2 px-2 h-auto  ${
                                                    dayData[selectedDay]
                                                        ?.workouts?.length > 0
                                                        ? "grid-cols-2"
                                                        : "grid-cols-1"
                                                }`}>
                                                {dayData[selectedDay]?.workouts
                                                    ?.length > 0 && (
                                                    <TabsTrigger
                                                        value="workouts"
                                                        className="text-xs rounded-full data-[state=active]:bg-blue-200">
                                                        <Dumbbell className="h-3 w-3 mr-1" />
                                                        Workouts
                                                    </TabsTrigger>
                                                )}
                                                <TabsTrigger
                                                    value="meals"
                                                    className="text-xs rounded-full data-[state=active]:bg-blue-200">
                                                    <Utensils className="h-3 w-3 mr-1" />
                                                    Meals
                                                </TabsTrigger>
                                            </TabsList>

                                            {dayData[selectedDay]?.workouts
                                                ?.length > 0 && (
                                                <TabsContent
                                                    value="workouts"
                                                    className="space-y-2">
                                                    {dayData[
                                                        selectedDay
                                                    ].workouts.map(
                                                        (workout) => (
                                                            <div
                                                                key={workout.id}
                                                                className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                                                                onClick={() =>
                                                                    handleItemClick(
                                                                        workout
                                                                    )
                                                                }>
                                                                <div className="flex items-center gap-2">
                                                                    <img
                                                                        src={
                                                                            workout.image ||
                                                                            "/placeholder.svg"
                                                                        }
                                                                        alt={
                                                                            workout.name
                                                                        }
                                                                        className="w-8 h-8 rounded object-cover"
                                                                    />
                                                                    <div className="flex-1">
                                                                        <div className="text-sm font-medium text-blue-900">
                                                                            {
                                                                                workout.name
                                                                            }
                                                                        </div>
                                                                        <div className="text-xs text-blue-600">
                                                                            {
                                                                                workout.sets
                                                                            }
                                                                            x
                                                                            {
                                                                                workout.reps
                                                                            }{" "}
                                                                            •{" "}
                                                                            {
                                                                                workout.muscleGroup
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </TabsContent>
                                            )}

                                            <TabsContent
                                                value="meals"
                                                className="space-y-2">
                                                {dayData[selectedDay]?.meals
                                                    ?.length > 0 ? (
                                                    dayData[
                                                        selectedDay
                                                    ].meals.map((meal) => (
                                                        <div
                                                            key={meal.id}
                                                            className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                                                            onClick={() =>
                                                                handleItemClick(
                                                                    meal
                                                                )
                                                            }>
                                                            <div className="flex items-center gap-2">
                                                                <img
                                                                    src={
                                                                        meal.image ||
                                                                        "/placeholder.svg"
                                                                    }
                                                                    alt={
                                                                        meal.name
                                                                    }
                                                                    className="w-8 h-8 rounded object-cover"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="text-sm font-medium text-blue-900">
                                                                        {
                                                                            meal.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-blue-600">
                                                                        {
                                                                            meal.duration
                                                                        }{" "}
                                                                        •{" "}
                                                                        {
                                                                            meal.calories
                                                                        }{" "}
                                                                        cal
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-4 text-sm text-blue-600">
                                                        No meals scheduled for
                                                        this day
                                                    </div>
                                                )}
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-md">
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-blue-900">
                                    {selectedItem.name}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                {"videoUrl" in selectedItem &&
                                selectedItem.videoUrl ? (
                                    <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-black">
                                        <iframe
                                            src={selectedItem.videoUrl}
                                            title={selectedItem.name}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={
                                            "image" in selectedItem
                                                ? selectedItem.image
                                                : "/placeholder.svg?height=200&width=300&query=workout"
                                        }
                                        alt={selectedItem.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}

                                <div className="flex items-center gap-4 text-sm text-blue-700">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {selectedItem.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Zap className="h-4 w-4" />
                                        {selectedItem.calories} cal
                                    </div>
                                    {"sets" in selectedItem && (
                                        <div className="flex items-center gap-1">
                                            <Dumbbell className="h-4 w-4" />
                                            {selectedItem.sets}x
                                            {selectedItem.reps}
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-blue-800">
                                    {selectedItem.description}
                                </p>

                                <div className="space-y-2">
                                    <h4 className="font-medium text-blue-900">
                                        {"steps" in selectedItem
                                            ? "Instructions:"
                                            : "Ingredients:"}
                                    </h4>
                                    <div className="space-y-1">
                                        {(() => {
                                            if (
                                                "steps" in selectedItem &&
                                                selectedItem.steps
                                            ) {
                                                return (
                                                    selectedItem.steps as string[]
                                                ).map(
                                                    (
                                                        item: string,
                                                        index: number
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="text-sm text-blue-700 flex items-start gap-2">
                                                            <span className="text-blue-500 font-medium">
                                                                {index + 1}.
                                                            </span>
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                );
                                            } else if (
                                                "ingredients" in selectedItem &&
                                                selectedItem.ingredients
                                            ) {
                                                return (
                                                    selectedItem.ingredients as string[]
                                                ).map(
                                                    (
                                                        item: string,
                                                        index: number
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="text-sm text-blue-700 flex items-start gap-2">
                                                            <span className="text-blue-500 font-medium">
                                                                {index + 1}.
                                                            </span>
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                );
                                            } else {
                                                return null;
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
