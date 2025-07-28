"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const features = [
    {
      icon: (
        <img
          src="/images/journalism/1.png"
          alt="Empowering Journalism"
          className="w-6 h-6"
        />
      ),
      title: "Empowering Journalism",
    },
    {
      icon: (
        <img
          src="/images/journalism/2.png"
          alt="AI Content Engine"
          className="w-6 h-6"
        />
      ),
      title: "AI Content Engine",
    },
    {
      icon: (
        <img
          src="/images/journalism/3.png"
          alt="Mobile Journalism Made Easy"
          className="w-6 h-6"
        />
      ),
      title: "Mobile Journalism Made Easy",
    },
    {
      icon: (
        <img
          src="/images/journalism/4.png"
          alt="Empowered Journalism"
          className="w-6 h-6"
        />
      ),
      title: "Bulletin and Monetization Tools",
    },
  ];

  return (
    <section className="bg-[#fef5f9] py-10 px-4 pt-0 md:pt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-0 md:p-10 md:pt-3">
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <div className="p-0">
            <h2 className="text-[28px] leading-[36px] md:text-[51px] md:leading-[59px] font-bold text-black-900">
              Start Your Own <br />
              <span className="text-red-600">News Channel Today</span>
            </h2>
            <p className="text-gray-700 mt-4 text-[15px]">
            Turn your smartphone into a digital news studio. <b>Capture real stories</b>, publish instantly, and earn all from one easy dashboard. <b>India’s first AI-driven SaaS platform empowering local journalists and media entrepreneurs.</b>
            </p>
          </div>

          <div className="p-0">
            <h2 className="md:text-3xl text-2xl font-bold text-black-600 mb-1">
              Hyperlocal Journalism
            </h2>
            <hr className="w-80 border-red-400 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-1 rounded-lg transition"
                >
                  <div className="p-2 btn-red rounded-full flex items-center justify-center w-10 h-10">
                    {feature.icon}
                  </div>
                  <div className="text-2xs font-medium text-gray-800">
                    {feature.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/create-portal">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition text-sm md:text-base w-72 text-center">
              Start Your Channel Today
            </button>
          </Link>
        </div>
        <div className="order-1 md:order-2 overflow-hidden mt-0 md:-mt-10 lg:-mt-16">
          <video
            src="/images/mojo-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
