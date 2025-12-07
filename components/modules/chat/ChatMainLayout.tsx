"use client";

import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import { getMyChats } from "@/actions/chat/chat";
import { Loader2, Menu, X } from "lucide-react";
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
  const [chats, setChats] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <ChatList chats={chats} role={role} />
        )}
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
