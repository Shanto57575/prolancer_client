"use server";

import { getCurrentUser } from "@/lib/dal/user";

export async function getSession() {
    const result = await getCurrentUser();
    if (result.ok) {
        return result.data;
    }
    return null;
}
