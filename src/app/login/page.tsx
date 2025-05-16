"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import loginLogo from "@/assets/logo/min-black-logo.png";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        console.log("🔐 Intento de login:", { email: data.email });

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            console.log("📡 Resultado de signIn:", result);

            if (result?.error) {
                console.log("❌ Error de login:", result.error);
                toast.error("Credenciales inválidas");
            } else if (result?.ok) {
                console.log("✅ Login exitoso");
                toast.success("Inicio de sesión exitoso");
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("❌ Error catch:", error);
            toast.error("Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Image
                            src={loginLogo}
                            alt="Login Image"
                            height={50}
                            width={50}
                        />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Inicia sesión en tu cuenta
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                {...register("email")}
                                error={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    error={!!errors.password}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                href="/forgot-password"
                                className="text-sm text"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            {!isLoading && "Iniciar Sesión"}
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                ¿No tienes una cuenta?{" "}
                                <Link
                                    href="/signup"
                                    className="text font-medium"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
