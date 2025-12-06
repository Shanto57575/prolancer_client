"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMyChats = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${API_URL}/chats/my-chats`, {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

export const getChatDetails = async (chatId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${API_URL}/chats/${chatId}`, {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

export const sendMessage = async (
  chatId: string,
  content: string,
  attachments: { name: string; url: string; type: string }[] = []
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, attachments }),
  });

  const data = await res.json();
  return data;
};
