import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type ContentPageShellProps = {
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
}

export default function ContentPageShell({ eyebrow, title, intro, children }: ContentPageShellProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <header className="max-w-3xl border-b border-border pb-8 sm:pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">{eyebrow}</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{intro}</p>
        </header>
        <div className="mt-10 min-w-0 space-y-8 sm:mt-12 sm:space-y-10">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-elegant sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-foreground text-balance sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{children}</div>
    </section>
  )
}

export function LastUpdated({ date = 'August 29, 2026' }: { date?: string }) {
  return <p className="text-sm font-medium text-muted-foreground">Last updated: {date}</p>
}
