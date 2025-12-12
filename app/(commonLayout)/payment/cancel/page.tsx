import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6">
        <XCircle className="h-20 w-20 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Payment Cancelled
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8">
        You have not been charged. If you faced any issues, please try again or
        contact support.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/pricing">Try Again</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
