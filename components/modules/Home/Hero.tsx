"use client";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Code2,
  Palette,
  Video,
  PenTool,
  Megaphone,
  Music,
  Globe2,
  Users,
  Award,
  Search,
  Briefcase,
} from "lucide-react";

export default function ProlancerHero() {
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Find your perfect freelancer",
    "Discover world-class talent",
    "Build your dream team",
    "Scale your business faster",
  ];

  const categories = [
    {
      name: "Graphics Design",
      icon: Palette,
      linear: "from-pink-500 to-rose-500",
    },
    {
      name: "Programming",
      icon: Code2,
      linear: "from-emerald-500 to-cyan-500",
    },
    {
      name: "Digital Marketing",
      icon: Megaphone,
      linear: "from-blue-500 to-indigo-500",
    },
    {
      name: "Video Animation",
      icon: Video,
      linear: "from-orange-500 to-red-500",
    },
    {
      name: "Writing",
      icon: PenTool,
      linear: "from-green-500 to-emerald-500",
    },
    {
      name: "Music & Audio",
      icon: Music,
      linear: "from-violet-500 to-purple-500",
    },
  ];

  const stats = [
    { icon: Users, value: "5M+", label: "Talented Freelancers" },
    { icon: Award, value: "10M+", label: "Projects Completed" },
    { icon: Globe2, value: "190+", label: "Countries Worldwide" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 flex flex-col justify-center">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20">
        {/* Top Badge */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <div className="group flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-5 py-2.5 rounded-full border border-emerald-100 dark:border-emerald-800/50 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide uppercase">
              #1 Freelance Marketplace
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            Hire Expert <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-emerald-100 dark:bg-emerald-900/30 -skew-y-2 rounded-lg -z-10"></span>
              <span className="bg-linear-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                Freelancers
              </span>
            </span>
          </h1>

          <div className="h-8 mb-8 flex items-center justify-center overflow-hidden">
            <div className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium animate-fade-in-up">
              {roles[currentRole]}
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with the world&apos;s best talent. From creative design to
            technical development, find the perfect match for your project
            today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Find Talent
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all duration-300 flex items-center justify-center gap-2 group">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:rotate-12 transition-transform" />
              Post a Job
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Secure Escrow</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Verified Pros</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Categories Grid - Compact */}
        <div className="max-w-6xl mx-auto mb-20 hidden md:block">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Popular Categories
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900 hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`bg-linear-to-br ${category.linear} w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-xs text-center transition-colors">
                  {category.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-5xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 pt-8 md:pt-0">
                <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                  <stat.icon className="w-4 h-4" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
