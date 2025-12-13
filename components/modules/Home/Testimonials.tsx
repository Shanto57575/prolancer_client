"use client";

import {
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Quote,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStartup Inc.",
      avatar: "SJ",
      rating: 5,
      text: "Prolancer transformed how we hire talent. We found an amazing developer who built our entire platform. The quality exceeded our expectations, and the process was incredibly smooth.",
      project: "Mobile App Development",
      amount: "$12,000",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowthCo",
      avatar: "MC",
      rating: 5,
      text: "I've hired over 20 freelancers on Prolancer for various marketing projects. The talent pool is incredible, and the platform makes collaboration effortless. Highly recommended!",
      project: "Digital Marketing Campaign",
      amount: "$8,500",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Creative Studios",
      avatar: "ER",
      rating: 5,
      text: "As a small business owner, Prolancer gave me access to world-class designers at affordable prices. Our brand identity looks absolutely stunning thanks to the talented freelancers here.",
      project: "Brand Design & Logo",
      amount: "$3,200",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-yellow-200 dark:border-yellow-800">
            <Star className="w-4 h-4 fill-current" />
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Loved by{" "}
            <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            See what our clients say about their experience working with
            Prolancer talent.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-700 p-8 md:p-12">
            {/* Decorative Backgrounds */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <Quote className="w-12 h-12 text-emerald-500 mb-8 opacity-50" />

                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-500 fill-current"
                      />
                    )
                  )}
                </div>

                <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-8 italic">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>

                <div className="flex items-center gap-6">
                  <div
                    className={`w-14 h-14 rounded-full bg-linear-to-br ${testimonials[currentTestimonial].gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-white dark:ring-slate-700`}
                  >
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-medium">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 relative">
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg">
                  <Check className="w-6 h-6" />
                </div>

                <div className="grid gap-6">
                  <div>
                    <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      Project Type
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {testimonials[currentTestimonial].project}
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

                  <div>
                    <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      Project Value
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {testimonials[currentTestimonial].amount}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-10 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-100 dark:border-slate-700">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentTestimonial
                            ? "w-8 bg-emerald-500"
                            : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-emerald-300"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-slate-200 dark:border-slate-800 pt-12">
            {[
              { icon: Shield, text: "Verified Reviews" },
              { icon: Briefcase, text: "Real Projects" },
              { icon: Heart, text: "Authentic Experiences" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
