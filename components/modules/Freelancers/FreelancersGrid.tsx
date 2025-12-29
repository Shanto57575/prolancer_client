/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPublicFreelancers } from "@/actions/freelancer/freelancer";
import CommonPagination from "@/components/Shared/CommonPagination";
import FreelancerCard from "@/components/Shared/FreelancerCard";
import { Button } from "@/components/ui/button";
import { Users, X } from "lucide-react";
import Link from "next/link";

interface FreelancersGridProps {
  currentPage: number;
  searchTerm: string;
  filters: any;
  hasActiveFilters: string | boolean | undefined;
}

export default async function FreelancersGrid({
  currentPage,
  searchTerm,
  filters,
  hasActiveFilters,
}: FreelancersGridProps) {
  const { data: freelancers, meta } = await getPublicFreelancers(
    currentPage,
    9,
    searchTerm,
    filters
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10">
        {freelancers?.length > 0 ? (
          freelancers.map((freelancer: any) => (
            <FreelancerCard key={freelancer._id} freelancer={freelancer} />
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 dashed shadow-sm">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800 mb-6 relative">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl"></div>
              <Users className="h-10 w-10 text-slate-300 dark:text-slate-600 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Freelancers Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              {hasActiveFilters
                ? "We couldn't find any freelancers matching your filters. Try adjusting your search criteria."
                : "No freelancers are currently available matching these criteria."}
            </p>
            {hasActiveFilters && (
              <Link href="/hire-freelancer">
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
