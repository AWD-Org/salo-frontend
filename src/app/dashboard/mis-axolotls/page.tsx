"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
    Card,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/modal/Modal";
import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { Skeleton } from "@/components/ui/Skeleton";
import AxolotlForm from "@/components/axolotls/AxolotlForm";
import {
    Search,
    Filter,
    Plus,
    Heart,
    AlertTriangle,
    Activity,
    Calendar,
    MoreVertical,
    Edit,
    Trash2,
    Gauge,
    Droplets,
    Thermometer,
    Building2,
} from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { toast } from "react-toastify";
import type {
    Axolotl,
    CreateAxolotlData,
    UpdateAxolotlData,
    Axolotary,
} from "@/types";
import { cn } from "@/lib/utils";

// Mock data - in a real app, this would come from API/Redux
const mockAxolotls: Axolotl[] = [
    {
        id: "1",
        axolotaryId: "axolotary-1",
        pondId: "pond-1",
        code: "AX001",
        name: "Luna",
        gender: "female",
        species: "Ambystoma mexicanum",
        birthDate: new Date("2023-03-15"),
        originZone: "Xochimilco",
        healthStatus: "healthy",
        lastHealthCheck: new Date("2024-12-01"),
        notes: "Muy activa y con buen apetito",
        isActive: true,
        createdDate: new Date("2023-03-15"),
        lastUpdatedDate: new Date("2024-12-01"),
    },
    {
        id: "2",
        axolotaryId: "axolotary-1",
        pondId: "pond-2",
        code: "AX002",
        name: "Shadow",
        gender: "male",
        species: "Ambystoma mexicanum",
        birthDate: new Date("2023-05-20"),
        originZone: "Chalco",
        healthStatus: "treatment",
        lastHealthCheck: new Date("2024-12-05"),
        notes: "En tratamiento por lesión en branquias",
        isActive: true,
        createdDate: new Date("2023-05-20"),
        lastUpdatedDate: new Date("2024-12-05"),
    },
    {
        id: "3",
        axolotaryId: "axolotary-2",
        pondId: "pond-3",
        code: "AX003",
        name: "Aurora",
        gender: "female",
        species: "Ambystoma mexicanum",
        birthDate: new Date("2023-01-10"),
        originZone: "Xochimilco",
        healthStatus: "healthy",
        lastHealthCheck: new Date("2024-11-28"),
        notes: "Excelente reproducción",
        isActive: true,
        createdDate: new Date("2023-01-10"),
        lastUpdatedDate: new Date("2024-11-28"),
    },
    {
        id: "4",
        axolotaryId: "axolotary-1",
        pondId: "pond-1",
        code: "AX004",
        name: "Coco",
        gender: "unknown",
        species: "Ambystoma mexicanum",
        birthDate: new Date("2023-08-12"),
        originZone: "Chalco",
        healthStatus: "sick",
        lastHealthCheck: new Date("2024-12-03"),
        notes: "Síntomas de estrés, separado temporalmente",
        isActive: true,
        createdDate: new Date("2023-08-12"),
        lastUpdatedDate: new Date("2024-12-03"),
    },
];

