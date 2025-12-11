"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChatListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chats: any[];
  role: "client" | "freelancer";
}

export default function ChatList({ chats, role }: ChatListProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      {chats.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No active conversations.
        </p>
      )}
      {chats.map((chat) => {
        const otherUser = role === "client" ? chat.freelancerId : chat.clientId;

        const isActive = pathname.includes(chat._id);

        return (
          <Link
            key={chat._id}
            href={`/dashboard/${role}/messages/${chat._id}`}
            className={cn(
              "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50",
              isActive &&
                "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            )}
          >
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                <AvatarImage
                  src={otherUser?.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-300">
                  {otherUser?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {/* Optional: Add online indicator here if data available */}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "font-semibold truncate text-sm text-slate-900 dark:text-slate-100",
                    isActive && "text-blue-700 dark:text-blue-300"
                  )}
                >
                  {otherUser?.name || "Unknown User"}
                </span>
                {/* Time could go here */}
                {chat.unreadCount > 0 && (
                  <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground truncate font-medium">
                {chat.jobId?.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
