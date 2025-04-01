"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { UserAuthWidget } from "@/components/auth/user-auth-widget";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class" 
        defaultTheme="system" 
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
          <div className="px-2 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image 
                src="/cloud-reverse-128.png" 
                alt="Admin Dashboard Logo" 
                width={32} 
                height={32} 
                className="h-8 w-auto"
              />
              <span className="font-semibold text-lg text-primary">Admin Dashboard</span>
            </div>
            <UserAuthWidget />
          </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
