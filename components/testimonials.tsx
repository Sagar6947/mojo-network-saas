"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CheckCircle, Star } from "lucide-react";

const testimonials = [
  {
    name: "Harsh P.",
    location: "Delhi, India",
    verified: true,
    message:
      "Mojo Network completely transformed how I deliver hyperlocal news. With just my phone, I can now report, edit, and publish updates on the go. It’s the perfect platform for anyone who wants to empower their local voice without relying on mainstream media setups.",
    image: "/images/user.jpg",
  },
  {
    name: "Jane D",
    location: "Mumbai, India",
    verified: true,
    message:
      "Simple, clean UI. I started publishing from day one without any learning curve. Mojo Network gives creators like me the tools to broadcast real stories directly from the ground — and the monetization options are truly helpful for independent journalists.",
    image: "/images/user.jpg",
  },
  {
    name: "Amit R",
    location: "Lucknow, India",
    verified: false,
    message:
      "This platform is a game-changer for citizen journalism. I used to post updates on social media but now I have a dedicated news space with proper features, layout, and even earnings potential. Highly recommended if you want to start your own portal.",
    image: "/images/user.jpg",
  },
  {
    name: "Ritika S.",
    location: "Kolkata, India",
    verified: true,
    message:
      "From feature-rich publishing tools to excellent design, Mojo Network has everything I need. It’s helped me build a trustworthy news platform for my neighborhood and build credibility in my community with verified reporting.",
    image: "/images/user.jpg",
  },
  {
    name: "Nilesh K.",
    location: "Pune, India",
    verified: false,
    message:
      "Launching my local bulletin used to feel like a big task — but Mojo Network made it incredibly simple. It's a reliable, powerful tool for aspiring news creators, and I’m grateful to have found this platform.",
    image: "/images/user.jpg",
  },
];


export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500">Testimonials</p>
          <h2 className="text-4xl font-bold text-black">
            Hear from Our <span className="gradient-text">Users</span>
          </h2>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="border rounded-2xl p-6 h-full hover:shadow transition-all duration-300 bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    {item.verified && (
                      <div className="flex items-center gap-1 text-green-600 text-xs font-medium mt-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified Account
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 mb-3 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm">{item.message}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
