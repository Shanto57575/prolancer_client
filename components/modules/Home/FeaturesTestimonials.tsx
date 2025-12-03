"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Shield,
  Zap,
  DollarSign,
  Users,
  Award,
  MessageSquare,
  FileCheck,
  CreditCard,
  Headphones,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  Target,
  Rocket,
} from "lucide-react";
import Image from "next/image";

export default function FeaturesTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const howItWorks = [
    {
      step: "01",
      icon: Target,
      title: "Post Your Project",
      description:
        "Tell us what you need. Share your requirements, budget, and timeline in minutes.",
      linear: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      icon: Users,
      title: "Review Proposals",
      description:
        "Receive proposals from talented freelancers. Compare profiles, portfolios, and reviews.",
      linear: "from-purple-500 to-indigo-500",
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "Collaborate & Communicate",
      description:
        "Work together seamlessly with built-in messaging, file sharing, and milestone tracking.",
      linear: "from-pink-500 to-rose-500",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Launch & Celebrate",
      description:
        "Review the work, approve deliverables, and release payment securely. Project complete!",
      linear: "from-green-500 to-emerald-500",
    },
  ];

  const platformFeatures = [
    {
      icon: Shield,
      title: "Secure Escrow System",
      description:
        "Your payment is held securely until you're 100% satisfied with the work delivered.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Messaging",
      description:
        "Communicate instantly with freelancers through our integrated chat system.",
    },
    {
      icon: FileCheck,
      title: "Milestone Tracking",
      description:
        "Break projects into milestones and track progress every step of the way.",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description:
        "Pay with credit card, PayPal, or any major payment method you prefer.",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is always here to help you succeed.",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description:
        "Work with verified professionals and get unlimited revisions until you're happy.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStartup Inc.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "Prolancer transformed how we hire talent. We found an amazing developer who built our entire platform. The quality exceeded our expectations, and the process was incredibly smooth.",
      project: "Mobile App Development",
      amount: "$12,000",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowthCo",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "I've hired over 20 freelancers on Prolancer for various marketing projects. The talent pool is incredible, and the platform makes collaboration effortless. Highly recommended!",
      project: "Digital Marketing Campaign",
      amount: "$8,500",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Creative Studios",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "As a small business owner, Prolancer gave me access to world-class designers at affordable prices. Our brand identity looks absolutely stunning thanks to the talented freelancers here.",
      project: "Brand Design & Logo",
      amount: "$3,200",
    },
  ];

  const stats = [
    { icon: Users, value: "5M+", label: "Active Freelancers" },
    { icon: FileCheck, value: "10M+", label: "Projects Completed" },
    { icon: DollarSign, value: "$2B+", label: "Earned by Freelancers" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
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
    <div className="bg-white">
      {/* How It Works Section */}
      <div className="py-24 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Zap className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              How Prolancer
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Works
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From posting your project to celebrating success - we make hiring
              freelancers simple and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 -z-10"></div>

            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-transparent hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-slate-800 to-slate-600 rounded-full flex items-center justify-center text-white font-black shadow-xl">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`bg-linear-to-br ${step.linear} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Below How It Works */}
          <div className="text-center mt-12">
            <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 flex items-center gap-2 mx-auto group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Everything You Need to
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Succeed
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional tools and features designed to make your freelancing
              experience seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-slate-50 to-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-indigo-200 group hover:-translate-y-1"
              >
                <div className="bg-linear-to-br from-indigo-100 to-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-indigo-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Star className="w-4 h-4 fill-current" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Loved by
              <span className="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {" "}
                Thousands
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See what our clients say about their experience working with
              freelancers on Prolancer
            </p>
          </div>

          {/* Testimonial Slider */}
          <div className="max-w-5xl mx-auto relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
              <Quote className="w-16 h-16 text-indigo-200 mb-6" />

              <div className="mb-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-amber-400 fill-current"
                      />
                    )
                  )}
                </div>

                <p className="text-2xl text-slate-700 leading-relaxed mb-8 font-medium">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-slate-600">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="text-right">
                      <div className="text-sm text-slate-500 mb-1">
                        Project Type
                      </div>
                      <div className="font-semibold text-slate-900">
                        {testimonials[currentTestimonial].project}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 mb-1">
                        Project Value
                      </div>
                      <div className="font-bold text-indigo-600 text-lg">
                        {testimonials[currentTestimonial].amount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "w-8 bg-indigo-600"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="bg-slate-100 hover:bg-slate-200 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="bg-slate-100 hover:bg-slate-200 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges Below Testimonial */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-slate-700 font-semibold">
                Verified Reviews
              </span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-slate-700 font-semibold">
                Real Projects
              </span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-slate-700 font-semibold">
                Authentic Experiences
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
