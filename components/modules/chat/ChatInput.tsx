"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Paperclip, Send, X } from "lucide-react";
import { useState } from "react";
import { sendMessage } from "@/actions/chat/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUploader from "@/components/FileUploader";

interface ChatInputProps {
  chatId: string;
}

export default function ChatInput({ chatId }: ChatInputProps) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]); // URLs only for now as FileUploader returns strings
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleSend = async () => {
    if ((!content.trim() && attachments.length === 0) || isSending) return;

    setIsSending(true);
    try {
      // Map URLs to attachment objects (name is unknown, type guessed or generic)
      const formattedAttachments = attachments.map((url) => ({
        name: url.split("/").pop() || "Attachment",
        url,
        type: "file",
      }));

      await sendMessage(chatId, content, formattedAttachments);
      setContent("");
      setAttachments([]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((url, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs"
            >
              <span className="truncate max-w-[150px]">
                {url.split("/").pop()}
              </span>
              <button
                onClick={() =>
                  setAttachments(attachments.filter((_, i) => i !== idx))
                }
                className="text-muted-foreground hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 items-end">
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Attachments</DialogTitle>
            </DialogHeader>
            <FileUploader
              endpoint="fileUploader" // Using existing endpoint
              value={attachments}
              onChange={(urls) => {
                setAttachments(urls);
                // Don't close immediately, let user see it
              }}
            />
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsUploadOpen(false)}>Done</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-10 max-h-40 resize-none"
          rows={1}
        />

        <Button
          onClick={handleSend}
          disabled={(!content.trim() && attachments.length === 0) || isSending}
          size="icon"
          className="shrink-0"
        >
          {isSending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
