import { getFreelancerById } from "@/actions/freelancer/freelancer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Linkedin,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Mail,
  GraduationCap,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FreelancerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: freelancer } = await getFreelancerById(id);

  if (!freelancer) {
    notFound();
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto dark:bg-slate-950/50 py-12 px-8">
      <div className="container mx-auto">
        <div className="dark:bg-slate-950 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-slate-50 dark:border-slate-900 shadow-xl rounded-2xl">
              <AvatarImage
                src={freelancer.userId?.profilePicture}
                alt={freelancer.userId?.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold rounded-2xl">
                {getUserInitials(freelancer.userId?.name || "User")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {freelancer.userId?.name}
                  </h1>
                  <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
                    {freelancer.designation}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`mailto:${freelancer.userId?.email}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>
                  </Link>
                  <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                    Hire Now
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6">
                {freelancer.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {freelancer.location}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {freelancer.rating > 0
                      ? freelancer.rating.toFixed(1)
                      : "New"}
                  </span>
                  <span className="text-slate-400">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${freelancer.hourlyRate}/hr
                  </span>
                </div>
                {freelancer.availability && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="capitalize">
                      {freelancer.availability.replace("-", " ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {freelancer.linkedinLink && (
                  <Link
                    href={freelancer.linkedinLink}
                    target="_blank"
                    className="text-slate-400 hover:text-[#0077b5] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                )}
                {freelancer.otherWebsiteLink && (
                  <Link
                    href={freelancer.otherWebsiteLink}
                    target="_blank"
                    className="text-slate-400 hover:text-emerald-500 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                  About Me
                </h2>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {freelancer.bio || "No bio information provided."}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                  Professional Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills?.length > 0 ? (
                    freelancer.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-slate-500">No skills listed.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio (If any) - Placeholder for now as model has simple string for portfolio, maybe it's a link */}
            {freelancer.portfolio && (
              <Card className="border-none shadow-sm dark:bg-slate-950">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    Portfolio
                  </h2>
                  <a
                    href={freelancer.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline break-all"
                  >
                    {freelancer.portfolio}
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Education */}
            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-emerald-500" />
                  Education
                </h3>
                {freelancer.education?.length > 0 ? (
                  <ul className="space-y-4">
                    {freelancer.education.map((edu: string, idx: number) => (
                      <li
                        key={idx}
                        className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-800"
                      >
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {edu}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No education listed</p>
                )}
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-none shadow-sm dark:bg-slate-950">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Languages className="h-5 w-5 text-emerald-500" />
                  Languages
                </h3>
                {freelancer.languages?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {freelancer.languages.map((lang: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {lang}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No languages listed</p>
                )}
              </CardContent>
            </Card>

            {/* Info Summary */}
            <Card className="border-none shadow-sm bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-emerald-100 dark:border-emerald-800/30">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Experience
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {freelancer.experience} Years
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-emerald-100 dark:border-emerald-800/30">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Joined
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {new Date(freelancer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
