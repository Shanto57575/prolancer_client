"use client";

import { logoutAction } from "@/actions/auth/logoutAction";

export default function LogoutButton() {
  return (
    <button
      className="cursor-pointer bg-rose-600 text-white hover:border hover:border-rose-600 hover:bg-white hover:text-rose-600 py-2 transition-all duration-300 ease-in-out font-mono font-semibold"
      onClick={() => logoutAction()}
    >
      logout
    </button>
  );
}
