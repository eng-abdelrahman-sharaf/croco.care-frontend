"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Heart,
    Activity,
    Thermometer,
    AlertTriangle,
    UserCheck,
    Stethoscope,
} from "lucide-react";

// Sample reports data
const reportsData = [
    {
        id: "report-1",
        date: "December 15, 2024",
        title: "Comprehensive Health Assessment",
        vitals: {
            heartRate: { value: 85, unit: "bpm", status: "normal" },
            spo2: { value: 97, unit: "%", status: "normal" },
            bloodPressure: {
                systolic: 140,
                diastolic: 90,
                unit: "mmHg",
                status: "high",
            },
            temperature: { value: 98.6, unit: "°F", status: "normal" },
        },
        labResults: [
            {
                examination: "Complete Blood Count",
                result: "Normal",
                unit: "cells/μL",
                normalValue: "4,500-11,000",
            },
            {
                examination: "Cholesterol Total",
                result: "220",
                unit: "mg/dL",
                normalValue: "<200",
            },
            {
                examination: "Blood Glucose",
                result: "95",
                unit: "mg/dL",
                normalValue: "70-100",
            },
            {
                examination: "Hemoglobin A1C",
                result: "5.8",
                unit: "%",
                normalValue: "<5.7",
            },
            {
                examination: "Creatinine",
                result: "1.1",
                unit: "mg/dL",
                normalValue: "0.6-1.2",
            },
        ],
        alerts: [
            {
                type: "warning",
                message: "Elevated blood pressure detected",
                severity: "moderate",
            },
            {
                type: "info",
                message: "Cholesterol levels slightly above normal",
                severity: "low",
            },
        ],
        specialization: "Cardiologist",
        suspectedProblems: ["Hypertension", "Borderline High Cholesterol"],
    },
    {
        id: "report-2",
        date: "November 28, 2024",
        title: "Cardiac Function Evaluation",
        vitals: {
            heartRate: { value: 92, unit: "bpm", status: "elevated" },
            spo2: { value: 96, unit: "%", status: "normal" },
            bloodPressure: {
                systolic: 135,
                diastolic: 85,
                unit: "mmHg",
                status: "elevated",
            },
            temperature: { value: 98.4, unit: "°F", status: "normal" },
        },
        labResults: [
            {
                examination: "Troponin I",
                result: "0.02",
                unit: "ng/mL",
                normalValue: "<0.04",
            },
            {
                examination: "BNP",
                result: "45",
                unit: "pg/mL",
                normalValue: "<100",
            },
            {
                examination: "CK-MB",
                result: "2.1",
                unit: "ng/mL",
                normalValue: "<6.3",
            },
            {
                examination: "LDL Cholesterol",
                result: "145",
                unit: "mg/dL",
                normalValue: "<100",
            },
        ],
        alerts: [
            {
                type: "warning",
                message: "Resting heart rate consistently elevated",
                severity: "moderate",
            },
            {
                type: "emergency",
                message: "Immediate cardiology consultation recommended",
                severity: "high",
            },
        ],
        specialization: "Cardiologist",
        suspectedProblems: ["Tachycardia", "Cardiovascular Risk Factors"],
    },
    {
        id: "report-3",
        date: "October 10, 2024",
        title: "Routine Physical Examination",
        vitals: {
            heartRate: { value: 78, unit: "bpm", status: "normal" },
            spo2: { value: 98, unit: "%", status: "normal" },
            bloodPressure: {
                systolic: 125,
                diastolic: 80,
                unit: "mmHg",
                status: "normal",
            },
            temperature: { value: 98.2, unit: "°F", status: "normal" },
        },
        labResults: [
            {
                examination: "Vitamin D",
                result: "18",
                unit: "ng/mL",
                normalValue: "30-100",
            },
            {
                examination: "Thyroid TSH",
                result: "2.5",
                unit: "mIU/L",
                normalValue: "0.4-4.0",
            },
            {
                examination: "Iron",
                result: "85",
                unit: "μg/dL",
                normalValue: "60-170",
            },
            {
                examination: "B12",
                result: "350",
                unit: "pg/mL",
                normalValue: "200-900",
            },
        ],
        alerts: [
            {
                type: "info",
                message: "Vitamin D deficiency detected",
                severity: "low",
            },
        ],
        specialization: "General Practitioner",
        suspectedProblems: ["Vitamin D Deficiency"],
    },
];

const getVitalStatusColor = (status: string) => {
    switch (status) {
        case "normal":
            return "text-green-600 bg-green-50 border-green-200";
        case "elevated":
            return "text-yellow-600 bg-yellow-50 border-yellow-200";
        case "high":
            return "text-red-600 bg-red-50 border-red-200";
        default:
            return "text-gray-600 bg-gray-50 border-gray-200";
    }
};

