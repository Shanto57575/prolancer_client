"use client";

import {
  Award,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStartup Inc.",
      avatar: "SJ",
      rating: 5,
      text: "Prolancer transformed how we hire talent. We found an amazing developer who built our entire platform. The quality exceeded our expectations, and the process was incredibly smooth.",
      project: "Mobile App Development",
      amount: "$12,000",
      duration: "3 months",
      category: "Development",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowthCo",
      avatar: "MC",
      rating: 5,
      text: "I've hired over 20 freelancers on Prolancer for various marketing projects. The talent pool is incredible, and the platform makes collaboration effortless. Highly recommended!",
      project: "Digital Marketing Campaign",
      amount: "$8,500",
      duration: "2 months",
      category: "Marketing",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Creative Studios",
      avatar: "ER",
      rating: 5,
      text: "As a small business owner, Prolancer gave me access to world-class designers at affordable prices. Our brand identity looks absolutely stunning thanks to the talented freelancers here.",
      project: "Brand Design & Logo",
      amount: "$3,200",
      duration: "1 month",
      category: "Design",
    },
    {
      name: "David Park",
      role: "Product Manager, InnovateLabs",
      avatar: "DP",
      rating: 5,
      text: "The freelancers on Prolancer helped us launch our product 2 months ahead of schedule. Their expertise and dedication were instrumental to our success.",
      project: "Product Development",
      amount: "$15,000",
      duration: "4 months",
      category: "Development",
    },
    {
      name: "Lisa Anderson",
      role: "CMO, GrowthMatrix",
      avatar: "LA",
      rating: 5,
      text: "Working with Prolancer freelancers has been a game-changer for our marketing efforts. The quality of work and professionalism exceeded all expectations.",
      project: "Content Strategy",
      amount: "$6,800",
      duration: "2 months",
      category: "Marketing",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Clients" },
    { icon: Award, value: "98%", label: "Success Rate" },
    { icon: TrendingUp, value: "$2M+", label: "Paid Out" },
  ];

  const handlePrevious = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-linear-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-full mb-6 font-semibold text-sm shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            Client Success Stories
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
            Trusted by Thousands
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover how businesses like yours achieve extraordinary results
            with Prolancer
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Testimonial Display */}
        <div className="bg-white dark:bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none mb-12">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left Side - Testimonial Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Quote Icon */}
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                <Quote className="w-7 h-7 text-emerald-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-emerald-500 fill-emerald-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="md:text-xl font-medium text-slate-900 dark:text-white leading-relaxed text-justify">
                {testimonials[activeIndex].text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-5 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/30">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Project Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                      Project Type
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {testimonials[activeIndex].project}
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        Value
                      </div>
                      <div className="text-2xl font-bold text-emerald-500">
                        {testimonials[activeIndex].amount}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        Duration
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {testimonials[activeIndex].duration}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" />
                      {testimonials[activeIndex].category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/30"
                >
                  Next
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shadcn Carousel - Testimonial Thumbnails */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 shadow-xl shadow-emerald-500/20"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 ${
                          index === activeIndex
                            ? "bg-linear-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
                            : "bg-slate-400"
                        }`}
                      >
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span className="truncate">
                            {testimonial.category}
                          </span>
                          <span className="text-emerald-500">•</span>
                          <span>{testimonial.amount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {testimonial.text}
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white" />
            <CarouselNext className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-emerald-500"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-emerald-300 dark:hover:bg-emerald-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
