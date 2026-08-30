import ContentPageShell, { ContentSection } from '@/components/ContentPageShell'

export const metadata = {
  title: "About Us | Niella's FashionHub",
  description: "Discover the story, values, and style behind Niella's FashionHub.",
}

export default function AboutPage() {
  return (
    <ContentPageShell
      eyebrow="Our story"
      title="Style that feels like you."
      intro="Niella's FashionHub is a curated destination for expressive fashion, thoughtful beauty, and beautiful details for everyday living."
    >
      <ContentSection title="Fashion for every version of you">
        <p>We believe getting dressed should feel exciting, personal, and easy. Our collections bring together statement pieces and everyday essentials so you can discover looks that fit your mood, your moment, and your life.</p>
        <p>From a first impression to a quiet day at home, we choose pieces that help you look good, feel good, and be you.</p>
      </ContentSection>
      <div className="grid min-w-0 gap-5 sm:grid-cols-3">
        {[
          ['Curated', 'Thoughtfully selected pieces with personality and purpose.'],
          ['Confident', 'Style inspiration that celebrates individuality, not rules.'],
          ['Close', 'A warm, responsive shopping experience from discovery to delivery.'],
        ].map(([title, text]) => (
          <article key={title} className="min-w-0 rounded-2xl bg-muted p-5 sm:p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </ContentPageShell>
  )
}
