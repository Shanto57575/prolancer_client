import Link from "next/link";
import { Zap, Shield, TrendingUp } from "lucide-react";
import RegisterForm from "@/components/modules/RegisterForm";
import { registerAction } from "@/actions/auth/registerAction";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-emerald-50 to-emerald-100 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-950">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 p-12 items-center justify-center">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[32px_32px]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        <div className="relative z-10 max-w-md space-y-8 text-white">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">ProLancer</h1>
            <p className="text-xl text-emerald-100">
              Your gateway to endless opportunities
            </p>
          </div>

          <div className="space-y-6 pt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fast & Simple</h3>
                <p className="text-sm text-emerald-100">
                  Get started in minutes and connect with opportunities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure & Trusted</h3>
                <p className="text-sm text-emerald-100">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Grow Your Career</h3>
                <p className="text-sm text-emerald-100">
                  Access thousands of projects and talented professionals
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-pink-400 to-emerald-600 border-2 border-white" />
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-400 to-cyan-600 border-2 border-white" />
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-green-400 to-emerald-600 border-2 border-white" />
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-orange-400 to-red-600 border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Join 10,000+ users</p>
                <p className="text-xs text-emerald-100">
                  Already growing with ProLancer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center pb-4">
            <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent">
              ProLancer
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your gateway to endless opportunities
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow border border-slate-200 dark:border-slate-800">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Create Account
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Start your journey with us today
              </p>
            </div>

            <RegisterForm action={registerAction} />
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
