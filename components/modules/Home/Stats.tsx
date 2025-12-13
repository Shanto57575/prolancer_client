import { DollarSign, FileCheck, Star, Users } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: "5M+",
      label: "Active Freelancers",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100/10",
    },
    {
      icon: FileCheck,
      value: "10M+",
      label: "Projects Completed",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-100/10",
    },
    {
      icon: DollarSign,
      value: "$2B+",
      label: "Earned by Freelancers",
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-100/10",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-100/10",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-6">
                <div
                  className={`p-4 rounded-2xl backdrop-blur-md ${stat.bgColor} border border-white/5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
