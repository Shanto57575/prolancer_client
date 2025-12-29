import { Skeleton } from "@/components/ui/skeleton";

export default function JobGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl h-full flex flex-col overflow-hidden"
        >
          <div className="p-6 flex flex-col flex-1">
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-6 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>

            {/* Footer */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
