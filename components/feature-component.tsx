// "use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Feature = () => {
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
    {
      icon: "/images/solutions/15.png",
      title: "Local Stories",
      description:
        "Highlight hyperlocal content that connects deeply with your community.",
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

    {
      icon: "/images/solutions/20.png",
      title: "Analytics Dashboard",
      description:
        "Measure the reach and response of your content across platforms. Get deep insights into trending issues and the demographics they influence.",
    },
    {
      icon: "/images/solutions/1.png",
      title: "your brand your news",
      description:
        "your brand your news be the face of your news—not just a name buried inside a portal. Mojo India Network gives you your own branded channel that puts you in front.",
    },

    {
      icon: "/images/solutions/3.png",
      title: "Automated Sharing Tools",
      description:
        "Our engine gives you daily national, local, political, cricket, and even astrology content—so you never run dry.",
    },
    {
      icon: "/images/solutions/4.png",
      title: "Built‑in Ads + Sponsor Tools",
      description:
        "No pitching, no chasing. We connect you to local advertisers and help you monetize every view and click.",
    },
    {
      icon: "/images/solutions/5.png",
      title: "Prestige + Power Among Peers",
      description:
        "While others run websites, you run a channel. That makes you the journalist they look up to.",
    },
    {
      icon: "/images/solutions/6.png",
      title: "Only One Job",
      description:
        "Do Journalism. Everything else—tech, promotion, publishing, billing—is taken care of. You focus on breaking the story; we’ll break the barriers.",
    },
    {
      icon: "/images/solutions/7.png",
      title: "24/7 Support",
      description:
        "We’ve got your back any time of day with expert technical and content support when you need it most.",
    },
    {
      icon: "/images/solutions/8.png",
      title: "Multi-Language Publishing",
      description:
        "Publish in English, Hindi, or any local language—expand your reach to every corner of your audience.",
    },
    {
      icon: "/images/solutions/9.png",
      title: "Mobile-First Experience",
      description:
        "Our platform is built mobile-first, ensuring your content looks great and works fast on all devices.",
    },
    {
      icon: "/images/solutions/10.png",
      title: "Secure Cloud Hosting",
      description:
        "Stay protected with fast, reliable cloud hosting—no downtime, no data loss, no worries.",
    },
    {
      icon: "/images/solutions/11.png",
      title: "Real-Time Analytics",
      description:
        "Track your audience, clicks, and engagement instantly so you can make smart decisions quickly.",
    },
    {
      icon: "/images/solutions/12.png",
      title: "Content Library Access",
      description:
        "Get access to ready-to-use visuals, videos, and stories to boost your channel’s output with ease.",
    },
  ];

  return (
    <>
      <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-black font-bold">
          Our Features
        </h1>
      </section>

      <section
        id="features"
        className="relative py-16 bg-contain bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-white pointer-events-none"></div>
        <div className="relative container z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            <span className="gradient-text">Mojo India Network</span> is the Solution
            You’ve Been Waiting For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-t-[3px] border-red-500 rounded-[10px]"
                style={{
                  borderTop: "3px solid #dc2626",
                  borderRadius: "10px",
                  boxShadow: "rgb(220 38 38 / 15%) 0px 1px 2px 0px",
                }}
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
        </div>
      </section>
    </>
  );
};

export default Feature;
