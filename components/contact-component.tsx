"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

// Define interfaces for your data structures
interface State {
  id: number;
  state_name: string;
}

interface City {
  city_id: number;
  city_name: string;
}

interface FormData {
  name: string;
  email: string;
  number: string;
  address: string;
  city: string;
  state: string;
  plan: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  number?: string;
  address?: string;
  city?: string;
  state?: string;
  plan?: string;
  message?: string;
  general?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    number: "",
    address: "",
    city: "",
    state: "",
    plan: "",
    message: "",
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stateApi`
        );
        const data = await response.json();
        if (data.status === 200) {
          setStates(data.data);
        }
      } catch (err) {
        setErrors((prevErrors) => ({ ...prevErrors, general: "Failed to fetch states." }));
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cityApi/${formData.state}`
          );
          const data = await response.json();
          if (data.status === 200) {
            setCities(data.data);
          }
        } catch (err) {
          setErrors((prevErrors) => ({ ...prevErrors, general: "Failed to fetch cities." }));
        }
      }
    };

    fetchCities();
  }, [formData.state]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "number") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else if (name === "message" && value.length <= 500) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "message") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contactUs`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        setSuccess(data.message);
        // Clear the form data after successful submission
        setFormData({
          name: "",
          email: "",
          number: "",
          address: "",
          city: "",
          state: "",
          plan: "",
          message: "",
        });
      } else {
        if (typeof data.message === 'object') {
          setErrors(data.message);
        } else {
          setErrors({ general: data.message });
        }
      }
    } catch (err) {
      setErrors({ general: "Failed to submit form." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-black font-bold">
          Contact
        </h1>
      </section>
      <main className="flex items-center justify-center px-2 md:px-4 py-4 md:py-10">
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
              support, or want to explore how Mojo India Network can empower your
              journalism journey, our team is here to help.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white rounded-full p-3">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-black font-semibold">
                  Mail: info@mojonetwork.in
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white rounded-full p-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-black font-semibold">
                Bhopal, Madhya Pradesh
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:grid md:grid-cols-2 gap-4 p-4 md:p-8"
              style={{
                background: "#fef5fa",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                borderRadius: "6px",
              }}
            >
              <div className="col-span-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  required
                  onChange={handleChange}
                  value={formData.name}
                  className="border px-4 py-3 rounded-md w-full text-black placeholder-black"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="col-span-1">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail *"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  className="border px-4 py-3 rounded-md w-full text-black placeholder-black"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="col-span-1">
                <input
                  type="tel"
                  name="number"
                  placeholder="Number *"
                  required
                  onChange={handleChange}
                  value={formData.number}
                  className="border px-4 py-3 rounded-md w-full text-black placeholder-black"
                />
                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  required
                  onChange={handleChange}
                  value={formData.address}
                  className="border px-4 py-3 rounded-md w-full text-black placeholder-black"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="col-span-1">
                <select
                  name="state"
                  required
                  onChange={handleChange}
                  value={formData.state}
                  className="border px-4 py-3 rounded-md w-full text-black"
                >
                  <option value="">Select State *</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.state_name}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div className="col-span-1">
                <select
                  name="city"
                  required
                  onChange={handleChange}
                  value={formData.city}
                  className="border px-4 py-3 rounded-md w-full text-black"
                >
                  <option value="">Select City *</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div className="col-span-2">
                <select
                  name="plan"
                  required
                  onChange={handleChange}
                  value={formData.plan}
                  className="border px-4 py-3 rounded-md w-full text-black"
                >
                  <option value="">Select Plan *</option>
                  <option value="Mojo Newsroom">Mojo Newsroom</option>
                  <option value="Mojo Editor’s Club">Mojo Editor’s Club</option>
                  <option value="Mojo Media Bureau">Mojo Media Bureau</option>
                </select>
                {errors.plan && <p className="text-red-500 text-sm mt-1">{errors.plan}</p>}
              </div>
              <div className="col-span-2">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write Your Message *"
                  required
                  onChange={handleChange}
                  value={formData.message}
                  className="border px-4 py-3 rounded-md w-full text-black placeholder-black"
                />
                <div className="text-right text-xs text-gray-500">
                  {formData.message.length}/500
                </div>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="col-span-2 w-full bg-red-600 text-white text-lg py-3 rounded-full hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </button>
            </form>
            {errors.general && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}
            {success && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
