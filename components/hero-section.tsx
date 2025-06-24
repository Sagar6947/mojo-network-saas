import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Newspaper, Lightbulb, Smartphone, DollarSign } from "lucide-react";

export function HeroSection() {
  const features = [
    {
      icon: (
        <img src="/images/icons/1.png" alt="News Icon" className="w-6 h-6" />
      ),
      title: "Empowerci Journalism",
    },
    {
      icon: (
        <img src="/images/icons/2.png" alt="News Icon" className="w-6 h-6" />
      ),
      title: "AI Content Engine",
    },
    {
      icon: (
        <img src="/images/icons/3.png" alt="News Icon" className="w-6 h-6" />
      ),
      title: "Mobile Journalism Made Easy",
    },
    {
      icon: (
        <img src="/images/icons/4.png" alt="News Icon" className="w-6 h-6" />
      ),
      title: "Bulletin and Monetization Tools",
    },
  ];

  return (
    <section className="bg-[#fef5f9] py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6">
          <div className="p-0">
            <h2 className="text-4xl font-bold text-black-900">
              Start Your Own{" "}
              <span className="text-red-600">News Channel Today</span>
            </h2>
            <p className="text-gray-700 mt-4 text-base">
              Turn your smartphone into a complete digital news studio. Whether
              you're a budding journalist or a passionate storyteller, our
              powerful platform gives you everything you need to{" "}
              <b>capture real stories</b>, publish them instantly, and{" "}
              <b>earn from your local content</b>
              all from one easy-to-use dashboard.
            </p>
          </div>

          <div className="p-0">
            <h2 className="text-2xl font-bold text-black-600 mb-4">
              Hyperlocal Journalism for Everyone, Everywhere, Anytime
            </h2>
            <hr className="w-16 border-red-400 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 rounded-lg transition"
                >
                  <div className="p-3 btn-red rounded-full">{feature.icon}</div>
                  <div className="text-md font-medium text-gray-800">
                    {feature.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition text-sm md:text-base w-60 text-center">
            Start Your Channel Today
          </button>
        </div>

        <div className="overflow-hidden mt-81">
          <video
            src="/images/mojo fnl (1).mp4"
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
