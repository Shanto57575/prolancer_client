import { getJobByIdAction } from "@/actions/job/job";
import { getProfileAction } from "@/actions/user/getProfileAction";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Calendar,
  DollarSign,
  Clock,
  Users,
  Briefcase,
  Download,
} from "lucide-react";
import Image from "next/image";
import ApplyJobButton from "@/components/modules/job/ApplyJobButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function JobDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [jobRes, profileRes] = await Promise.all([
    getJobByIdAction(slug),
    getProfileAction(),
  ]);

  if (!jobRes.ok) {
    return (
      <div className="container py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The job you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const job = jobRes.data;
  const user = profileRes.ok ? profileRes.data : null;
  const isFreelancer = user?.role === "FREELANCER";
  const isApplied = user && job.applicants?.includes(user._id);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hero Section */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Posted {format(new Date(job.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <span className="text-muted-foreground/40">•</span>
                    <Badge
                      variant="secondary"
                      className="capitalize font-medium"
                    >
                      {job.status.toLowerCase()}
                    </Badge>
                  </div>
                </div>

                <Badge
                  variant="default"
                  className="capitalize text-sm px-4 py-1.5 self-start"
                >
                  {job.experienceLevel}
                </Badge>
              </div>

              <Separator className="my-6" />

              {/* Job Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <DollarSign className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    ${job.budget?.toLocaleString() || "0"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {job.jobType === "hourly" ? "Per Hour" : "Fixed"}
                  </p>
                </div>

                {job.projectDuration && (
                  <div className="text-center p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {job.projectDuration}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Duration
                    </p>
                  </div>
                )}

                {job.deadline && (
                  <div className="text-center p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                    <Calendar className="h-5 w-5 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
                    <p className="text-sm sm:text-base font-bold text-foreground">
                      {format(new Date(job.deadline), "MMM dd")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Deadline
                    </p>
                  </div>
                )}

                <div className="text-center p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                  <Users className="h-5 w-5 mx-auto mb-2 text-green-600 dark:text-green-400" />
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {job.numFreelancers}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Positions
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Job Description
              </h2>
              <div
                className="prose prose-sm sm:prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>

            {/* Skills */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills?.map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Attachments */}
            {job.attachments && job.attachments.length > 0 && (
              <div className="bg-card rounded-2xl shadow-sm border p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Attachments
                </h2>
                <div className="space-y-2">
                  {job.attachments.map((url: string, index: number) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Download className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          Attachment {index + 1}
                        </span>
                      </div>
                      <svg
                        className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="bg-card rounded-2xl shadow-sm border p-6">
                <ApplyJobButton
                  jobId={job._id}
                  isApplied={isApplied}
                  isFreelancer={isFreelancer}
                />

                {job.applicationCount > 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {job.applicationCount}
                    </span>{" "}
                    application{job.applicationCount !== 1 ? "s" : ""} received
                  </p>
                )}
              </div>

              <div className="bg-card rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-bold mb-4">About the Client</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-linear-to-br from-primary to-primary/60 overflow-hidden relative shrink-0 ring-4 ring-primary/10">
                    {job.clientId?.profilePicture ? (
                      <Image
                        src={job.clientId.profilePicture}
                        alt={job.clientId.name || "Client"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-primary-foreground font-bold text-2xl">
                        {job.clientId?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base truncate">
                      {job.clientId?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-muted-foreground">Client</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6">
                <h3 className="text-lg font-bold mb-4">Job Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Budget
                    </span>
                    <span className="font-semibold">
                      ${job.budget?.toLocaleString() || "0"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="font-semibold capitalize">
                      {job.jobType}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Experience
                    </span>
                    <span className="font-semibold capitalize">
                      {job.experienceLevel}
                    </span>
                  </div>
                  {job.projectDuration && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Duration
                        </span>
                        <span className="font-semibold">
                          {job.projectDuration}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
