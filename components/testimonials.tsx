"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CheckCircle, Star } from "lucide-react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    name: "Harsh Patel",
    location: "Delhi, India",
    verified: true,
    message:
      "Mojo India Network changed how I share news. I can now report, edit, and publish updates quickly with just my phone. It’s perfect for people like me who want to cover local news without needing a full media setup.",
    image: "/images/user.jpg",
  },
  {
    name: "Jhanvi Deshmukh",
    location: "Nagpur, India",
    verified: true,
    message:
      "I started using Mojo India Network without any confusion. It’s clean, easy to use, and helps me share real stories. The monetization tools make it easier for creators like me to grow without chasing sponsors every time.",
    image: "/images/user.jpg",
  },
  {
    name: "Amit Raghavan",
    location: "Lucknow, India",
    verified: false,
    message:
      "Posting local updates on social media was easy, but not serious. Mojo India Network gave me a real platform to build my own identity. It’s user-friendly, powerful, and lets me publish news my way—anytime, anywhere.",
    image: "/images/user.jpg",
  },
  {
    name: "Ritika Sen",
    location: "Kolkata, India",
    verified: true,
    message:
      "Running my own news page always seemed difficult, but Mojo India Network made it possible. It offers strong tools, clean design, and freedom to tell stories that matter in my area—without needing technical knowledge.",
    image: "/images/user.jpg",
  },
  {
    name: "Nilesh Kadam",
    location: "Pune, India",
    verified: false,
    message:
      "Mojo India Network is a blessing for local reporters. No complex setup—just my phone and voice. I built my own news identity within days. It's simple, powerful, and gives you real control over your content.",
    image: "/images/user.jpg",
  },
  {
    name: "Meera Lakhani",
    location: "Bhopal, India",
    verified: true,
    message:
      "I was tired of chasing ads and sponsors. Mojo India Network lets me focus on stories. It’s built for creators who want visibility, ownership, and ease—all without needing a big team or a tech background.",
    image: "/images/user.jpg",
  },
  {
    name: "Siddharth Iyer",
    location: "Chennai, India",
    verified: true,
    message:
      "Before Mojo India Network, I was lost under others’ platforms. Now I have a clean space of my own. I don’t worry about reach or design. I just report and publish—it’s as simple and effective as that.",
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
          slidesPerView={3}
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
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

                <p className="text-gray-700 text-sm text-justify">
                  {item.message}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
