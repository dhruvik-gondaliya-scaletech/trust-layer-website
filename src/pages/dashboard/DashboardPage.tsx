import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Handshake,
  Package,
  AlertCircle,
  Plus,
  ChevronRight,
  Lock,
  Banknote,
  CreditCard,
  Wallet
} from "lucide-react"
import { MainLayout } from "@/components/layout/MainLayout"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */

const BLUE = "#2F5EFF"
const CARD = "rounded-3xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
const EASE = [0.16, 1, 0.3, 1] as const

/* -------------------------------------------------------------------------- */
/*  1. Wallet Hero                                                            */
/* -------------------------------------------------------------------------- */

function WalletHero({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white shadow-lg",
        viewMode === "seller" ? "bg-[#2F5EFF]" : "bg-[#2F5EFF]"
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${BLUE} 0%, #1E3FD6 55%, #4F46E5 100%)` }}
    >
      <div className="relative flex items-center justify-between gap-6 z-10">
        {/* Left — balances */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/80">Available Balance</p>
          <p className="mt-1 text-[2.75rem] sm:text-[3.5rem] font-extrabold leading-none tracking-tight">
            $48,250
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Lock className="h-3.5 w-3.5" /> Funds On Hold
              </p>
              <p className="mt-1 text-base sm:text-lg font-bold tracking-tight">
                $126,400
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Banknote className="h-3.5 w-3.5" /> Ready To Withdraw
              </p>
              <p className="mt-1 text-base sm:text-lg font-bold tracking-tight">
                $42,180
              </p>
            </div>
          </div>

          <button className="group mt-7 flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#1E3FD6] shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5">
            View Wallet
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right — glassmorphism wallet illustration (decorative, 30% opacity) */}
        <div className="relative hidden h-52 w-56 shrink-0 lg:block opacity-30 pointer-events-none">
          <div className="absolute right-6 top-2 h-32 w-48 rotate-[-10deg] rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-md">
            <div className="h-6 w-9 rounded-md bg-gradient-to-br from-amber-200 to-yellow-400/80" />
            <div className="mt-6 h-2 w-24 rounded-full bg-white/40" />
            <div className="mt-2 flex items-center justify-between">
              <div className="h-2 w-16 rounded-full bg-white/25" />
              <CreditCard className="h-5 w-5 text-white/70" />
            </div>
          </div>
          <div className="absolute right-0 top-24 h-28 w-44 rotate-[8deg] rounded-2xl border border-white/20 bg-white/[0.07] p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="h-2 w-20 rounded-full bg-white/30" />
              <div className="h-6 w-6 rounded-full bg-white/25" />
            </div>
            <div className="mt-5 h-2 w-28 rounded-full bg-white/20" />
            <div className="mt-2 h-2 w-16 rounded-full bg-white/15" />
          </div>
          <div className="absolute -top-1 right-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-md">
            <Wallet className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Quick Actions Required                                                 */
/* -------------------------------------------------------------------------- */

const SELLER_ACTIONS = [
  { title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "LINK CREATED", desc: "Link is ready to be shared with the buyer.", cta: "View Deal", Thumb: ThumbGradedCard },
  { title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "DISPUTE OPEN", statusColor: "text-red-500 bg-red-500/10", desc: "Buyer reported:\n\"Missing Items\"\n\nFunds are temporarily frozen.", cta: "Review Dispute", Thumb: ThumbGradedCard },
  { title: "Untitled Deal", dealId: "TRUST-1024", status: "PAYMENT RECEIVED", desc: "Upload Tracking Details", cta: "Add Tracking", Thumb: ThumbCamera },
]

const BUYER_ACTIONS = [
  { title: "Untitled Deal", dealId: "TRUST-1024", status: "PAYMENT RECEIVED", desc: "Waiting for Seller Shipment", cta: "View Deal", Thumb: ThumbCamera },
  { title: "First Edition Base Set Booster", dealId: "TRUST-0992", status: "SHIPPED", desc: "Tracking Available", cta: "View Shipment", Thumb: ThumbGradedCard },
  { title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "WAITING FOR SELLER", desc: "Seller has 72 hours to respond.", cta: "View Dispute", Thumb: ThumbGradedCard },
  { title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "DISPUTE DECLINED", statusColor: "text-red-500 bg-red-500/10", desc: "Seller declined your dispute request.\n\nReason:\n\"The item matches the original listing.\"", cta: "Review Decision", Thumb: ThumbGradedCard },
]

function QuickActionsRequired({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const actions = viewMode === "seller" ? SELLER_ACTIONS : BUYER_ACTIONS
  const primaryBtnClass = viewMode === "seller" ? "bg-[#2F5EFF] hover:bg-[#1E3FD6]" : "bg-emerald-500 hover:bg-emerald-600"
  const defaultStatusColor = viewMode === "seller" ? "text-[#2F5EFF] bg-[#2F5EFF]/10" : "text-emerald-600 bg-emerald-500/10"

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {actions.map((a, i) => (
        <div key={i} className={cn(CARD, "p-4 sm:p-5 flex flex-col gap-4")}>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14 bg-slate-100 flex items-center justify-center">
              <div className="h-full w-full scale-[1.3] translate-y-1">
                <a.Thumb />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm sm:text-base font-bold text-slate-900">{a.title}</h4>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-semibold">
                <span className="text-slate-500">{a.dealId}</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className={cn("rounded-sm px-1.5 py-0.5", a.statusColor || defaultStatusColor)}>
                  {a.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
            <p className="whitespace-pre-line text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
              {a.desc}
            </p>
            <button className={cn("shrink-0 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors w-full sm:w-auto", primaryBtnClass)}>
              {a.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Quick Insights                                                         */
/* -------------------------------------------------------------------------- */

const SELLER_INSIGHTS = [
  { label: "Active Deals", value: 3 },
  { label: "Awaiting Delivery", value: 1 },
  { label: "In Transit", value: 1 },
  { label: "Completed", value: 16 },
]

const BUYER_INSIGHTS = [
  { label: "Active Deals", value: 1 },
  { label: "Awaiting Delivery", value: 1 },
  { label: "In Transit", value: 2 },
  { label: "Completed", value: 4 },
]

function QuickInsights({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const insights = viewMode === "seller" ? SELLER_INSIGHTS : BUYER_INSIGHTS
  const textColor = viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-500"

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {insights.map((it, i) => (
        <div key={i} className={cn(CARD, "flex flex-col items-center justify-center gap-1 p-4 sm:p-5 text-center")}>
          <p className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight", textColor)}>
            {it.value}
          </p>
          <p className="text-[11px] sm:text-xs font-medium text-slate-500">{it.label}</p>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Recent Deals                                                           */
/* -------------------------------------------------------------------------- */

function RecentDeals({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const deals = [
    { title: "Charizard Holo 1999", dealId: "TRUST-1024", amount: "$4,300", Thumb: ThumbCharizard },
    { title: "Vintage Leica M6", dealId: "TRUST-1025", amount: "$2,400", Thumb: ThumbLeica },
    { title: "MacBook Pro M3", dealId: "TRUST-1026", amount: "$1,850", Thumb: ThumbRolex },
  ]
  const linkColor = viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-500"

  return (
    <section className="pb-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">Recent Deals</h2>
        <Link to="/deals" className={cn("text-xs font-bold hover:underline", linkColor)}>
          View All
        </Link>
      </div>
      <div className={cn(CARD, "flex flex-col divide-y divide-slate-100")}>
        {deals.map((deal, i) => (
          <div key={i} className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12 bg-slate-100 flex items-center justify-center">
                <div className="h-full w-full scale-125">
                  <deal.Thumb />
                </div>
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-slate-900">{deal.title}</h4>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] sm:text-xs">
                  <span className="font-medium text-slate-500">{deal.dealId}</span>
                </div>
                <p className={cn("text-[10px] sm:text-xs font-bold mt-0.5", linkColor)}>Completed</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <span className="text-sm sm:text-base font-extrabold text-slate-900">{deal.amount}</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export function DashboardPage() {
  const [viewMode, setViewMode] = React.useState<"seller" | "buyer">("seller")

  return (
    <MainLayout className="bg-slate-50" mainClassName="py-6 sm:py-10">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header matching mobile */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Alex" className="h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-white shadow-sm" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900">
                Good Evening, Alex
              </h1>
              {/* Seller / Buyer Toggle */}
              <div className="mt-1.5 inline-flex items-center rounded-full bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("seller")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold transition-all",
                    viewMode === "seller" ? "bg-[#2F5EFF] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Handshake className="h-3 w-3" /> SELLER
                </button>
                <button
                  onClick={() => setViewMode("buyer")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold transition-all",
                    viewMode === "buyer" ? "bg-[#2F5EFF] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Package className="h-3 w-3" /> BUYER
                </button>
              </div>
            </div>
          </div>
          
          {/* Create New Deal Button (Sticky on Desktop) */}
          {viewMode === "seller" && (
            <div className="fixed top-[88px] right-4 sm:right-6 lg:right-8 xl:right-[calc(50vw-640px+32px)] z-50 hidden sm:block">
              <button className="flex items-center gap-2 rounded-xl bg-[#2F5EFF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1E3FD6] shadow-lg shadow-blue-500/25">
                <Plus className="h-4 w-4" /> Create New Deal
              </button>
            </div>
          )}
        </div>

        {/* 1. Wallet */}
        <WalletHero viewMode={viewMode} />

        {/* 2. Quick Actions Required */}
        <section>
          <div className="mb-4 flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <AlertCircle className={cn("h-4 w-4", viewMode === "seller" ? "text-blue-500" : "text-emerald-500")} /> Quick Actions Required
          </div>
          <QuickActionsRequired viewMode={viewMode} />
        </section>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* 3. Quick Insights */}
          <section>
            <h2 className="mb-4 text-sm font-bold text-slate-900">Quick Insights</h2>
            <QuickInsights viewMode={viewMode} />
          </section>

          {/* 4. Recent Deals */}
          <div>
            <RecentDeals viewMode={viewMode} />
          </div>
        </div>
        
        {/* Mobile Create New Deal Button (Visible only on small screens) */}
        {viewMode === "seller" && (
          <button className="mt-2 mb-10 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F5EFF] py-4 font-semibold text-white transition-all hover:bg-[#1E3FD6] shadow-sm sm:hidden">
            <Plus className="h-5 w-5" /> Create New Deal
          </button>
        )}
      </div>
    </MainLayout>
  )
}


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

/* --- Recent-deal product covers (wide 240x130, center-safe) --- */

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
