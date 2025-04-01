import NextAuth from "next-auth/next";
import { config } from "@/lib/auth";

// Initialize NextAuth directly here for the route
const handler = NextAuth(config);
export const GET = handler;
export const POST = handler;