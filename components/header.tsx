"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import "@/styles/iqra.css";
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/feature" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0  z-50 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container flex h-20 items-center justify-between pl-0 md:pl-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="MojoNetwork Logo"
              className="w-auto bottom-4 h-12 md:h-20"
            />
          </Link>
        </div>

        <nav className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-md font-medium text-black hover:text-red transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="">
            <button className="px-10 py-2 font-md rounded-md border border-red-600 text-red-600 font-semibold hover:bg-red-50 transition duration-200 hidden md:flex">
              Login
            </button>
          </Link>

          <Link href="/create-portal">
            <button className="px-10 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 hidden md:flex">
              Create Channel
            </button>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
