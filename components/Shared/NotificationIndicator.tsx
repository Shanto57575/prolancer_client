"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotification, Notification } from "@/context/NotificationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

export default function NotificationIndicator() {
  const { unreadCount, notifications, clearUnread, role } = useNotification();
  const router = useRouter();

  const handleNotificationClick = (notification: Notification) => {
    if (role && notification.link) {
      // Extract chatId from link /messages/{chatId}
      const chatId = notification.link.split("/").pop();
      if (!chatId) return;

      // Ensure role is normalized for URL
      const urlRole = role.toLowerCase();
      router.push(`/dashboard/${urlRole}/messages/${chatId}`);
      clearUnread();
    }
  };

  // Only show if user is logged in (has role)
  if (!role) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => {}}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-600 border border-background animate-pulse" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-0.5 text-xs text-emerald-600"
              onClick={clearUnread}
            >
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-sm">
            No new notifications
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className={`cursor-pointer flex items-start gap-3 p-3 focus:bg-accent ${
                  !notification.isRead ? "bg-muted/30" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <Avatar className="h-9 w-9 mt-0.5 border shrink-0">
                  <AvatarImage src={notification.senderId.profilePicture} />
                  <AvatarFallback className="uppercase">
                    {notification.senderId.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium leading-none truncate pr-2">
                      {notification.senderId.name}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">messaged you</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
