/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllJobsAction } from "@/actions/job/job";
import { getAllServices } from "@/actions/service/service";
import CommonPagination from "@/components/Shared/CommonPagination";
import CommonSearch from "@/components/Shared/CommonSearch";
import CommonSort from "@/components/Shared/CommonSort";
import CommonFilter from "@/components/Shared/CommonFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Briefcase,
  Clock,
  X,
  DollarSign,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

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

  const servicesResponse = await getAllServices({ limit: 100 });
  const services = servicesResponse.ok ? servicesResponse.data : [];
  console.log(services);

  const serviceOptions = [
    { label: "All Services", value: "ALL" },
    ...services.map((service: any) => ({
      label: service.name,
      value: service._id,
    })),
  ];

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

  const { data: jobs, meta } = await getAllJobsAction(
    currentPage,
    9,
    searchTerm,
    filters
  );

  const hasActiveFilters =
    searchTerm ||
    (jobType && jobType !== "ALL") ||
    (experienceLevel && experienceLevel !== "ALL") ||
    (serviceCategory && serviceCategory !== "ALL") ||
    (status && status !== "ALL");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/50 relative overflow-hidden">
      {/* Elegant background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-br from-emerald-50/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-blue-50/40 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 max-w-[1600px]">
        {/* Premium Header */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1 w-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                  <span className="text-emerald-600 text-sm font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Live Opportunities
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-3 tracking-tight">
                  Premium Projects
                </h1>
                <p className="text-slate-600 text-base sm:text-lg">
                  <span className="text-slate-900 font-bold">
                    {meta?.total || 0}
                  </span>{" "}
                  curated {meta?.total === 1 ? "opportunity" : "opportunities"}{" "}
                  from verified clients
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center px-6 py-4 bg-linear-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60">
                  <div className="text-3xl font-bold bg-linear-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">
                    {meta?.total || 0}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                    Active
                  </div>
                </div>
                <div className="text-center px-6 py-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/60">
                  <div className="text-3xl font-bold bg-linear-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                    24h
                  </div>
                  <div className="text-xs text-emerald-700 uppercase tracking-wide font-medium">
                    Updated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elite Search & Filter */}
        <div className="mb-8 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <CommonSearch placeholder="Search projects by title, technology, or expertise..." />

          <div className="mt-4 pt-4 border-t border-slate-200/60">
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
                    className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10">
          {jobs?.length > 0 ? (
            jobs.map((job: any) => {
              const isClosed = job.status === "CLOSED";

              const CardContent = (
                <div
                  className={`relative bg-white border rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-500 ${
                    isClosed
                      ? "border-slate-200 shadow-sm cursor-not-allowed"
                      : "border-slate-200/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:border-emerald-300 group-hover:scale-[1.02] group-hover:-translate-y-1"
                  }`}
                >
                  {/* Accent line on hover */}
                  {!isClosed && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
                  )}

                  {isClosed && (
                    <div className="absolute inset-0 bg-slate-50/80 flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white border border-slate-300 rounded-full px-5 py-2.5 shadow-sm">
                          <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                          <span className="text-slate-600 text-sm font-semibold">
                            No longer taking applications
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3
                          className={`text-base sm:text-lg font-bold line-clamp-2 leading-tight ${
                            isClosed
                              ? "text-slate-500"
                              : "text-slate-900 group-hover:text-emerald-600 transition-colors"
                          }`}
                        >
                          {job.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold shrink-0 capitalize border-2 ${
                            job.jobType === "hourly"
                              ? "border-blue-200 text-blue-700 bg-blue-50"
                              : "border-emerald-200 text-emerald-700 bg-emerald-50"
                          }`}
                        >
                          {job.jobType}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="font-medium">
                            {format(new Date(job.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                        {job.serviceCategory && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="truncate text-slate-700 font-semibold">
                              {typeof job.serviceCategory === "string"
                                ? job.serviceCategory
                                : job.serviceCategory?.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                      {job.description.replace(/<[^>]*>?/gm, "")}
                    </p>

                    {/* Skills */}
                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {job.requiredSkills
                          ?.slice(0, 4)
                          .map((skill: string) => (
                            <span
                              key={skill}
                              className="text-xs px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg font-semibold border border-slate-200"
                            >
                              {skill}
                            </span>
                          ))}
                        {job.requiredSkills?.length > 4 && (
                          <span className="text-xs px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg font-semibold border border-slate-200">
                            +{job.requiredSkills.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 mt-auto space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-slate-900">
                            {job.budget ? job.budget.toLocaleString() : "TBD"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg px-3 py-1.5">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs font-bold text-amber-700 capitalize">
                            {job.experienceLevel}
                          </span>
                        </div>
                      </div>

                      {!isClosed && (
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                              Quick Apply
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 group-hover:text-emerald-600 transition-colors">
                            <span className="text-sm font-semibold">
                              Explore
                            </span>
                            <svg
                              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

              if (isClosed) {
                return (
                  <div key={job._id} className="block h-full">
                    {CardContent}
                  </div>
                );
              }

              return (
                <Link
                  key={job._id}
                  href={`/jobs/${job.slug}`}
                  className="block h-full group"
                >
                  {CardContent}
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 sm:py-32">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200 mb-6 shadow-sm">
                <Briefcase className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                No Opportunities Found
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto px-4">
                {hasActiveFilters
                  ? "Refine your search criteria to discover matching projects"
                  : "New premium projects are added daily. Check back soon."}
              </p>
              {hasActiveFilters && (
                <Link href="/jobs">
                  <Button
                    variant="outline"
                    className="gap-2 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                  >
                    <X className="h-4 w-4" />
                    Reset Filters
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta && meta.total > 0 && (
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <CommonPagination
                page={meta.page}
                limit={meta.limit}
                total={meta.total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
