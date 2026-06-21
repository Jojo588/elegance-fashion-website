"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold text-foreground hidden sm:inline">
              Elegance<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out font-medium">
              Home
            </Link>
            <Link href="/#dresses" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out font-medium">
              Shop
            </Link>
            <Link href="/#new-arrivals" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out font-medium">
              New Arrivals
            </Link>
            <Link href="/#best-sellers" className="text-foreground hover:text-primary transition-all duration-300 ease-in-out font-medium">
              Best Sellers
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-all duration-300 ease-in-out"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            <Link
              href="/"
              className="block px-4 py-2 text-foreground hover:text-primary transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#dresses"
              className="block px-4 py-2 text-foreground hover:text-primary transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/#new-arrivals"
              className="block px-4 py-2 text-foreground hover:text-primary transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/#best-sellers"
              className="block px-4 py-2 text-foreground hover:text-primary transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Best Sellers
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
