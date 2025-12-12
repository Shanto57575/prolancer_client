"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getProfileAction() {
  const API_BASE = process.env.API_BASE_URL;
  if (!API_BASE) {
    return { ok: false, message: "API URL not configured" };
  }

  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    let isExpired = false;
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded.exp && decoded.exp * 1000 < Date.now() + 30000) {
          isExpired = true;
        }
      } catch {
        isExpired = true;
      }
    }

    if ((!accessToken || isExpired) && refreshToken) {
      try {
        const res = await fetch(`${API_BASE}/auth/refresh-token`, {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data.accessToken) {
            accessToken = data.data.accessToken;

            try {
              cookieStore.set("accessToken", accessToken!, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                  process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 15 * 60,
              });
            } catch {
              // Ignore cookie update error in Server Components
            }
          }
        }
      } catch {
        // Refresh failed, continue with potentially expired token (will fail downstream)
      }
    }

    if (!accessToken) {
      return { ok: false, message: "Not authenticated" };
    }

    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Critical for Subscription Status
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        message: data?.message ?? "Failed to fetch profile",
      };
    }

    return { ok: true, data: data.data };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}
