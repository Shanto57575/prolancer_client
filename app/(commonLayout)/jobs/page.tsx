/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllJobsPublicAction } from "@/actions/job/job";
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
  Star,
  ArrowRight,
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

  const [servicesResponse, { data: jobs, meta }] = await Promise.all([
    getAllServices({ limit: 100 }),
    getAllJobsPublicAction(currentPage, 9, searchTerm, filters),
  ]);
  const services = servicesResponse.ok ? servicesResponse.data : [];
  console.log(services);

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
                  Discover{" "}
                  <span className="text-slate-900 dark:text-white font-bold">
                    {meta?.total || 0}
                  </span>{" "}
                  curated opportunities from verified clients. Updated daily for
                  your success.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    {meta?.total || 0}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold">
                    Active Jobs
                  </div>
                </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10">
          {jobs?.length > 0 ? (
            jobs.map((job: any) => {
              const isClosed = job.status === "CLOSED";

              const CardContent = (
                <div
                  className={`relative bg-white dark:bg-slate-950 border rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 ${
                    isClosed
                      ? "border-slate-200 dark:border-slate-800 opacity-75 grayscale cursor-not-allowed"
                      : "border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
                  }`}
                >
                  {/* Accent line on hover */}
                  {!isClosed && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  {isClosed && (
                    <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 z-20 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2">
                        <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-300 text-sm font-bold">
                          Applications Closed
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3
                          className={`text-lg font-bold line-clamp-2 leading-tight ${
                            isClosed
                              ? "text-slate-500 dark:text-slate-500"
                              : "text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                          }`}
                        >
                          {job.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-xs font-bold shrink-0 capitalize px-2.5 py-0.5 border-none ${
                            job.jobType === "hourly"
                              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20"
                              : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20"
                          }`}
                        >
                          {job.jobType}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="font-medium">
                            {format(new Date(job.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                        {job.serviceCategory && (
                          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md max-w-[50%]">
                            <span className="text-slate-400">•</span>
                            <span className="truncate font-semibold text-slate-700 dark:text-slate-300">
                              {typeof job.serviceCategory === "string"
                                ? job.serviceCategory
                                : job.serviceCategory?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-1">
                      {job.description.replace(/<[^>]*>?/gm, "")}
                    </p>

                    {/* Skills */}
                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.requiredSkills
                          ?.slice(0, 3)
                          .map((skill: string) => (
                            <span
                              key={skill}
                              className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-medium border border-slate-100 dark:border-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        {job.requiredSkills?.length > 3 && (
                          <span className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md font-medium border border-slate-100 dark:border-slate-700">
                            +{job.requiredSkills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                            <DollarSign className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                              {job.budget ? job.budget.toLocaleString() : "TBD"}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                              Budget
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold capitalize ${
                            job.experienceLevel === "expert"
                              ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                              : job.experienceLevel === "intermediate"
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                              : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                          }`}
                        >
                          <Star className="h-3 w-3 fill-current" />
                          {job.experienceLevel}
                        </div>
                      </div>
                      {!isClosed && (
                        <div className="w-full bg-emerald-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30 transition-all duration-200">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            View Details
                          </span>
                          <div className="h-9 w-9 rounded-lg bg-white dark:bg-emerald-700 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-800 flex items-center justify-center transition-all duration-200 shadow-sm group-hover:shadow-md">
                            <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-200 group-hover:text-white transition-colors" />
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
            <div className="col-span-full text-center py-24 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 dashed shadow-sm">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800 mb-6 relative">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl"></div>
                <Briefcase className="h-10 w-10 text-slate-300 dark:text-slate-600 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                No Opportunities Found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                {hasActiveFilters
                  ? "We couldn't find any projects matching your filters. Try adjusting your search criteria."
                  : "New premium projects are added daily. Check back soon for new opportunities."}
              </p>
              {hasActiveFilters && (
                <Link href="/jobs">
                  <Button className="gap-2 bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                    <X className="h-4 w-4" />
                    Reset All Filters
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta && meta.total > 0 && (
          <div className="flex justify-center mt-12 mb-8">
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full p-2 shadow-sm">
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
