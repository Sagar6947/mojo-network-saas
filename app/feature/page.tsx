
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Feature from "@/components/feature-component";

export const metadata = {
  title: "Feature | Mojo India Network",
  description: "Learn more about Mojo India Network mission and vision.",
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
