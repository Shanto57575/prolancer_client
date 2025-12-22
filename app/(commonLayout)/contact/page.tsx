import ContactForm from "@/components/modules/contact/ContactForm";
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function ContactSupport() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@prolancer.com",
      description: "Get response within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      detail: "Available 24/7",
      description: "Instant support for urgent issues",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri, 9 AM - 6 PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Office",
      detail: "San Francisco, CA",
      description: "By appointment only",
    },
  ];

  const faqs = [
    {
      question: "How do I get started as a freelancer?",
      answer:
        "Create your account, complete your profile, and start browsing available projects.",
    },
    {
      question: "What are the platform fees?",
      answer:
        "We charge a 10% service fee on completed projects for freelancers.",
    },
    {
      question: "How long does payment processing take?",
      answer:
        "Payments are typically processed within 3-5 business days after project completion.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header Section */}
      <div className="bg-linear-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch with Prolancer
          </h1>
          <p className="text-emerald-50 text-lg max-w-2xl mx-auto">
            Have questions or need support? We&apos;re here to help you succeed
            on our platform.
          </p>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow"
              >
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                  {method.detail}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <ContactForm />

          {/* FAQ Section */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-800 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quick Help
                </h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                View All FAQs
              </button>
            </div>

            {/* Support Hours */}
            <div className="bg-linear-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">Support Hours</h3>
              </div>
              <div className="space-y-2 text-emerald-50">
                <p className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9 AM - 6 PM (PST)</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10 AM - 4 PM (PST)</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </p>
              </div>
              <p className="text-sm text-emerald-100 mt-4">
                Chat support available 24/7 for urgent issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
