"use server";

import { revalidatePath } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllUsers({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
  role = "",
  isBanned = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  role?: string;
  isBanned?: string;
} = {}) {
  try {
    const headers = await getAuthHeaders();

    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      sortBy,
      sortOrder,
    });

    if (role) params.set("role", role);
    if (isBanned) params.set("isBanned", isBanned);

    const url = `${API_BASE}/user?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch users");

    return { ok: true, data: json.data, meta: json.meta };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function banUser(userId: string) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/user/${userId}/ban`, {
      method: "PATCH",
      headers,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to ban/unban user");

    revalidatePath("/dashboard/admin/manage-users");
    return { ok: true, message: data.message };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
