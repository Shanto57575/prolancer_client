"use client";

import { logoutAction } from "@/actions/auth/logoutAction";
import { useNotification } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const { setSession } = useNotification();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutAction();
      setSession(null);
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <button
      className="cursor-pointer bg-rose-600 text-white hover:border hover:border-rose-600 hover:bg-white hover:text-rose-600 py-2 transition-all duration-300 ease-in-out font-mono font-semibold"
      onClick={handleLogout}
    >
      logout
    </button>
  );
}
