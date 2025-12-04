import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  CLIENT: [/^\/dashboard\/client/],
  FREELANCER: [/^\/dashboard\/freelancer/],
};

type Role = keyof typeof roleBasedRoutes;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any = null;

  // 1. Try to decode access token
  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
      const isExpired = user.exp * 1000 < Date.now();
      if (isExpired) user = null;
    } catch (error) {
      console.log(error);
      user = null;
    }
  }

  // 2. If no valid access token, try to refresh
  if (!user && refreshToken) {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_BASE}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const newAccessToken = data.data.accessToken;

        if (newAccessToken) {
          // Decode new token to get user info
          user = jwtDecode(newAccessToken);

          // Create response to proceed (or redirect if on auth route)
          let response;
          if (AuthRoutes.includes(pathname)) {
            response = NextResponse.redirect(
              new URL("/dashboard", request.url)
            );
          } else {
            response = NextResponse.next();
          }

          // Set the new access token in cookie
          response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });

          return response;
        }
      }
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  }

  // 3. Auth Route Logic (Login/Register)
  if (AuthRoutes.includes(pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 4. Protected Route Logic (Dashboard)
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    // Role-based access control
    if (user?.role && roleBasedRoutes[user.role as Role]) {
      const routes = roleBasedRoutes[user.role as Role];
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }

    // Allow shared routes (like manage-account) if they don't match specific role routes but are under dashboard
    // You might want to be more specific here if there are other protected routes
    if (pathname.startsWith("/dashboard/manage-account")) {
      return NextResponse.next();
    }

    // Default redirect if role doesn't match or no specific route match
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
