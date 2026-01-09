import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import FaqComponent from "@/components/faq-component";
import { fetchFaqs } from "@/lib/api";

export const metadata = {
  title: "Faq's | Mojo India Network",
  description: "Learn more about Mojo India Network's mission and vision.",
};

export default async function FaqPage() {
  const faqs = await fetchFaqs();

  return (
    <>
      <Header />
      <FaqComponent faqs={faqs} />
      <Footer />
    </>
  );
}
