"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [, setVerifying] = useState(!!sessionId);
  const [paymentStatus, setPaymentStatus] = useState<
    "verifying" | "pending" | "success" | "failed"
  >(sessionId ? "verifying" : "failed");

  useEffect(() => {
    if (!sessionId) return;

    let pollInterval: NodeJS.Timeout | null = null;

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `${process.env.API_BASE_URL}/payment/verify-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await res.json();

        if (data.success && data.data.isPaid) {
          if (data.data.processed) {
            // Webhook has processed the payment
            setPaymentStatus("success");
            setVerifying(false);

            // Clear polling if active
            if (pollInterval) {
              clearInterval(pollInterval);
              pollInterval = null;
            }

            // Trigger confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = {
              startVelocity: 30,
              spread: 360,
              ticks: 60,
              zIndex: 0,
            };

            const randomInRange = (min: number, max: number) =>
              Math.random() * (max - min) + min;

            const interval = setInterval(function () {
              const timeLeft = animationEnd - Date.now();

              if (timeLeft <= 0) {
                return clearInterval(interval);
              }

              const particleCount = 50 * (timeLeft / duration);
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
              });
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
              });
            }, 250);
          } else {
            // Payment is paid but webhook hasn't processed yet
            // Start polling if not already polling
            if (!pollInterval && paymentStatus !== "pending") {
              setPaymentStatus("pending");
              setVerifying(false);

              // Poll every 2 seconds for webhook processing
              pollInterval = setInterval(() => {
                verifyPayment();
              }, 2000);
            }
          }
        } else {
          // Payment failed or not completed
          setPaymentStatus("failed");
          setVerifying(false);

          if (pollInterval) {
            clearInterval(pollInterval);
            pollInterval = null;
          }
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentStatus("failed");
        setVerifying(false);

        if (pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
        }
      }
    };

    // Initial verification
    verifyPayment();

    // Cleanup polling on unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [sessionId, paymentStatus]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      {paymentStatus === "verifying" && (
        <div className="flex flex-col items-center animate-in fade-in duration-500">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Verifying Payment...
          </h1>
          <p className="text-slate-500 mt-2">
            Please wait while we confirm your transaction.
          </p>
        </div>
      )}

      {paymentStatus === "pending" && (
        <div className="flex flex-col items-center animate-in fade-in duration-500">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Processing Payment...
          </h1>
          <p className="text-slate-500 mt-2">
            Your payment was successful! We&apos;re activating your premium
            features now.
          </p>
          <p className="text-slate-400 text-sm mt-1">
            This usually takes just a few seconds.
          </p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="flex flex-col items-center animate-in zoom-in duration-500">
          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
            <CheckCircle2 className="h-20 w-20 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8">
            Thank you for upgrading to Pro. Your premium features including
            Direct Messaging are now active.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="flex flex-col items-center animate-in zoom-in duration-500">
          <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6">
            <XCircle className="h-20 w-20 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Payment Verification Failed
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8">
            We couldn&apos;t confirm your payment. If you were charged, please
            contact support immediately.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">Try Again</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
