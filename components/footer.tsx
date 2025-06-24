import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t bg-[#252525] pt-5">
      <div className="container py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/images/footer.png"
              alt="MojoNetwork Logo"
              className="w-32"
            />

            <p className="text-white">
              India's first AI-driven news portal platform empowering local
              journalists and media entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-white hover:text-primary"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-white hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-white hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-primary">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-white">Email: info@mojonetwork.in</li>
              <li className="text-white">Phone: +91 XXXX XXXX XX</li>
              <li className="text-white">Address: New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} MojoNetwork. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white hover:text-primary text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
