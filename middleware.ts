// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn =
    request.cookies.get("token") && request.cookies.get("loginData")
      ? true
      : false;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/users/loginGuest", request.url));
  }

  const loginCookie = request.cookies.get("loginData");
  const loginData = JSON.parse(loginCookie?.value || "{}");

  if (
    (request.nextUrl.pathname.startsWith("/master") ||
      request.nextUrl.pathname.startsWith("/hotel") ||
      request.nextUrl.pathname.startsWith("/resto") ||
      request.nextUrl.pathname.startsWith("/payment") ||
      request.nextUrl.pathname.startsWith("/hr") ||
      request.nextUrl.pathname.startsWith("/purchasing") ||
      request.nextUrl.pathname.startsWith("/dashboard")) &&
    loginData.user_role_id !== 4
  ) {
    return NextResponse.redirect(
      new URL(`/users/profile/${loginData.user_id}`, request.url)
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/users/profile/:path*",
    "/dashboard",
    "/master/:path*",
    "/hotel/:path*",
    "/resto/:path*",
    "/payment/:path*",
    "/hr/:path*",
    "/purchasing/:path*",
  ],
};
