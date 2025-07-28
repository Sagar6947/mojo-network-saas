// "use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Pricing from "@/components/pricing-component";

export const metadata = {
  title: "Pricing | Mojo India Network",
  description: "Learn more about Mojo India Network mission and vision.",
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
