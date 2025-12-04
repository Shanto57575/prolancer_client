import { getAllJobsAction } from "@/actions/job/job";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data: jobs, meta } = await getAllJobsAction(currentPage, 10, search);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Jobs</h1>
        {/* Search bar could go here */}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Budget</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs?.length > 0 ? (
              jobs.map((job: any) => (
                <tr
                  key={job._id}
                  className="bg-card hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{job.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Avatar could go here */}
                      <span>{job.clientId?.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{job.serviceCategory}</td>
                  <td className="px-6 py-4 capitalize">{job.jobType}</td>
                  <td className="px-6 py-4">
                    {job.budget ? `$${job.budget}` : "Negotiable"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        job.status === "OPEN"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/jobs/${job._id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Basic Pagination */}
      {meta && meta.pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
            <Link key={p} href={`/dashboard/admin/jobs?page=${p}`}>
              <Button
                variant={p === currentPage ? "default" : "outline"}
                size="sm"
              >
                {p}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
