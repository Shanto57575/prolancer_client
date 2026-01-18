"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCog,
  Briefcase,
  User,
  Target,
} from "lucide-react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (fd: FormData) => Promise<any>;
};

const DEMO_ACCOUNTS = {
  admin: {
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
    label: "Demo Admin",
    icon: UserCog,
    color: "emerald",
  },
  client: {
    email: process.env.NEXT_PUBLIC_DEMO_CLIENT_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_CLIENT_PASSWORD,
    label: "Demo Client",
    icon: Briefcase,
    color: "emerald",
  },
  freelancer: {
    email: process.env.NEXT_PUBLIC_DEMO_FREELANCER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_FREELANCER_PASSWORD,
    label: "Demo Freelancer",
    icon: User,
    color: "emerald",
  },
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
      toast.error("Fill up the form");
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

  const handleDemoLogin = async (type: keyof typeof DEMO_ACCOUNTS) => {
    const credentials = DEMO_ACCOUNTS[type];

    setFormData({
      email: credentials.email as string,
      password: credentials.password as string,
    });

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("email", credentials.email as string);
      fd.append("password", credentials.password as string);

      const result = await action(fd);

      if (!result.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      toast.success(`Logged in as ${credentials.label}`, {
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
    <div className="w-full space-y-5">
      {/* Demo Accounts Info Banner */}
      <div className="p-4 rounded-lg text-center bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
        <p className="flex items-center justify-center gap-x-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          <Target size={18} /> <span>Quick Demo Access</span>
        </p>
        <p className="text-xs text-emerald-700 dark:text-emerald-300">
          Click any button below to explore different user roles instantly
        </p>
      </div>

      {/* Demo Login Buttons */}
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(DEMO_ACCOUNTS).map(([key, account]) => {
          const Icon = account.icon;
          return (
            <Button
              key={key}
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => handleDemoLogin(key as keyof typeof DEMO_ACCOUNTS)}
              className={`cursor-pointer h-auto py-3 px-4 text-left justify-start hover:bg-${account.color}-50 dark:hover:bg-${account.color}-950 hover:border-${account.color}-300 dark:hover:border-${account.color}-700 transition-all`}
            >
              <div className="flex items-center justify-center gap-3 w-full">
                <Icon className="h-5 w-5 shrink-0" />
                <p className="font-semibold text-sm">{account.label}</p>
              </div>
            </Button>
          );
        })}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
            Or login with your account
          </span>
        </div>
      </div>

      {/* Regular Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
          <FieldLabel htmlFor="password" className="text-sm font-medium">
            Password
          </FieldLabel>
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
    </div>
  );
}
