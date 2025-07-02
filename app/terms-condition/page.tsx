import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import TermsCondition from "@/components/terms-condition";

export const metadata = {
  title: "Terms Conditions | Mojo Network",
  description: "Learn more about Mojo Network’s mission and vision.",
};
export default function TermsConditionPage() {
  return (
    <>
      <Header />
     <TermsCondition/>
      <Footer />
    </>
  );
}
