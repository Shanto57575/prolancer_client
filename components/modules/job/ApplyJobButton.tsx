"use strict";
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { createApplicationAction } from "@/actions/application/createApplicationAction";
import { useRouter } from "next/navigation";

interface ApplyJobButtonProps {
  jobId: string;
  isApplied: boolean;
  isFreelancer: boolean;
  isProfileComplete?: boolean; // Optional for now, can be enforced by backend error
}

export default function ApplyJobButton({
  jobId,
  isApplied: initialIsApplied,
  isFreelancer,
}: ApplyJobButtonProps) {
  const [isApplied, setIsApplied] = useState(initialIsApplied);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApply = async () => {
    if (!isFreelancer) {
      toast.error("Only freelancers can apply for jobs");
      return;
    }

    setLoading(true);
    try {
      const res = await createApplicationAction(jobId);
      console.log("res from applyjobbutton", res);

      if (res.success) {
        toast.success("Application submitted successfully!");
        setIsApplied(true);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to apply for job");
      }
    } catch (error) {
      console.log("error from applyjobbutton", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isFreelancer) {
    return (
      <Button className="w-full h-12 text-base font-semibold mb-4" disabled>
        Apply Now (Freelancers Only)
      </Button>
    );
  }

  if (isApplied) {
    return (
      <Button
        className="w-full h-12 text-base font-semibold mb-4 bg-green-600 hover:bg-green-700"
        disabled
      >
        <CheckCircle className="mr-2 h-5 w-5" />
        Applied
      </Button>
    );
  }

  return (
    <Button
      className="w-full h-12 text-base font-semibold mb-4"
      onClick={handleApply}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Applying...
        </>
      ) : (
        "Apply Now"
      )}
    </Button>
  );
}
