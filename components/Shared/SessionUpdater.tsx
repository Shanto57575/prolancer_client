"use client";

import { useNotification } from "@/context/NotificationContext";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SessionUpdater({ user }: { user: any }) {
  const { setSession } = useNotification();

  useEffect(() => {
    setSession(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Update session when user changes

  return null;
}
