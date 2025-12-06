"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChatListProps {
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
            className="w-full"
          >
            <Card
              className={cn(
                "p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer",
                isActive && "bg-muted border-primary/50"
              )}
            >
              <Avatar>
                <AvatarImage src={otherUser?.profilePicture} />
                <AvatarFallback>
                  {otherUser?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold truncate">
                  {otherUser?.name || "Unknown User"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {chat.jobId?.title}
                </span>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
