import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function FreelancerDetailsSkeleton() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden bg-white dark:bg-slate-950">
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <Skeleton className="h-32 w-32 sm:h-40 sm:w-40 rounded-2xl" />

            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48 rounded-lg" />
                  <Skeleton className="h-6 w-32 rounded-lg" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-24 rounded-md" />
                  <Skeleton className="h-9 w-32 rounded-md" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-24 rounded-full" />
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6 space-y-6">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-full w-1 rounded-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6 space-y-6">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
