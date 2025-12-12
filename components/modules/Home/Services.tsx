import React from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoriesSection() {
  const categories = [
    {
      icon: "💻",
      title: "Programming & Tech",
      subtitle: "Software Developer, Data Analyst, Network Engineer",
      jobs: "2,847",
      linear: "from-emerald-500 to-cyan-500",
      bglinear: "from-emerald-50 to-cyan-50",
    },
    {
      icon: "🎨",
      title: "Graphics & Design",
      subtitle: "UI/UX Designer, Graphic Designer, Illustrator",
      jobs: "1,932",
      linear: "from-emerald-500 to-pink-500",
      bglinear: "from-emerald-50 to-pink-50",
    },
    {
      icon: "📱",
      title: "Digital Marketing",
      subtitle: "SEO Specialist, Social Media Manager, Content Writer",
      jobs: "1,543",
      linear: "from-pink-500 to-rose-500",
      bglinear: "from-pink-50 to-rose-50",
    },
    {
      icon: "✍️",
      title: "Writing & Translation",
      subtitle: "Content Writer, Translator, Technical Writer",
      jobs: "1,234",
      linear: "from-green-500 to-emerald-500",
      bglinear: "from-green-50 to-emerald-50",
    },
    {
      icon: "🤖",
      title: "AI Services",
      subtitle: "Machine Learning Engineer, AI Consultant, Data Scientist",
      jobs: "987",
      linear: "from-emerald-500 to-emerald-500",
      bglinear: "from-emerald-50 to-emerald-50",
    },
    {
      icon: "🎬",
      title: "Video & Animation",
      subtitle: "Video Editor, Animator, Motion Designer",
      jobs: "856",
      linear: "from-red-500 to-orange-500",
      bglinear: "from-red-50 to-orange-50",
    },
    {
      icon: "🎵",
      title: "Music & Audio",
      subtitle: "Sound Engineer, Music Producer, Voice Over Artist",
      jobs: "743",
      linear: "from-yellow-500 to-amber-500",
      bglinear: "from-yellow-50 to-amber-50",
    },
    {
      icon: "💼",
      title: "Business & Consulting",
      subtitle: "Business Consultant, Financial Analyst, HR Manager",
      jobs: "1,654",
      linear: "from-teal-500 to-cyan-500",
      bglinear: "from-teal-50 to-cyan-50",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Trending Top Categories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Talent by{" "}
            <span className="bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            At our core, we are experts in connecting local businesses with
            top-notch talent. We are passionate about helping you find the
            perfect match in key areas of expertise.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* linear Background on Hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${category.bglinear} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 bg-linear-to-br ${category.linear} rounded-2xl flex items-center justify-center text-3xl mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}
                >
                  {category.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-900">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed group-hover:text-gray-700">
                  {category.subtitle}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 bg-linear-to-r ${category.linear} rounded-full`}
                    ></div>
                    <span className="text-sm font-semibold text-gray-700">
                      {category.jobs} jobs
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="group px-8 py-6 border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl text-base font-semibold"
          >
            Explore All Categories
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Trust Section */}
        <div className="mt-20 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  We&apos;re expanding day by day
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Global Trust of 1 Million Businesses and Counting
                </h3>
                <p className="text-emerald-100 text-lg leading-relaxed">
                  Connect with skilled professionals, streamline collaboration,
                  and unlock success. Join now and redefine your work
                  experience!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "🎯",
                    text: "Connect with pros & collaborate better",
                  },
                  { icon: "🚀", text: "Redefine work for better experience" },
                  {
                    icon: "💡",
                    text: "Streamline collaboration & unlock success",
                  },
                  {
                    icon: "✨",
                    text: "Join us & redefine your work experience",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all"
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <p className="text-white text-sm font-medium leading-snug">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