const mockAxolotaries: Axolotary[] = [
    {
        id: "axolotary-1",
        name: "Criadero Principal",
        description: "Instalación principal para axolotls",
        userId: "user-1",
        ponds: [
            {
                id: "pond-1",
                name: "Estanque A",
                capacity: 20,
                temperature: 18,
                axolotaryId: "axolotary-1",
                axolotls: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "pond-2",
                name: "Estanque B",
                capacity: 20,
                temperature: 19,
                axolotaryId: "axolotary-1",
                axolotls: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "axolotary-2",
        name: "Criadero Secundario",
        description: "Instalación para jóvenes",
        userId: "user-1",
        ponds: [
            {
                id: "pond-3",
                name: "Estanque C",
                capacity: 15,
                temperature: 17,
                axolotaryId: "axolotary-2",
                axolotls: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const getHealthStatusColor = (status: Axolotl["healthStatus"]) => {
    switch (status) {
        case "healthy":
            return {
                bg: "bg-green-50",
                text: "text-green-700",
                dot: "bg-green-500",
            };
        case "sick":
            return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
        case "treatment":
            return {
                bg: "bg-amber-50",
                text: "text-amber-700",
                dot: "bg-amber-500",
            };
        case "critical":
            return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-600" };
        default:
            return {
                bg: "bg-gray-50",
                text: "text-gray-700",
                dot: "bg-gray-500",
            };
    }
};

const getHealthStatusText = (status: Axolotl["healthStatus"]) => {
    switch (status) {
        case "healthy":
            return "Saludable";
        case "sick":
            return "Enfermo";
        case "treatment":
            return "En Tratamiento";
        case "critical":
            return "Crítico";
        default:
            return "Desconocido";
    }
};

const getGenderText = (gender: Axolotl["gender"]) => {
    switch (gender) {
        case "male":
            return "Macho";
        case "female":
            return "Hembra";
        default:
            return "Desconocido";
    }
};

export default function MisAxolotlsPage() {
    const { data: session, status } = useSession();
    const [axolotls, setAxolotls] = useState<Axolotl[]>(mockAxolotls);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<
        Axolotl["healthStatus"] | "all"
    >("all");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAxolotl, setEditingAxolotl] = useState<Axolotl | null>(null);
    const [deletingAxolotl, setDeletingAxolotl] = useState<Axolotl | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    if (status === "loading") {
        return (
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                    <Skeleton className="h-9 w-32" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-8 w-8" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!session) {
        redirect("/login");
    }

    const filteredAxolotls = axolotls.filter((axolotl) => {
        const matchesSearch =
            axolotl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            axolotl.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || axolotl.healthStatus === filterStatus;
        return matchesSearch && matchesFilter && axolotl.isActive;
    });

    const handleCreateAxolotl = async (data: CreateAxolotlData) => {
        setIsLoading(true);
        try {
            // In a real app, this would be an API call
            const newAxolotl: Axolotl = {
                ...data,
                id: Date.now().toString(),
                lastHealthCheck: new Date(),
                isActive: true,
                createdDate: new Date(),
                lastUpdatedDate: new Date(),
                notes: data.notes || "", // Ensure notes is never undefined
            };

            setAxolotls((prev) => [...prev, newAxolotl]);
            setIsCreateModalOpen(false);
            toast.success("Axolotl creado exitosamente");
        } catch (error) {
            console.error("Error creating axolotl:", error);
            toast.error("Error al crear axolotl");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateAxolotl = async (data: UpdateAxolotlData) => {
        setIsLoading(true);
        try {
            setAxolotls((prev) =>
                prev.map((axolotl) =>
                    axolotl.id === data.id
                        ? {
                              ...axolotl,
                              ...data,
                              notes: data.notes || axolotl.notes, // Keep existing notes if not provided
                              lastUpdatedDate: new Date(),
                          }
                        : axolotl
                )
            );
            setEditingAxolotl(null);
            toast.success("Axolotl actualizado exitosamente");
        } catch (error) {
            console.error("Error updating axolotl:", error);
            toast.error("Error al actualizar axolotl");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAxolotl = async (axolotl: Axolotl) => {
        setIsLoading(true);
        try {
            // In a real app, this would be a soft delete API call
            setAxolotls((prev) =>
                prev.map((a) =>
                    a.id === axolotl.id ? { ...a, isActive: false } : a
                )
            );
            setDeletingAxolotl(null);
            toast.success("Axolotl eliminado exitosamente");
        } catch (error) {
            console.error("Error deleting axolotl:", error);
            toast.error("Error al eliminar axolotl");
        } finally {
            setIsLoading(false);
        }
    };

    const healthStatusCounts = axolotls.reduce((acc, axolotl) => {
        if (axolotl.isActive) {
            acc[axolotl.healthStatus] = (acc[axolotl.healthStatus] || 0) + 1;
        }
        return acc;
    }, {} as Record<Axolotl["healthStatus"], number>);

    const handleClearFilters = () => {
        setSearchTerm("");
        setFilterStatus("all");
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Mis Axolotls
                    </h1>
                    <p className="text-gray-600">
                        Gestiona y supervisa todos tus axolotls
                    </p>
                </div>
                <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <Plus size={16} />
                    Nuevo Axolotl
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card variant="interactive" className="group">
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {filteredAxolotls.length}
                                </p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                                <Heart className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card variant="interactive" className="group">
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Saludables
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {healthStatusCounts.healthy || 0}
                                </p>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg group-hover:scale-110 transition-transform">
                                <Gauge className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card variant="interactive" className="group">
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    En Tratamiento
                                </p>
                                <p className="text-2xl font-bold text-amber-600">
                                    {healthStatusCounts.treatment || 0}
                                </p>
                            </div>
                            <div className="p-2 bg-amber-50 rounded-lg group-hover:scale-110 transition-transform">
                                <Activity className="w-5 h-5 text-amber-600" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card variant="interactive" className="group">
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Críticos
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {(healthStatusCounts.sick || 0) +
                                        (healthStatusCounts.critical || 0)}
                                </p>
                            </div>
                            <div className="p-2 bg-red-50 rounded-lg group-hover:scale-110 transition-transform">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Buscar por nombre o código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Dropdown
                    trigger={
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={16} />
                            {filterStatus === "all"
                                ? "Todos"
                                : getHealthStatusText(filterStatus)}
                        </Button>
                    }
                >
                    <div className="py-1 min-w-[150px]">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                                filterStatus === "all"
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            )}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilterStatus("healthy")}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                                filterStatus === "healthy"
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            )}
                        >
                            Saludables
                        </button>
                        <button
                            onClick={() => setFilterStatus("treatment")}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                                filterStatus === "treatment"
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            )}
                        >
                            En Tratamiento
                        </button>
                        <button
                            onClick={() => setFilterStatus("sick")}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                                filterStatus === "sick"
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            )}
                        >
                            Enfermos
                        </button>
                        <button
                            onClick={() => setFilterStatus("critical")}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                                filterStatus === "critical"
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            )}
                        >
                            Críticos
                        </button>
                    </div>
                </Dropdown>

                {(searchTerm || filterStatus !== "all") && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Limpiar filtros
                    </Button>
                )}
            </div>

            {/* Axolotls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAxolotls.map((axolotl) => {
                    const healthColors = getHealthStatusColor(
                        axolotl.healthStatus
                    );
                    const axolotary = mockAxolotaries.find(
                        (a) => a.id === axolotl.axolotaryId
                    );
                    const pond = axolotary?.ponds.find(
                        (p) => p.id === axolotl.pondId
                    );

                    return (
                        <Card
                            key={axolotl.id}
                            variant="interactive"
                            className="group"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {axolotl.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {axolotl.code}
                                        </p>
                                    </div>
                                    <Dropdown
                                        trigger={
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <MoreVertical size={16} />
                                            </Button>
                                        }
                                    >
                                        <div className="py-1 min-w-[120px]">
                                            <button
                                                onClick={() =>
                                                    setEditingAxolotl(axolotl)
                                                }
                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                                            >
                                                <Edit size={14} />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setDeletingAxolotl(axolotl)
                                                }
                                                className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 size={14} />
                                                Eliminar
                                            </button>
                                        </div>
                                    </Dropdown>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            Estado:
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${healthColors.bg} ${healthColors.text}`}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${healthColors.dot}`}
                                            ></div>
                                            {getHealthStatusText(
                                                axolotl.healthStatus
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            Género:
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {getGenderText(axolotl.gender)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            Edad:
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {Math.floor(
                                                (new Date().getTime() -
                                                    axolotl.birthDate.getTime()) /
                                                    (1000 * 60 * 60 * 24 * 365)
                                            )}{" "}
                                            años
                                        </span>
                                    </div>

                                    <hr className="border-gray-200" />

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    Ajolotario:
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {axolotary?.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Droplets className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    Estanque:
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {pond?.name}
                                            </span>
                                        </div>

                                        {pond && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Thermometer className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        Temperatura:
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {pond.temperature}°C
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <hr className="border-gray-200" />

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">
                                                Último chequeo:
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {axolotl.lastHealthCheck.toLocaleDateString(
                                                "es-ES"
                                            )}
                                        </span>
                                    </div>

                                    {axolotl.notes && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-700">
                                                {axolotl.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {filteredAxolotls.length === 0 && (
                <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No se encontraron axolotls
                    </h3>
                    <p className="text-gray-600 mb-6">
                        {searchTerm || filterStatus !== "all"
                            ? "No hay axolotls que coincidan con los criterios de búsqueda"
                            : "Aún no tienes axolotls registrados"}
                    </p>
                    {!searchTerm && filterStatus === "all" && (
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="gap-2"
                        >
                            <Plus size={16} />
                            Crear tu primer axolotl
                        </Button>
                    )}
                    {(searchTerm || filterStatus !== "all") && (
                        <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="gap-2"
                        >
                            Limpiar filtros
                        </Button>
                    )}
                </div>
            )}

            {/* Modals */}
            <Modal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Nuevo Axolotl"
                description="Registra la información de tu nuevo axolotl"
                size="2xl"
            >
                <AxolotlForm
                    axolotaries={mockAxolotaries}
                    onSubmit={(data) =>
                        handleCreateAxolotl(data as CreateAxolotlData)
                    }
                    onCancel={() => setIsCreateModalOpen(false)}
                    isLoading={isLoading}
                />
            </Modal>

            <Modal
                open={!!editingAxolotl}
                onClose={() => setEditingAxolotl(null)}
                title="Editar Axolotl"
                description={
                    editingAxolotl
                        ? `Editando información de ${editingAxolotl.name}`
                        : ""
                }
                size="2xl"
            >
                {editingAxolotl && (
                    <AxolotlForm
                        axolotl={editingAxolotl}
                        axolotaries={mockAxolotaries}
                        onSubmit={(data) => {
                            if ("id" in data) {
                                return handleUpdateAxolotl(data);
                            }
                            return Promise.reject(
                                new Error("Invalid data type for update")
                            );
                        }}
                        onCancel={() => setEditingAxolotl(null)}
                        isLoading={isLoading}
                    />
                )}
            </Modal>

            <DeleteConfirmationModal
                open={!!deletingAxolotl}
                onClose={() => setDeletingAxolotl(null)}
                onConfirm={() =>
                    deletingAxolotl && handleDeleteAxolotl(deletingAxolotl)
                }
                title="Eliminar Axolotl"
                description="Esta acción no se puede deshacer"
                message={`¿Estás seguro de que quieres eliminar a "${deletingAxolotl?.name}"?`}
                confirmText="Eliminar"
                isLoading={isLoading}
            />
        </div>
    );
}
