import {
  ArrowRight,
  MessageSquare,
  Rocket,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const howItWorks = [
    {
      step: "01",
      icon: Target,
      title: "Post Your Project",
      description:
        "Tell us what you need. Share your requirements, budget, and timeline in minutes.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      step: "02",
      icon: Users,
      title: "Review Proposals",
      description:
        "Receive proposals from talented freelancers. Compare profiles, portfolios, and reviews.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "Collaborate & Communicate",
      description:
        "Work together seamlessly with built-in messaging, file sharing, and milestone tracking.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Launch & Celebrate",
      description:
        "Review the work, approve deliverables, and release payment securely. Project complete!",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/4 translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-emerald-200 dark:border-emerald-800">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Simple 4-Step Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            How Prolancer{" "}
            <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            From posting your project to celebrating success, we&apos;ve
            streamlined the entire process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {howItWorks.map((step, index) => (
            <div key={index} className="relative group">
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-slate-200 dark:bg-slate-950 -z-10">
                  <div className="h-full bg-emerald-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
              )}

              <div className="relative rounded-2xl p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full group-hover:-translate-y-2">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-linear-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg transform transition-transform duration-300`}
                    >
                      <step.icon className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 z-10">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            Learn More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
