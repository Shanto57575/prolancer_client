import {
  Award,
  CreditCard,
  FileCheck,
  Headphones,
  MessageSquare,
  Shield,
  Sparkles,
} from "lucide-react";

export default function PlatformFeatures() {
  const platformFeatures = [
    {
      icon: Shield,
      title: "Secure Escrow System",
      description:
        "Your payment is held securely until you're 100% satisfied with the work delivered.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      linear: "from-emerald-500 to-teal-500",
    },
    {
      icon: MessageSquare,
      title: "Real-time Messaging",
      description:
        "Communicate instantly with freelancers through our integrated chat system.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      linear: "from-blue-500 to-indigo-500",
    },
    {
      icon: FileCheck,
      title: "Milestone Tracking",
      description:
        "Break projects into milestones and track progress every step of the way.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      linear: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description:
        "Pay with credit card, PayPal, or any major payment method you prefer.",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      linear: "from-pink-500 to-rose-500",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is always here to help you succeed.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      linear: "from-orange-500 to-amber-500",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description:
        "Work with verified professionals and get unlimited revisions until you're happy.",
      color: "text-red-600",
      bgColor: "bg-red-100",
      linear: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-indigo-100 dark:border-indigo-800">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Everything You Need to{" "}
            <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Professional tools designed to make your experience seamless,
            secure, and successful.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {platformFeatures.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl p-8 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-white`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
