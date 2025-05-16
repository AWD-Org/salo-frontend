import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SaloSaaS - Sistema de Gestión de Ajolotes",
    description:
        "Plataforma para la gestión integral de ajolotes, reproducción y cuidado.",
    keywords: "ajolotes, gestión, reproducción, cuidado, dashboard",
    authors: [{ name: "SaloSaaS Team" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <div className="min-h-screen bg-background text-text transition-colors">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            toastStyle={{
                                backgroundColor: "#fbfbfb",
                                color: "#1f1f1f",
                                border: "1px solid #e5e7eb",
                            }}
                        />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
