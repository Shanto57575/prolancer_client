import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  CLIENT: [
    /^\/dashboard\/client/,
    /^\/dashboard\/manage-jobs/,
    /^\/dashboard\/post-job/,
  ],
  FREELANCER: [/^\/dashboard\/freelancer/],
};

type Role = keyof typeof roleBasedRoutes;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any = null;

  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
      const isExpired = user && user.exp ? user.exp * 1000 < Date.now() : false;
      if (isExpired) user = null;
    } catch (error) {
      console.log(error);
      user = null;
    }
  }

  if (!user && refreshToken) {
    try {
      const API_BASE = process.env.API_BASE_URL;
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
          user = jwtDecode(newAccessToken);

          let response;
          if (AuthRoutes.includes(pathname)) {
            response = NextResponse.redirect(
              new URL("/dashboard", request.url)
            );
          } else {
            response = NextResponse.next();
          }

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

  if (AuthRoutes.includes(pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    if (user?.role && roleBasedRoutes[user.role as Role]) {
      const routes = roleBasedRoutes[user.role as Role];
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }

    if (pathname === "/dashboard") {
      return NextResponse.next();
    }

    if (pathname.startsWith("/dashboard/manage-account")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
