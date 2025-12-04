"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (fd: FormData) => Promise<any>;
};

export default function LoginForm({ action }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Fix the form errors");
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("email", formData.email);
      fd.append("password", formData.password);

      const result = await action(fd);
      console.log("result from LoginForm", result);

      if (!result.ok) {
        if (result.errors) setErrors(result.errors);
        toast.error(result.message || "Login failed");
        return;
      }

      toast.success(result.message || "Logged in successfully", {
        position: "bottom-right",
      });
      router.push("/");
    } catch (err) {
      toast.error("Login failed", {
        description: err instanceof Error ? err.message : "Unexpected error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
      <div className="space-y-4">
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email" className="text-sm font-medium">
            Email Address
          </FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              disabled={isLoading}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              aria-invalid={!!errors.email}
              className="h-12 pl-11 border-2 focus:border-primary transition-colors"
            />
          </div>
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.password}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-sm font-medium">
              Password
            </FieldLabel>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline hover:text-primary/80 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isLoading}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              aria-invalid={!!errors.password}
              className="h-12 pl-11 pr-11 border-2 focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && <FieldError>{errors.password}</FieldError>}
        </Field>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
