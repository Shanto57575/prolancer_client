"use server";

import getAuthHeaders from "@/actions/sharedFunction/getAuthHeaders";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getNotificationsAction() {
  if (!API_BASE) return { ok: false, message: "API URL not configured" };

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/notification`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    const data = await res.json();
    return { ok: res.ok, data: data.data, message: data.message };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message || "Failed to fetch notifications",
    };
  }
}

export async function markAllNotificationsReadAction() {
  if (!API_BASE) return { ok: false, message: "API URL not configured" };

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/notification/read-all`, {
      method: "PATCH",
      headers: headers,
      cache: "no-store",
    });

    const data = await res.json();
    return { ok: res.ok, data: data.data, message: data.message };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message || "Failed to mark notifications read",
    };
  }
}
