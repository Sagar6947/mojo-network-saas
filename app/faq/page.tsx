import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Faq from "@/components/faq-component";


export const metadata = {
  title: "Faq's | Mojo India Network",
  description: "Learn more about Mojo India Network’s mission and vision.",
};
export default function FaqPage() {
  return (
    <>
      <Header />
      <Faq />
      <Footer />
    </>
  );
}
