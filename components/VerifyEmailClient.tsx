"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendOtp, verifyOtp } from "@/actions/otp/otp";
import { Label } from "./ui/label";

interface VerifyEmailClientProps {
  email?: string;
}

export function VerifyEmailClient({ email }: VerifyEmailClientProps) {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const toastId = toast.loading("Sending OTP...");
    setIsSubmitting(true);

    try {
      const result = await sendOtp(email, "User");

      if (result.success) {
        toast.success("OTP sent to your email", { id: toastId });
        setConfirmed(true);
        setTimer(120); // Reset timer to 2 minutes
        setOtp(""); // Clear OTP input
        setError(""); // Clear any errors
      } else {
        toast.error(result.error || "Failed to send OTP", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateOtp = (value: string): boolean => {
    if (!value) {
      setError("OTP is required");
      return false;
    }
    if (value.length !== 6) {
      setError("OTP must be exactly 6 digits");
      return false;
    }
    if (!/^\d+$/.test(value)) {
      setError("OTP must contain only numbers");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!validateOtp(otp)) {
      return;
    }

    const toastId = toast.loading("Verifying OTP...");
    setIsSubmitting(true);

    try {
      const result = await verifyOtp(email, otp);

      if (result.success) {
        toast.success("Email verified successfully!", { id: toastId });
        // Redirect to dashboard or login page
        setTimeout(() => {
          router.push("/dashboard"); // Change to your desired route
        }, 1000);
      } else {
        setError(result.error || "Invalid OTP. Please try again.");
        toast.error(result.error || "Invalid OTP. Please try again.", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error(err);
      const errorMessage = "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) {
      setError(""); // Clear error when user starts typing
    }
  };

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      toast.error("Email is required");
      router.push("/"); // Redirect to home or signup page
    }
  }, [email, router]);

  // Timer countdown
  useEffect(() => {
    if (!confirmed || timer === 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [confirmed, timer]);

  // Format timer display (MM:SS)
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!email) {
    return null;
  }

  return (
    <>
      {confirmed ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="otp-form" onSubmit={handleSubmit} className="space-y-6">
              <Field>
                <Label>One-Time Password</Label>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={isSubmitting}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <Dot />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {error && <FieldError>{error}</FieldError>}
                <p className="text-sm text-muted-foreground mt-2">
                  <Button
                    onClick={handleSendOtp}
                    type="button"
                    variant="link"
                    disabled={timer !== 0 || isSubmitting}
                    className={cn("p-0 m-0 h-auto", {
                      "cursor-pointer": timer === 0,
                      "text-muted-foreground cursor-not-allowed": timer !== 0,
                    })}
                  >
                    Resend OTP
                  </Button>{" "}
                  {timer > 0 && `in ${formatTimer(timer)}`}
                </p>
              </Field>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              form="otp-form"
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
            >
              {isSubmitting ? "Verifying..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP to <br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendOtp}
              className="w-full max-w-[300px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send OTP"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
