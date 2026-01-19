import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Blogs from "@/components/blogs-components";

export const metadata = {
  title: "Blogs | Mojo India Network",
  description: "Learn more about Mojo India Network mission and vision.",
};

export default function BlogsPage() {
  return (
    <>
      <Header />
      <Blogs />
      <Footer />
    </>
  );
}
