import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import PrivacyPolicy from "@/components/privacy-policy";
export const metadata = {
  title: "Privacy Policy | Mojo Network",
  description: "Learn more about Mojo Network’s mission and vision.",
};
export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <PrivacyPolicy/>
      <Footer />
    </>
  );
}
