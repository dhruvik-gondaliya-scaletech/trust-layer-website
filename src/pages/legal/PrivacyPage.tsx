import { LegalLayout } from "@/features/legal/components/LegalLayout"

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="October 24, 2023">
      <section>
        <h2 className="font-bold mb-2">1. Information We Collect</h2>
        <p>We collect personal information such as name, email, and payment details when you register and use the marketplace.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">2. How We Use Information</h2>
        <p>We use your information to facilitate secure transactions, verify identity, and improve the overall platform experience.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">3. Data Sharing</h2>
        <p>We do not sell your personal data. We may share necessary details with payment processors and identity verification partners to fulfill services.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">4. Security</h2>
        <p>We implement industry-standard security measures to protect your data, but no method of transmission over the internet is 100% secure.</p>
      </section>
    </LegalLayout>
  )
}
