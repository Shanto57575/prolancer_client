"use client";

import { useState, useEffect } from "react";
import { Check, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { getProfileAction } from "@/actions/user/getProfileAction";
import { createCheckoutSessionAction } from "@/actions/payment/payment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getProfileAction().then((res) => {
      if (res.ok) setUser(res.data);
    });
  }, []);

  const handleSubscribe = async (plan: "MONTHLY" | "YEARLY") => {
    if (!user) {
      toast.error("Please login to subscribe");
      router.push("/login");
      return;
    }
    if (user.role !== "FREELANCER") {
      toast.error("Subscriptions are only for freelancers");
      return;
    }

    setLoading(true);
    try {
      const res = await createCheckoutSessionAction(plan);
      if (res.ok && res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error(res.message || "Failed to start checkout");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Starter",
      description: "Perfect for getting started",
      price: "Free",
      period: "/forever",
      features: [
        "Create Freelancer Profile",
        "Apply to 5 Jobs / month",
        "Basic Search",
      ],
      notIncluded: [
        "Direct Messaging to Clients",
        "Verified Badge",
        "Priority Support",
      ],
      buttonText: user?.isPremium ? "Free Plan" : "Current Plan",
      buttonVariant: "outline",
      action: null,
      popular: false,
      disabled: !user?.isPremium, // Already on free if not premium
    },
    {
      name: "Pro Freelancer",
      description: "Unlock your full potential",
      price: isYearly ? "$15" : "$19",
      period: "/month",
      billing: isYearly ? "Billed $180 yearly (Save 20%)" : "Billed monthly",
      features: [
        "Everything in Starter",
        "Unlimited Job Applications",
        "Direct Messaging to Clients",
        "Verified Badge",
        "Priority Support",
      ],
      notIncluded: [],
      buttonText: user?.isPremium ? "Active Plan" : "Upgrade to Pro",
      buttonVariant: "default",
      action: isYearly ? "YEARLY" : "MONTHLY",
      popular: true,
      disabled: !!user?.isPremium,
    },
    {
      name: "Enterprise",
      description: "For agencies and teams",
      price: "Contact",
      period: "",
      features: [
        "Everything in Pro",
        "Team Management",
        "API Access",
        "Dedicated Account Manager",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      action: null,
      popular: false,
      disabled: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
          Pricing
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          Plans for every stage of your career
        </p>
        <p className="mt-4 max-w-2xl text-xl text-slate-500 dark:text-slate-400 mx-auto">
          Unlock premium features and get hired faster with Prolancer Pro.
        </p>

        {/* Toggle */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <span
            className={cn(
              "text-sm font-medium",
              !isYearly ? "text-slate-900 dark:text-white" : "text-slate-500"
            )}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={cn(
              "text-sm font-medium",
              isYearly ? "text-slate-900 dark:text-white" : "text-slate-500"
            )}
          >
            Yearly <span className="text-green-500 font-bold">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl shadow-xl divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 border transition-all duration-300 hover:-translate-y-2",
                plan.popular
                  ? "border-primary ring-2 ring-primary relative scale-105 z-10"
                  : "border-slate-200 dark:border-slate-800"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-slate-500 dark:text-slate-400">
                    {plan.period}
                  </span>
                </p>
                {plan.billing && (
                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    {plan.billing}
                  </p>
                )}

                <Button
                  className={cn("mt-8 w-full", loading && "opacity-80")}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  variant={plan.buttonVariant as any}
                  disabled={loading || !plan.action || plan.disabled}
                  onClick={() =>
                    plan.action &&
                    !plan.disabled &&
                    handleSubscribe(plan.action as "MONTHLY" | "YEARLY")
                  }
                >
                  {loading && plan.action ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white tracking-wide uppercase">
                  What&apos;s included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check
                        className="shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.notIncluded?.map((feature) => (
                    <li key={feature} className="flex space-x-3 opacity-50">
                      <X
                        className="shrink-0 h-5 w-5 text-slate-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
