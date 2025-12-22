import {
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  Star,
  DollarSign,
  Globe,
  MessageSquare,
  Award,
  ArrowRight,
  Sparkles,
  Target,
  Briefcase,
} from "lucide-react";

export default function WhyProlancer() {
  const heroFeatures = [
    { icon: Users, text: "50K+ Verified Talents" },
    { icon: Shield, text: "100% Secure Payments" },
    { icon: TrendingUp, text: "98% Success Rate" },
  ];

  const mainFeatures = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Every freelancer is thoroughly vetted. Your payments are protected with escrow, and our dispute resolution team ensures fair outcomes for all parties.",
      stats: "99.9% Safe Transactions",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Post a project and receive qualified proposals within hours. Our AI-powered matching connects you with the perfect talent instantly.",
      stats: "Avg. 2-hour Response Time",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description:
        "Save up to 60% compared to traditional hiring. No hidden fees, transparent pricing, and you only pay when you're completely satisfied.",
      stats: "Save 60% on Average",
    },
    {
      icon: Globe,
      title: "Global Talent Pool",
      description:
        "Access skilled professionals from 180+ countries. Work across time zones and get round-the-clock productivity for your projects.",
      stats: "180+ Countries",
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description:
        "Built-in chat, video calls, file sharing, and project management tools. Everything you need to collaborate effectively in one place.",
      stats: "Real-time Collaboration",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description:
        "Milestone-based payments and detailed reviews ensure top-quality work. If you're not satisfied, our money-back guarantee has you covered.",
      stats: "4.8/5 Avg. Rating",
    },
  ];

  const comparisonData = [
    {
      feature: "Time to Hire",
      prolancer: "2-24 hours",
      traditional: "2-4 weeks",
    },
    {
      feature: "Average Cost",
      prolancer: "$30-80/hour",
      traditional: "$80-200/hour",
    },
    {
      feature: "Flexibility",
      prolancer: "Pay per project",
      traditional: "Full-time salary",
    },
    {
      feature: "Talent Pool",
      prolancer: "Global access",
      traditional: "Limited local",
    },
    {
      feature: "Risk",
      prolancer: "Money-back guarantee",
      traditional: "Hiring commitment",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Post Your Project",
      description: "Describe your needs and budget in minutes",
      icon: Briefcase,
    },
    {
      step: "02",
      title: "Review Proposals",
      description: "Get matched with qualified freelancers instantly",
      icon: Users,
    },
    {
      step: "03",
      title: "Start Working",
      description: "Collaborate seamlessly with built-in tools",
      icon: Zap,
    },
    {
      step: "04",
      title: "Pay Safely",
      description: "Release funds only when you're 100% satisfied",
      icon: CheckCircle2,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Tech Startup Founder",
      avatar: "SM",
      quote:
        "Prolancer helped us scale from 0 to 50 team members in 6 months. The quality of talent is exceptional.",
      rating: 5,
    },
    {
      name: "James Rodriguez",
      role: "Marketing Director",
      avatar: "JR",
      quote:
        "We've saved over $200K in hiring costs while maintaining top-tier quality. Prolancer is a game-changer.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Product Manager",
      avatar: "EC",
      quote:
        "The platform makes remote collaboration effortless. We've completed 100+ projects with zero issues.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "$2B+", label: "Paid to Freelancers", icon: DollarSign },
    { value: "50K+", label: "Active Projects", icon: Briefcase },
    { value: "180+", label: "Countries", icon: Globe },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
  ];

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-linear-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-950"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-full mb-6 font-semibold text-sm shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-4 h-4" />
              The Future of Work
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Choose <span className="text-emerald-500">Prolancer</span>?
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join the world&apos;s largest freelancing marketplace where
              businesses meet exceptional talent. Fast, secure, and reliable.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {heroFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 shadow-lg"
                >
                  <feature.icon className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Everything You Need to{" "}
              <span className="text-emerald-500">Succeed</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features that make hiring and collaboration effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, i) => (
              <div
                key={i}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Simple <span className="text-emerald-500">4-Step</span> Process
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From posting to payment, we&apos;ve made hiring talent incredibly
              simple
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all h-full">
                  <div className="text-6xl font-bold text-emerald-500/20 mb-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-500/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Prolancer vs{" "}
              <span className="text-slate-400">Traditional Hiring</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              See why thousands choose Prolancer for their hiring needs
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="grid grid-cols-3 bg-white dark:bg-slate-950 border-b-2 border-emerald-500">
              <div className="p-6"></div>
              <div className="p-6 text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold">
                  <Target className="w-4 h-4" />
                  Prolancer
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="text-slate-400 dark:text-slate-600 font-semibold">
                  Traditional
                </div>
              </div>
            </div>

            {comparisonData.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
              >
                <div className="p-6 font-semibold text-slate-900 dark:text-white">
                  {item.feature}
                </div>
                <div className="p-6 text-center bg-emerald-50 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    {item.prolancer}
                  </div>
                </div>
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                  {item.traditional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Loved by <span className="text-emerald-500">Thousands</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Join successful businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-emerald-500 fill-emerald-500"
                    />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600 to-emerald-400"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-emerald-50 mb-12 max-w-2xl mx-auto">
            Join 50,000+ businesses that trust Prolancer for their hiring needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all shadow-xl flex items-center justify-center gap-2 group">
              Start Hiring Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-emerald-700 transition-all">
              Browse Talents
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Free to get started</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
