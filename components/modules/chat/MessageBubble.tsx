import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  content: string;
  senderId: string;
  currentUserId: string;
  createdAt?: Date;
  senderName?: string;
  senderImage?: string;
  attachments?: { name: string; url: string; type: string }[];
}

export default function MessageBubble({
  content,
  senderId,
  currentUserId,
  createdAt,
  senderImage,
  attachments,
}: MessageBubbleProps) {
  const isMe = senderId === currentUserId;

  return (
    <div
      className={cn(
        "flex w-full gap-2 mb-4",
        isMe ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={senderImage} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          isMe ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-2 rounded-lg text-sm",
            isMe
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-muted rounded-tl-none"
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
        </div>

        {attachments && attachments.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            {attachments.map((att, idx) => (
              <a
                key={idx}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
              >
                📎 {att.name}
              </a>
            ))}
          </div>
        )}

        {createdAt && (
          <span className="text-[10px] text-muted-foreground mt-1">
            {format(new Date(createdAt), "h:mm a")}
          </span>
        )}
      </div>
    </div>
  );
}
