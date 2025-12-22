import Link from "next/link";
import { GridPattern } from "./GridPattern";
import { RotatingText } from "./RotatingText";
import {
  CheckCircle2,
  Palette,
  Code2,
  Megaphone,
  Video,
  PenTool,
  Music,
  Users,
  Award,
  Globe2,
} from "lucide-react";

export default function ProlancerHero() {
  const categories = [
    { name: "Design", icon: Palette },
    { name: "Programming", icon: Code2 },
    { name: "Marketing", icon: Megaphone },
    { name: "Video", icon: Video },
    { name: "Writing", icon: PenTool },
    { name: "Music", icon: Music },
  ];

  const stats = [
    { icon: Users, value: "5M+", label: "Freelancers" },
    { icon: Award, value: "10M+", label: "Projects Completed" },
    { icon: Globe2, value: "190+", label: "Countries" },
  ];

  return (
    <section className="relative min-h-[95vh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          strokeDasharray={"5 30"}
          className="mask-[radial-gradient(800px_circle_at_center,white,transparent)] stroke-emerald-600/50 dark:stroke-emerald-200/40"
        />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-6xl px-6 text-center">
        {/* Badge */}
        <span className="mb-10 shadow shadow-emerald-600 dark:shadow-emerald-400 bg-emerald-600 text-white dark:bg-black dark:text-emerald-100 px-5 py-2 rounded-full">
          #1 Freelance Marketplace
        </span>
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold my-4">
          Hire Expert Freelancers
          <RotatingText />
        </h1>
        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
          Connect with trusted professionals across design, development, and
          marketing — faster and safer.
        </p>
        {/* CTAs */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            href="/find-talent"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
          >
            Find Talent
          </Link>
          <Link
            href="/why-prolancer"
            className="px-6 py-3 rounded-xl border border-emerald-500 font-semibold hover:bg-muted transition"
          >
            Learn More
          </Link>
        </div>
        {/* Trust Points */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
          {["Secure Escrow", "Verified Professionals", "24/7 Support"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item}
              </div>
            )
          )}
        </div>
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="p-4 rounded-xl border bg-card hover:shadow-md transition"
            >
              <Icon className="mx-auto mb-2 text-emerald-500" />
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto mb-2 text-emerald-500" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
