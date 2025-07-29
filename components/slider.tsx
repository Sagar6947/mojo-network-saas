"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ImageSlider() {
  const images = [
    { src: "/images/steps/1.png", title: "Welcome to Mojo India Network" },
    { src: "/images/steps/2.png", title: "Verify Your Phone Number" },
    { src: "/images/steps/3.png", title: "Name Your News Channel" },
    { src: "/images/steps/4.png", title: "Domain for your news Channel" },
    { src: "/images/steps/13.png", title: "Create Your Brand Identity" },
    // { src: "/images/steps/5.png", title: "Choose Your Color Theme" },
    { src: "/images/steps/6.png", title: "Choose Your Color Theme" },
    { src: "/images/steps/7.png", title: "Select a Layout Template" },
    { src: "/images/steps/8.png", title: "Pick News Categories" },
    { src: "/images/steps/9.png", title: "Preview Your Channel" },
    { src: "/images/steps/10.png", title: "Launched Channel" },
    { src: "/images/steps/11.png", title: "Channel Created Successfully!" },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-black">
        In simple steps, you can create your
        <br /> own <span className="gradient-text">
          Hyperlocal Channel
        </span>{" "}
        effortlessly
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
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
        {images.map(({ src, title }, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded-xl shadow-md border relative bg-[#fef5f9]">
              <div className="absolute top-0 left-0 w-full text-white text-center py-2 z-10 text-sm md:text-base font-medium btn-red">
                {title}
              </div>

              <img
                src={src}
                alt={title}
                className="w-full h-full md:h-[500px] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
