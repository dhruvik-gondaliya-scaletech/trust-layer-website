import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  type Transaction,
  STATUS_STYLES,
  formatCurrency,
  signedAmount,
} from "../data"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Lock,
  RotateCcw,
  Wallet,
} from "lucide-react"

interface TransactionDetailsProps {
  transaction: Transaction | null
  onOpenChange: (open: boolean) => void
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      <div className="divide-y rounded-lg border bg-muted/20 px-4">{children}</div>
    </div>
  )
}

export function TransactionDetails({ transaction, onOpenChange }: TransactionDetailsProps) {
  const tx = transaction

  return (
    <Dialog open={!!tx} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {tx && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Transaction Details
              </DialogTitle>
            </DialogHeader>

            {/* Amount hero */}
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-muted/30 py-6">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  tx.direction === "in"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tx.direction === "in" ? (
                  <ArrowDownLeft className="h-5 w-5" />
                ) : (
                  <ArrowUpRight className="h-5 w-5" />
                )}
              </span>
              <p
                className={`text-2xl font-bold tracking-tight ${
                  tx.direction === "in" ? "text-green-600" : "text-foreground"
                }`}
              >
                {signedAmount(tx)}
              </p>
              <Badge className={STATUS_STYLES[tx.status]}>{tx.status}</Badge>
            </div>

            <div className="max-h-[45vh] space-y-4 overflow-y-auto pr-1">
              {/* Payment Details */}
              <Section title="Payment Details">
                <Row label="Transaction ID" value={tx.id} />
                <Row label="Type" value={tx.type} />
                <Row label="Description" value={tx.description} />
                <Row label="Counterparty" value={tx.counterparty} />
                <Row label="Method" value={tx.method} />
                <Row label="Reference" value={tx.reference} />
                <Row label="Date" value={tx.displayDate} />
                {tx.dealId && <Row label="Linked deal" value={tx.dealId} />}
                <Row label="Fee" value={formatCurrency(tx.fee)} />
              </Section>

              {/* Escrow — only for escrow / in-escrow */}
              {(tx.type === "Escrow" || tx.status === "In Escrow") && (
                <Section title="Escrow">
                  <Row
                    label="Held amount"
                    value={
                      <span className="inline-flex items-center gap-1 text-blue-600">
                        <Lock className="h-3.5 w-3.5" />
                        {formatCurrency(tx.amount)}
                      </span>
                    }
                  />
                  <Row label="Release date" value={tx.escrowReleaseDate ?? "On approval"} />
                  <Row label="Protection" value="Buyer & seller protected" />
                </Section>
              )}

              {/* Wallet Activity — only for wallet type */}
              {tx.type === "Wallet" && (
                <Section title="Wallet Activity">
                  <Row
                    label="Movement"
                    value={
                      <span className="inline-flex items-center gap-1">
                        <Wallet className="h-3.5 w-3.5" />
                        {tx.direction === "in" ? "Credit" : "Debit"}
                      </span>
                    }
                  />
                  {tx.walletBalanceAfter !== undefined && (
                    <Row
                      label="Balance after"
                      value={formatCurrency(tx.walletBalanceAfter)}
                    />
                  )}
                </Section>
              )}

              {/* Refunds — only for refund type */}
              {tx.type === "Refund" && (
                <Section title="Refund">
                  <Row
                    label="Refunded"
                    value={
                      <span className="inline-flex items-center gap-1 text-purple-600">
                        <RotateCcw className="h-3.5 w-3.5" />
                        {formatCurrency(tx.amount)}
                      </span>
                    }
                  />
                  {tx.originalTxId && <Row label="Original txn" value={tx.originalTxId} />}
                  {tx.refundReason && (
                    <div className="py-2.5 text-sm">
                      <p className="mb-1 text-muted-foreground">Reason</p>
                      <p className="text-foreground">{tx.refundReason}</p>
                    </div>
                  )}
                </Section>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download receipt
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
