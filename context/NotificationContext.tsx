/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import {
  getNotificationsAction,
  markAllNotificationsReadAction,
} from "@/actions/notification/notificationActions";
import { getSession } from "@/actions/auth/getSession";

export interface Notification {
  _id: string;
  type: string;
  senderId: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  content: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  unreadCount: number;
  notifications: Notification[];
  clearUnread: () => void;
  markAsRead: (chatId: string) => void;
  role: string | null;
  currentUser: any;
  setSession: (user: any) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  initialUser,
  children,
}: {
  initialUser?: any;
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>(initialUser || null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const router = useRouter();
  const pathname = usePathname();

  const userId = currentUser?._id;
  const role = currentUser?._id ? currentUser.role : null;

  const setSession = (user: any) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    if (!userId) {
      const fetchSession = async () => {
        try {
          const user = await getSession();
          if (user) {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Failed to fetch session:", error);
        }
      };

      fetchSession();

      if (notifications.length > 0) {
        setNotifications([]);
      }
      return;
    }

    const fetchNotifs = async () => {
      const res = await getNotificationsAction();
      if (res.ok && res.data) {
        setNotifications(res.data);
      }
    };
    fetchNotifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (!userId || !role) return;

    const playSound = () => {
      try {
        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
        console.error("Audio play failed", e);
      }
    };

    const appKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
    const pusher = new Pusher(appKey as string, { cluster: cluster as string });

    const channel = pusher.subscribe(`user-${userId}`);

    channel.bind("notification", (data: any) => {
      if (pathname?.includes(`/messages/${data.chatId}`)) {
        return;
      }

      playSound();

      // Adapt Pusher data to Notification Interface
      const newNotif: Notification = {
        _id: Date.now().toString(), // Temp ID until refresh
        type: data.type,
        senderId: {
          _id: data.senderId,
          name: data.senderName,
          profilePicture: data.senderPicture,
        },
        content: data.content,
        isRead: false,
        createdAt: new Date().toISOString(),
        link: `/messages/${data.chatId}`,
      };

      setNotifications((prev) => [newNotif, ...prev]);

      // Toast still shows preview
      toast.message(`New message from ${data.senderName}`, {
        description: data.content,
        action: {
          label: "Reply",
          onClick: () => {
            const urlRole = role.toLowerCase();
            router.push(`/dashboard/${urlRole}/messages/${data.chatId}`);
          },
        },
        duration: 5000,
      });
    });

    return () => {
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId, role, pathname, router]);

  const clearUnread = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    await markAllNotificationsReadAction();
  };

  const markAsRead = (chatId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.link?.includes(chatId) ? { ...n, isRead: true } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        notifications,
        clearUnread,
        markAsRead,
        role: role || null,
        currentUser,
        setSession,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    return {
      unreadCount: 0,
      notifications: [],
      clearUnread: () => {},
      markAsRead: () => {},
      role: null,
      currentUser: null,
      setSession: () => {},
    };
  }
  return context;
};
