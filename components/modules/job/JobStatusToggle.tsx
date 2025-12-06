"use client";

import { toggleJobStatusAction } from "@/actions/job/toggleJobStatusAction";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface JobStatusToggleProps {
  jobId: string;
  initialStatus: "OPEN" | "CLOSED";
}

export default function JobStatusToggle({
  jobId,
  initialStatus,
}: JobStatusToggleProps) {
  const [status, setStatus] = useState<"OPEN" | "CLOSED">(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    const newStatus = checked ? "OPEN" : "CLOSED";
    // Optimistic update
    setStatus(newStatus);

    startTransition(async () => {
      try {
        const res = await toggleJobStatusAction(jobId, newStatus);
        if (res?.success) {
          toast.success(
            `Job is now ${newStatus === "OPEN" ? "Open" : "Closed"}`
          );
        } else {
          // Revert on failure
          setStatus(initialStatus);
          toast.error(res?.message || "Failed to update job status");
        }
      } catch (error) {
        // Revert on error
        setStatus(initialStatus);
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Switch
                id={`job-status-${jobId}`}
                checked={status === "OPEN"}
                onCheckedChange={handleToggle}
                disabled={isPending}
                className="data-[state=checked]:bg-green-600"
              />
              <Label
                htmlFor={`job-status-${jobId}`}
                className={`text-sm font-medium cursor-pointer ${
                  status === "OPEN" ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {status === "OPEN" ? "Active" : "Closed"}
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {status === "OPEN"
                ? "Job is visible to freelancers"
                : "Job is hidden from freelancers"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
