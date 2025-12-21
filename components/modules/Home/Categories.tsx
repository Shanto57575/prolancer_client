import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  CodeXml,
  Palette,
  Megaphone,
  PenLine,
  Bot,
  Video,
  Music,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const categories = [
    {
      icon: CodeXml,
      title: "Programming & Tech",
      subtitle: "Software Developer, Data Analyst, Network Engineer",
      jobs: "2,847",
      linear: "from-emerald-500 to-cyan-500",
      bglinear: "from-emerald-50 to-cyan-50",
    },
    {
      icon: Palette,
      title: "Graphics & Design",
      subtitle: "UI/UX Designer, Graphic Designer, Illustrator",
      jobs: "1,932",
      linear: "from-emerald-500 to-pink-500",
      bglinear: "from-emerald-50 to-pink-50",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      subtitle: "SEO Specialist, Social Media Manager, Content Writer",
      jobs: "1,543",
      linear: "from-pink-500 to-rose-500",
      bglinear: "from-pink-50 to-rose-50",
    },
    {
      icon: PenLine,
      title: "Writing & Translation",
      subtitle: "Content Writer, Translator, Technical Writer",
      jobs: "1,234",
      linear: "from-green-500 to-emerald-500",
      bglinear: "from-green-50 to-emerald-50",
    },
    {
      icon: Bot,
      title: "AI Services",
      subtitle: "Machine Learning Engineer, AI Consultant, Data Scientist",
      jobs: "987",
      linear: "from-emerald-500 to-emerald-500",
      bglinear: "from-emerald-50 to-emerald-50",
    },
    {
      icon: Video,
      title: "Video & Animation",
      subtitle: "Video Editor, Animator, Motion Designer",
      jobs: "856",
      linear: "from-red-500 to-orange-500",
      bglinear: "from-red-50 to-orange-50",
    },
    {
      icon: Music,
      title: "Music & Audio",
      subtitle: "Sound Engineer, Music Producer, Voice Over Artist",
      jobs: "743",
      linear: "from-yellow-500 to-amber-500",
      bglinear: "from-yellow-50 to-amber-50",
    },
    {
      icon: Briefcase,
      title: "Business & Consulting",
      subtitle: "Business Consultant, Financial Analyst, HR Manager",
      jobs: "1,654",
      linear: "from-teal-500 to-cyan-500",
      bglinear: "from-teal-50 to-cyan-50",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950">
      <section className="max-w-7xl mx-auto py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-200 dark:border-emerald-800">
              <TrendingUp className="w-4 h-4" />
              Trending Top Categories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Explore Talent by{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              At our core, we are experts in connecting local businesses with
              top-notch talent. We are passionate about helping you find the
              perfect match in key areas of expertise.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.bglinear} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${category.linear} rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg text-white`}
                  >
                    <category.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed grow group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {category.subtitle}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 bg-linear-to-r ${category.linear} rounded-full`}
                      ></div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {category.jobs} jobs
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link href="/jobs">
              <Button
                variant="outline"
                size="lg"
                className="group px-8 py-6 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-200 rounded-xl text-base font-semibold transition-all duration-300"
              >
                Explore All Categories
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
