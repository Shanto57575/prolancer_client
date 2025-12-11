/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyJobsAction } from "@/actions/job/job";
import {
  Edit,
  Plus,
  Eye,
  Users,
  Briefcase,
  DollarSign,
  Clock,
} from "lucide-react";
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
    <div className="container mx-auto py-6 sm:py-8 space-y-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Posted Jobs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your job postings
          </p>
        </div>
        <Link href="/dashboard/client/create-job" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <CommonSearch placeholder="Search jobs by title..." />

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
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
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block border rounded-lg overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Job Details
                </th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Type</th>
                <th className="px-6 py-4 text-left font-semibold">Budget</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">
                  Applicants
                </th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs?.length > 0 ? (
                jobs.map((job: any) => (
                  <tr
                    key={job._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-base line-clamp-1">
                          {job.title}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {job.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">
                        {typeof job.serviceCategory === "string"
                          ? job.serviceCategory
                          : job.serviceCategory?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="capitalize">
                        {job.jobType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">
                        {job.budget ? `$${job.budget}` : "Negotiable"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          job.status === "OPEN" ? "default" : "secondary"
                        }
                        className={
                          job.status === "OPEN"
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                        }
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {job.applicationCount || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-muted p-4">
                        <Briefcase className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold">No jobs found</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Post a job to get started or adjust your filters.
                        </p>
                      </div>
                      <Link href="/dashboard/client/create-job">
                        <Button className="mt-2">
                          <Plus className="mr-2 h-4 w-4" /> Post Your First Job
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View - Hidden on desktop */}
      <div className="lg:hidden space-y-4">
        {jobs?.length > 0 ? (
          jobs.map((job: any) => (
            <Card
              key={job._id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {job.slug}
                      </p>
                    </div>
                    <Badge
                      variant={job.status === "OPEN" ? "default" : "secondary"}
                      className={
                        job.status === "OPEN"
                          ? "bg-green-500 hover:bg-green-600 shrink-0"
                          : "shrink-0"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 border-t">
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Category
                        </p>
                        <p className="text-sm font-medium truncate">
                          {typeof job.serviceCategory === "string"
                            ? job.serviceCategory
                            : job.serviceCategory?.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm font-medium capitalize truncate">
                          {job.jobType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="text-sm font-semibold truncate">
                          {job.budget ? `$${job.budget}` : "Negotiable"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Applicants
                        </p>
                        <p className="text-sm font-semibold">
                          {job.applicationCount || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
                    <Link
                      href={`/dashboard/client/my-posted-jobs/${job.slug}/applicants`}
                      className="flex-1 sm:flex-initial"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Applicants
                      </Button>
                    </Link>
                    <Link href={`/jobs/${job.slug}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </Link>
                    <Link
                      href={`/dashboard/client/my-posted-jobs/${job.slug}/edit`}
                    >
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                      <JobStatusToggle
                        jobId={job._id}
                        initialStatus={job.status}
                      />
                      <DeleteJobDialog jobId={job._id} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-sm">
            <CardContent className="py-16">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-6">
                  <Briefcase className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">No jobs found</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Post a job to get started or try adjusting your filters to
                    find what you&apos;re looking for.
                  </p>
                </div>
                <Link href="/dashboard/client/create-job" className="mt-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Post Your First Job
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {meta && jobs?.length > 0 && (
        <div className="flex justify-center sm:justify-end pt-2">
          <CommonPagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
          />
        </div>
      )}
    </div>
  );
}
