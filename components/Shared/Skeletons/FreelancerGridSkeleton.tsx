import { Skeleton } from "@/components/ui/skeleton";

export default function FreelancerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl h-full flex flex-col overflow-hidden"
        >
          <div className="p-6 flex flex-col items-center text-center flex-1">
            {/* Avatar */}
            <Skeleton className="h-24 w-24 rounded-full mb-4" />

            {/* Name & Title */}
            <Skeleton className="h-6 w-1/2 mb-2 rounded-md" />
            <Skeleton className="h-4 w-1/3 mb-4 rounded-md" />

            {/* Rating & Rate */}
            <div className="flex items-center gap-4 mb-6 w-full justify-center">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 w-full">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-xl mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
