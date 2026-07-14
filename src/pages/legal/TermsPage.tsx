import { LegalLayout } from "@/features/legal/components/LegalLayout"

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="October 24, 2023">
      <section>
        <h2 className="font-bold mb-2">1. Introduction</h2>
        <p>Welcome to TrustLayer. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">2. User Accounts</h2>
        <p>You must register an account to use certain features. You are responsible for maintaining the confidentiality of your account credentials.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">3. Marketplace Rules</h2>
        <p>Users must comply with all local laws and regulations. Fraudulent activity, misrepresentation, and prohibited items are strictly forbidden.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">4. Payments and Funds on Hold</h2>
        <p>TrustLayer holds funds securely on hold until both parties confirm the transaction is complete to the agreed specifications.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">5. Liability</h2>
        <p>TrustLayer acts as a facilitator and is not liable for disputes arising outside the scope of our secure hold protection policies.</p>
      </section>
    </LegalLayout>
  )
}
