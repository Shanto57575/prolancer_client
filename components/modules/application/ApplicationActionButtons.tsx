"use client";

import { updateApplicationStatusAction } from "@/actions/application/updateApplicationStatusAction";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ApplicationActionButtonsProps {
  applicationId: string;
  jobId: string;
  currentStatus: string;
}

export default function ApplicationActionButtons({
  applicationId,
  jobId,
  currentStatus,
}: ApplicationActionButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusUpdate = async (status: "accepted" | "rejected") => {
    setLoading(status);
    try {
      const res = await updateApplicationStatusAction(
        applicationId,
        jobId,
        status
      );
      if (res.success) {
        toast.success(`Application ${status} successfully`);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  if (currentStatus === "accepted") {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-full text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
        disabled
      >
        Accepted
      </Button>
    );
  }

  if (currentStatus === "rejected") {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        disabled
      >
        Rejected
      </Button>
    );
  }

  return (
    <div className="flex gap-2 w-full">
      <Button
        size="sm"
        variant="default"
        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        onClick={() => handleStatusUpdate("accepted")}
        disabled={!!loading}
      >
        {loading === "accepted" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Accept"
        )}
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className="flex-1"
        onClick={() => handleStatusUpdate("rejected")}
        disabled={!!loading}
      >
        {loading === "rejected" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Reject"
        )}
      </Button>
    </div>
  );
}
