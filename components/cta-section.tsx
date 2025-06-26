"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-[url('/images/cta/1.png')] bg-cover bg-center text-white relative"
    >
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Ready to Launch Your News Portal?
          </h2>
          <p className="text-xl opacity-90 text-black">
            Book a live demo today and see how MoJo Network can transform your
            media presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-portal">
              <Button
                size="lg"
                className="text-white font-semibold text-lg px-8 btn-red hover:bg-gray-900"
              >
                Create Your Portal
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-[#ca0013] border-[#dc26263d] hover:bg-white/10 text-lg px-8"
              >
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
