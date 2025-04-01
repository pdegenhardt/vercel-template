// Use Experimental Edge runtime
export const runtime = "experimental-edge";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for the session cookie to determine login status
  // This is a simplified approach that just checks if the cookie exists
  const authCookie = request.cookies.get("next-auth.session-token");
  const isLoggedIn = !!authCookie;
  
  // Check if the request is for an auth route
  const isAuthRoute = pathname.startsWith("/sign-in") || 
                     pathname.startsWith("/sign-up");
  
  // Check if the request is for a dashboard route
  const isDashboardRoute = pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/data") || 
                          pathname.startsWith("/profile") ||
                          pathname.startsWith("/tasks");

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to sign-in
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except for
    // - api routes
    // - assets (static files)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
