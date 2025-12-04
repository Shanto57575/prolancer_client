"use server";

import { cookies } from "next/headers";

export default async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
}
