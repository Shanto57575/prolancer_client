/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CheckCheck,
  Download,
  FileText,
  File as FileIcon,
  X,
  Maximize2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MessageBubbleProps {
  content: string;
  senderId: string;
  currentUserId: string;
  createdAt?: Date;
  senderName: string;
  senderImage?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size?: number;
  }[];
  status?: "sending" | "sent" | "failed";
}

function formatFileSize(bytes?: number) {
  if (!bytes) return "";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function MessageBubble({
  content,
  senderId,
  currentUserId,
  createdAt,
  senderName,
  senderImage,
  attachments,
  status,
}: MessageBubbleProps) {
  const isMe = senderId === currentUserId;

  return (
    <div
      className={cn(
        "flex w-full gap-3 mb-4 group transition-all duration-300 ease-out animate-in slide-in-from-bottom-2",
        isMe ? "flex-row-reverse" : "flex-row",
        status === "sending" && "opacity-70"
      )}
    >
      <Avatar
        className="h-8 w-8 shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm"
        title={senderName}
      >
        <AvatarImage src={senderImage} className="object-cover" />
        <AvatarFallback
          className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs"
          title={senderName}
        >
          {senderName?.charAt(0)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col max-w-[85%] md:max-w-[70%]",
          isMe ? "items-end" : "items-start"
        )}
      >
        {content && (
          <div
            className={cn(
              "px-4 py-2.5 rounded-2xl text-sm shadow-sm relative transition-all duration-200",
              isMe
                ? "bg-blue-600 text-white rounded-tr-none shadow-blue-600/20"
                : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none shadow-sm"
            )}
          >
            <p className="leading-relaxed whitespace-pre-wrap wrap-break-word text-[15px] tracking-wide">
              {content}
            </p>
          </div>
        )}

        {attachments && attachments.length > 0 && (
          <div
            className={cn(
              "flex flex-col gap-2 mt-2 w-full",
              isMe ? "items-end" : "items-start"
            )}
          >
            {/* Image Grid */}
            <div className="flex flex-wrap gap-2 max-w-full">
              {attachments
                .filter((att) => {
                  const type = att.type?.toLowerCase() || "";
                  return (
                    type === "image" ||
                    type.startsWith("image/") ||
                    att.url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i)
                  );
                })
                .map((att, idx) => (
                  <Dialog key={idx}>
                    <DialogTrigger asChild>
                      <div className="relative cursor-zoom-in group/image overflow-hidden rounded-2xl border border-border/50 bg-muted max-w-[280px] w-full aspect-auto transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <img
                          src={att.url}
                          alt={att.name || "Image"}
                          className="w-full h-auto max-h-[300px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                          <Maximize2 className="text-white drop-shadow-md h-8 w-8" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] h-[95vh] max-w-none p-0 border-none bg-black/95 backdrop-blur-xl flex items-center justify-center">
                      <VisuallyHidden>
                        <DialogTitle>Image Preview: {att.name}</DialogTitle>
                      </VisuallyHidden>

                      {/* Close Button */}
                      <DialogClose className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                      </DialogClose>

                      {/* Image Container */}
                      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
                        <img
                          src={att.url}
                          alt={att.name}
                          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                        />
                      </div>

                      {/* Download Button */}
                      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
                        <a
                          href={att.url}
                          download={att.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-md"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
            </div>

            {/* Non-Image Files */}
            <div className="flex flex-col gap-2">
              {attachments
                .filter((att) => {
                  const type = att.type?.toLowerCase() || "";
                  const isImage =
                    type === "image" ||
                    type.startsWith("image/") ||
                    att.url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i);
                  return !isImage;
                })
                .map((att, idx) => (
                  <a
                    key={idx}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border max-w-[280px] w-full transition-all duration-200 hover:shadow-md group/file relative overflow-hidden",
                      isMe
                        ? "bg-primary/5 border-primary/10 hover:bg-primary/10"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {att.type === "pdf" || att.name.endsWith(".pdf") ? (
                        <FileText className="h-5 w-5" />
                      ) : (
                        <FileIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-foreground/90 group-hover/file:text-primary transition-colors">
                        {att.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                        <span>{att.name.split(".").pop() || "FILE"}</span>
                        {att.size && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                            <span>{formatFileSize(att.size)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <Download className="h-4 w-4 text-muted-foreground group-hover/file:text-primary transition-colors" />
                    </div>
                  </a>
                ))}
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex items-center gap-1 mt-1 px-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300",
            isMe ? "flex-row-reverse" : "flex-row"
          )}
        >
          <span className="text-[10px] font-medium text-muted-foreground">
            {createdAt ? format(new Date(createdAt), "h:mm a") : "Just now"}
          </span>
          {isMe && (
            <div className="flex items-center">
              {status === "sending" ? (
                <span className="w-2 h-2 rounded-full border-2 border-primary/50 border-t-primary animate-spin" />
              ) : (
                <CheckCheck className="h-3 w-3 text-primary" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
