import {
  Headphones,
  ArrowRight,
  Zap,
  Shield,
  AlertCircle,
  Star,
  Lock,
} from "lucide-react";
import RoleTabs from "@/components/modules/howitworks/RoleTabs";

export default function HowItWorks() {
  const freelancerSteps = [
    {
      icon: "user-check",
      title: "Create Your Profile",
      description:
        "Build a compelling profile showcasing your skills, portfolio, and experience. Stand out from the crowd.",
      features: [
        "Portfolio showcase",
        "Skill verification",
        "Profile optimization tips",
      ],
    },
    {
      icon: "search",
      title: "Browse & Apply to Jobs",
      description:
        "Explore thousands of job listings matching your expertise. Apply with custom proposals to win projects.",
      features: [
        "Smart job matching",
        "Saved searches",
        "Application tracking",
      ],
    },
    {
      icon: "crown",
      title: "Upgrade for More Features",
      description:
        "Unlock premium features to message clients directly, get priority visibility, and access advanced tools.",
      features: ["Direct messaging", "Priority listings", "Advanced analytics"],
      badge: "Premium",
    },
    {
      icon: "briefcase",
      title: "Deliver & Get Paid",
      description:
        "Complete projects with confidence. Secure milestone payments and build your reputation with reviews.",
      features: ["Milestone payments", "Dispute resolution", "Rating system"],
    },
  ];

  const clientSteps = [
    {
      icon: "file-text",
      title: "Post Your Project",
      description:
        "Describe your project requirements in detail. Set your budget and timeline to attract the right talent.",
      features: ["Project templates", "Budget calculator", "Timeline planner"],
    },
    {
      icon: "users",
      title: "Review Applications",
      description:
        "Track and manage all applications in one dashboard. Compare freelancers and their proposals easily.",
      features: [
        "Applicant filtering",
        "Proposal comparison",
        "Real-time notifications",
      ],
    },
    {
      icon: "message-square",
      title: "Interview & Hire",
      description:
        "Chat with top candidates, review portfolios, and hire the perfect freelancer for your project.",
      features: [
        "Built-in messaging",
        "Video interviews",
        "Contract templates",
      ],
    },
    {
      icon: "trending-up",
      title: "Manage & Track Progress",
      description:
        "Monitor project milestones, approve deliverables, and communicate seamlessly throughout the project.",
      features: ["Progress tracking", "File sharing", "Feedback system"],
    },
  ];

  const platformFeatures = [
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Escrow-based payment protection ensures freelancers get paid and clients get quality work.",
      color: "emerald",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Our dedicated support team is here to help with any questions or issues you encounter.",
      color: "blue",
    },
    {
      icon: AlertCircle,
      title: "Dispute Resolution",
      description:
        "Fair and transparent dispute handling process to resolve conflicts professionally.",
      color: "amber",
    },
    {
      icon: Star,
      title: "Rating System",
      description:
        "Build trust through transparent reviews and ratings from completed projects.",
      color: "purple",
    },
    {
      icon: Lock,
      title: "Data Protection",
      description:
        "Your information is encrypted and secure with industry-leading security standards.",
      color: "red",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description:
        "Stay updated with real-time alerts for applications, messages, and project updates.",
      color: "cyan",
    },
  ];

  const premiumFeatures = [
    {
      icon: "message-square",
      title: "Direct Client Messaging",
      description:
        "Skip the wait and message clients directly before they even review applications",
    },
    {
      icon: "trending-up",
      title: "Priority Visibility",
      description:
        "Appear at the top of search results and get noticed by clients first",
    },
    {
      icon: "badge-check",
      title: "Verified Badge",
      description:
        "Display a verified badge on your profile to build instant credibility",
    },
    {
      icon: "star",
      title: "Featured Profile",
      description:
        "Get highlighted in job listings and recommendations to attract more clients",
    },
    {
      icon: "clock",
      title: "Advanced Analytics",
      description:
        "Track profile views, proposal success rates, and optimize your strategy",
    },
    {
      icon: "zap",
      title: "Unlimited Applications",
      description: "Apply to as many jobs as you want without monthly limits",
    },
  ];

  const colorClasses = {
    emerald:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    amber:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  };

  return (
    <section className="py-20 bg-linear-to-b from-white via-emerald-50/30 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Simple & Powerful
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How Prolancer Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you&apos;re hiring talent or looking for work, Prolancer
            makes it seamless and secure
          </p>
        </div>

        {/* Role Selector Tabs - Client Component */}
        <RoleTabs
          freelancerSteps={freelancerSteps}
          clientSteps={clientSteps}
          premiumFeatures={premiumFeatures}
        />

        {/* Platform Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Prolancer?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Built with features that protect and empower both freelancers and
              clients
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${
                      colorClasses[feature.color as keyof typeof colorClasses]
                    } rounded-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support & Help CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
            <div className="shrink-0 w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Need Help Getting Started?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is available 24/7 to assist you with any
                questions or concerns
              </p>
            </div>
            <button className="shrink-0 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group">
              Contact Support
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
