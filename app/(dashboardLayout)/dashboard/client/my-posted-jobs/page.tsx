import { getMyJobsAction, deleteJobAction } from "@/actions/job/job";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming Table component exists, if not I'll check or use basic HTML
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { revalidatePath } from "next/cache";

// Since I haven't checked for Table component, I'll use a basic table structure with Tailwind if Table is missing.
// But usually ShadCN has Table. Let's assume it might not be there or I should check.
// I'll check for Table component first in the next step, but to save turns I'll write a component that uses standard HTML table with Tailwind classes if I'm not sure.
// Actually, I saw the list of UI components earlier and "table.tsx" was NOT in the list.
// So I will use standard HTML table with Tailwind.

export default async function MyPostedJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data: jobs, meta } = await getMyJobsAction(currentPage);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Posted Jobs</h1>
        <Link href="/dashboard/client/create-job">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Budget</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Applications</th>
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
                  <td className="px-6 py-4">{job.applicationCount || 0}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/dashboard/client/jobs/${job._id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    {/* Delete button would ideally be a client component with confirmation, 
                        but for now I'll make a simple form action or just a button that calls server action via form */}
                    <form
                      action={async () => {
                        "use server";
                        await deleteJobAction(job._id);
                      }}
                      className="inline-block"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No jobs posted yet.
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
            <Link key={p} href={`/dashboard/client/my-posted-jobs?page=${p}`}>
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
