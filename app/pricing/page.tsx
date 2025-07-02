// "use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Pricing from "@/components/pricing-component";

export const metadata = {
  title: "Pricing | Mojo Network",
  description: "Learn more about Mojo Network’s mission and vision.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <Pricing />
      <Footer />
    </>
  );
}
