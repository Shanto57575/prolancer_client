"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RegisterFormData, UserRole } from "@/app/types/auth";
import {
  Briefcase,
  Users,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  Fan,
} from "lucide-react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (formData: FormData) => Promise<any>;
};

export default function RegisterForm({ action }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CLIENT",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(formData.password))
      newErrors.password = "Must include uppercase";
    else if (!/[a-z]/.test(formData.password))
      newErrors.password = "Must include lowercase";
    else if (!/[0-9]/.test(formData.password))
      newErrors.password = "Must include a number";
    else if (!/[^A-Za-z0-9]/.test(formData.password))
      newErrors.password = "Must include a special character";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log("errors from RegisterForm", errors);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("confirmPassword", formData.confirmPassword);
      fd.append("role", formData.role);

      const result = await action(fd);

      if (!result?.ok) {
        if (result?.errors) {
          setErrors(result.errors);
          toast.error("Please fix the highlighted errors");
        } else {
          toast.error(result?.message || "Registration failed");
        }
        return;
      }

      toast.success(result.message || "Account created successfully!", {
        description: "Welcome to ProLancer.",
        position: "bottom-right",
      });

      router.push("/");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CLIENT",
      });
      setErrors({});
    } catch (err) {
      toast.error("Registration failed", {
        description:
          err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
      <div className="space-y-3">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name" className="text-sm font-medium">
            Full Name
          </FieldLabel>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              aria-invalid={!!errors.name}
              disabled={isLoading}
              className="h-12 pl-11 border-2 focus:border-primary transition-colors"
            />
          </div>
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              aria-invalid={!!errors.email}
              disabled={isLoading}
              className="h-12 pl-11 border-2 focus:border-primary transition-colors"
            />
          </div>
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password" className="text-sm font-medium">
            Password
          </FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              aria-invalid={!!errors.password}
              disabled={isLoading}
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

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              aria-invalid={!!errors.confirmPassword}
              disabled={isLoading}
              className="h-12 pl-11 pr-11 border-2 focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword}</FieldError>
          )}
        </Field>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Fan className="h-4 w-4 text-primary" />
          <FieldLabel className="text-sm font-medium">Join as</FieldLabel>
        </div>
        <RadioGroup
          value={formData.role}
          onValueChange={(value) =>
            setFormData({ ...formData, role: value as UserRole })
          }
          disabled={isLoading}
          className="grid grid-cols-2 gap-4"
        >
          <label
            htmlFor="role-client"
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
              formData.role === "CLIENT"
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/40 hover:bg-accent/30 hover:shadow-md"
            }`}
          >
            <RadioGroupItem
              value="CLIENT"
              id="role-client"
              className="sr-only"
            />
            <div
              className={`p-3 rounded-xl transition-colors ${
                formData.role === "CLIENT"
                  ? "bg-primary/20"
                  : "bg-muted group-hover:bg-primary/10"
              }`}
            >
              <Users
                className={`h-7 w-7 transition-colors ${
                  formData.role === "CLIENT"
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              />
            </div>
            <div className="text-center space-y-1">
              <p
                className={`font-bold text-sm transition-colors ${
                  formData.role === "CLIENT" ? "text-primary" : ""
                }`}
              >
                Client
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                Hire professionals
              </p>
            </div>
          </label>

          <label
            htmlFor="role-freelancer"
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
              formData.role === "FREELANCER"
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/40 hover:bg-accent/30 hover:shadow-md"
            }`}
          >
            <RadioGroupItem
              value="FREELANCER"
              id="role-freelancer"
              className="sr-only"
            />
            <div
              className={`p-3 rounded-xl transition-colors ${
                formData.role === "FREELANCER"
                  ? "bg-primary/20"
                  : "bg-muted group-hover:bg-primary/10"
              }`}
            >
              <Briefcase
                className={`h-7 w-7 transition-colors ${
                  formData.role === "FREELANCER"
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              />
            </div>
            <div className="text-center space-y-1">
              <p
                className={`font-bold text-sm transition-colors ${
                  formData.role === "FREELANCER" ? "text-primary" : ""
                }`}
              >
                Freelancer
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                Offer your skills
              </p>
            </div>
          </label>
        </RadioGroup>
        {errors.role && <FieldError>{errors.role}</FieldError>}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
