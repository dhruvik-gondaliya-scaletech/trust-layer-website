import { useParams, Link } from "react-router-dom"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/EmptyState"
import {
  getDeal,
  STATUS_STYLES,
  formatCurrency,
  type PaymentMilestone,
  type Review,
} from "@/features/deals/data"
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MessageSquare,
  Upload,
  Flag,
  CheckCircle2,
  Clock,
  CalendarClock,
  Lock,
  Scale,
} from "lucide-react"

const PAYMENT_STATUS_ICON: Record<PaymentMilestone["status"], typeof CheckCircle2> = {
  Released: CheckCircle2,
  "In Escrow": Lock,
  Scheduled: CalendarClock,
}

const PAYMENT_STATUS_COLOR: Record<PaymentMilestone["status"], string> = {
  Released: "text-green-600",
  "In Escrow": "text-amber-600",
  Scheduled: "text-muted-foreground",
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="flex gap-3 border-b py-4 last:border-0 last:pb-0">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="text-xs">{review.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{review.author}</p>
          <span className="text-xs text-muted-foreground">{review.date}</span>
        </div>
        <Stars rating={review.rating} />
        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
      </div>
    </div>
  )
}

export function DealDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const deal = id ? getDeal(id) : undefined

  if (!deal) {
    return (
      <MainLayout>
        <EmptyState
          title="Deal not found"
          description="This deal may have been removed or the link is incorrect."
          action={{ label: "Back to deals", onClick: () => (window.location.href = "/deals") }}
        />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb / back */}
        <Link
          to="/deals"
          className="inline-flex w-fit items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Deals
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{deal.title}</h1>
              <Badge className={STATUS_STYLES[deal.status]}>{deal.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {deal.id} · {deal.category} · Created {deal.createdAt} · Updated {deal.updatedAt}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button>Manage Deal</Button>
          </div>
        </div>

        {/* Desktop layout: main content + sidebar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="disputes">
                  Disputes
                  {deal.disputes.length > 0 && (
                    <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                      {deal.disputes.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {deal.description}
                    </p>
                    <div className="mt-6">
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">Completion</span>
                        <span className="text-muted-foreground">{deal.progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${deal.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground">Total value</p>
                      <p className="mt-1 text-xl font-bold">{formatCurrency(deal.amount)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground">In escrow</p>
                      <p className="mt-1 text-xl font-bold text-amber-600">
                        {deal.protectedAmount}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground">Released</p>
                      <p className="mt-1 text-xl font-bold text-green-600">
                        {deal.releasedAmount}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Payments */}
              <TabsContent value="payments" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Payment Milestones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {deal.payments.map((p, i) => {
                      const Icon = PAYMENT_STATUS_ICON[p.status]
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-accent"
                        >
                          <span className={`shrink-0 ${PAYMENT_STATUS_COLOR[p.status]}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">{p.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.status} · {p.date}
                            </p>
                          </div>
                          <span className="text-sm font-semibold">{p.amount}</span>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {deal.reviews.length > 0 ? (
                      deal.reviews.map((r, i) => <ReviewItem key={i} review={r} />)
                    ) : (
                      <EmptyState
                        icon={<Star className="h-6 w-6" />}
                        title="No reviews yet"
                        description="Reviews appear once the deal is completed and both parties have rated the experience."
                        className="border-none bg-transparent"
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Disputes */}
              <TabsContent value="disputes" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-lg">Disputes</CardTitle>
                    <Button variant="outline" size="sm">
                      <Flag className="mr-2 h-4 w-4" />
                      Raise dispute
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deal.disputes.length > 0 ? (
                      deal.disputes.map((d, i) => (
                        <div key={i} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Scale className="h-4 w-4 text-destructive" />
                              <p className="font-medium">{d.title}</p>
                            </div>
                            <Badge variant="secondary">{d.status}</Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{d.summary}</p>
                          <p className="mt-3 text-xs text-muted-foreground">
                            Raised by {d.raisedBy} · {d.date}
                          </p>
                        </div>
                      ))
                    ) : (
                      <EmptyState
                        icon={<ShieldCheck className="h-6 w-6" />}
                        title="No disputes"
                        description="This deal is in good standing. If something goes wrong, you can raise a dispute at any time."
                        className="border-none bg-transparent"
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Protected Amount */}
            <Card className="border-green-500/30 bg-green-500/[0.03]">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm font-medium">Protected Amount</span>
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight">{deal.protectedAmount}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Held securely in escrow until milestones are approved.
                </p>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-background/60 px-3 py-2 text-xs">
                  <span className="text-muted-foreground">Released so far</span>
                  <span className="font-semibold text-green-600">{deal.releasedAmount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Score */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Trust Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deal.participants.map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{p.role}</span>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck
                        className={`h-4 w-4 ${
                          p.trustScore >= 750 ? "text-green-600" : "text-amber-600"
                        }`}
                      />
                      <span className="text-sm font-bold">{p.trustScore}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Participants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deal.participants.map((p) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">{p.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  Release payment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload deliverable
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Request extension
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Flag className="mr-2 h-4 w-4" />
                  Raise dispute
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </MainLayout>
  )
}
