/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyJobsAction } from "@/actions/job/job";
import { Edit, Plus, Eye, Users } from "lucide-react";
import CommonSort from "@/components/Shared/CommonSort";
import CommonSearch from "@/components/Shared/CommonSearch";
import CommonFilter from "@/components/Shared/CommonFilter";
import CommonPagination from "@/components/Shared/CommonPagination";
import JobStatusToggle from "@/components/modules/job/JobStatusToggle";
import DeleteJobDialog from "@/components/modules/job/DeleteJobDialog";

const sortFields = [
  { label: "Date Created", value: "createdAt" },
  { label: "Budget", value: "budget" },
  { label: "Deadline", value: "deadline" },
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

export default async function MyPostedJobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    jobType?: string;
    experienceLevel?: string;
    status?: string;
  }>;
}) {
  const { page, search, sortBy, sortOrder, jobType, experienceLevel, status } =
    await searchParams;

  const currentPage = Number(page) || 1;
  const searchTerm = search || "";

  const filters: any = {};
  if (sortBy) filters.sortBy = sortBy;
  if (sortOrder) filters.sortOrder = sortOrder;
  if (jobType && jobType !== "ALL") filters.jobType = jobType;
  if (experienceLevel && experienceLevel !== "ALL")
    filters.experienceLevel = experienceLevel;
  if (status && status !== "ALL") filters.status = status;

  const { data: jobs, meta } = await getMyJobsAction(
    currentPage,
    10,
    searchTerm,
    filters
  );

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">My Posted Jobs</h1>
        <Link href="/dashboard/post-job" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <CommonSearch />
        </div>

        <div className="flex flex-wrap gap-2 items-center rounded-lg border p-3 bg-muted/20">
          <span className="text-sm font-medium text-muted-foreground mr-2 w-full sm:w-auto">
            Filters:
          </span>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto">
            <CommonSort fields={sortFields} defaultField="createdAt" />
            <CommonFilter
              name="jobType"
              options={jobTypeOptions}
              placeholder="Job Type"
            />
            <CommonFilter
              name="experienceLevel"
              options={experienceOptions}
              placeholder="Experience"
            />
            <CommonFilter
              name="status"
              options={statusOptions}
              placeholder="Status"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">Title</th>
                <th className="px-6 py-3 whitespace-nowrap">Category</th>
                <th className="px-6 py-3 whitespace-nowrap">Type</th>
                <th className="px-6 py-3 whitespace-nowrap">Budget</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 whitespace-nowrap">Applicants</th>
                <th className="px-6 py-3 text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {jobs?.length > 0 ? (
                jobs.map((job: any) => (
                  <tr
                    key={job._id}
                    className="bg-card hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="flex flex-col">
                        <span className="text-base truncate max-w-[200px]">
                          {job.title}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {job.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {typeof job.serviceCategory === "string"
                        ? job.serviceCategory
                        : job.serviceCategory?.name}
                    </td>
                    <td className="px-6 py-4 capitalize whitespace-nowrap">
                      {job.jobType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.budget ? `$${job.budget}` : "Negotiable"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          job.status === "OPEN" ? "outline" : "secondary"
                        }
                        className={
                          job.status === "OPEN"
                            ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20"
                            : ""
                        }
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {job.applicationCount || 0}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/dashboard/client/my-posted-jobs/${job.slug}/applicants`}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Applicants"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/jobs/${job.slug}`}>
                        <Button variant="ghost" size="icon" title="View Job">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`/dashboard/client/my-posted-jobs/${job.slug}/edit`}
                      >
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <JobStatusToggle
                        jobId={job._id}
                        initialStatus={job.status}
                      />
                      <DeleteJobDialog jobId={job._id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">No jobs found</p>
                      <p className="text-sm">
                        Post a job to get started or try adjusting your filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        {meta && (
          <CommonPagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
          />
        )}
      </div>
    </div>
  );
}
