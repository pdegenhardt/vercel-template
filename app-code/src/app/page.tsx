"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    // Wait until session is loaded
    if (status === "loading") return;
    
    // Redirect based on authentication status
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="my-4 h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <h2 className="text-xl font-semibold">Redirecting...</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we redirect you to the appropriate page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
