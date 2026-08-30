import ContentPageShell, { ContentSection, LastUpdated } from '@/components/ContentPageShell'

export const metadata = { title: "Privacy Policy | Niella's FashionHub", description: "How Niella's FashionHub handles information shared through our store." }

export default function PrivacyPolicyPage() {
  return (
    <ContentPageShell eyebrow="Your privacy matters" title="Privacy Policy" intro="This policy explains what information we collect, why we use it, and the choices available to you when you shop with Niella's FashionHub.">
      <LastUpdated />
      <ContentSection title="Information we collect"><p>We may collect details you provide when you place an order, contact us, or interact with our store, including your name, contact details, delivery information, and order details.</p></ContentSection>
      <ContentSection title="How we use information"><p>We use information to process and deliver orders, respond to questions, provide customer support, improve our products and website, and help protect our store from misuse.</p></ContentSection>
      <ContentSection title="Sharing and security"><p>We share information only with service providers who help us operate the store, such as delivery and payment partners, or when required by law. We take reasonable measures to protect information, but no online service can guarantee absolute security.</p></ContentSection>
      <ContentSection title="Your choices"><p>You may contact us to ask about the personal information we hold about you, request a correction, or ask questions about this policy. Some information may need to be retained to complete legal, accounting, or order obligations.</p></ContentSection>
    </ContentPageShell>
  )
}
