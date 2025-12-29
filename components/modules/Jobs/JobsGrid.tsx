/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllJobsPublicAction } from "@/actions/job/job";
import CommonPagination from "@/components/Shared/CommonPagination";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Briefcase,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface JobsGridProps {
  currentPage: number;
  searchTerm: string;
  filters: any;
  hasActiveFilters: string | boolean | undefined;
}

export default async function JobsGrid({
  currentPage,
  searchTerm,
  filters,
  hasActiveFilters,
}: JobsGridProps) {
  const { data: jobs, meta } = await getAllJobsPublicAction(
    currentPage,
    9,
    searchTerm,
    filters
  );

  return (
    <>
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
                      {job.requiredSkills?.slice(0, 3).map((skill: string) => (
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
    </>
  );
}
