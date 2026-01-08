import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default async function getAuthHeaders() {
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
      const API_URL = process.env.API_BASE_URL;
      const res = await fetch(`${API_URL}/auth/refresh-token`, {
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
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
              maxAge: 15 * 60
            });
          } catch {
            // Ignore error if running in Server Component (read-only cookies)
          }
        }
      }
    } catch (err) {
      console.error("Token refresh failed in getAuthHeaders", err);
    }
  }

  return {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
}
