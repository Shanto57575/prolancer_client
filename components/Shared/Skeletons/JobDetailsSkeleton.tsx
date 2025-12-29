import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function JobDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl bg-white dark:bg-slate-950 shadow border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-3/4 rounded-lg" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center p-3">
                    <Skeleton className="h-5 w-5 mx-auto mb-2 rounded-full" />
                    <Skeleton className="h-6 w-20 mx-auto mb-1" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-2xl shadow border p-6 sm:p-8 space-y-4">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-2xl shadow border p-6 sm:p-8">
              <Skeleton className="h-6 w-32 mb-4 rounded-lg" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-2xl shadow border p-6 space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>

              <div className="bg-white dark:bg-slate-950 rounded-2xl shadow border p-6 space-y-4">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="rounded-2xl bg-white dark:bg-slate-950 shadow border p-6 space-y-4">
                <Skeleton className="h-5 w-24 mb-4" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    {i < 2 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
