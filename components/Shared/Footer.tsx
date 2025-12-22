import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Shield,
  Globe,
  TrendingUp,
  Award,
  Code,
  Palette,
  Video,
  Music,
  PenTool,
  Megaphone,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProlancerFooter() {
  const currentYear = new Date().getFullYear();

  const forClients = [
    "How to Hire",
    "Talent Marketplace",
    "Project Catalog",
    "Enterprise Solutions",
    "Hire Worldwide",
    "Direct Contracts",
    "Payment Security",
  ];

  const forFreelancers = [
    "How to Sell",
    "Become a Seller",
    "Freelancer Plus",
    "Success Stories",
    "Community Standards",
    "Skill Certifications",
    "Seller Academy",
  ];

  const topCategories = [
    { name: "Graphics & Design", icon: Palette },
    { name: "Digital Marketing", icon: Megaphone },
    { name: "Programming & Tech", icon: Code },
    { name: "Video & Animation", icon: Video },
    { name: "Writing & Translation", icon: PenTool },
    { name: "Music & Audio", icon: Music },
  ];

  const company = [
    "About Us",
    "Careers",
    "Press & News",
    "Partnerships",
    "Privacy Policy",
    "Terms of Service",
    "Intellectual Property",
    "Investor Relations",
  ];

  const support = [
    "Help & Support",
    "Trust & Safety",
    "Selling on Prolancer",
    "Buying on Prolancer",
    "Fee Structure",
    "Contact Support",
    "Resolution Center",
  ];

  return (
    <footer className="relative bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-2 gap-16 mb-20 pb-16 border-b border-white/10">
          <div>
            <Link href="/">
              <Image
                src="/footerlogo.png"
                alt="Prolancer Logo"
                width={200}
                height={200}
              />
            </Link>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              The world&apos;s destination for design, technology, and creative
              talent. Connect with millions of professionals ready to bring your
              vision to life.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white">Secure</div>
                  <div className="text-xs text-slate-400">
                    Payment Protected
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white">4.9/5</div>
                  <div className="text-xs text-slate-400">Client Rating</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white">190+</div>
                  <div className="text-xs text-slate-400">Countries</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white">Top Rated</div>
                  <div className="text-xs text-slate-400">2024 Platform</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, color: "from-blue-400 to-blue-500" },
                { Icon: Twitter, color: "from-sky-500 to-sky-500" },
                { Icon: Instagram, color: "from-red-500 to-pink-600" },
                { Icon: Linkedin, color: "from-blue-500 to-blue-500" },
                { Icon: Youtube, color: "from-red-500 to-red-500" },
              ].map(({ Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`bg-linear-to-br ${color} p-3 rounded-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:shadow-emerald-500/50`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-linear-gradient-to-br from-white via-white to-white rounded-3xl p-10 w-full relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    Stay Ahead
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Join Our Community</h3>
                <p className="text-emerald-100 mb-6">
                  Get exclusive opportunities, insider tips, and the latest
                  trends.
                </p>

                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 placeholder:text-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  />
                  <button className="cursor-pointer bg-white text-emerald-600 shadow shadow-emerald-500 px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group">
                    Subscribe
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-emerald-200">
                  <Check className="w-4 h-4" />
                  <span>Join 500,000+ subscribers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Categories & Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16 pb-16 border-b border-white/10">
          {/* Categories with Icons */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Categories
            </h4>
            <ul className="space-y-3">
              {topCategories.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <item.icon className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">For Clients</h4>
            <ul className="space-y-3">
              {forClients.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">
              For Freelancers
            </h4>
            <ul className="space-y-3">
              {forFreelancers.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@prolancer.com"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors text-sm group"
              >
                <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="mt-1">hello@prolancer.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors text-sm group"
              >
                <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="mt-1">+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="mt-1">
                  123 Innovation Street
                  <br />
                  San Francisco, CA 94102
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-slate-400">
            <p>© {currentYear} Prolancer, Inc. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Cookies
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
