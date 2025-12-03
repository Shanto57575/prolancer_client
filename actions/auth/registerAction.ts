"use server";
import { RegisterFormData } from "@/app/types/auth";
import { cookies } from "next/headers";

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

    const cookieStore = await cookies();
    const setCookieHeader = res.headers.getSetCookie();

    if (setCookieHeader) {
      setCookieHeader.forEach((cookie) => {
        const [nameValue, ...options] = cookie.split("; ");
        const [name, value] = nameValue.split("=");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cookieOptions: any = {};
        options.forEach((option) => {
          const [key, val] = option.split("=");
          const lowerKey = key.toLowerCase();
          if (lowerKey === "path") cookieOptions.path = val;
          else if (lowerKey === "httponly") cookieOptions.httpOnly = true;
          else if (lowerKey === "secure") cookieOptions.secure = true;
          else if (lowerKey === "samesite")
            cookieOptions.sameSite = val.toLowerCase();
          else if (lowerKey === "max-age") cookieOptions.maxAge = Number(val);
          else if (lowerKey === "expires")
            cookieOptions.expires = new Date(val).getTime();
        });

        cookieStore.set(name, value, cookieOptions);
      });
    }

    return { ok: true, message: data?.message ?? "Account created", data };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}
