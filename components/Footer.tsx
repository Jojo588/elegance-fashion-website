import { Heart, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid min-w-0 grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:py-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-bold">Niella&apos;s FashionHub</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Discover fashion, beauty, and lifestyle essentials—from statement pieces to everyday favorites.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
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
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-primary transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-background/70">
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
                href="mailto:daniellaakakpo18@gmail.com"
                className="flex items-start gap-2 hover:text-primary transition-colors"
              >
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span className="break-all leading-5">daniellaakakpo18@gmail.com</span>
              </a>
              <p className="pl-6 leading-5">Available on WhatsApp for instant support</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/15 py-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-background/60 md:flex-row md:text-left">
            <p>&copy; {currentYear} Niella&apos;s FashionHub. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 md:mt-0">
              <a href="https://www.tiktok.com/@niella_fashionhub?_r=1&_t=ZS-99Dd6lxexIz" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                TikTok
              </a>
              <a href="https://snapchat.com/t/6bgJt3YN" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Snapchat
              </a>
              <a href="https://wa.me/qr/55N25EB2OFFQL1" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
