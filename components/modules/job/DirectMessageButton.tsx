"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createChatAsFreelancer } from "@/actions/chat/chat";
import { toast } from "sonner";

interface DirectMessageButtonProps {
  jobId: string;
  clientId: string;
  jobTitle: string;
  currentUserId: string;
  isPremium: boolean;
}

export default function DirectMessageButton({
  jobId,
  clientId,
  currentUserId,
  isPremium,
}: DirectMessageButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMessage = async () => {
    setLoading(true);
    try {
      if (!currentUserId) {
        toast.error("Please login to message the client");
        router.push("/login");
        return;
      }

      // Check Premium Status based on prop
      if (!isPremium) {
        toast.error("Upgrade to Pro to message clients directly");
        router.push("/pricing");
        setLoading(false);
        return;
      }

      // Create Chat
      const res = await createChatAsFreelancer(jobId, clientId, currentUserId);
      if (res.success) {
        router.push(`/dashboard/freelancer/messages/${res.data._id}`);
      } else {
        toast.error(res.message || "Failed to start chat");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
      onClick={handleMessage}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <MessageCircle className="h-4 w-4" />
      )}
      Message Client
    </Button>
  );
}
