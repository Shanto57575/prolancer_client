"use server";
import { RegisterFormData } from "@/app/types/auth";

export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const role = String(formData.get("role") ?? "CLIENT").toUpperCase();

  const errors: Record<string, string> = {};

  if (!name || name.length < 2)
    errors.name = "Name must be at least 2 characters";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.email = "Invalid email";
  if (!password || password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (!["CLIENT", "FREELANCER"].includes(role)) errors.role = "Invalid role";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const payload: Partial<RegisterFormData> = {
    name,
    email,
    password,
    role: role as RegisterFormData["role"],
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE) {
    return { ok: false, message: "Server is not configured (API URL missing)" };
  }

  try {
    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        message: data?.message ?? "Registration failed",
        backendErrors: data?.errors,
      };
    }

    return { ok: true, message: data?.message ?? "Account created", data };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}
