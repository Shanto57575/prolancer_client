"use server";

import { cookies } from "next/headers";

export async function getDashboardStatsAction() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE) {
    return { ok: false, message: "API URL not configured" };
  }

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { ok: false, message: "Not authenticated" };
    }

    // Removing 'returnSecureToken' and 'as any' as they are not standard fetch options
    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/dashboard/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        message: data?.message ?? "Failed to fetch dashboard stats",
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
