"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { onboardingSchema, type OnboardingFormData } from "@/lib/validations";
import { CheckCircle, Circle } from "lucide-react";

export default function OnboardingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            objectives: [],
        },
    });

    const watchedObjectives = watch("objectives") || [];
    const selectedExperience = watch("experience");

    const experienceOptions: { value: "beginner" | "intermediate" | "expert"; label: string; description: string }[] = [
        {
            value: "beginner",
            label: "Principiante",
            description: "Nuevo en el cuidado de ajolotes",
        },
        {
            value: "intermediate",
            label: "Intermedio",
            description: "Algo de experiencia previa",
        },
        {
            value: "expert",
            label: "Experto",
            description: "Amplia experiencia en ajolotes",
        },
    ];

    const objectiveOptions = [
        { id: "breeding", label: "Reproducción" },
        { id: "collecting", label: "Colección" },
        { id: "research", label: "Investigación" },
        { id: "business", label: "Negocio" },
        { id: "hobby", label: "Hobby" },
    ];

    const onSubmit = async (data: OnboardingFormData) => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/user/onboarding", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                toast.error(
                    error.message || "Error al completar el onboarding"
                );
            } else {
                toast.success("¡Bienvenido a SaloSaaS!");
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Error al conectar con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    const handleObjectiveChange = (objectiveId: string) => {
        const current = watchedObjectives;
        const updated = current.includes(objectiveId)
            ? current.filter((id) => id !== objectiveId)
            : [...current, objectiveId];
        setValue("objectives", updated);
    };

    const handleExperienceChange = (value: "beginner" | "intermediate" | "expert") => {
        setValue("experience", value);
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-secondary font-bold text-3xl">
                                S
                            </span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        ¡Bienvenido a SaloSaaS!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Vamos a configurar tu perfil para personalizar tu
                        experiencia
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Configuración Inicial
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Experience Level */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    ¿Cuál es tu nivel de experiencia con
                                    ajolotes?
                                </label>
                                <div className="grid gap-3">
                                    {experienceOptions.map((option) => {
                                        const isSelected =
                                            selectedExperience === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() =>
                                                    handleExperienceChange(
                                                        option.value
                                                    )
                                                }
                                                className={`flex items-center gap-3 p-3 border rounded-lg text-left transition-colors ${
                                                    isSelected
                                                        ? "border-primary bg-primary/10 text-gray-900"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors">
                                                    {isSelected && (
                                                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">
                                                        {option.label}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {option.description}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Hidden radio input for form submission */}
                                <input
                                    type="hidden"
                                    {...register("experience")}
                                    value={selectedExperience || ""}
                                />
                                {errors.experience && (
                                    <p className="text-sm text-red-500">
                                        {errors.experience.message}
                                    </p>
                                )}
                            </div>

                            {/* Objectives */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    ¿Cuáles son tus objetivos? (Selecciona todos
                                    los que apliquen)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {objectiveOptions.map((option) => {
                                        const isSelected =
                                            watchedObjectives.includes(
                                                option.id
                                            );
                                        return (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() =>
                                                    handleObjectiveChange(
                                                        option.id
                                                    )
                                                }
                                                className={`flex items-center gap-3 p-3 border rounded-lg text-left transition-colors ${
                                                    isSelected
                                                        ? "border-primary bg-primary/10 text-gray-900"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                {isSelected ? (
                                                    <CheckCircle
                                                        size={20}
                                                        className="text-primary"
                                                    />
                                                ) : (
                                                    <Circle
                                                        size={20}
                                                        className="text-gray-400"
                                                    />
                                                )}
                                                <span
                                                    className={`font-medium ${
                                                        isSelected
                                                            ? "text-gray-900"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    {option.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.objectives && (
                                    <p className="text-sm text-red-500">
                                        {errors.objectives.message}
                                    </p>
                                )}
                            </div>

                            {/* First Axolotary */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    Vamos a crear tu primer ajolotario
                                </label>
                                <div className="space-y-3">
                                    <div>
                                        <Input
                                            placeholder="Nombre del ajolotario (ej: Mi Primer Ajolotario)"
                                            {...register("firstAxolotary.name")}
                                            error={
                                                !!errors.firstAxolotary?.name
                                            }
                                            className="text-gray-900 placeholder-gray-400"
                                        />
                                        {errors.firstAxolotary?.name && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {
                                                    errors.firstAxolotary.name
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[80px] resize-none transition-all duration-200"
                                            placeholder="Descripción (opcional)"
                                            {...register(
                                                "firstAxolotary.description"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                                loading={isLoading}
                            >
                                {!isLoading && "Completar Configuración"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