const getAlertVariant = (type: string) => {
    switch (type) {
        case "emergency":
            return "destructive";
        case "warning":
            return "default";
        case "info":
            return "default";
        default:
            return "default";
    }
};

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-blue-50/30 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-blue-900">
                        Medical Reports
                    </h1>
                    <p className="text-blue-600">
                        Comprehensive health assessments and diagnostic results
                    </p>
                </div>

                {/* Reports Accordion */}
                <Card className="border-blue-200 p-0 overflow-hidden gap-0">
                    <CardHeader className="bg-blue-50 py-6 border-b-blue-200 border">
                        <CardTitle className="text-blue-900 flex items-center gap-2">
                            <Stethoscope className="h-5 w-5" />
                            Patient Reports
                        </CardTitle>
                        <CardDescription className="text-blue-600">
                            View detailed medical reports and assessments
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Accordion type="single" collapsible className="w-full">
                            {reportsData.map((report) => (
                                <AccordionItem
                                    key={report.id}
                                    value={report.id}
                                    className="border-blue-100">
                                    <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                        <div className="flex items-center justify-between w-full mr-4">
                                            <span>{report.title}</span>
                                            <span className="text-sm text-blue-600 font-normal">
                                                {report.date}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 space-y-6">
                                        {/* Vitals Row */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                                                <Activity className="h-5 w-5" />
                                                Vital Signs
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div
                                                    className={`p-3 rounded-lg border ${getVitalStatusColor(
                                                        report.vitals.heartRate
                                                            .status
                                                    )}`}>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Heart className="h-4 w-4" />
                                                        <span className="text-sm font-medium">
                                                            Heart Rate
                                                        </span>
                                                    </div>
                                                    <div className="text-lg font-bold">
                                                        {
                                                            report.vitals
                                                                .heartRate.value
                                                        }{" "}
                                                        {
                                                            report.vitals
                                                                .heartRate.unit
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className={`p-3 rounded-lg border ${getVitalStatusColor(
                                                        report.vitals.spo2
                                                            .status
                                                    )}`}>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Activity className="h-4 w-4" />
                                                        <span className="text-sm font-medium">
                                                            SpO₂
                                                        </span>
                                                    </div>
                                                    <div className="text-lg font-bold">
                                                        {
                                                            report.vitals.spo2
                                                                .value
                                                        }
                                                        {
                                                            report.vitals.spo2
                                                                .unit
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className={`p-3 rounded-lg border ${getVitalStatusColor(
                                                        report.vitals
                                                            .bloodPressure
                                                            .status
                                                    )}`}>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Activity className="h-4 w-4" />
                                                        <span className="text-sm font-medium">
                                                            Blood Pressure
                                                        </span>
                                                    </div>
                                                    <div className="text-lg font-bold">
                                                        {
                                                            report.vitals
                                                                .bloodPressure
                                                                .systolic
                                                        }
                                                        /
                                                        {
                                                            report.vitals
                                                                .bloodPressure
                                                                .diastolic
                                                        }{" "}
                                                        {
                                                            report.vitals
                                                                .bloodPressure
                                                                .unit
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className={`p-3 rounded-lg border ${getVitalStatusColor(
                                                        report.vitals
                                                            .temperature.status
                                                    )}`}>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Thermometer className="h-4 w-4" />
                                                        <span className="text-sm font-medium">
                                                            Temperature
                                                        </span>
                                                    </div>
                                                    <div className="text-lg font-bold">
                                                        {
                                                            report.vitals
                                                                .temperature
                                                                .value
                                                        }
                                                        {
                                                            report.vitals
                                                                .temperature
                                                                .unit
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lab Results Table */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-blue-900">
                                                Laboratory Results
                                            </h3>
                                            <div className="border border-blue-200 rounded-lg overflow-hidden">
                                                <Table>
                                                    <TableHeader className="bg-blue-50">
                                                        <TableRow>
                                                            <TableHead className="text-blue-900 font-semibold">
                                                                Examination
                                                            </TableHead>
                                                            <TableHead className="text-blue-900 font-semibold">
                                                                Result
                                                            </TableHead>
                                                            <TableHead className="text-blue-900 font-semibold">
                                                                Unit
                                                            </TableHead>
                                                            <TableHead className="text-blue-900 font-semibold">
                                                                Normal Value
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {report.labResults.map(
                                                            (lab, index) => (
                                                                <TableRow
                                                                    key={index}
                                                                    className="hover:bg-blue-50/50">
                                                                    <TableCell className="font-medium text-blue-900">
                                                                        {
                                                                            lab.examination
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="text-blue-800">
                                                                        {
                                                                            lab.result
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="text-blue-600">
                                                                        {
                                                                            lab.unit
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="text-blue-600">
                                                                        {
                                                                            lab.normalValue
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>

                                        {/* Alerts */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                                                <AlertTriangle className="h-5 w-5" />
                                                Health Alerts
                                            </h3>
                                            <div className="space-y-2">
                                                {report.alerts.map(
                                                    (alert, index) => (
                                                        <Alert
                                                            key={index}
                                                            variant={getAlertVariant(
                                                                alert.type
                                                            )}
                                                            className="border-blue-200">
                                                            <AlertTriangle className="h-4 w-4" />
                                                            <AlertTitle className="capitalize">
                                                                {alert.type}
                                                            </AlertTitle>
                                                            <AlertDescription>
                                                                {alert.message}
                                                            </AlertDescription>
                                                        </Alert>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Doctor Specialization */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                                                <UserCheck className="h-5 w-5" />
                                                Recommended Specialist
                                            </h3>
                                            <Badge
                                                variant="outline"
                                                className="text-blue-700 border-blue-300 bg-blue-50 text-base px-4 py-2">
                                                {report.specialization}
                                            </Badge>
                                        </div>

                                        {/* Suspected Health Problems */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-blue-900">
                                                Suspected Health Conditions
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {report.suspectedProblems.map(
                                                    (problem, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="bg-blue-100 text-blue-800 border-blue-200">
                                                            {problem}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
