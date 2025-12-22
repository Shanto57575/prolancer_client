import { getMyApplicationsAction } from "@/actions/application/getMyApplicationsAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CommonPagination from "@/components/Shared/CommonPagination";
import CommonSort from "@/components/Shared/CommonSort";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const sortFields = [
  { label: "Date Applied", value: "createdAt" },
  { label: "Status", value: "status" },
];

export default async function MyApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const { page, sortBy, sortOrder } = await searchParams;
  const currentPage = Number(page) || 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = {};
  if (sortBy) filters.sortBy = sortBy;
  if (sortOrder) filters.sortOrder = sortOrder;

  const { data: applications, meta } = await getMyApplicationsAction({
    page: currentPage,
    limit: 10,
    ...filters,
  });

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">My Applications</h1>
      </div>

      <div className="flex justify-end">
        <div className="w-full sm:w-auto">
          <CommonSort fields={sortFields} defaultField="createdAt" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">Job Title</th>
                <th className="px-6 py-3 whitespace-nowrap">Applied Date</th>
                <th className="px-6 py-3 whitespace-nowrap">Category</th>
                <th className="px-6 py-3 whitespace-nowrap">Budget</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                applications.map((app: any) => (
                  <tr
                    key={app._id}
                    className="bg-card hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="flex flex-col">
                        <span className="text-base truncate max-w-[250px]">
                          {app.jobId?.title || "Job Unavailable"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {app.jobId?.jobType} • {app.jobId?.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(app.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.jobId?.serviceCategory?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.jobId?.budget
                        ? `$${app.jobId.budget}`
                        : "Negotiable"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          app.status === "accepted"
                            ? "default"
                            : app.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className={`capitalize ${
                          app.status === "accepted"
                            ? "bg-green-500"
                            : app.status === "rejected"
                            ? "text-red-50"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {app.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {app.jobId?.slug ? (
                        <Link href={`/jobs/${app.jobId.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" /> View Job
                          </Button>
                        </Link>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          Deleted
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">
                        No applications found
                      </p>
                      <p className="text-sm">
                        You haven&apos;t applied to any jobs yet.
                      </p>
                      <Link href="/jobs" className="mt-4">
                        <Button variant="outline">Browse Jobs</Button>
                      </Link>
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
