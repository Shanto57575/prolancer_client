import CommonSearch from "@/components/Shared/CommonSearch";
import CommonSort from "@/components/Shared/CommonSort";
import CommonFilter from "@/components/Shared/CommonFilter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FreelancersGrid from "@/components/modules/Freelancers/FreelancersGrid";
import FreelancerGridSkeleton from "@/components/Shared/Skeletons/FreelancerGridSkeleton";

const sortFields = [
  { label: "Date Joined", value: "createdAt" },
  { label: "Hourly Rate", value: "hourlyRate" },
  { label: "Rating", value: "rating" },
];

const availabilityOptions = [
  { label: "All Availability", value: "ALL" },
  { label: "Part Time", value: "part-time" },
  { label: "Full Time", value: "full-time" },
  { label: "Hourly", value: "hourly" },
];

export default async function HireFreelancerPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    availability?: string;
    minRate?: string;
    maxRate?: string;
    skill?: string;
    location?: string;
  }>;
}) {
  const {
    page,
    search,
    sortBy,
    sortOrder,
    availability,
    minRate,
    maxRate,
    skill,
    location,
  } = await searchParams;

  const currentPage = Number(page) || 1;
  const searchTerm = search || "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = {};

  if (sortBy) filters.sortBy = sortBy;
  if (sortOrder) filters.sortOrder = sortOrder;
  if (availability && availability !== "ALL")
    filters.availability = availability;
  if (minRate) filters.minRate = minRate;
  if (maxRate) filters.maxRate = maxRate;
  if (skill) filters.skill = skill;
  if (location) filters.location = location;

  const hasActiveFilters =
    searchTerm ||
    (availability && availability !== "ALL") ||
    minRate ||
    maxRate ||
    skill ||
    location;

  return (
    <div className="max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="mb-8 sm:mb-12">
          <div className="bg-white dark:bg-slate-950 text-white shadow-xl shadow-emerald-500/10 dark:shadow-emerald-500/5 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1.5 w-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-sm shadow-emerald-500/50"></div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wider uppercase flex items-center gap-1.5">
                    For Clients
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  Hire Elite{" "}
                  <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Freelancers
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                  Connect with vetted professionals ready to bring your project
                  to life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 bg-white dark:bg-slate-950 rounded-2xl p-4 sm:p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <CommonSearch placeholder="Search freelancers by name, skill, or designation..." />

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <CommonSort fields={sortFields} defaultField="createdAt" />
              <CommonFilter
                name="availability"
                options={availabilityOptions}
                placeholder="Availability"
                className="min-w-[120px] text-sm"
              />
              {/* Add more filters like Min Rate, Max Rate later if CommonFilter supports input or range */}

              {hasActiveFilters && (
                <Link href="/hire-freelancer" className="ml-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <Suspense
          key={JSON.stringify({
            currentPage,
            searchTerm,
            filters,
          })}
          fallback={<FreelancerGridSkeleton />}
        >
          <FreelancersGrid
            currentPage={currentPage}
            searchTerm={searchTerm}
            filters={filters}
            hasActiveFilters={hasActiveFilters}
          />
        </Suspense>
      </div>
    </div>
  );
}
