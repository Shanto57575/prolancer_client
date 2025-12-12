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
      // Check if expired or expiring in less than 30 seconds
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

          // Update cookie
          try {
            cookieStore.set("accessToken", accessToken!, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
              maxAge: 15 * 60, // 15 mins matching backend
            });
          } catch {
            // Ignore error if running in Server Component (read-only cookies)
          }

          // If backend rotates refresh token, update it too?
          // Backend `refreshTokenService` returns `{ accessToken }` only, based on search result.
          // But `authController` sets cookie. The fetch here won't automatically set cookies from Set-Cookie header of backend response unless we manually parse it,
          // but we are in a server action.
          // Since backend returns `data.data.accessToken`, we use that.
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
