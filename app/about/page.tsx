// "use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import AboutPage from "@/components/about-component";

export const metadata = {
  title: "About | Mojo Network",
  description: "Learn more about Mojo Network’s mission and vision.",
};
export default function AboutClient() {
  return (
    <>
      <Header />
      <AboutPage />
      <Footer />
    </>
  );
}
