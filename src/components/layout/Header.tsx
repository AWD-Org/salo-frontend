"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toggleSidebar } from "@/redux/reducers/uiSlice";
import { useSession, signOut } from "next-auth/react";
import { Menu, LogOut, Settings, User } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import Link from "next/link";
import Image from "next/image";
import navLogo from "@/assets/logo/black-logo.png";

export function Header() {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <header className="sticky top-0 z-50 bg-background border-b border-gray-200 px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={navLogo} alt="Logo" height={80} width={80} />
                </Link>
            </div>

            <div className="flex items-center gap-2">
                {session ? (
                    <Dropdown
                        trigger={
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-6 h-6 rounded-full bg-primary text-secondary flex items-center justify-center text-sm font-medium">
                                    {session.user?.name?.[0]?.toUpperCase() ||
                                        "U"}
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {session.user?.name || session.user?.email}
                                </span>
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        }
                    >
                        <div className="py-1 min-w-[200px]">
                            <Link
                                href="/dashboard/perfil"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <User size={16} />
                                Perfil
                            </Link>
                            <Link
                                href="/dashboard/configuracion"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <Settings size={16} />
                                Configuración
                            </Link>
                            <div className="border-t border-gray-200 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                            >
                                <LogOut size={16} />
                                Cerrar Sesión
                            </button>
                        </div>
                    </Dropdown>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login">
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                Iniciar Sesión
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="px-3 py-1.5 text-sm font-medium bg-primary text-secondary rounded-md hover:bg-primary/90 transition-colors">
                                Registrarse
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
