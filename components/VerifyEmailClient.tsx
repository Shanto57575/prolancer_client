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
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendOtp, verifyOtp } from "@/actions/otp/otp";
import { Label } from "./ui/label";

interface VerifyEmailClientProps {
  name?: string;
  email?: string;
}

export function VerifyEmailClient({ name, email }: VerifyEmailClientProps) {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [, setIsHydrated] = useState(false);

  const otpSentRef = useRef(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    if (!email) {
      toast.error("Email is required");
      router.push("/");
      return;
    }

    const otpSessionKey = `otp_session_${email}`;
    const savedSession = localStorage.getItem(otpSessionKey);

    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - session.sentTime) / 1000);
        const remainingTime = Math.max(0, 120 - elapsedTime);

        if (remainingTime > 0) {
          setTimer(remainingTime);
          setIsHydrated(true);
          otpSentRef.current = true;
          return;
        } else {
          localStorage.removeItem(otpSessionKey);
        }
      } catch (err) {
        console.error("Failed to parse OTP session:", err);
        localStorage.removeItem(otpSessionKey);
      }
    }

    const sessionData = {
      email,
      sentTime: Date.now(),
    };
    localStorage.setItem(otpSessionKey, JSON.stringify(sessionData));
    setTimer(120);
    setIsHydrated(true);
    otpSentRef.current = true;
  }, []);

  useEffect(() => {
    if (timer <= 0) return;

    const id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timer]);

  const formatTimer = (sec: number) =>
    `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  const handleResendOtp = async () => {
    if (!email || timer > 0) return;

    setIsSendingOtp(true);
    const toastId = toast.loading("Sending OTP...");

    try {
      const displayName = name || email.split("@")[0];
      const result = await sendOtp(email, displayName);
      if (result.success) {
        toast.success("OTP resent", { id: toastId });
        setTimer(120);
        setOtp("");
        setError("");

        // Update OTP session in localStorage
        const otpSessionKey = `otp_session_${email}`;
        const sessionData = {
          email,
          sentTime: Date.now(),
        };
        localStorage.setItem(otpSessionKey, JSON.stringify(sessionData));
      } else {
        toast.error(result.error || "Failed to send OTP", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsVerifyingOtp(true);
    const toastId = toast.loading("Verifying OTP...");

    try {
      const result = await verifyOtp(email!, otp);
      if (result.success) {
        toast.success("Email verified! You can login Now", { id: toastId });

        const otpSessionKey = `otp_session_${email}`;
        localStorage.removeItem(otpSessionKey);

        router.push("/dashboard");
      } else {
        setError(result.error || "Invalid OTP");
        toast.error(result.error || "Invalid OTP", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <Card className="w-full max-w-md min-w-80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>
          {isSendingOtp ? "Sending OTP..." : "Enter the 6-digit code sent to"}
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="min-h-[140px] flex items-center justify-center">
          {isSendingOtp ? (
            <div className="w-full h-16 bg-muted rounded-md flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <form
              id="otp-form"
              onSubmit={handleSubmit}
              className="w-full space-y-4"
            >
              <Field>
                <Label>One-Time Password</Label>

                {/* 👇 FIXED WIDTH prevents UI jump */}
                <div className="min-w-[280px]">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(v) => {
                      setOtp(v);
                      if (error) setError("");
                    }}
                    disabled={isVerifyingOtp}
                  >
                    {[0, 1, 2].map((i) => (
                      <InputOTPGroup key={i}>
                        <InputOTPSlot index={i} />
                      </InputOTPGroup>
                    ))}
                    <Dot />
                    {[3, 4, 5].map((i) => (
                      <InputOTPGroup key={i}>
                        <InputOTPSlot index={i} />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </div>

                {error && <FieldError>{error}</FieldError>}

                <p className="text-sm text-muted-foreground mt-2">
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendOtp}
                    disabled={timer > 0}
                    className={cn("p-0 h-auto", {
                      "cursor-not-allowed": timer > 0,
                    })}
                  >
                    Resend OTP
                  </Button>{" "}
                  {timer > 0 && `in ${formatTimer(timer)}`}
                </p>
              </Field>
            </form>
          )}
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          form="otp-form"
          type="submit"
          disabled={isVerifyingOtp || otp.length !== 6}
        >
          {isVerifyingOtp ? "Verifying..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
