"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg border">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
