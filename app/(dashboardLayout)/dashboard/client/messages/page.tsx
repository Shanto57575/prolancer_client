import { MessageSquare } from "lucide-react";

export default function ClientChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
      <MessageSquare className="h-16 w-16 mb-4 opacity-20" />
      <p className="text-lg font-medium mb-2">No conversation selected</p>
      <p className="text-sm hidden md:block">
        Select a conversation from the sidebar to start chatting
      </p>
      <p className="text-sm md:hidden">
        Tap the menu icon to view your conversations
      </p>
    </div>
  );
}
