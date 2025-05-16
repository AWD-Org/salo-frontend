import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Usuarios dummy para desarrollo (ELIMINAR en producción)
const dummyUsers = [
    {
        id: "1",
        email: "admin@salosaas.com",
        password: "password123", // Contraseña sin hash para fácil comparación
        name: "Admin SaloSaaS",
        role: "admin",
    },
    {
        id: "2",
        email: "user@salosaas.com",
        password: "user123",
        name: "Usuario Demo",
        role: "user",
    },
    {
        id: "3",
        email: "demo@salosaas.com",
        password: "demo123",
        name: "Demo User",
        role: "user",
    },
];

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("🔍 Intento de login:", {
                    email: credentials?.email,
                });

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Credenciales faltantes");
                    return null;
                }

                // Buscar usuario dummy
                const user = dummyUsers.find(
                    (u) => u.email === credentials.email
                );

                if (!user) {
                    console.log("❌ Usuario no encontrado:", credentials.email);
                    return null;
                }

                // Verificar contraseña (comparación directa para desarrollo)
                if (credentials.password !== user.password) {
                    console.log("❌ Contraseña incorrecta");
                    return null;
                }

                console.log("✅ Login exitoso:", user.email);

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 horas
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role; // eslint-disable-line
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id as string; // eslint-disable-line
                (session.user as any).role = token.role as string; // eslint-disable-line
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};
