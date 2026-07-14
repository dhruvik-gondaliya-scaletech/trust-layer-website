import { LegalLayout } from "@/features/legal/components/LegalLayout"

export function PlatformTermsPage() {
  return (
    <LegalLayout title="Platform Terms" lastUpdated="October 24, 2023">
      <section>
        <h2 className="font-bold mb-2">1. Platform Guidelines</h2>
        <p>The TrustLayer platform provides secure escrow and transaction management services. By using our platform, you agree to follow our established guidelines and procedures for all transactions.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">2. Verification Requirements</h2>
        <p>All users must complete identity verification and bank account linking before initiating or accepting transactions above certain thresholds.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">3. Dispute Resolution</h2>
        <p>In the event of a dispute, funds will remain safely in escrow until a mutual resolution is reached or the TrustLayer arbitration team makes a final decision.</p>
      </section>

      <section>
        <h2 className="font-bold mb-2">4. Fees</h2>
        <p>TrustLayer charges a nominal fee for its escrow services. These fees are clearly displayed before a transaction is finalized and are deducted directly from the transaction amount.</p>
      </section>
    </LegalLayout>
  )
}
