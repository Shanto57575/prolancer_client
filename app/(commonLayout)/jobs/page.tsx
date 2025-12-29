/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllServices } from "@/actions/service/service";
import CommonSearch from "@/components/Shared/CommonSearch";
import CommonSort from "@/components/Shared/CommonSort";
import CommonFilter from "@/components/Shared/CommonFilter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import JobsGrid from "@/components/modules/Jobs/JobsGrid";
import JobGridSkeleton from "@/components/Shared/Skeletons/JobGridSkeleton";

const sortFields = [
  { label: "Date Created", value: "createdAt" },
  { label: "Budget", value: "budget" },
];

const jobTypeOptions = [
  { label: "All Types", value: "ALL" },
  { label: "Fixed Price", value: "fixed" },
  { label: "Hourly", value: "hourly" },
];

const experienceOptions = [
  { label: "All Levels", value: "ALL" },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Expert", value: "expert" },
];

const statusOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
];

export default async function AllJobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    jobType?: string;
    experienceLevel?: string;
    serviceCategory?: string;
    status?: string;
  }>;
}) {
  const {
    page,
    search,
    sortBy,
    sortOrder,
    jobType,
    experienceLevel,
    serviceCategory,
    status,
  } = await searchParams;

  const currentPage = Number(page) || 1;
  const searchTerm = search || "";

  const filters: any = {};

  if (status && status !== "ALL") {
    filters.status = status;
  }

  if (sortBy) filters.sortBy = sortBy;
  if (sortOrder) filters.sortOrder = sortOrder;
  if (jobType && jobType !== "ALL") filters.jobType = jobType;
  if (experienceLevel && experienceLevel !== "ALL")
    filters.experienceLevel = experienceLevel;
  if (serviceCategory && serviceCategory !== "ALL")
    filters.serviceCategory = serviceCategory;

  const servicesResponse = await getAllServices({ limit: 100 });
  const services = servicesResponse.ok ? servicesResponse.data : [];

  const serviceOptions = [
    { label: "All Services", value: "ALL" },
    ...services.map((service: any) => ({
      label: service.name,
      value: service._id,
    })),
  ];

  const hasActiveFilters =
    searchTerm ||
    (jobType && jobType !== "ALL") ||
    (experienceLevel && experienceLevel !== "ALL") ||
    (serviceCategory && serviceCategory !== "ALL") ||
    (status && status !== "ALL");

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
                    Live Opportunities
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  Premium{" "}
                  <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                  Discover thousands of curated opportunities from verified
                  clients. Updated daily for your success.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center px-6 py-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    24h
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-300 uppercase tracking-wide font-bold">
                    New Added
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elite Search & Filter */}
        <div className="mb-8 bg-white dark:bg-slate-950 rounded-2xl p-4 sm:p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <CommonSearch placeholder="Search projects by title, technology, or expertise..." />

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <CommonSort fields={sortFields} defaultField="createdAt" />
              <CommonFilter
                name="status"
                options={statusOptions}
                placeholder="Status"
                className="min-w-[110px] text-sm"
              />
              <CommonFilter
                name="serviceCategory"
                options={serviceOptions}
                placeholder="Category"
                className="min-w-[130px] text-sm"
              />
              <CommonFilter
                name="jobType"
                options={jobTypeOptions}
                placeholder="Type"
                className="min-w-[120px] text-sm"
              />
              <CommonFilter
                name="experienceLevel"
                options={experienceOptions}
                placeholder="Level"
                className="min-w-[120px] text-sm"
              />
              {hasActiveFilters && (
                <Link href="/jobs" className="ml-auto">
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
          fallback={<JobGridSkeleton />}
        >
          <JobsGrid
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
