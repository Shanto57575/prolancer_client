import { getJobApplicationsAction } from "@/actions/application/getJobApplicationsAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CommonPagination from "@/components/Shared/CommonPagination";
import CommonSort from "@/components/Shared/CommonSort";
import { format } from "date-fns";
import { ArrowLeft, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getJobByIdAction } from "@/actions/job/job";
import ApplicationActionButtons from "@/components/modules/application/ApplicationActionButtons";
import { createChatAsClient } from "@/actions/chat/createChatAction";
import { MessageCircle } from "lucide-react";

const sortFields = [
  { label: "Date Applied", value: "createdAt" },
  { label: "Status", value: "status" },
];

export default async function JobApplicantsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const { slug } = await params;
  const { page, sortBy, sortOrder } = await searchParams;
  const currentPage = Number(page) || 1;

  const jobRes = await getJobByIdAction(slug);

  if (!jobRes.ok || !jobRes.data) {
    return (
      <div className="container py-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <Link href="/dashboard/client/my-posted-jobs">
          <Button variant="link" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Jobs
          </Button>
        </Link>
      </div>
    );
  }

  const job = jobRes.data;
  const jobId = job?._id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = {};
  if (sortBy) filters.sortBy = sortBy;
  if (sortOrder) filters.sortOrder = sortOrder;

  const { data: applications, meta } = await getJobApplicationsAction(jobId, {
    page: currentPage,
    limit: 10,
    ...filters,
  });

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/dashboard/client/my-posted-jobs"
            className="flex items-center text-muted-foreground hover:text-foreground mb-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Jobs
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Applicants for: <span className="text-primary">{job.title}</span>
          </h1>
        </div>
      </div>

      <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
        <div className="text-sm text-muted-foreground">
          Total Applicants:{" "}
          <span className="font-bold text-foreground">{meta?.total || 0}</span>
        </div>
        <CommonSort fields={sortFields} defaultField="createdAt" />
      </div>

      <div className="grid gap-4">
        {applications?.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          applications.map((app: any) => (
            <div
              key={app._id}
              className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Freelancer Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted shrink-0 border">
                        {app.freelancerId?.profilePicture ? (
                          <Image
                            src={app.freelancerId.profilePicture}
                            alt={app.freelancerId.userId?.name || "Freelancer"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary font-bold text-xl">
                            {app.freelancerId?.userId?.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {app.freelancerId?.userId?.name || "Unknown User"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {app.freelancerId?.location || "Remote"}
                          </span>
                          <span className="flex items-center text-foreground font-medium">
                            ${app.freelancerId?.hourlyRate}/hr
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                          {app.freelancerId?.bio || "No bio available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {app.freelancerId?.skills?.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Application Details & Actions */}
                <div className="flex flex-col justify-between items-end md:w-64 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 gap-4">
                  <div className="text-right w-full">
                    <div className="text-xs text-muted-foreground mb-1">
                      Applied
                    </div>
                    <div className="font-medium">
                      {format(new Date(app.createdAt), "MMM dd, yyyy")}
                    </div>
                    <Badge
                      variant={
                        app.status === "accepted"
                          ? "default"
                          : app.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                      className={`mt-2 capitalize ${
                        app.status === "accepted"
                          ? "bg-emerald-500 text-emerald-50"
                          : app.status === "rejected"
                          ? "text-red-50"
                          : "bg-gray-200"
                      }`}
                    >
                      {app.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <ApplicationActionButtons
                      applicationId={app._id}
                      jobId={jobId}
                      currentStatus={app.status}
                    />

                    {app.status === "accepted" && (
                      <form
                        action={async () => {
                          "use server";
                          await createChatAsClient(
                            jobId.toString(),
                            app.freelancerId._id
                          );
                        }}
                        className="w-full"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2 text-primary hover:text-primary border-primary/20 hover:border-primary hover:bg-primary/5"
                          type="submit"
                        >
                          <MessageCircle className="h-4 w-4" /> Message
                          Freelancer
                        </Button>
                      </form>
                    )}

                    <div className="text-xs text-center text-muted-foreground">
                      Use chat to contact
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border rounded-xl bg-muted/10 border-dashed">
            <p className="text-lg font-medium text-muted-foreground">
              No applicants yet
            </p>
            <p className="text-sm text-muted-foreground">
              Wait for freelancers to find your job.
            </p>
          </div>
        )}
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
