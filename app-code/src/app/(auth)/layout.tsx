"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="mb-6 flex items-center gap-2">
          <Image 
            src="/cloud-reverse-128.png" 
            alt="Admin Dashboard Logo" 
            width={40} 
            height={40} 
            className="h-10 w-auto"
          />
          <span className="font-bold text-xl text-primary">Admin Dashboard</span>
        </div>
        <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg border border-primary/20">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
