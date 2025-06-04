import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Limited storage and basic tools, great for amateur journalists",
    features: ["Basic CMS", "1 subdomain", "Limited storage", "Basic analytics", "Community support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Starter",
    price: "₹15,000",
    period: "per year",
    description: "Everything you need to start a professional news portal",
    features: ["Basic CMS", "1 subdomain", "AI tools", "Daily bulletins", "Basic analytics", "Email support"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Pro",
    price: "₹30,000",
    period: "per year",
    description: "Advanced features for growing news portals",
    features: [
      "Multi-author login",
      "Ad integration",
      "Advanced analytics",
      "WhatsApp push",
      "Priority support",
      "Content syndication",
    ],
    cta: "Go Pro",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "₹60,000+",
    period: "per year",
    description: "Full-featured solution for established media organizations",
    features: [
      "Own domain",
      "Government ad registration",
      "24/7 support",
      "Event coverage",
      "Custom branding",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your needs and start building your news portal today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border ${plan.popular ? "border-primary shadow-lg relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">Most Popular</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-gray-500">{plan.period}</span>}
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="/create-portal">
                    <Button
                      className={`w-full ${plan.popular ? "" : "bg-gray-800 hover:bg-gray-900"}`}
                      variant={plan.popular ? "default" : "outline"}
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
  )
}
