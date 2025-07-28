import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Contact from "@/components/contact-component";

export const metadata = {
  title: "Contact | Mojo India Network",
  description: "Learn more about Mojo India Network’s mission and vision.",
};

export default function Contactpage() {
  return (
    <>
      <Header />
      <Contact />
      <Footer />
    </>
  );
}
