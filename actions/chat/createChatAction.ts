"use server";

import { redirect } from "next/navigation";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createChatAction = async (jobId: string, freelancerId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/chats`, {
    method: "POST",
    headers,
    body: JSON.stringify({ jobId, freelancerId }),
  });

  const data = await res.json();

  if (data.success && data.data._id) {
    redirect(`/dashboard/client/messages/${data.data._id}`);
  }

  return { error: "Failed to open chat" };
};
