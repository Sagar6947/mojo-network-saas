"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    city: "",
    state: "",
    plan: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log(formData);
  };

  return (
    <>
      <section className="w-full h-[231px] bg-green-700 flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-white font-bold">Contact</h1>
      </section>

      <main className="flex items-center justify-center px-2 md:px-4 py-4 md:py-32">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-600 font-semibold uppercase mb-2">
              Get in touch
            </p>
            <h2 className="text-4xl font-bold text-black mb-4">
              Stay Connected
            </h2>
            <p className="text-black mb-2">
              We’d love to hear from you! Whether you have a question, need
              support, or want to explore how Mojo Network can empower your
              journalism journey, our team is here to help.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white rounded-full p-3">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-black font-semibold">
                  Mail : info@mojonetwork.in
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white rounded-full p-3">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-black font-semibold">
                Phone : +91 XXXX XXXX XX
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white rounded-full p-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-black font-semibold">
                  Address : New Delhi, India
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8"
              style={{
                background: "#fef5fa",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                borderRadius: "6px",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name *"
                required
                onChange={handleChange}
                value={formData.name}
                className="border px-4 py-3 rounded-md col-span-1 text-black placeholder-black"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                required
                onChange={handleChange}
                value={formData.email}
                className="border px-4 py-3 rounded-md col-span-1 text-black placeholder-black"
              />
              <input
                type="tel"
                name="number"
                placeholder="Number *"
                required
                onChange={handleChange}
                value={formData.number}
                className="border px-4 py-3 rounded-md col-span-1 text-black placeholder-black"
              />
              <input
                type="text"
                name="address"
                placeholder="Address *"
                required
                onChange={handleChange}
                value={formData.address}
                className="border px-4 py-3 rounded-md col-span-1 text-black placeholder-black"
              />

              <select
                name="city"
                required
                onChange={handleChange}
                value={formData.city}
                className="border px-4 py-3 rounded-md col-span-1 text-black"
              >
                <option value="">Select City *</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="state"
                required
                onChange={handleChange}
                value={formData.state}
                className="border px-4 py-3 rounded-md col-span-1 text-black"
              >
                <option value="">Select State *</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="plan"
                required
                onChange={handleChange}
                value={formData.plan}
                className="border px-4 py-3 rounded-md col-span-1 md:col-span-2 text-black"
              >
                <option value="">Select Plan *</option>
                <option value="Mojo Newsroom">Mojo Newsroom</option>
                <option value="Mojo Editor’s Club">Mojo Editor’s Club</option>
                <option value="Mojo Media Bureau">Mojo Media Bureau</option>
              </select>

              <textarea
                name="message"
                rows={4}
                placeholder="Write Your Message *"
                required
                onChange={handleChange}
                value={formData.message}
                className="border px-4 py-3 rounded-md col-span-1 md:col-span-2 text-black placeholder-black"
              />

              <button
                type="submit"
                className="col-span-1 md:col-span-2 w-full bg-red-600 text-white text-lg py-3 rounded-full hover:bg-red-700 transition"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
