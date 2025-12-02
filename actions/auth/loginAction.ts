"use server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors: Record<string, string> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) errors.email = "Email is required";
  else if (!emailRegex.test(email)) errors.email = "Invalid email address";

  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE) {
    return { ok: false, message: "API URL missing in server config" };
  }

  try {
    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        message: data?.message || "Login failed",
      };
    }

    return {
      ok: true,
      message: data?.message || "Login successful",
      data,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}
