import Categories from "@/components/modules/Home/Categories";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import PlatformFeatures from "@/components/modules/Home/PlatformFeatures";
import Stats from "@/components/modules/Home/Stats";
import Testimonials from "@/components/modules/Home/Testimonials";
import TrustSection from "@/components/modules/Home/TrustSection";
import Hero from "@/components/modules/Home/Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <Categories />
      <Stats />
      <PlatformFeatures />
      <Testimonials />
      <TrustSection />
    </div>
  );
}
