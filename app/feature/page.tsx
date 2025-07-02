
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Feature from "@/components/feature-component";

export const metadata = {
  title: "Feature | Mojo Network",
  description: "Learn more about Mojo Network’s mission and vision.",
}

export default function FeaturePage() {
  return (
    <>
      <Header />
      <Feature/>
      <Footer />
    </>
  );
}
