"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Mojo Firstpost",
    price: "",
    description: "Perfect for beginners launching their first news platform.",
    features: [
      "Domain setup",
      "Content uploader app",
      "AI news generator",
      "Content engine",
      "Audio and Video support",
      "Website",
      "SSL certificate",
      "Server Integration",
      "Extensive backend support",
    ],
    cta: "Free Plan Available",
    popular: false,
    badgeColor: "bg-[#F39E60]",
  },
  {
    name: "Mojo Newsroom",
    price: "",
    description: "Smart tools and automation for your growing newsroom.",
    features: [
      "Everything in MoJo Firstpost",
      "Ad manager",
      "Automated Social media",
      "SEO",
      "CMS",
      "Growth hacking solutions",
      "Exclusive content",
      "Social media integration",
      "Extra website sections (gold rates, weather, govt jobs)",
    ],
    cta: "Get Started",
    popular: true,
    badgeColor: "bg-[#E16A54]",
  },
  {
    name: "Mojo Editor’s Club",
    price: "",
    description: "Advanced features & tools for editorial leadership.",
    features: [
      "Everything in MoJo Newsroom",
      "Custom domain",
      "Custom sections on the website",
      "Extensive Growth hacking solutions",
      "Public data support for more reach",
      "Data extraction for more revenue",
      "Exclusive tips on revenue generation",
      "Government registration",
    ],
    cta: "Get Started",
    popular: false,
    badgeColor: "bg-[#9F5255]",
  },
  {
    name: "Mojo Media Bureau",
    price: "",
    description: "Enterprise-ready suite with powerful AI & analytics.",
    features: [
      "Everything in MoJo Editor’s Club",
      "AI Bulletin management system",
      "Exclusive AI features",
      "Data scrapping support",
    ],
    cta: "Get Started",
    popular: false,
    badgeColor: "bg-[#7C444F]",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="pt-10 pb-10 bg-cover bg-center bg-no-repeat relative mt-10"
      style={{ backgroundImage: "url('/images/banner/5.png')" }}
    >
      <div className="absolute inset-0"></div>
      <div className="relative max-w-[1600px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-black">
            Choose the plan that fits your needs and start building your news
            portal today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-3xl overflow-hidden border shadow-md transition-all bg-white relative ${
                plan.popular ? "border-orange-500 shadow-xl" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg font-semibold z-10 btn-red">
                  POPULAR
                </div>
              )}

              <div className={`text-center px-6 py-8 ${plan.badgeColor}`}>
                <h3 className="text-2xl font-extrabold text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-white mt-2">{plan.description}</p>
              </div>

              <div className="px-4 py-4 flex flex-col justify-between flex-grow">
                <ul className="space-y-4  pt-5 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-black"
                    >
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link href={index === 0 ? "/create-portal" : "/contact"}>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "btn-red hover:bg-orange-600 text-white"
                          : "bg-black hover:bg-gray-900 text-white"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
