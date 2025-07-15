"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";

const policies = [
  { title: "Privacy Policy", href: "/policy/privacy" },
  { title: "Terms & Conditions", href: "/policy/terms-and-condition" },
  { title: "SaaS Service Agreement", href: "/policy/saas-service-agreement" },
  { title: "Advertising & Monetization Policy", href: "/policy/advertising-and-monetization-policy" },
  { title: "Grievance Redressal Policy", href: "/policy/grievance-redressal-policy" },
  { title: "Content Responsibility & Licensing Policy", href: "/policy/content-responsibility-and-licensing-policy" },
];
export function Footer() {
  return (
    <footer className="bg-[#252525] pt-5">
      <div className="container py-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1.5fr_1fr] gap-8">
          <div className="space-y-4">
            <img
              src="/images/footer.png"
              alt="MojoNetwork Logo"
              className="w-32"
            />

            <p className="text-white">
              India's first AI-driven news portal platform empowering local
              journalists and media entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-red-600">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-red-600">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-red-600">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-red-600">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-red-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/feature" className="text-white hover:text-red-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white hover:text-red-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Usefull Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-white hover:text-red-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-red-600">
                  contact
                </Link>
              </li>
              <li>
                <Link href="/create-portal" className="text-white hover:text-red-600">
                  Create Channel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Our Policies</h4>
            <ul className="space-y-2">
               {policies.map(({ title, href }) => (
                <li key={href}>
                <Link href={href} target="_blank" className="text-white hover:text-red-600">
                  {title}
                </Link>
              </li>
            ))}
              
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-white flex items-center gap-2">
                <Mail size={16} /> Email: info@mojonetwork.in
              </li>
              <li className="text-white flex items-center gap-2">
                <Phone size={16} /> Phone: +91 XXXX XXXX XX
              </li>
              <li className="text-white flex items-center gap-2">
                <MapPin size={16} /> Address: New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Mojo Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
