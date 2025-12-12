"use strict";
"use server";

import getAuthHeaders from "../sharedFunction/getAuthHeaders";

const API_BASE = process.env.API_BASE_URL;

export async function createCheckoutSessionAction(plan: "MONTHLY" | "YEARLY") {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/payment/create-checkout-session`, {
      method: "POST",
      headers,
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || "Failed to create checkout session");

    return { ok: true, data: data.data };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getAllPaymentsAction(query?: string) {
  try {
    const headers = await getAuthHeaders();
    const url = query
      ? `${API_BASE?.replace(/\/$/, "")}/payment/history?${query}`
      : `${API_BASE?.replace(/\/$/, "")}/payment/history`;

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    return { ok: res.ok, data: data.data };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Failed to fetch payments" };
  }
}

export async function getMyPaymentsAction(query?: string) {
  try {
    const headers = await getAuthHeaders();
    const url = query
      ? `${API_BASE?.replace(/\/$/, "")}/payment/my-payments?${query}`
      : `${API_BASE?.replace(/\/$/, "")}/payment/my-payments`;

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    return { ok: res.ok, data: data.data };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Failed to fetch my payments" };
  }
}
