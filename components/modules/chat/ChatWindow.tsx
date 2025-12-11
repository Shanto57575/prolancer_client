/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { getChatDetails, markMessagesAsRead } from "@/actions/chat/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Loader2, AlertCircle } from "lucide-react";
import Pusher from "pusher-js";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ChatWindowProps {
  chatId: string;
  currentUserId: string;
}

export default function ChatWindow({ chatId, currentUserId }: ChatWindowProps) {
  const [chat, setChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchChat = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getChatDetails(chatId);
      if (res.success) {
        setChat(res.data);
        setMessages(res.data.messages || []);

        // Mark as read
        await markMessagesAsRead(chatId);
        // Refresh to update unread counts in sidebar
        router.refresh();
      } else {
        setError(res.message || "Failed to load chat");
        toast.error("Failed to load chat");
      }
    } catch (error) {
      // ...
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [chatId]);

  // Pusher Setup...
  useEffect(() => {
    if (!chatId) return;

    const appKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "YOUR_PUSHER_KEY";
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1";

    const pusher = new Pusher(appKey, {
      cluster: cluster,
    });

    const channel = pusher.subscribe(`chat-${chatId}`);

    channel.bind("new-message", (data: any) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === data._id);
        if (exists) return prev;
        const filtered = prev.filter(
          (m) =>
            !m._id?.toString().startsWith("temp-") && m.status !== "sending"
        );

        return [...filtered, data];
      });
      setIsTyping(false);
    });

    channel.bind("typing", (data: { userId: string }) => {
      if (data.userId !== currentUserId) {
        setIsTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });

    return () => {
      pusher.unsubscribe(`chat-${chatId}`);
    };
  }, [chatId, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptimisticMessage = (message: any) => {
    setMessages((prev) => [...prev, message]);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-muted-foreground p-8 text-center">
        <div className="bg-destructive/10 p-4 rounded-full">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Unable to load chat
          </h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <Button onClick={() => fetchChat()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (!chat) return null;

  const isClient = chat.clientId._id === currentUserId;
  const otherUser = isClient ? chat.freelancerId : chat.clientId;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/50 relative">
      <div className="px-4 sm:px-6 py-4 border-b flex items-center justify-between shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="relative shrink-0">
            <Avatar className="h-10 w-10 sm:h-11 sm:w-11 border-2 border-white dark:border-slate-800 shadow-md ring-1 ring-slate-100 dark:ring-slate-800">
              <AvatarImage
                src={otherUser?.profilePicture}
                className="object-cover"
              />
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-500 text-white font-medium">
                {otherUser?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base sm:text-lg leading-tight text-slate-800 dark:text-slate-100 truncate">
              {otherUser?.name || "Unknown User"}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
              {chat.jobId?.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 flex flex-col scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-60">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 ring-8 ring-blue-50/50 dark:ring-blue-900/10">
              <span className="text-4xl">👋</span>
            </div>
            <MessageBubble
              content="Welcome! Say hello to start the conversation."
              senderId="system"
              currentUserId="system"
              senderName="System"
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full pb-4">
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                content={msg.content}
                senderId={msg.senderId}
                currentUserId={currentUserId}
                createdAt={msg.createdAt}
                attachments={msg.attachments}
                status={msg.status}
                senderName={
                  msg.senderId === chat.clientId._id
                    ? chat.clientId.name
                    : chat.freelancerId.name
                }
                senderImage={
                  msg.senderId === chat.clientId._id
                    ? chat.clientId.profilePicture
                    : chat.freelancerId.profilePicture
                }
              />
            ))}
          </div>
        )}

        {isTyping && (
          <div className="flex gap-3 mb-6 items-end max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Avatar className="h-8 w-8 shrink-0 opacity-70 border border-border">
              <AvatarImage src={otherUser?.profilePicture} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-border/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-1" />
      </div>

      <ChatInput
        chatId={chatId}
        onOptimisticMessage={handleOptimisticMessage}
        currentUserId={currentUserId}
      />
    </div>
  );
}
