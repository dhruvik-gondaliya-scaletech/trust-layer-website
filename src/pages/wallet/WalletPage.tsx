import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, ArrowRight } from "lucide-react"

const MOCK_TX = [
  {
    id: "TX-9921",
    description: "Withdrawal to Chase Bank ****1234",
    date: "July 15, 2026",
    amount: "-$12,400.00",
    status: "Processing",
    direction: "out"
  },
  {
    id: "TX-9920",
    description: "Deal Funded: Pokemon PSA 10",
    date: "July 14, 2026",
    amount: "+$4,300.00",
    status: "Completed",
    direction: "in"
  }
]

export function WalletPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and withdraw to your bank account.</p>
        
        {/* Wallet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <p className="text-sm font-medium text-slate-500">Total Balance</p>
            <p className="text-3xl font-bold mt-2">$48,250.00</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <p className="text-sm font-medium text-slate-500">Funds on Hold</p>
            <p className="text-3xl font-bold mt-2">$12,400.00</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="text-3xl font-bold mt-2">$0.00</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Withdrawable</p>
              <p className="text-3xl font-bold mt-2 text-emerald-600">$35,850.00</p>
            </div>
            <Button className="mt-4 w-full h-11 text-base">Withdraw</Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
            <Button variant="ghost" className="text-primary">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="space-y-4">
            {MOCK_TX.map((tx) => (
              <div
                key={tx.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer hover:border-primary/50 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    tx.direction === "in"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {tx.direction === "in" ? (
                      <ArrowDownLeft className="h-6 w-6" />
                    ) : (
                      <ArrowUpRight className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">{tx.description}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{tx.status}</span>
                      <span>•</span>
                      <span className="font-mono text-xs">{tx.id}</span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold text-lg sm:text-right ${
                  tx.direction === "in" ? "text-emerald-600" : "text-slate-900"
                }`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  )
}
