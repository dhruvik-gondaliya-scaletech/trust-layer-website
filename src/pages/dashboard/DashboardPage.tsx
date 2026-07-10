import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Wallet,
  Handshake,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Send,
  FileText,
  UserPlus,
  Bell,
  TrendingUp,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                 */
/* -------------------------------------------------------------------------- */

interface SummaryCard {
  label: string
  value: string
  sub: string
  trend?: string
  trendUp?: boolean
  icon: LucideIcon
  accent: string
  iconBg: string
}

const SUMMARY_CARDS: SummaryCard[] = [
  {
    label: "Wallet Balance",
    value: "$48,250.00",
    sub: "Available to spend",
    trend: "+2.4%",
    trendUp: true,
    icon: Wallet,
    accent: "text-foreground",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    label: "Active Deals",
    value: "12",
    sub: "$126,400 in escrow",
    trend: "+3",
    trendUp: true,
    icon: Handshake,
    accent: "text-foreground",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Pending Payments",
    value: "$9,120.00",
    sub: "4 awaiting release",
    trend: "-1",
    trendUp: false,
    icon: Clock,
    accent: "text-foreground",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Trust Score",
    value: "850",
    sub: "Excellent standing",
    trend: "+15",
    trendUp: true,
    icon: ShieldCheck,
    accent: "text-green-600",
    iconBg: "bg-green-500/10 text-green-600",
  },
]

interface Deal {
  name: string
  counterparty: string
  amount: string
  status: "Active" | "Pending" | "Completed" | "Disputed"
  date: string
}

const RECENT_DEALS: Deal[] = [
  { name: "Website Redesign", counterparty: "Apex Studios", amount: "$12,500", status: "Active", date: "Jul 08" },
  { name: "Q3 Ad Campaign", counterparty: "BrightMedia", amount: "$8,000", status: "Pending", date: "Jul 06" },
  { name: "Mobile App Build", counterparty: "Nova Labs", amount: "$34,000", status: "Active", date: "Jul 02" },
  { name: "Logo & Branding", counterparty: "Pixel Forge", amount: "$3,200", status: "Completed", date: "Jun 28" },
  { name: "SEO Retainer", counterparty: "RankUp Co.", amount: "$2,400", status: "Disputed", date: "Jun 24" },
]

interface Transaction {
  title: string
  meta: string
  amount: string
  incoming: boolean
}

const RECENT_TRANSACTIONS: Transaction[] = [
  { title: "Payment released", meta: "Pixel Forge · Logo & Branding", amount: "+$3,200.00", incoming: true },
  { title: "Escrow funded", meta: "Nova Labs · Mobile App Build", amount: "-$34,000.00", incoming: false },
  { title: "Deposit received", meta: "Bank transfer · ****4021", amount: "+$15,000.00", incoming: true },
  { title: "Withdrawal", meta: "To Chase ****8890", amount: "-$5,000.00", incoming: false },
  { title: "Payment released", meta: "BrightMedia · Q3 Ad Campaign", amount: "+$4,000.00", incoming: true },
]

interface Notification {
  title: string
  time: string
  tone: "info" | "success" | "warning"
}

const NOTIFICATIONS: Notification[] = [
  { title: "Apex Studios accepted your deal terms", time: "10 min ago", tone: "success" },
  { title: "Payment of $9,120 awaiting your release", time: "1 hour ago", tone: "warning" },
  { title: "Your TrustScore increased to 850", time: "3 hours ago", tone: "success" },
  { title: "New dispute opened on SEO Retainer", time: "Yesterday", tone: "warning" },
  { title: "Monthly statement is ready to view", time: "2 days ago", tone: "info" },
]

interface QuickAction {
  label: string
  icon: LucideIcon
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: "New Deal", icon: Plus },
  { label: "Send Payment", icon: Send },
  { label: "Add Funds", icon: Wallet },
  { label: "Create Invoice", icon: FileText },
  { label: "Invite Party", icon: UserPlus },
  { label: "View Reports", icon: TrendingUp },
]

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const STATUS_VARIANTS: Record<Deal["status"], string> = {
  Active: "bg-green-500/10 text-green-600 border-transparent hover:bg-green-500/10",
  Pending: "bg-amber-500/10 text-amber-600 border-transparent hover:bg-amber-500/10",
  Completed: "bg-blue-500/10 text-blue-600 border-transparent hover:bg-blue-500/10",
  Disputed: "bg-destructive/10 text-destructive border-transparent hover:bg-destructive/10",
}

const NOTIFICATION_DOT: Record<Notification["tone"], string> = {
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Welcome back, Bhavya
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening across your account today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Statements
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Deal
            </Button>
          </div>
        </div>

        {/* Top summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY_CARDS.map((card) => (
            <Card key={card.label} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>
                  {card.trend && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                        card.trendUp ? "text-green-600" : "text-destructive"
                      }`}
                    >
                      {card.trendUp ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownLeft className="h-3 w-3" />
                      )}
                      {card.trend}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className={`mt-1 text-2xl font-bold tracking-tight ${card.accent}`}>
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks, one tap away.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <action.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main grid: deals + transactions/notifications */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Deals — spans two columns on desktop */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg">Recent Deals</CardTitle>
                <CardDescription>Your latest escrow agreements.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Deal</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_DEALS.map((deal) => (
                    <TableRow key={deal.name} className="cursor-pointer">
                      <TableCell className="pl-6">
                        <div className="font-medium">{deal.name}</div>
                        <div className="text-xs text-muted-foreground">{deal.date}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {deal.counterparty}
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_VARIANTS[deal.status]}>
                          {deal.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6 text-right font-medium">
                        {deal.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <CardDescription>Money in and out.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {RECENT_TRANSACTIONS.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-accent"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      tx.incoming
                        ? "bg-green-500/10 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tx.incoming ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{tx.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{tx.meta}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      tx.incoming ? "text-green-600" : "text-foreground"
                    }`}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Stay on top of account activity.</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Mark all read
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {NOTIFICATIONS.map((note, i) => (
              <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-muted">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${NOTIFICATION_DOT[note.tone]}`}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">{note.title}</p>
                  <p className="text-xs text-muted-foreground">{note.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
