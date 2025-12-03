import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const decoded = decodeToken(accessToken);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

function decodeToken(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
}
