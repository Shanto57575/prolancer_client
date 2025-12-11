"use server";

import getAuthHeaders from "../sharedFunction/getAuthHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMyChats = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/chats/my-chats`, {
    headers,
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

export const getChatDetails = async (chatId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/chats/${chatId}`, {
    headers,
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

export const sendMessage = async (
  chatId: string,
  content: string,
  attachments: { name: string; url: string; type: string; size?: number }[] = []
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content, attachments }),
  });

  const data = await res.json();

  if (!data.success) {
    console.error("Failed to send message:", data);
  }

  return data;
};

export const triggerTyping = async (chatId: string) => {
  const headers = await getAuthHeaders();

  await fetch(`${API_URL}/chats/${chatId}/typing`, {
    method: "POST",
    headers,
  });
};

export const markMessagesAsRead = async (chatId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/chats/${chatId}/read`, {
    method: "PATCH",
    headers,
  });

  return await res.json();
};
