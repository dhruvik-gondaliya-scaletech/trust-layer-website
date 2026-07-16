import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_DISPUTES = [
  {
    id: "DSP-1024",
    productImage: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=200&auto=format&fit=crop",
    productName: "Pokemon PSA 10 Charizard",
    buyer: "AlexChen",
    seller: "VaultCollectibles",
    reason: "Missing Item",
    status: "Waiting",
    date: "July 15, 2026",
    trustScoreImpact: -15,
  },
  {
    id: "DSP-0982",
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&auto=format&fit=crop",
    productName: "MacBook Pro M3 Max",
    buyer: "TechStart",
    seller: "You",
    reason: "Wrong Description",
    status: "Escalated",
    date: "July 12, 2026",
    trustScoreImpact: -30,
  }
]

function getStatusStyle(status: string) {
  switch (status) {
    case "Waiting": return "bg-amber-100 text-amber-700 hover:bg-amber-100"
    case "Responded": return "bg-blue-100 text-blue-700 hover:bg-blue-100"
    case "Escalated": return "bg-red-100 text-red-700 hover:bg-red-100"
    case "Resolved": return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
    default: return "bg-slate-100 text-slate-700 hover:bg-slate-100"
  }
}

export function DisputesPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Open Disputes</h1>
        <p className="text-muted-foreground">Manage and resolve active disputes.</p>
        
        <div className="mt-2 space-y-4">
          {MOCK_DISPUTES.map((dispute) => (
            <div key={dispute.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              
              {/* Left: Image */}
              <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 rounded-lg overflow-hidden border bg-muted">
                <img src={dispute.productImage} alt={dispute.productName} className="h-full w-full object-cover" />
              </div>

              {/* Middle: Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{dispute.productName}</h3>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{dispute.id}</p>
                    </div>
                    <Badge className={`${getStatusStyle(dispute.status)} border-none text-xs font-semibold px-2.5 py-0.5`}>
                      {dispute.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium">Buyer</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{dispute.buyer}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Seller</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{dispute.seller}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Reason</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{dispute.reason}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Submitted</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{dispute.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col justify-between items-start md:items-end md:border-l pl-0 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0 shrink-0">
                <div className="text-left md:text-right w-full md:w-auto">
                  <p className="text-sm font-medium text-slate-500">Trust Score Impact</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{dispute.trustScoreImpact} pts</p>
                </div>
                <Button className="w-full md:w-auto mt-4 md:mt-0">Review Dispute</Button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
