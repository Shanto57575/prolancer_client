"use client";

import { useState } from "react";
import {
  CheckCircle,
  ArrowRight,
  Crown,
  Briefcase,
  Shield,
  Star,
  UserCheck,
  Search,
  FileText,
  Users,
  MessageSquare,
  TrendingUp,
  Headphones,
  AlertCircle,
  Lock,
  Zap,
  BadgeCheck,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "user-check": UserCheck,
  search: Search,
  crown: Crown,
  briefcase: Briefcase,

  "file-text": FileText,
  users: Users,
  "message-square": MessageSquare,
  "trending-up": TrendingUp,

  shield: Shield,
  headphones: Headphones,
  "alert-circle": AlertCircle,
  star: Star,
  lock: Lock,
  zap: Zap,
  "badge-check": BadgeCheck,
  clock: Clock,
};

interface Step {
  icon: string;
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface RoleTabsProps {
  freelancerSteps: Step[];
  clientSteps: Step[];
  premiumFeatures: Feature[];
}

/* ================= COMPONENT ================= */
export default function RoleTabs({
  freelancerSteps,
  clientSteps,
  premiumFeatures,
}: RoleTabsProps) {
  const [activeTab, setActiveTab] = useState<"freelancer" | "client">(
    "freelancer"
  );

  const steps = activeTab === "freelancer" ? freelancerSteps : clientSteps;

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5">
          <button
            onClick={() => setActiveTab("freelancer")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "freelancer"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            For Freelancers
          </button>
          <button
            onClick={() => setActiveTab("client")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "client"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            For Clients
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];

            return (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-all hover:-translate-y-2 h-full">
                  {step.badge && (
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                      {step.badge}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <span className="text-3xl font-bold text-emerald-600">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Section */}
      {activeTab === "freelancer" && (
        <div className="mb-20">
          <div className="bg-emerald-700 rounded-3xl p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                <Crown className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-semibold">
                  Premium Membership
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Unlock Your Full Potential
              </h3>
              <p className="text-emerald-100 max-w-2xl mx-auto">
                Get exclusive tools that help you win more projects
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => {
                const Icon = iconMap[feature.icon];

                return (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-emerald-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold inline-flex items-center gap-2">
                View Pricing Plans
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
