'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Package, ShoppingCart, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ThemeToggle from '@/components/ThemeToggle'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: ShoppingCart },
    { href: '/admin/dashboard/products', label: 'Products', icon: Package },
    { href: '/admin/dashboard/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await createClient().auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close navigation' : 'Open navigation'} className="fixed bottom-4 right-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg md:hidden">
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>
      <aside className={`fixed inset-y-0 left-0 z-40 h-screen w-64 border-r border-border bg-sidebar shadow-elegant transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-border p-6">
            <div>
              <Link href="/admin/dashboard" className="text-2xl font-bold text-primary">Niella&apos;s FashionHub</Link>
              <p className="mt-1 text-xs text-muted-foreground">Admin Portal</p>
            </div>
            <ThemeToggle />
          </div>
          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4" aria-label="Admin navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${active ? 'bg-primary/10 font-medium text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}><Icon className="size-5" /><span>{item.label}</span></Link>
            })}
          </nav>
          <div className="border-t border-border p-4">
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-destructive transition-colors hover:bg-destructive/10"><LogOut className="size-5" /><span>Logout</span></button>
          </div>
        </div>
      </aside>
      {isOpen && <button type="button" aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-foreground/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
