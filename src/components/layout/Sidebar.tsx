"use client";

import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home,
    Heart,
    Users,
    AlertTriangle,
    BarChart3,
    Settings,
    User,
    Package,
    Building2,
} from "lucide-react";

const menuItems = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: Home,
    },
    {
        href: "/dashboard/mis-axolotls",
        label: "Mis Axolotls",
        icon: Heart,
    },
    {
        href: "/dashboard/reproduccion",
        label: "Reproducción",
        icon: Users,
    },
    {
        href: "/dashboard/alertas",
        label: "Alertas",
        icon: AlertTriangle,
    },
    {
        href: "/dashboard/reportes",
        label: "Reportes",
        icon: BarChart3,
    },
    {
        href: "/dashboard/estanques",
        label: "Estanques",
        icon: Package,
    },
    {
        href: "/dashboard/ajolotarios",
        label: "Ajolotarios",
        icon: Building2,
    },
    {
        href: "/dashboard/configuracion",
        label: "Configuración",
        icon: Settings,
    },
    {
        href: "/dashboard/perfil",
        label: "Perfil",
        icon: User,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

    return (
        <aside
            className={cn(
                "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-background border-r border-gray-200 transition-all duration-300 z-40",
                sidebarOpen ? "w-64" : "w-0 overflow-hidden"
            )}
        >
            <nav className="p-3 h-full overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group",
                                    isActive
                                        ? "bg-primary text-secondary"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <Icon
                                    size={18}
                                    className={cn(
                                        "transition-transform duration-200",
                                        isActive
                                            ? "text-secondary"
                                            : "text-gray-500 group-hover:text-gray-700"
                                    )}
                                />
                                <span className="truncate">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary opacity-80"></div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}
