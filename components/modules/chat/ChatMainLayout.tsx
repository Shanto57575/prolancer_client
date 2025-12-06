"use client";

import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import { getMyChats } from "@/actions/chat/chat";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ChatMainLayoutProps {
  children: React.ReactNode;
  role: "client" | "freelancer";
}

export default function ChatMainLayout({
  children,
  role,
}: ChatMainLayoutProps) {
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getMyChats();
        if (res.success) {
          setChats(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch chats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, []);

  const isRoot = pathname === `/dashboard/${role}/messages`;

  return (
    <div className="flex h-[calc(100vh-6rem)] border rounded-lg overflow-hidden bg-background shadow-sm">
      <div
        className={cn(
          "w-full md:w-80 border-r bg-muted/10",
          isRoot ? "block" : "hidden md:block"
        )}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <ChatList chats={chats} role={role} />
        )}
      </div>
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0",
          isRoot ? "hidden md:flex" : "flex"
        )}
      >
        {children}
      </div>
    </div>
  );
}
