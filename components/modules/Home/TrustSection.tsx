import { Lightbulb, Rocket, Sparkles, Target } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="pb-20 lg:pb-32 bg-white dark:bg-slate-950 px-4 md:px-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-[2.5rem] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-160 h-160 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-120 h-120 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-linear-to-tr from-transparent via-white/5 to-transparent rotate-45 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-8 border border-white/20 shadow-lg">
                  We&apos;re expanding day by day 🚀
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Global Trust of <br />
                  <span className="text-emerald-200">
                    1 Million Businesses
                  </span>{" "}
                  and Counting
                </h3>
                <p className="text-emerald-100 text-lg leading-relaxed mb-10 max-w-lg">
                  Connect with skilled professionals, streamline collaboration,
                  and unlock success. Join now and redefine your work experience
                  with the world&apos;s most trusted platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                    Join Community
                  </button>
                  <button className="bg-emerald-800/50 backdrop-blur-sm text-white border border-emerald-400/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-800/70 transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Target,
                    text: "Connect with pros & collaborate better",
                    title: "Precision Matching",
                  },
                  {
                    icon: Rocket,
                    text: "Redefine work for better experience",
                    title: "Accelerated Growth",
                  },
                  {
                    icon: Lightbulb,
                    text: "Streamline collaboration & unlock success",
                    title: "Smart Solutions",
                  },
                  {
                    icon: Sparkles,
                    text: "Join us & redefine your work experience",
                    title: "Premium Quality",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-xl group"
                  >
                    <div className="text-white mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-10 h-10" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="text-emerald-100 text-sm font-medium leading-normal">
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
