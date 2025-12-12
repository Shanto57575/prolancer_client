"use server";

import { cookies } from "next/headers";

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

  const API_BASE = process.env.API_BASE_URL;

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

    const data = await res.json().catch((error) => console.log(error));

    if (!res.ok) {
      return {
        ok: false,
        message: data?.message || "Login failed",
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
