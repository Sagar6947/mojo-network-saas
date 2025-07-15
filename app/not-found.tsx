import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Mojo Network",
  description: "The page you are looking for does not exist. Return to the Mojo Network homepage.",
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-center px-4">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-6">404 - Oops!</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          The page you’re looking for seems to have vanished. Let’s get you back on track!
        </p>
        <Link
          href="/"
          className="px-10 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 hidden md:flex"
        >
          Return to Homepage
        </Link>
      </main>
      <Footer />
    </>
  );
}