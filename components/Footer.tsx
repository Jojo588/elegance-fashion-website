import { Heart, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white dark:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-bold">Niella&apos;s FashionHub</span>
            </div>
            <p className="text-gray-300 dark:text-black text-sm leading-relaxed">
              Discover fashion, beauty, and lifestyle essentials—from statement pieces to everyday favorites.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-black">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/#new-arrivals" className="hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/#best-sellers" className="hover:text-primary transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Information</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-black">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-300 dark:text-black">
              <a
                href="https://wa.me/233248993067"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary transition-colors"
              >
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span className="leading-5">+233 248 993 067</span>
              </a>
              <a
                href="mailto:hello@niellasfashionhub.com"
                className="flex items-start gap-2 hover:text-primary transition-colors"
              >
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span className="break-all leading-5">hello@niellasfashionhub.com</span>
              </a>
              <p className="pl-6 leading-5">Available on WhatsApp for instant support</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Niella&apos;s FashionHub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
