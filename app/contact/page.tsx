import { MessageCircle, Music2, Send } from 'lucide-react'
import ContentPageShell, { ContentSection } from '@/components/ContentPageShell'

export const metadata = {
  title: "Contact Us | Niella's FashionHub",
  description: "Connect with Niella's FashionHub on WhatsApp, TikTok, and Snapchat.",
}

const channels = [
  { label: 'WhatsApp', detail: 'Chat with us directly', href: 'https://wa.me/qr/55N25EB2OFFQL1', icon: MessageCircle },
  { label: 'TikTok', detail: 'Follow our latest looks', href: 'https://www.tiktok.com/@niella_fashionhub?_r=1&_t=ZS-99Dd6lxexIz', icon: Music2 },
  { label: 'Snapchat', detail: 'Stay close to the style desk', href: 'https://snapchat.com/t/6bgJt3YN', icon: Send },
]

export default function ContactPage() {
  return (
    <ContentPageShell
      eyebrow="Stay connected"
      title="We would love to hear from you."
      intro="Questions about an item, an order, or your next look? Reach out through your preferred channel and our team will be happy to help."
    >
      <ContentSection title="Choose your channel">
        <div className="grid min-w-0 gap-4 sm:grid-cols-3">
          {channels.map(({ label, detail, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Contact Niella's FashionHub on ${label}`} className="group flex min-w-0 items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary hover:bg-muted sm:flex-col sm:items-start">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon aria-hidden="true" /></span>
              <span className="min-w-0">
                <strong className="block text-base text-foreground">{label}</strong>
                <span className="mt-1 block break-words text-sm text-muted-foreground">{detail}</span>
              </span>
            </a>
          ))}
        </div>
      </ContentSection>
      <ContentSection title="Before you message us">
        <p>For order support, include your order reference and the name used at checkout. For product questions, send the item name or a screenshot so we can assist you quickly.</p>
        <p>We aim to respond as soon as possible during our support hours. Thank you for choosing Niella's FashionHub.</p>
      </ContentSection>
    </ContentPageShell>
  )
}
