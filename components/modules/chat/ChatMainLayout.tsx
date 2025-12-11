"use client";

import { useState, useEffect } from "react";
import ChatList from "./ChatList";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Pusher from "pusher-js";

interface ChatMainLayoutProps {
  children: React.ReactNode;
  role: "client" | "freelancer";
  chats: any[];
  userId?: string;
}

export default function ChatMainLayout({
  children,
  role,
  chats: initialChats,
  userId,
}: ChatMainLayoutProps) {
  const [chats, setChats] = useState(initialChats);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);

  const isRoot = pathname === `/dashboard/${role}/messages`;

  useEffect(() => {
    if (!userId) return;

    const appKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "YOUR_PUSHER_KEY";
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1";
    const pusher = new Pusher(appKey, { cluster });

    const channel = pusher.subscribe(`user-${userId}`);

    channel.bind("notification", (data: any) => {
      if (data.type === "message") {
        setChats((prevChats) => {
          const chatIndex = prevChats.findIndex(
            (c: any) => c._id === data.chatId
          );

          if (chatIndex > -1) {
            const updatedChat = {
              ...prevChats[chatIndex],
              unreadCount: (prevChats[chatIndex].unreadCount || 0) + 1,
              updatedAt: new Date().toISOString(), // Bump timestamp
            };
            // Move to top
            const newChats = [...prevChats];
            newChats.splice(chatIndex, 1);
            return [updatedChat, ...newChats];
          } else {
            // New chat, refresh to get full data
            router.refresh();
            return prevChats;
          }
        });
      }
    });

    return () => {
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId, router]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] overflow-hidden bg-background relative">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Chat List Sidebar */}
      <div
        className={cn(
          "border-r bg-background shrink-0 transition-transform duration-300 ease-in-out",
          "lg:w-80 xl:w-96 lg:relative lg:translate-x-0",
          "fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm md:max-w-none",
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          isRoot ? "lg:block" : "lg:block"
        )}
      >
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted lg:hidden z-10"
          aria-label="Close chat list"
        >
          <X className="h-5 w-5" />
        </button>

        <ChatList chats={chats} role={role} />
      </div>

      {/* Chat Window Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile/Tablet Header - Show menu button */}
        <div className="lg:hidden border-b bg-background p-3 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 hover:bg-muted rounded-lg"
            aria-label="Open chat list"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-medium text-sm">Messages</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
