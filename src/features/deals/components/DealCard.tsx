import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { type Deal, STATUS_STYLES, formatCurrency } from "../data"

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Link to={`/deals/${deal.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-shadow group-hover:shadow-md group-hover:border-primary/30">
        <CardContent className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant="outline" className="mb-2 text-[11px]">
                {deal.category}
              </Badge>
              <h3 className="font-semibold leading-tight tracking-tight">
                {deal.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {deal.id} · {deal.counterparty}
              </p>
            </div>
            <Badge className={STATUS_STYLES[deal.status]}>{deal.status}</Badge>
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {deal.description}
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{deal.progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${deal.progress}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-lg font-bold tracking-tight">
                {formatCurrency(deal.amount)}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-green-600" />
                {deal.protectedAmount} protected
              </p>
            </div>
            <span className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
