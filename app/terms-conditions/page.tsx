import ContentPageShell, { ContentSection, LastUpdated } from '@/components/ContentPageShell'

export const metadata = { title: "Terms & Conditions | Niella's FashionHub", description: "The terms that apply when using Niella's FashionHub store." }

export default function TermsConditionsPage() {
  return (
    <ContentPageShell eyebrow="Please read carefully" title="Terms & Conditions" intro="These terms help create a clear, respectful, and reliable shopping experience for every Niella's FashionHub customer.">
      <LastUpdated />
      <ContentSection title="Using our store"><p>By using this website, you agree to use it lawfully and respectfully. Product descriptions, imagery, availability, and pricing may change as our collections are updated.</p></ContentSection>
      <ContentSection title="Orders and payment"><p>Submitting an order is a request to purchase. Orders are subject to availability and confirmation. You are responsible for providing accurate contact and delivery details and for reviewing your order before submitting it.</p></ContentSection>
      <ContentSection title="Products and availability"><p>We make every effort to present products accurately. Colors may appear differently across screens, and minor variations can occur. If an item becomes unavailable, we will contact you with the next steps.</p></ContentSection>
      <ContentSection title="Intellectual property and changes"><p>Store content, branding, images, and written materials belong to Niella's FashionHub or its respective owners and may not be reused without permission. We may update these terms as the store evolves; the latest version will appear on this page.</p></ContentSection>
      <ContentSection title="Questions"><p>If you have questions about an order or these terms, please visit our Contact Us page and connect with us through WhatsApp or our social channels.</p></ContentSection>
    </ContentPageShell>
  )
}
