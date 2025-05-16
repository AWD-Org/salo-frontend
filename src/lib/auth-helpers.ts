import {
    signIn as nextAuthSignIn,
    signOut as nextAuthSignOut,
} from "next-auth/react";

export async function signIn(provider: string, credentials: any) { // eslint-disable-line
    return await nextAuthSignIn(provider, credentials);
}

export async function signOut(options?: { redirect?: boolean }) {
    return await nextAuthSignOut(options);
}

// Simulación de base de datos para desarrollo (ELIMINAR en producción)
const dummyUsers: any[] = [ // eslint-disable-line
    {
        id: "1",
        email: "admin@salosaas.com",
        password: "password123",
        name: "Admin SaloSaaS",
        role: "admin",
        onboardingCompleted: true,
        preferences: {
            theme: "light",
            notifications: true,
            language: "es",
        },
    },
    {
        id: "2",
        email: "user@salosaas.com",
        password: "user123",
        name: "Usuario Demo",
        role: "user",
        onboardingCompleted: false,
        preferences: {
            theme: "dark",
            notifications: true,
            language: "es",
        },
    },
    {
        id: "3",
        email: "demo@salosaas.com",
        password: "demo123",
        name: "Demo User",
        role: "user",
        onboardingCompleted: false,
        preferences: {
            theme: "light",
            notifications: false,
            language: "es",
        },
    },
];

export async function signUp(userData: {
    email: string;
    password: string;
    name: string;
}) {
    try {
        console.log("🔍 Intento de registro:", {
            email: userData.email,
            name: userData.name,
        });

        // Check if user already exists
        const existingUser = dummyUsers.find(
            (user) => user.email === userData.email
        );

        if (existingUser) {
            console.log("❌ Usuario ya existe:", userData.email);
            return { error: "User with this email already exists" };
        }

        // Create user (simulado)
        const user = {
            id: (dummyUsers.length + 1).toString(),
            email: userData.email,
            password: userData.password, // En desarrollo, guardamos sin hash
            name: userData.name,
            role: "user",
            onboardingCompleted: false,
            preferences: {
                theme: "light",
                notifications: true,
                language: "es",
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        dummyUsers.push(user);
        console.log("✅ Usuario creado:", user.email);

        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return { data: userWithoutPassword };
    } catch (error) {
        console.error("❌ Sign up error:", error);
        return { error: "Failed to create user" };
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = dummyUsers.find((u) => u.email === email);
        console.log(
            user ? "✅ Usuario encontrado" : "❌ Usuario no encontrado",
            email
        );
        return user || null;
    } catch (error) {
        console.error("Get user error:", error);
        return null;
    }
}

export async function getUserById(id: string) {
    try {
        const user = dummyUsers.find((u) => u.id === id);
        console.log(
            user
                ? "✅ Usuario encontrado por ID"
                : "❌ Usuario no encontrado por ID",
            id
        );
        return user || null;
    } catch (error) {
        console.error("Get user error:", error);
        return null;
    }
}
