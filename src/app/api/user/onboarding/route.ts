import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Extend the session type to include the 'id' property
declare module "next-auth" {
    interface Session {
        user: {
            id?: string | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export async function POST(request: NextRequest) {
    try {
        console.log("🎯 Intento de completar onboarding");

        const session = await getServerSession(authOptions);
        console.log("👤 Sesión:", session ? "Existe" : "No existe");

        if (!session?.user?.id) {
            console.log("❌ No autorizado");
            return NextResponse.json(
                { message: "No autorizado" },
                { status: 401 }
            );
        }

        const body = await request.json();
        console.log("📝 Datos de onboarding recibidos:", Object.keys(body));

        // Por ahora solo retornamos éxito sin guardar nada
        // En producción aquí actualizaríamos la base de datos
        console.log("✅ Onboarding completado (simulado)");

        return NextResponse.json(
            { message: "Onboarding completado exitosamente" },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error en onboarding:", error);

        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
