"use client";

import { logoutAction } from "@/actions/auth/logoutAction";

export default function LogoutButton() {
  return (
    <button
      className="cursor-pointer py-2 bg-red-600 text-white font-mono font-semibold"
      onClick={async () => await logoutAction()}
    >
      logout
    </button>
  );
}
