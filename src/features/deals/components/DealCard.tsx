import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ShieldCheck, Clock, Package } from "lucide-react"
import { type Deal, formatCurrency } from "../data"
import { cn } from "@/lib/utils"

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Link to={`/deals/${deal.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/40">
        
        {/* Product thumbnail placeholder */}
        <div className="relative h-36 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
          <Package className="h-12 w-12 text-slate-300 transition-transform duration-500 group-hover:scale-110" />
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 backdrop-blur">
            <span className={cn("h-1.5 w-1.5 rounded-full", deal.status === "Disputed" ? "bg-red-500" : "bg-emerald-500")} />
            <span className={deal.status === "Disputed" ? "text-red-600" : "text-emerald-700"}>{deal.status}</span>
          </span>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                deal.role === "Buyer" ? "bg-[#2F5EFF]/10 text-[#2F5EFF]" : "bg-violet-500/10 text-violet-600",
              )}
            >
              {deal.role}
            </span>
            <span className="text-xs font-medium text-slate-400">{deal.id}</span>
          </div>

          <h3 className="mt-2 truncate font-semibold tracking-tight text-slate-900">
            {deal.title}
          </h3>

          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              {deal.role === "Buyer" ? "Seller" : "Buyer"} trust {deal.trust}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {deal.updatedAt}
            </span>
          </div>

          <div className="mt-4 flex flex-1 flex-col justify-end border-t border-slate-100 pt-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Amount</p>
                <p className="text-xl font-bold tracking-tight text-slate-900">{formatCurrency(deal.amount)}</p>
              </div>
              <button
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 group-hover:gap-2",
                  deal.status === "Disputed" ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-700 group-hover:bg-[#2F5EFF] group-hover:text-white"
                )}
              >
                {deal.action}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
