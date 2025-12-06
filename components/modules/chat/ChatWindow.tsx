/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { getChatDetails } from "@/actions/chat/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Loader2 } from "lucide-react";
import Pusher from "pusher-js";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatWindowProps {
  chatId: string;
  currentUserId: string;
}

export default function ChatWindow({ chatId, currentUserId }: ChatWindowProps) {
  const [chat, setChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChat = async () => {
    try {
      const res = await getChatDetails(chatId);
      if (res.success) {
        setChat(res.data);
        setMessages(res.data.messages);
      } else {
        toast.error("Failed to load chat");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [chatId]);

  // Pusher Setup
  useEffect(() => {
    if (!chatId) return;

    // Use environment variables or hardcoded for now (User will need to set this)
    const appKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "YOUR_PUSHER_KEY";
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1";

    const pusher = new Pusher(appKey, {
      cluster: cluster,
    });

    const channel = pusher.subscribe(`chat-${chatId}`);

    channel.bind("new-message", (data: any) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe(`chat-${chatId}`);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!chat) return null;

  const isClient = chat.clientId._id === currentUserId;
  // If I am client, other is Freelancer. If I am freelancer, other is Client (which is a User, so clientId)
  // Wait, my service populates clientId and freelancerId as User objects.

  // chat.clientId is the User object of the client.
  // chat.freelancerId is the User object of the freelancer (because I populated it from userId in Freelancer model).

  const otherUser = isClient ? chat.freelancerId : chat.clientId;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3 shadow-sm bg-background/95 backdrop-blur z-10">
        <Avatar>
          <AvatarImage src={otherUser?.profilePicture} />
          <AvatarFallback>
            {otherUser?.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{otherUser?.name}</h3>
          <p className="text-xs text-muted-foreground">{chat.jobId?.title}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            content={msg.content}
            senderId={msg.senderId}
            currentUserId={currentUserId}
            createdAt={msg.createdAt}
            attachments={msg.attachments}
            senderImage={
              msg.senderId === chat.clientId._id
                ? chat.clientId.profilePicture
                : chat.freelancerId.profilePicture
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput chatId={chatId} />
    </div>
  );
}
