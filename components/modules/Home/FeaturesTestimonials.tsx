"use client";

import { useState } from "react";
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
  Target,
  Rocket,
  Briefcase,
  Heart,
  Check,
} from "lucide-react";

export default function FeaturesTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const howItWorks = [
    {
      step: "01",
      icon: Target,
      title: "Post Your Project",
      description:
        "Tell us what you need. Share your requirements, budget, and timeline in minutes.",
    },
    {
      step: "02",
      icon: Users,
      title: "Review Proposals",
      description:
        "Receive proposals from talented freelancers. Compare profiles, portfolios, and reviews.",
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "Collaborate & Communicate",
      description:
        "Work together seamlessly with built-in messaging, file sharing, and milestone tracking.",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Launch & Celebrate",
      description:
        "Review the work, approve deliverables, and release payment securely. Project complete!",
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
      avatar: "SJ",
      rating: 5,
      text: "Prolancer transformed how we hire talent. We found an amazing developer who built our entire platform. The quality exceeded our expectations, and the process was incredibly smooth.",
      project: "Mobile App Development",
      amount: "$12,000",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowthCo",
      avatar: "MC",
      rating: 5,
      text: "I've hired over 20 freelancers on Prolancer for various marketing projects. The talent pool is incredible, and the platform makes collaboration effortless. Highly recommended!",
      project: "Digital Marketing Campaign",
      amount: "$8,500",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Creative Studios",
      avatar: "ER",
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
    <div className="bg-linear-to-b from-slate-50 to-white">
      {/* How It Works Section */}
      <div className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-4 font-medium text-sm">
              <Zap className="w-4 h-4" />
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How Prolancer <span className="text-emerald-600">Works</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From posting your project to celebrating success in four simple
              steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <step.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-emerald-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-4 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need to{" "}
              <span className="text-emerald-600">Succeed</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional tools designed to make your experience seamless
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 md:p-8 hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-emerald-100 group"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 md:py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-4 font-medium text-sm">
              <Star className="w-4 h-4 fill-current" />
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Loved by <span className="text-emerald-600">Thousands</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See what our clients say about their experience
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative bg-linear-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 lg:p-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-30 -translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20 translate-x-48 translate-y-48"></div>

              <div className="relative z-10">
                <Quote className="w-8 h-8 text-emerald-400 mb-10 opacity-70" />

                <p className="text-sm md:text-base font-medium text-slate-800 leading-relaxed mb-12 max-w-4xl italic">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>

                <div className="flex gap-2 mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-500 fill-current"
                      />
                    )
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-lg text-slate-600">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-inner">
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-1">
                        Project Type
                      </div>
                      <div className="text-lg font-semibold text-slate-900">
                        {testimonials[currentTestimonial].project}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-1">
                        Project Value
                      </div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {testimonials[currentTestimonial].amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-16 gap-8">
                  <button
                    onClick={prevTestimonial}
                    className="p-4 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6 text-emerald-600" />
                  </button>

                  <div className="flex gap-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "bg-emerald-600 scale-150"
                            : "bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-4 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6 text-emerald-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-8 text-slate-600">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="w-5 h-5 text-emerald-600" /> Verified
                  Reviews
                </span>
                <span className="w-px h-6 bg-slate-300"></span>
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Briefcase className="w-5 h-5 text-emerald-600" /> Real
                  Projects
                </span>
                <span className="w-px h-6 bg-slate-300"></span>
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Heart className="w-5 h-5 text-emerald-600" /> Authentic
                  Experiences
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
