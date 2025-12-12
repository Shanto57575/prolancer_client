import { loginAction } from "@/actions/auth/loginAction";
import LoginForm from "@/components/modules/LoginForm";
import Link from "next/link";
import { Zap, Shield, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center pb-4">
            <h1 className="text-4xl font-bold text-black">ProLancer</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back to your account
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow border border-slate-200 dark:border-slate-800">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sign In
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            <LoginForm action={loginAction} />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 p-12 items-center justify-center">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[32px_32px]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        <div className="relative z-10 max-w-md space-y-8 text-white">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-xl text-emerald-100">
              Continue your journey with ProLancer
            </p>
          </div>

          <div className="space-y-6 pt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quick Access</h3>
                <p className="text-sm text-emerald-100">
                  Jump right back into your projects and connections
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Platform</h3>
                <p className="text-sm text-emerald-100">
                  Your account is protected with industry-leading security
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Growing Community</h3>
                <p className="text-sm text-emerald-100">
                  Join thousands of professionals building their careers
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-emerald-100 italic">
                &quot; ProLancer has transformed how I find and manage freelance
                work. The platform is intuitive and the opportunities are
                endless! &quot;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-pink-400 to-emerald-600" />
                <div>
                  <p className="text-sm font-semibold">Sarah Johnson</p>
                  <p className="text-xs text-emerald-100">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
