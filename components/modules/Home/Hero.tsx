"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Zap,
  Star,
  Play,
  CheckCircle2,
  Code,
  Palette,
  Video,
  PenTool,
  Megaphone,
  Music,
  Globe,
  Users,
  Award,
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
      name: "Graphics & Design",
      icon: Palette,
      linear: "from-pink-500 to-rose-500",
    },
    { name: "Programming", icon: Code, linear: "from-emerald-500 to-cyan-500" },
    {
      name: "Digital Marketing",
      icon: Megaphone,
      linear: "from-emerald-500 to-emerald-500",
    },
    {
      name: "Video & Animation",
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
      linear: "from-violet-500 to-emerald-500",
    },
  ];

  const stats = [
    { icon: Users, value: "5M+", label: "Talented Freelancers" },
    { icon: Award, value: "10M+", label: "Projects Completed" },
    { icon: Globe, value: "190+", label: "Countries Worldwide" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-emerald-50 via-emerald-50 to-emerald-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Icons */}
        <div
          className="absolute top-1/4 left-1/4 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "0.5s" }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <div
          className="absolute top-1/3 right-1/4 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <Zap className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <div
          className="absolute bottom-1/3 right-1/3 animate-bounce"
          style={{ animationDuration: "3.5s", animationDelay: "1.5s" }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 md:pt-32 pb-20">
        {/* Top Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-emerald-500 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">
              Trusted by 10M+ professionals worldwide
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-linear-to-r from-emerald-700 via-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Hire Expert
            </span>
            <br />
            <span className="bg-linear-to-r from-emerald-400 via-emerald-600 to-emerald-700 bg-clip-text text-transparent animate-linear">
              Freelancers
            </span>
          </h1>

          {/* Rotating Text */}
          <div className="h-12 mb-8 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-slate-600 font-medium transition-all duration-500">
              {roles[currentRole]}
            </p>
          </div>

          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Work with the world&apos;s most talented professionals. From design
            to development, marketing to music — find the perfect match for your
            project.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-slate-600 font-medium">
                Money-back guarantee
              </span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-slate-600 font-medium">
                Secure payments
              </span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-slate-600 font-medium">24/7 support</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">
            Explore by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-slate-100 hover:border-transparent"
              >
                <div
                  className={`bg-linear-to-br ${category.linear} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-500 transition-colors text-sm">
                  {category.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-linear-to-br from-emerald-100 to-emerald-100 p-4 rounded-2xl">
                      <stat.icon className="w-8 h-8 text-emerald-500" />
                    </div>
                  </div>
                  <div className="text-4xl font-black bg-linear-to-r from-emerald-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button className="bg-linear-to-r from-emerald-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-2 group">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group border border-slate-200">
            <Play className="w-5 h-5 text-emerald-500" />
            Watch Demo
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes linear {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-linear {
          background-size: 200% auto;
          animation: linear 3s ease infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
