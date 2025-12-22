import { Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative flex items-center justify-center gap-4">
            <span className="text-9xl font-bold text-emerald-600 dark:text-emerald-400">
              4
            </span>
            <div className="w-24 h-24 rounded-full border-8 border-emerald-600 dark:border-emerald-400 flex items-center justify-center animate-spin-slow">
              <Briefcase className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-9xl font-bold text-emerald-600 dark:text-emerald-400">
              4
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Looks like this freelance gig has been completed or moved.
            Let&apos;s get you back on track to find the perfect talent or
            project!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 pt-">
          Need help? Contact our{" "}
          <Link
            href="mailto:shanto57575@gmail.com"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            support team
          </Link>
        </p>
      </div>
    </div>
  );
}
