/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Paperclip, Send, X, FileIcon } from "lucide-react";
import { useState, useRef } from "react";
import { sendMessage, triggerTyping } from "@/actions/chat/chat";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";

interface Attachment {
  name: string;
  url: string;
  type: string;
  size: number;
  file?: File;
}

interface ChatInputProps {
  chatId: string;
  onOptimisticMessage?: (message: any) => void;
  currentUserId: string;
}

export default function ChatInput({
  chatId,
  onOptimisticMessage,
  currentUserId,
}: ChatInputProps) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const lastTypingRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("fileUploader");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newAttachments: Attachment[] = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "file",
        size: file.size,
        file: file,
      }));

      setAttachments((prev) => [...prev, ...newAttachments]);
      e.target.value = "";
    }
  };

  const handleSend = async () => {
    if (
      (!content.trim() && attachments.length === 0) ||
      isSending ||
      isUploading
    )
      return;

    const messageContent = content;
    const messageAttachments = [...attachments];

    setContent("");
    setAttachments([]);

    const tempId = `temp-${Date.now()}`;
    const optimisticMsg = {
      _id: tempId,
      content: messageContent,
      senderId: currentUserId,
      createdAt: new Date(),
      attachments: messageAttachments.map((att) => ({
        name: att.name,
        url: att.url,
        type: att.type,
        size: att.size,
      })),
      status: "sending",
    };

    if (onOptimisticMessage) {
      onOptimisticMessage(optimisticMsg);
    }

    setIsSending(true);

    try {
      // Upload files if any (in background)
      let uploadedAttachments = messageAttachments;

      const filesToUpload = messageAttachments.filter((att) => att.file);
      if (filesToUpload.length > 0) {
        setIsUploading(true);
        const files = filesToUpload.map((att) => att.file!);

        console.log("Starting upload...", files.length, "files");

        // Add timeout to prevent hanging forever
        const uploadPromise = startUpload(files);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Upload timeout - taking too long")),
            30000
          )
        );

        const uploadResults = (await Promise.race([
          uploadPromise,
          timeoutPromise,
        ])) as any;
        console.log("Upload complete:", uploadResults);

        if (!uploadResults || uploadResults.length === 0) {
          throw new Error("Upload failed - no results returned");
        }

        // Replace blob URLs with real URLs
        uploadedAttachments = messageAttachments.map((att) => {
          const uploaded = uploadResults.find((r: any) => r.name === att.name);
          if (uploaded) {
            return {
              name: uploaded.name,
              url: uploaded.url,
              type: uploaded.type.startsWith("image") ? "image" : "file",
              size: uploaded.size,
            };
          }
          return {
            name: att.name,
            url: att.url,
            type: att.type,
            size: att.size,
          };
        });
        setIsUploading(false);
      }

      // Send to backend with real URLs
      const formattedAttachments = uploadedAttachments.map((att) => ({
        name: att.name,
        url: att.url,
        type: att.type,
        size: att.size,
      }));

      await sendMessage(chatId, messageContent, formattedAttachments);
    } catch (error) {
      console.log(error);
      setContent(messageContent);
      setAttachments(messageAttachments);
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const now = Date.now();
    if (now - lastTypingRef.current > 2000) {
      lastTypingRef.current = now;
      triggerTyping(chatId).catch(console.error);
    }
  };

  return (
    <div className="p-4 bg-background/80 backdrop-blur-sm sticky bottom-0 z-20 border-t">
      <div className="max-w-4xl mx-auto">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          multiple
        />

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3 px-2 animate-in slide-in-from-bottom-2 fade-in">
            {attachments.map((att, idx) => {
              const isImage =
                att.type === "image" ||
                att.url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i);

              return (
                <div
                  key={idx}
                  className="relative group flex items-center justify-center bg-muted/50 rounded-xl overflow-hidden border shadow-sm transition-all hover:shadow-md w-32 h-24"
                  title={att.name}
                >
                  {isImage ? (
                    <Image
                      src={att.url}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center h-full w-full">
                      <FileIcon className="h-8 w-8 text-blue-500 mb-1" />
                      <span className="text-[10px] w-full truncate font-medium text-foreground">
                        {att.name}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setAttachments(attachments.filter((_, i) => i !== idx))
                    }
                    className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-end gap-2 bg-muted/30 border p-2 rounded-3xl shadow-sm focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="shrink-0 h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Attach file"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </Button>

          <Textarea
            value={content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[44px] max-h-40 px-3 py-3 bg-transparent border-0 focus-visible:ring-0 resize-none text-base text-foreground placeholder:text-muted-foreground shadow-none"
            rows={1}
          />

          <Button
            onClick={handleSend}
            disabled={
              (!content.trim() && attachments.length === 0) ||
              isSending ||
              isUploading
            }
            size="icon"
            className="shrink-0 h-10 w-10 rounded-full mb-0.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md disabled:opacity-50 disabled:shadow-none transition-all duration-200"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5 ml-0.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
