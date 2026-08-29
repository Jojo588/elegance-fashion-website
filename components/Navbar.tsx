'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useFavorites } from '@/lib/favorites'

const links = [
  ['/', 'Home'],
  ['/#products', 'Shop'],
  ['/#new-arrivals', 'New Arrivals'],
  ['/#best-sellers', 'Best Sellers'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
] as const

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { favoriteIds } = useFavorites()
  const favoriteLabel = favoriteIds.length > 0 ? ` (${favoriteIds.length})` : ''

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 shadow-elegant backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex min-h-20 items-center justify-between gap-3 py-3">
            <Link href="/" className="group min-w-0 max-w-[62vw] shrink-0" aria-label="Niella's FashionHub home">
              <span className="block truncate font-serif text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl md:text-2xl">
                Niella&apos;s <span className="text-primary">FashionHub</span>
              </span>
              <span className="block max-w-full truncate text-[0.5rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.6rem] sm:tracking-[0.2em]">
                look good. feel good. be you
              </span>
            </Link>

            <div className="hidden min-w-0 items-center gap-3 lg:flex xl:gap-6">
              {links.map(([href, label]) => (
                <Link key={href} href={href} className="whitespace-nowrap font-medium text-foreground transition-colors hover:text-primary">
                  {label}
                </Link>
              ))}
              <Link href="/favorites" className="flex min-w-0 items-center gap-2 whitespace-nowrap font-medium text-foreground transition-colors hover:text-primary">
                <Heart className="size-4 shrink-0" />
                <span>Favourites{favoriteLabel}</span>
              </Link>
              <ThemeToggle />
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:hidden">
              <ThemeToggle />
              <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {isOpen ? <X className="size-5 sm:size-6" /> : <Menu className="size-5 sm:size-6" />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="flex flex-col gap-1 border-t border-border py-3 lg:hidden">
              {links.map(([href, label]) => (
                <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary sm:text-base" onClick={() => setIsOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link href="/favorites" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary sm:text-base" onClick={() => setIsOpen(false)}>
                <Heart className="size-4 shrink-0" /> Favourites{favoriteLabel}
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div aria-hidden="true" className="h-20 shrink-0" />
    </>
  )
}

