import { NextResponse, NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(request: NextRequest) {

 const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = request.nextUrl;

  // 🔒 Protected routes
  const isProtected =
    pathname.startsWith("/me") ||
    pathname.startsWith("/experiences/create") ||
    pathname.match(/^\/experiences\/[^\/]+\/edit$/);

  if (isProtected && !token) {
    // 👉 redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔥 Prevent logged-in users from login/signup
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/me/:path*",
    "/experiences/create",
    "/experiences/:path*/edit",
    "/login",
    "/signup",
  ],
};