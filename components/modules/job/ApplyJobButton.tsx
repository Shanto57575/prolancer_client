"use strict";
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { createApplicationAction } from "@/actions/application/createApplicationAction";
import { getProfileAction } from "@/actions/user/getProfileAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplyJobButtonProps {
  jobId: string;
  applicants?: string[];
}

export default function ApplyJobButton({
  jobId,
  applicants = [],
}: ApplyJobButtonProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getProfileAction();
        if (res.ok && res.data) {
          setUser(res.data);
          if (applicants.includes(res.data._id)) {
            setIsApplied(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [applicants]);

  const handleApply = async () => {
    if (!user) {
      toast.error("Please login to apply");
      router.push("/login");
      return;
    }

    if (user.role !== "FREELANCER") {
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

  if (checkingAuth) {
    return <Skeleton className="w-full h-12 rounded-md" />;
  }

  if (!user) {
    return (
      <Link href="/login" className="w-full block mb-4">
        <Button className="w-full h-12 text-base font-semibold">
          Login to Apply
        </Button>
      </Link>
    );
  }

  if (user.role !== "FREELANCER") {
    return (
      <Button
        className="w-full h-12 text-base font-semibold mb-4"
        variant="secondary"
        disabled
      >
        <AlertCircle className="mr-2 h-5 w-5" />
        Freelancers Only
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
