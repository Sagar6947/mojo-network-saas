"use client";

import Link from "next/link";
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
    <footer className="bg-[#000] pt-8 pb-5">
      <div className="container pt-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1.5fr_1fr]">
          <div className="space-y-4">
            <img
              src="/images/footer.png"
              alt="MojoNetwork Logo"
              className="w-32"
            />

            <p className="text-white pt-0 pb-10">
              India's first AI-driven Saas Platform empowering local
              journalists and media entrepreneurs.
            </p>
          </div>

          <div className="pb-10">
            <h4 className="font-semibold text-lg mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-red-600 text-[15px]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-red-600 text-[15px]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/feature" className="text-white hover:text-red-600 text-[15px]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white hover:text-red-600 text-[15px]">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <h4 className="font-semibold text-lg mb-4 text-white">Usefull Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-white hover:text-red-600">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-red-600 text-[15px]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/create-portal" className="text-white hover:text-red-600 text-[15px]">
                  Create Channel
                </Link>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <h4 className="font-semibold text-lg mb-4 text-white">Our Policies</h4>
            <ul className="space-y-2 fs-sm">
               {policies.map(({ title, href }) => (
                <li key={href}>
                <Link href={href} target="_blank" className="text-white text-[15px] hover:text-red-600">
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
                <MapPin size={16} /> 
               Bhopal, Madhya Pradesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-5 flex flex-col md:flex-row justify-center items-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Mojo India Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
