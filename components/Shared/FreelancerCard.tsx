"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Star, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";

interface FreelancerProps {
  _id: string;
  userId: {
    name: string;
    email: string;
    profilePicture?: string;
  };
  bio: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  location: string;
  designation: string;
  isProfileComplete: boolean;
}

const FreelancerCard = ({ freelancer }: { freelancer: FreelancerProps }) => {
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link
      href={`/freelancers/${freelancer._id}`}
      className="group block h-full"
    >
      <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
        {/* Accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="p-6 flex flex-col flex-1">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start gap-4 mb-5">
            <Avatar className="h-14 w-14 border-2 border-slate-100 dark:border-slate-800 group-hover:border-emerald-500/50 transition-colors">
              <AvatarImage
                src={freelancer.userId?.profilePicture}
                alt={freelancer.userId?.name}
              />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold">
                {getUserInitials(freelancer.userId?.name || "User")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {freelancer.userId?.name}
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium truncate mb-1">
                {freelancer.designation || "Freelancer"}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {freelancer.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[100px]">
                      {freelancer.location}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {freelancer.rating > 0
                      ? freelancer.rating.toFixed(1)
                      : "New"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-1">
            {freelancer.bio || "No bio available."}
          </p>

          {/* Skills */}
          {freelancer.skills && freelancer.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {freelancer.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-medium border border-slate-100 dark:border-slate-700"
                >
                  {skill}
                </span>
              ))}
              {freelancer.skills.length > 3 && (
                <span className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md font-medium border border-slate-100 dark:border-slate-700">
                  +{freelancer.skills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 dark:text-white leading-none">
                    ${freelancer.hourlyRate}/hr
                  </div>
                </div>
              </div>

              <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-slate-800/50 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-800 flex items-center justify-center transition-all duration-200">
                <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-200 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FreelancerCard;
