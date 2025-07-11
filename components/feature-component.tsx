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
      icon: "/images/solutions/1.png",
      title: "Your Brand",
      description:
        "Your Brand. Be the face of your news—not just a name buried inside a portal. Mojo Network gives you your own branded channel that puts you in front.",
    },
    {
      icon: "/images/solutions/2.png",
      title: "Automatic Fame Engine",
      description:
        "Whatever you publish turns into a daily bulletin, social media push, and mass visibility—no extra work, only more recognition.",
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
        " No pitching, no chasing. We connect you to local advertisers and help you monetize every view and click.",
    },
    {
      icon: "/images/solutions/5.png",
      title: "Prestige + Power Among Peers",
      description:
        " While others run websites, you run a channel. That makes you the journalist they look up to",
    },
    {
      icon: "/images/solutions/6.png",
      title: "Only One Job",
      description:
        "Do Journalism. Everything else—tech, promotion, publishing, billing—is taken care of. You focus on breaking the story; we’ll break the barriers.",
    },
  ];
  return (
    <>
      <section className="w-full h-[231px] bg-green-700 flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-white font-bold">
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
            <span className="gradient-text">Mojo Network</span> is the Solution
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
                  <CardDescription className="text-xs sm:text-sm md:text-base text-center">
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
