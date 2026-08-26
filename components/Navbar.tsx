'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useFavorites } from '@/lib/favorites'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { favoriteIds } = useFavorites()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background shadow-elegant">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group min-w-0 shrink-0" aria-label="Niella's FashionHub home">
            <span className="block truncate font-serif text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl md:text-2xl">
              Niella&apos;s <span className="text-primary">FashionHub</span>
            </span>
            <span className="hidden max-w-full text-[0.6rem] font-medium tracking-[0.2em] text-muted-foreground sm:block">
              look good. feel good. be you
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="font-medium text-foreground transition-colors hover:text-primary">Home</Link>
            <Link href="/#products" className="font-medium text-foreground transition-colors hover:text-primary">Shop</Link>
            <Link href="/#new-arrivals" className="font-medium text-foreground transition-colors hover:text-primary">New Arrivals</Link>
            <Link href="/#best-sellers" className="font-medium text-foreground transition-colors hover:text-primary">Best Sellers</Link>
            <Link href="/favorites" className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary">
              <Heart className="size-4" /> Favourites{favoriteIds.length > 0 && <span className="text-xs text-primary">({favoriteIds.length})</span>}
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted">
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-2 border-t border-border py-4 md:hidden">
            {[
              ['/', 'Home'],
              ['/#dresses', 'Shop'],
              ['/#new-arrivals', 'New Arrivals'],
              ['/#best-sellers', 'Best Sellers'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-md px-4 py-2 text-foreground transition-colors hover:bg-muted hover:text-primary" onClick={() => setIsOpen(false)}>{label}</Link>
            ))}
            <Link href="/favorites" className="flex items-center gap-2 rounded-md px-4 py-2 text-foreground transition-colors hover:bg-muted hover:text-primary" onClick={() => setIsOpen(false)}>
              <Heart className="size-4" /> Favourites{favoriteIds.length > 0 && <span className="text-xs text-primary">({favoriteIds.length})</span>}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
