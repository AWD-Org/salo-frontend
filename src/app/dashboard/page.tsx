"use client";

import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
    Heart,
    AlertTriangle,
    Users,
    Package,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Mock data para el dashboard
const mockStats = {
    totalAxolotls: 45,
    healthyAxolotls: 38,
    alerts: 7,
    reproductions: 12,
    ponds: 8,
    axolotaries: 3,
};

const monthlyData = [
    { name: "Ene", axolotls: 30, reproductions: 5 },
    { name: "Feb", axolotls: 32, reproductions: 7 },
    { name: "Mar", axolotls: 35, reproductions: 8 },
    { name: "Abr", axolotls: 40, reproductions: 10 },
    { name: "May", axolotls: 45, reproductions: 12 },
];

const healthData = [
    { name: "Saludables", value: 38, color: "#059669" }, // More muted emerald green
    { name: "En Tratamiento", value: 5, color: "#D97706" }, // More muted amber
    { name: "Crítico", value: 2, color: "#DC2626" }, // More muted red
];

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const alertsCount = useAppSelector((state) => state.alert.unreadCount);

    if (status === "loading") {
        return (
            <div className="space-y-8 p-6">
                {/* Header Skeleton */}
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                    <Skeleton className="h-9 w-32" />
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} padding="none">
                            <div className="p-6">
                                <div className="flex items-center justify-between space-y-0 pb-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton
                                        variant="circular"
                                        className="w-8 h-8"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Skeleton className="h-8 w-16" />
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-3 w-8" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Charts Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-64" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-80 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Activity Skeleton */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                >
                                    <Skeleton
                                        variant="circular"
                                        className="w-8 h-8"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                    <Skeleton className="h-3 w-8" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!session) {
        redirect("/login");
    }

    const statCards = [
        {
            title: "Total Axolotls",
            value: mockStats.totalAxolotls,
            change: "+12%",
            changeType: "positive" as const,
            icon: Heart,
            color: "text-pink-600",
            bgColor: "bg-pink-50",
            description: "En total en el sistema",
        },
        {
            title: "Alertas Activas",
            value: alertsCount || mockStats.alerts,
            change: "-3%",
            changeType: "positive" as const,
            icon: AlertTriangle,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            description: "Requieren atención",
        },
        {
            title: "Reproducciones",
            value: mockStats.reproductions,
            change: "+8%",
            changeType: "positive" as const,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            description: "Activas este mes",
        },
        {
            title: "Estanques",
            value: mockStats.ponds,
            change: "0%",
            changeType: "neutral" as const,
            icon: Package,
            color: "text-green-600",
            bgColor: "bg-green-50",
            description: "En funcionamiento",
        },
    ];

    return (
        <div className="space-y-8 p-6">
            {/* Header Section */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Bienvenido de vuelta, {session.user?.name}
                    </p>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus size={16} />
                    Añadir Axolotl
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            variant="interactive"
                            className="group"
                        >
                            <div>
                                <div className="flex items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </CardTitle>
                                    <div
                                        className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 ${stat.color}`}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                        <span
                                            className={`inline-flex items-center gap-1 ${
                                                stat.changeType ===
                                                    "positive" &&
                                                stat.change.startsWith("+")
                                                    ? "text-green-600"
                                                    : stat.changeType ===
                                                          "positive" &&
                                                      stat.change.startsWith(
                                                          "-"
                                                      )
                                                    ? "text-red-600"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {stat.change.startsWith("+") && (
                                                <ArrowUpRight className="w-3 h-3" />
                                            )}
                                            {stat.change.startsWith("-") && (
                                                <ArrowDownRight className="w-3 h-3" />
                                            )}
                                            {stat.change}
                                        </span>
                                        <span className="text-gray-500">
                                            {stat.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">
                            Crecimiento Mensual
                        </CardTitle>
                        <CardDescription>
                            Evolución de axolotls y reproducciones
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[320px] -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f3f4f6"
                                        strokeOpacity={0.5}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        fontSize={12}
                                        tick={{ fill: "#9ca3af" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        fontSize={12}
                                        tick={{ fill: "#9ca3af" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Bar
                                        dataKey="axolotls"
                                        fill="#FEF1F2"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="reproductions"
                                        fill="#1f1f1f"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Health Distribution */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-semibold">
                            Estado de Salud
                        </CardTitle>
                        <CardDescription>
                            Distribución del estado de salud de los axolotls
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={healthData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value, percent }) =>
                                            `${name}: ${value} (${(
                                                percent * 100
                                            ).toFixed(0)}%)`
                                        }
                                        outerRadius={100}
                                        dataKey="value"
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    >
                                        {healthData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fbfbfb",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            boxShadow: "none",
                                            fontSize: "12px",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">
                        Actividad Reciente
                    </CardTitle>
                    <CardDescription>
                        Últimas actividades en el sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Heart className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                    Nuevo axolotl registrado
                                </p>
                                <p className="text-sm text-gray-600">
                                    'Luna' agregado al estanque principal
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">2h</span>
                        </div>

                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                    Alerta de temperatura
                                </p>
                                <p className="text-sm text-gray-600">
                                    Estanque #2 fuera del rango óptimo
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">4h</span>
                        </div>

                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Users className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                    Reproducción exitosa
                                </p>
                                <p className="text-sm text-gray-600">
                                    12 huevos detectados en pareja #3
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">1d</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
