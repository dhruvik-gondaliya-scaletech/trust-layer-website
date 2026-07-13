import * as React from "react"
import { Link } from "react-router-dom"
import { motion, animate, useReducedMotion } from "framer-motion"
import {
  Wallet,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Handshake,
  Package,
  Navigation,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Link2,
  Upload,
  AlertTriangle,
  FileText,
  UserPlus,
  BarChart3,
  Banknote,
  Receipt,
  CalendarClock,
  Lock,
  RotateCcw,
  TrendingUp,
  Sparkles,
  Plus,
  CreditCard,
  Truck,
  type LucideIcon,
} from "lucide-react"
import { MainLayout } from "@/components/layout/MainLayout"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/features/deals/data"

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */

const BLUE = "#2F5EFF"
const CARD = "rounded-3xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
const EASE = [0.16, 1, 0.3, 1] as const

/* Count-up number, respects reduced motion. */
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(reduce ? value : 0)

  React.useEffect(() => {
    if (reduce) {
      setN(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setN(v),
    })
    return () => controls.stop()
  }, [value, reduce])

  return (
    <span>
      {prefix}
      {n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

/* Fade-up on mount, respects reduced motion. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  1. Wallet hero                                                            */
/* -------------------------------------------------------------------------- */

function WalletHero() {
  const reduce = useReducedMotion()
  const ei = "easeInOut" as const
  const float = reduce
    ? {}
    : { animate: { y: [0, -10, 0] }, transition: { repeat: Infinity, duration: 6, ease: ei } }
  const floatSlow = reduce
    ? {}
    : { animate: { y: [0, 10, 0] }, transition: { repeat: Infinity, duration: 7, ease: ei } }

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative overflow-hidden rounded-[28px] p-7 text-white shadow-[0_24px_60px_-16px_rgba(47,94,255,0.5)] sm:p-9"
      style={{ backgroundImage: `linear-gradient(135deg, ${BLUE} 0%, #1E3FD6 55%, #4F46E5 100%)` }}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-indigo-300/20 blur-2xl" />

      <div className="relative flex items-center justify-between gap-6">
        {/* Left — balances */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/70">Available Balance</p>
          <p className="mt-2 text-[2.75rem] font-extrabold leading-none tracking-tight sm:text-[3.25rem]">
            <AnimatedNumber value={48250} prefix="$" />
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                <Lock className="h-3.5 w-3.5" /> Funds On Hold
              </p>
              <p className="mt-1 text-lg font-bold tracking-tight">
                <AnimatedNumber value={126400} prefix="$" />
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                <Banknote className="h-3.5 w-3.5" /> Ready To Withdraw
              </p>
              <p className="mt-1 text-lg font-bold tracking-tight">
                <AnimatedNumber value={42180} prefix="$" />
              </p>
            </div>
          </div>

          <button className="group mt-7 flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#1E3FD6] shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5">
            View Wallet
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right — glassmorphism wallet illustration */}
        <div className="relative hidden h-52 w-56 shrink-0 lg:block">
          <motion.div
            {...float}
            className="absolute right-6 top-2 h-32 w-48 rotate-[-10deg] rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="h-6 w-9 rounded-md bg-gradient-to-br from-amber-200 to-yellow-400/80" />
            <div className="mt-6 h-2 w-24 rounded-full bg-white/40" />
            <div className="mt-2 flex items-center justify-between">
              <div className="h-2 w-16 rounded-full bg-white/25" />
              <CreditCard className="h-5 w-5 text-white/70" />
            </div>
          </motion.div>
          <motion.div
            {...floatSlow}
            className="absolute right-0 top-24 h-28 w-44 rotate-[8deg] rounded-2xl border border-white/20 bg-white/[0.07] p-4 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="h-2 w-20 rounded-full bg-white/30" />
              <div className="h-6 w-6 rounded-full bg-white/25" />
            </div>
            <div className="mt-5 h-2 w-28 rounded-full bg-white/20" />
            <div className="mt-2 h-2 w-16 rounded-full bg-white/15" />
          </motion.div>
          <motion.div
            {...float}
            className="absolute -top-1 right-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-md"
          >
            <Wallet className="h-7 w-7 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Quick Actions Required                                                 */
/* -------------------------------------------------------------------------- */

type Tone = "blue" | "amber" | "red"

interface ActionItem {
  title: string
  dealId: string
  status: string
  tone: Tone
  cta: string
  ctaIcon: LucideIcon
  Thumb: () => React.JSX.Element
}

const TONE: Record<Tone, { badge: string; button: string }> = {
  blue: { badge: "bg-[#2F5EFF]/10 text-[#2F5EFF]", button: "bg-[#2F5EFF] text-white hover:brightness-110" },
  amber: { badge: "bg-amber-500/10 text-amber-600", button: "bg-amber-500 text-white hover:brightness-105" },
  red: { badge: "bg-red-500/10 text-red-600", button: "bg-red-500 text-white hover:brightness-105" },
}

const ACTIONS: ActionItem[] = [
  { title: "Shadowless Mewtwo PSA 10", dealId: "DL-2087", status: "LINK READY", tone: "blue", cta: "View Deal", ctaIcon: Link2, Thumb: ThumbGradedCard },
  { title: "Vintage Leica M6 Camera", dealId: "DL-2091", status: "TRACKING REQUIRED", tone: "amber", cta: "Upload Tracking", ctaIcon: Upload, Thumb: ThumbCamera },
  { title: "SEO Retainer — Reported Issue", dealId: "DL-1018", status: "DISPUTE OPEN", tone: "red", cta: "Review Dispute", ctaIcon: AlertTriangle, Thumb: ThumbDispute },
]

function QuickActionsRequired() {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col gap-4">
      {ACTIONS.map((a, i) => {
        const tone = TONE[a.tone]
        return (
          <Reveal key={a.dealId} delay={i * 0.08}>
            <motion.div
              whileHover={reduce ? undefined : { y: -4, scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className={cn(
                CARD,
                "group flex items-center gap-4 p-4 transition-shadow hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] sm:gap-5 sm:p-5",
              )}
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
                  <a.Thumb />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", tone.badge)}>
                  {a.status}
                </span>
                <h4 className="mt-1.5 truncate font-semibold tracking-tight text-slate-900">{a.title}</h4>
                <p className="text-xs text-slate-400">Deal {a.dealId}</p>
              </div>

              <button
                className={cn(
                  "hidden shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 group-hover:gap-3 sm:flex",
                  tone.button,
                )}
              >
                <a.ctaIcon className="h-4 w-4" />
                {a.cta}
              </button>
            </motion.div>
          </Reveal>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Quick Insights (2 x 3)                                                 */
/* -------------------------------------------------------------------------- */

interface Insight {
  label: string
  value: number
  prefix?: string
  delta: string
  up: boolean
  icon: LucideIcon
  tint: string
}

const INSIGHTS: Insight[] = [
  { label: "Active Deals", value: 12, delta: "+3", up: true, icon: Handshake, tint: "bg-[#2F5EFF]/10 text-[#2F5EFF]" },
  { label: "Awaiting Delivery", value: 5, delta: "+1", up: true, icon: Package, tint: "bg-amber-500/10 text-amber-600" },
  { label: "In Transit", value: 3, delta: "+2", up: true, icon: Navigation, tint: "bg-sky-500/10 text-sky-600" },
  { label: "Completed", value: 48, delta: "+5", up: true, icon: CheckCircle2, tint: "bg-emerald-500/10 text-emerald-600" },
  { label: "Trust Score", value: 850, delta: "+15", up: true, icon: ShieldCheck, tint: "bg-violet-500/10 text-violet-600" },
  { label: "Pending Release", value: 9120, prefix: "$", delta: "-1", up: false, icon: Clock, tint: "bg-slate-500/10 text-slate-600" },
]

function QuickInsights() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {INSIGHTS.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.05}>
          <div className={cn(CARD, "flex h-full flex-col gap-4 p-5")}>
            <div className="flex items-center justify-between">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", it.tint)}>
                <it.icon className="h-[18px] w-[18px]" />
              </span>
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-semibold",
                  it.up ? "text-emerald-600" : "text-red-500",
                )}
              >
                {it.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
                {it.delta}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900">
                <AnimatedNumber value={it.value} prefix={it.prefix} />
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{it.label}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Recent deals                                                           */
/* -------------------------------------------------------------------------- */

type TxStatus =
  | "Draft"
  | "Open"
  | "Funded"
  | "Awaiting Shipment"
  | "Shipped"
  | "In Transit"
  | "Delivered"
  | "Awaiting Confirmation"
  | "Completed"
  | "Disputed"
  | "Funds Released"

const STATUS_META: Record<TxStatus, { dot: string; text: string; button: string }> = {
  Draft: { dot: "bg-slate-400", text: "text-slate-600", button: "bg-slate-700 hover:brightness-110" },
  Open: { dot: "bg-sky-500", text: "text-sky-600", button: "bg-sky-500 hover:brightness-105" },
  Funded: { dot: "bg-[#2F5EFF]", text: "text-[#2F5EFF]", button: "bg-[#2F5EFF] hover:brightness-110" },
  "Awaiting Shipment": { dot: "bg-amber-500", text: "text-amber-600", button: "bg-amber-500 hover:brightness-105" },
  Shipped: { dot: "bg-indigo-500", text: "text-indigo-600", button: "bg-indigo-500 hover:brightness-105" },
  "In Transit": { dot: "bg-sky-500", text: "text-sky-600", button: "bg-sky-500 hover:brightness-105" },
  Delivered: { dot: "bg-emerald-500", text: "text-emerald-600", button: "bg-emerald-500 hover:brightness-105" },
  "Awaiting Confirmation": { dot: "bg-amber-500", text: "text-amber-600", button: "bg-amber-500 hover:brightness-105" },
  Completed: { dot: "bg-emerald-500", text: "text-emerald-600", button: "bg-emerald-500 hover:brightness-105" },
  Disputed: { dot: "bg-red-500", text: "text-red-600", button: "bg-red-500 hover:brightness-105" },
  "Funds Released": { dot: "bg-emerald-500", text: "text-emerald-600", button: "bg-emerald-500 hover:brightness-105" },
}

interface Transaction {
  id: string
  product: string
  role: "Buyer" | "Seller"
  status: TxStatus
  amount: number
  trust: number
  updated: string
  action: string
  actionIcon: LucideIcon
  Thumb: () => React.JSX.Element
}

const TRANSACTIONS: Transaction[] = [
  { id: "TRUST-0845", product: "Shadowless Mewtwo PSA 10", role: "Buyer", status: "Funded", amount: 4300, trust: 812, updated: "2 hours ago", action: "View Deal", actionIcon: ArrowRight, Thumb: ThumbMewtwo },
  { id: "TRUST-1024", product: "Vintage Leica M6 Camera", role: "Seller", status: "Awaiting Shipment", amount: 2400, trust: 774, updated: "5 hours ago", action: "Upload Tracking", actionIcon: Upload, Thumb: ThumbLeica },
  { id: "TRUST-1088", product: "Charizard Holo 1999 Base Set", role: "Buyer", status: "Delivered", amount: 7850, trust: 905, updated: "1 day ago", action: "Confirm Delivery", actionIcon: CheckCircle2, Thumb: ThumbCharizard },
  { id: "TRUST-1127", product: "Rolex Submariner 16610", role: "Seller", status: "Disputed", amount: 9900, trust: 631, updated: "3 hours ago", action: "Review Dispute", actionIcon: AlertTriangle, Thumb: ThumbRolex },
]

function TransactionCard({ tx, index }: { tx: Transaction; index: number }) {
  const reduce = useReducedMotion()
  const meta = STATUS_META[tx.status]

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <motion.div
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: 0.2 }}
        className={cn(
          CARD,
          "group flex h-full flex-col overflow-hidden ring-1 ring-transparent transition-all duration-200 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)] hover:ring-[#2F5EFF]/40",
        )}
      >
        {/* Product thumbnail */}
        <div className="relative h-36 overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
            <tx.Thumb />
          </div>
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 backdrop-blur">
            <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
            <span className={meta.text}>{tx.status}</span>
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                tx.role === "Buyer" ? "bg-[#2F5EFF]/10 text-[#2F5EFF]" : "bg-violet-500/10 text-violet-600",
              )}
            >
              {tx.role}
            </span>
            <span className="text-xs font-medium text-slate-400">{tx.id}</span>
          </div>

          <h4 className="mt-2 truncate font-semibold tracking-tight text-slate-900">{tx.product}</h4>

          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              {tx.role === "Buyer" ? "Seller" : "Buyer"} trust {tx.trust}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {tx.updated}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Amount</p>
              <p className="text-xl font-bold tracking-tight text-slate-900">{formatCurrency(tx.amount)}</p>
            </div>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold text-white transition-all duration-200 group-hover:gap-2",
                meta.button,
              )}
            >
              <tx.actionIcon className="h-4 w-4" />
              {tx.action}
            </button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function RecentDeals() {
  return (
    <section>
      <SectionHeading
        title="Recent Deals"
        subtitle="Your latest escrow transactions"
        action={
          <Link to="/deals" className="flex items-center gap-1 text-sm font-medium text-[#2F5EFF] hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {TRANSACTIONS.map((tx, i) => (
          <TransactionCard key={tx.id} tx={tx} index={i} />
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  7. Quick actions (six square cards)                                       */
/* -------------------------------------------------------------------------- */

const QUICK_ACTIONS: { label: string; icon: LucideIcon; tint: string }[] = [
  { label: "New Deal", icon: Plus, tint: "bg-[#2F5EFF]/10 text-[#2F5EFF]" },
  { label: "Deposit", icon: ArrowDownLeft, tint: "bg-emerald-500/10 text-emerald-600" },
  { label: "Withdraw", icon: ArrowUpRight, tint: "bg-sky-500/10 text-sky-600" },
  { label: "Invite Party", icon: UserPlus, tint: "bg-violet-500/10 text-violet-600" },
  { label: "Statements", icon: FileText, tint: "bg-slate-500/10 text-slate-600" },
  { label: "Reports", icon: BarChart3, tint: "bg-amber-500/10 text-amber-600" },
]

function QuickActions() {
  const reduce = useReducedMotion()
  return (
    <section>
      <SectionHeading title="Quick Actions" subtitle="One tap to your next move" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map((a, i) => (
          <Reveal key={a.label} delay={i * 0.05}>
            <motion.button
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.2 }}
              className={cn(
                CARD,
                "flex aspect-square w-full flex-col items-center justify-center gap-3 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]",
              )}
            >
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", a.tint)}>
                <a.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-slate-800">{a.label}</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  5. Recent activity (timeline)                                             */
/* -------------------------------------------------------------------------- */

interface Activity {
  title: string
  meta: string
  time: string
  amount?: string
  icon: LucideIcon
  tint: string
}

const ACTIVITY: Activity[] = [
  { title: "Funds Released", meta: "Pixel Forge · Logo & Branding", time: "2 minutes ago", amount: "+$4,300", icon: Banknote, tint: "bg-emerald-500/10 text-emerald-600" },
  { title: "Tracking Uploaded", meta: "Seller · Nova Labs", time: "15 minutes ago", icon: Truck, tint: "bg-sky-500/10 text-sky-600" },
  { title: "Buyer Funded", meta: "Apex Studios · Website Redesign", time: "1 hour ago", amount: "+$12,500", icon: ArrowDownLeft, tint: "bg-[#2F5EFF]/10 text-[#2F5EFF]" },
  { title: "Trust Score Increased", meta: "Now 850 · Excellent", time: "Yesterday", amount: "+15", icon: TrendingUp, tint: "bg-violet-500/10 text-violet-600" },
  { title: "Refund Completed", meta: "RankUp Co. · SEO Retainer", time: "Yesterday", amount: "−$800", icon: RotateCcw, tint: "bg-slate-500/10 text-slate-600" },
]

function RecentActivity() {
  const reduce = useReducedMotion()
  return (
    <div className={cn(CARD, "p-6")}>
      <h3 className="font-semibold tracking-tight text-slate-900">Recent Activity</h3>
      <div className="relative mt-5">
        <span className="absolute bottom-3 left-[18px] top-3 w-px bg-slate-200" />
        <ul className="space-y-5">
          {ACTIVITY.map((a, i) => (
            <motion.li
              key={a.title}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
              className="relative flex items-start gap-3.5"
            >
              <span className={cn("relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white", a.tint)}>
                <a.icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-800">{a.title}</p>
                  {a.amount && (
                    <span className={cn("shrink-0 text-sm font-bold", a.amount.startsWith("−") ? "text-slate-500" : "text-emerald-600")}>
                      {a.amount}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-slate-500">{a.meta}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{a.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  6. Wallet snapshot                                                        */
/* -------------------------------------------------------------------------- */

const SNAPSHOT: { label: string; value: string; icon: LucideIcon; tint: string }[] = [
  { label: "Ready To Withdraw", value: "$42,180", icon: Banknote, tint: "bg-emerald-500/10 text-emerald-600" },
  { label: "Funds On Hold", value: "$126,400", icon: Lock, tint: "bg-amber-500/10 text-amber-600" },
  { label: "Upcoming Releases", value: "$18,900", icon: CalendarClock, tint: "bg-[#2F5EFF]/10 text-[#2F5EFF]" },
  { label: "Platform Fees", value: "$312.50", icon: Receipt, tint: "bg-slate-500/10 text-slate-600" },
]

function WalletSnapshot() {
  return (
    <div className={cn(CARD, "p-6")}>
      <h3 className="font-semibold tracking-tight text-slate-900">Wallet Snapshot</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {SNAPSHOT.map((s) => (
          <div key={s.label} className="rounded-2xl bg-slate-50 p-3.5">
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", s.tint)}>
              <s.icon className="h-4 w-4" />
            </span>
            <p className="mt-2.5 text-base font-bold tracking-tight text-slate-900">{s.value}</p>
            <p className="text-[11px] font-medium leading-tight text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Trust score card                                                          */
/* -------------------------------------------------------------------------- */

function TrustScoreCard() {
  const reduce = useReducedMotion()
  const score = 850
  const max = 900
  const pct = score / max
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const dash = circumference * pct

  return (
    <div className={cn(CARD, "p-6")}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold tracking-tight text-slate-900">Trust Score</h3>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600">
          <Sparkles className="h-3 w-3" /> Excellent
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#EEF2F7" strokeWidth="11" />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="url(#tsGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={reduce ? { strokeDashoffset: circumference - dash } : { strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
            <defs>
              <linearGradient id="tsGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={BLUE} />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900">
              <AnimatedNumber value={score} />
            </span>
            <span className="text-xs font-medium text-slate-400">of {max}</span>
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-700">Excellent Standing</p>
        <p className="text-xs text-slate-500">Faster releases · lower fees</p>
      </div>

      <button className="group mt-5 flex w-full items-center justify-center gap-1 rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
        View Breakdown
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Floating "Create Deal" button — signature interaction                     */
/* -------------------------------------------------------------------------- */

function FloatingActionButton() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: EASE }}
      className="group fixed bottom-6 right-6 z-50"
    >
      {/* Breathing glow */}
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: BLUE }}
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      )}
      {/* Rotating dotted ring */}
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute -inset-2 rounded-full border-2 border-dashed"
          style={{ borderColor: "rgba(47,94,255,0.45)" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      )}

      <motion.button
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className="relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-4 font-semibold text-white shadow-[0_14px_34px_-6px_rgba(47,94,255,0.65)] transition-shadow duration-300 group-hover:shadow-[0_20px_46px_-6px_rgba(47,94,255,0.8)]"
        style={{ backgroundImage: `linear-gradient(135deg, ${BLUE}, #4F46E5)` }}
      >
        {/* Gradient shimmer sweep */}
        {!reduce && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        )}
        <Plus className="relative h-5 w-5" />
        <span className="relative hidden sm:inline">New Deal</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export function DashboardPage() {
  return (
    <MainLayout className="bg-slate-50" mainClassName="py-8 pb-28 lg:py-10">
      <Reveal className="mb-8">
        <p className="text-sm font-medium text-slate-400">Welcome back</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          Good to see you, Bhavya
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Main column (~70%) */}
        <div className="flex flex-col gap-10 lg:col-span-8">
          {/* 1. Wallet */}
          <WalletHero />

          {/* 2. Quick Actions Required */}
          <section>
            <SectionHeading title="Action Required" subtitle="These deals need your attention" />
            <QuickActionsRequired />
          </section>

          {/* 3. Quick Insights */}
          <section>
            <SectionHeading title="Quick Insights" subtitle="A snapshot of your activity" />
            <QuickInsights />
          </section>

          {/* 4. Recent Deals */}
          <RecentDeals />

          {/* 7. Quick Actions */}
          <QuickActions />
        </div>

        {/* Sidebar (~30%) — sticky */}
        <aside className="lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            {/* 5. Recent Activity */}
            <RecentActivity />
            {/* 6. Wallet Snapshot */}
            <WalletSnapshot />
            {/* Trust Score */}
            <TrustScoreCard />
          </div>
        </aside>
      </div>

      <FloatingActionButton />
    </MainLayout>
  )
}

/* -------------------------------------------------------------------------- */
/*  Inline SVG product thumbnails (no external assets)                        */
/* -------------------------------------------------------------------------- */

function ThumbGradedCard() {
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="gcBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef2ff" />
          <stop offset="1" stopColor="#ede9fe" />
        </linearGradient>
        <linearGradient id="gcArt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#gcBg)" />
      <g transform="rotate(-7 60 60)">
        <rect x="34" y="12" width="52" height="96" rx="7" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <rect x="39" y="18" width="42" height="9" rx="3" fill="#1e293b" />
        <rect x="39" y="32" width="42" height="46" rx="4" fill="url(#gcArt)" />
        <circle cx="60" cy="53" r="13" fill="#f5d0fe" opacity="0.85" />
        <path d="M53 57 q7 -12 14 0 q-7 7 -14 0Z" fill="#7c3aed" />
        <rect x="39" y="84" width="32" height="4" rx="2" fill="#cbd5e1" />
        <rect x="39" y="92" width="22" height="4" rx="2" fill="#e2e8f0" />
      </g>
    </svg>
  )
}

function ThumbCamera() {
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="tcBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffbeb" />
          <stop offset="1" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="tcBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#475569" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="tcLens" cx="0.42" cy="0.38" r="0.65">
          <stop offset="0" stopColor="#94a3b8" />
          <stop offset="0.6" stopColor="#334155" />
          <stop offset="1" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      <rect width="120" height="120" fill="url(#tcBg)" />
      <ellipse cx="60" cy="98" rx="42" ry="6" fill="#1e293b" opacity="0.12" />
      <rect x="45" y="28" width="30" height="11" rx="4" fill="#334155" />
      <rect x="22" y="38" width="76" height="46" rx="10" fill="url(#tcBody)" />
      <rect x="80" y="45" width="14" height="5" rx="2.5" fill="#ef4444" />
      <circle cx="58" cy="62" r="19" fill="#0f172a" />
      <circle cx="58" cy="62" r="14" fill="url(#tcLens)" />
      <circle cx="58" cy="62" r="6" fill="#0b1220" />
      <circle cx="52" cy="56" r="3.5" fill="#e2e8f0" opacity="0.7" />
      <rect x="28" y="45" width="12" height="8" rx="2" fill="#f8fafc" opacity="0.85" />
    </svg>
  )
}

function ThumbDispute() {
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="tdBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef2f2" />
          <stop offset="1" stopColor="#ffe4e6" />
        </linearGradient>
        <linearGradient id="tdTri" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#tdBg)" />
      <ellipse cx="60" cy="100" rx="40" ry="6" fill="#7f1d1d" opacity="0.12" />
      <rect x="66" y="26" width="42" height="30" rx="8" fill="#fff" stroke="#fecaca" strokeWidth="2" />
      <rect x="73" y="35" width="24" height="3.5" rx="2" fill="#fca5a5" />
      <rect x="73" y="43" width="16" height="3.5" rx="2" fill="#fecaca" />
      <path d="M78 56 l-6 8 l11 -3Z" fill="#fff" />
      <path d="M40 34 L74 92 H6 Z" fill="url(#tdTri)" />
      <rect x="36" y="50" width="8" height="22" rx="4" fill="#fff" />
      <circle cx="40" cy="82" r="4.5" fill="#fff" />
    </svg>
  )
}

/* --- Recent-deal product covers (wide 240x130, center-safe) --- */

function ThumbMewtwo() {
  return (
    <svg viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="webBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eff6ff" />
          <stop offset="1" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="webHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2F5EFF" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#webBg)" />
      <rect x="44" y="26" width="152" height="90" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <path d="M44 40 h152" stroke="#eef2f7" strokeWidth="1.5" />
      <circle cx="56" cy="33" r="3" fill="#f87171" />
      <circle cx="66" cy="33" r="3" fill="#fbbf24" />
      <circle cx="76" cy="33" r="3" fill="#34d399" />
      <rect x="56" y="50" width="60" height="42" rx="6" fill="url(#webHero)" />
      <rect x="126" y="52" width="58" height="6" rx="3" fill="#cbd5e1" />
      <rect x="126" y="64" width="46" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="126" y="74" width="52" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="126" y="86" width="34" height="10" rx="5" fill="#2F5EFF" />
      <rect x="56" y="98" width="128" height="5" rx="2.5" fill="#eef2f7" />
    </svg>
  )
}

function ThumbLeica() {
  return (
    <svg viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="adBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffbeb" />
          <stop offset="1" stopColor="#ffedd5" />
        </linearGradient>
        <linearGradient id="adHorn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#adBg)" />
      <ellipse cx="120" cy="108" rx="70" ry="7" fill="#7c2d12" opacity="0.1" />
      {/* megaphone */}
      <rect x="70" y="56" width="16" height="24" rx="4" fill="#334155" />
      <path d="M86 52 L128 36 L128 100 L86 84 Z" fill="url(#adHorn)" />
      <rect x="122" y="34" width="10" height="68" rx="5" fill="#c2410c" />
      <rect x="100" y="98" width="8" height="16" rx="3" fill="#334155" />
      {/* sound waves */}
      <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M142 52 q10 16 0 32" />
        <path d="M154 44 q18 24 0 48" />
        <path d="M166 36 q26 32 0 64" />
      </g>
    </svg>
  )
}

function ThumbCharizard() {
  return (
    <svg viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="mobBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef2ff" />
          <stop offset="1" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="mobHead" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2F5EFF" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#mobBg)" />
      <rect x="98" y="14" width="60" height="112" rx="14" fill="#1e293b" />
      <rect x="103" y="20" width="50" height="100" rx="9" fill="#fff" />
      <rect x="118" y="24" width="20" height="4" rx="2" fill="#1e293b" />
      <rect x="103" y="32" width="50" height="26" rx="0" fill="url(#mobHead)" />
      <rect x="110" y="40" width="26" height="4" rx="2" fill="#fff" opacity="0.9" />
      <rect x="110" y="48" width="18" height="3" rx="1.5" fill="#fff" opacity="0.6" />
      <rect x="110" y="64" width="36" height="12" rx="4" fill="#eef2f7" />
      <rect x="110" y="80" width="36" height="12" rx="4" fill="#eef2f7" />
      <circle cx="116" cy="110" r="3" fill="#2F5EFF" />
      <circle cx="128" cy="110" r="3" fill="#cbd5e1" />
      <circle cx="140" cy="110" r="3" fill="#cbd5e1" />
    </svg>
  )
}

function ThumbRolex() {
  return (
    <svg viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="lgBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#faf5ff" />
          <stop offset="1" stopColor="#fae8ff" />
        </linearGradient>
        <linearGradient id="lgMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#lgBg)" />
      <circle cx="104" cy="58" r="30" fill="url(#lgMark)" />
      <rect x="112" y="42" width="40" height="40" rx="14" fill="#fff" opacity="0.75" />
      <circle cx="104" cy="58" r="9" fill="#fff" />
      {/* swatches */}
      <rect x="80" y="98" width="16" height="16" rx="4" fill="#2F5EFF" />
      <rect x="100" y="98" width="16" height="16" rx="4" fill="#a855f7" />
      <rect x="120" y="98" width="16" height="16" rx="4" fill="#ec4899" />
      <rect x="140" y="98" width="16" height="16" rx="4" fill="#f59e0b" />
    </svg>
  )
}
