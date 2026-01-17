"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import {
//   Newspaper,
//   Video,
//   Share2,
//   DollarSign,
//   FileText,
//   Mic,
//   Users,
//   Shield,
//   Languages,
// } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: "/images/solutions/19.png",
    title: "Automated News Engine",
    description:
      "Stay ahead with real-time automated news sourcing and publishing powered by AI.",
  },
  {
    icon: "/images/solutions/13.png",
    title: "Categorised News",
    description:
      "Automatically organize your content into categories like politics, sports, entertainment, and more.",
  },
  {
    icon: "/images/solutions/14.png",
    title: "Bulletin",
    description:
      "Generate daily or weekly bulletins automatically to keep your audience updated.",
  },
  // {
  //   icon: "/images/solutions/15.png",
  //   title: "Local Stories",
  //   description:
  //     "Highlight hyperlocal content that connects deeply with your community.",
  // },
  {
    icon: "/images/solutions/15.png",
    title: "Advertisement Assistance & Phygital Connectivity",
    description:
      "Mojo connects hyperlocal news channels with a growing advertiser network, enabling end-to-end ad support and seamless physical + digital (phygital) campaign execution for real local impact.",
  },
  {
    icon: "/images/solutions/16.png",
    title: "WhatsApp & Social Media Integration",
    description:
      "Distribute stories instantly via WhatsApp and other social media platforms to reach a wider audience.",
  },

  {
    icon: "/images/solutions/18.png",
    title: "Task Manager",
    description:
      "Task Manager helps you plan content strategically to grow your channel’s audience.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-16 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/pricing.webp')" }}
    >
      <div className="absolute inset-0 bg-pink-100/40 pointer-events-none"></div>
      <div className="relative container z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          <span className="gradient-text">Mojo India Network</span> is the
          Solution You’ve Been Waiting For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border transition-shadow"
              style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
            >
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <CardTitle>
                  <h3 className="text-lg font-semibold text-center">
                    {feature.title}
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-black sm:text-sm md:text-base text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/feature">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition text-sm md:text-base w-72 text-center">
              Explore the Platform
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
