"use server";

import { revalidatePath } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createService(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/service/add-service`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, description }),
    });

    console.log("headers", headers);

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create service");

    revalidatePath("/dashboard/admin/manage-service");
    return { ok: true, message: "Service created successfully" };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getAllServices({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  try {
    const headers = await getAuthHeaders();

    const url = `${API_BASE}/service/all-services?page=${page}&limit=${limit}&search=${search}`;

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch services");

    return { ok: true, data: json.data, meta: json.meta };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/service/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ name, description }),
    });

    console.log("headers", headers);
    console.log("res", res);

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update service");

    revalidatePath("/dashboard/admin/manage-service");
    return { ok: true, message: "Service updated successfully" };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function deleteService(id: string) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/service/${id}`, {
      method: "DELETE",
      headers,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete service");

    revalidatePath("/dashboard/admin/manage-service");
    return { ok: true, message: "Service deleted successfully" };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
