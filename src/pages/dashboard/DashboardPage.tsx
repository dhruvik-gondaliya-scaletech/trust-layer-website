import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, animate } from "framer-motion"
import {
  ArrowRight,
  Handshake,
  Package,
  Plus,
  CaretRight,
  LockKey,
  Money,
  CreditCard,
  Wallet,
  ChartBar,
  Handbag,
  Lightning
} from "@phosphor-icons/react"
import { MainLayout } from "@/components/layout/MainLayout"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */

const BLUE = "#2563eb"
const CARD = "rounded-[24px] bg-white shadow-[0_4px_12px_rgba(15,23,42,0.03),_0_18px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
const EASE = [0.16, 1, 0.3, 1] as const

/* -------------------------------------------------------------------------- */
/*  Animated Counter Component                                                */
/* -------------------------------------------------------------------------- */
function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  
  React.useEffect(() => {
    if (reduce) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toString()
        }
      },
    })
    return () => controls.stop()
  }, [value, reduce])

  return <span ref={ref} className={className}>{reduce ? value : 0}</span>
}


/* -------------------------------------------------------------------------- */
/*  1. Wallet Hero                                                            */
/* -------------------------------------------------------------------------- */

function WalletHero({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const reduce = useReducedMotion()
  const gradient = viewMode === "seller" 
    ? `linear-gradient(135deg, ${BLUE} 0%, #1E3FD6 55%, #4F46E5 100%)`
    : `linear-gradient(135deg, #10b981 0%, #059669 55%, #047857 100%)`

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 text-white shadow-2xl",
        viewMode === "seller" ? "shadow-blue-900/20" : "shadow-emerald-900/20"
      )}
      style={{ backgroundImage: gradient }}
    >
      {/* Background Mesh & Shield Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
         <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="shield-pattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
               <path d="M30 4L12 12V26C12 37.1 19.68 47.44 30 50C40.32 47.44 48 37.1 48 26V12L30 4Z" fill="currentColor" fillOpacity="0.08"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#shield-pattern)"/>
         </svg>
      </div>

      <div className="relative flex items-center justify-between gap-6 z-10">
        {/* Left — balances */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/80 uppercase tracking-wider">Available Balance</p>
          <div className="relative inline-block">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-white/20 blur-[40px] rounded-full pointer-events-none" />
            <p className="mt-2 text-[3rem] sm:text-[4rem] font-extrabold leading-none tracking-tight relative z-10 drop-shadow-md">
              $<AnimatedCounter value={48250} />
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-[20px] border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md shadow-inner">
              <p className="flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-wide">
                <LockKey weight="bold" className="h-4 w-4" /> Funds On Hold
              </p>
              <p className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight">
                $126,400
              </p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md shadow-inner">
              <p className="flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-wide">
                <Money weight="bold" className="h-4 w-4" /> Ready To Withdraw
              </p>
              <p className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight">
                $42,180
              </p>
            </div>
          </div>

          <button className={cn(
            "group mt-8 flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-bold shadow-xl shadow-black/10 transition-transform duration-200 hover:-translate-y-1 active:scale-95",
            viewMode === "seller" ? "text-[#1E3FD6]" : "text-emerald-700"
          )}>
            View Wallet
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right — glassmorphism wallet illustration (animated) */}
        <motion.div 
          animate={reduce ? {} : { y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative hidden h-64 w-72 shrink-0 lg:block opacity-60 pointer-events-none scale-125 origin-right pr-8"
        >
          <div className="absolute right-10 top-2 h-36 w-52 rotate-[-12deg] rounded-3xl border border-white/30 bg-white/10 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl">
            <div className="h-7 w-10 rounded-lg bg-gradient-to-br from-amber-200 to-yellow-400/90 shadow-inner" />
            <div className="mt-8 h-2.5 w-28 rounded-full bg-white/50" />
            <div className="mt-3 flex items-center justify-between">
              <div className="h-2.5 w-16 rounded-full bg-white/30" />
              <CreditCard weight="fill" className="h-6 w-6 text-white/80" />
            </div>
          </div>
          <div className="absolute right-0 top-28 h-32 w-48 rotate-[10deg] rounded-3xl border border-white/25 bg-white/[0.08] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-24 rounded-full bg-white/40" />
              <div className="h-7 w-7 rounded-full bg-white/30" />
            </div>
            <div className="mt-6 h-2.5 w-32 rounded-full bg-white/25" />
            <div className="mt-3 h-2.5 w-20 rounded-full bg-white/20" />
          </div>
          <div className="absolute top-4 right-48 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl">
            <Wallet weight="duotone" className="h-9 w-9 text-white" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Quick Actions Required                                                 */
/* -------------------------------------------------------------------------- */

const SELLER_ACTIONS = [
  { type: "link", title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "LINK CREATED", desc: "Link is ready to be shared with the buyer.", cta: "View Deal", Thumb: ThumbGradedCard },
  { type: "dispute", title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "DISPUTE OPEN", statusColor: "text-red-600 bg-red-500/10", desc: "Buyer reported:\n\"Missing Items\"\n\nFunds are temporarily frozen.", cta: "Review Dispute", Thumb: ThumbGradedCard },
  { type: "tracking", title: "Untitled Deal", dealId: "TRUST-1024", status: "PAYMENT RECEIVED", desc: "Upload Tracking Details", cta: "Add Tracking", Thumb: ThumbCamera },
]

const BUYER_ACTIONS = [
  { type: "tracking", title: "Untitled Deal", dealId: "TRUST-1024", status: "PAYMENT RECEIVED", desc: "Waiting for Seller Shipment", cta: "View Deal", Thumb: ThumbCamera },
  { type: "verification", title: "First Edition Base Set Booster", dealId: "TRUST-0992", status: "SHIPPED", desc: "Tracking Available", cta: "View Shipment", Thumb: ThumbGradedCard },
  { type: "dispute", title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "WAITING FOR SELLER", desc: "Seller has 72 hours to respond.", cta: "View Dispute", Thumb: ThumbGradedCard },
  { type: "dispute", title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "DISPUTE DECLINED", statusColor: "text-red-600 bg-red-500/10", desc: "Seller declined your dispute request.\n\nReason:\n\"The item matches the original listing.\"", cta: "Review Decision", Thumb: ThumbGradedCard },
]

function getActionAccent(type: string) {
  switch(type) {
    case 'link': return "bg-blue-500"
    case 'tracking': return "bg-orange-500"
    case 'dispute': return "bg-red-500"
    case 'verification': return "bg-emerald-500"
    default: return "bg-slate-300"
  }
}

function QuickActionsRequired({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const actions = viewMode === "seller" ? SELLER_ACTIONS : BUYER_ACTIONS
  const primaryBtnClass = viewMode === "seller" ? "bg-[#2F5EFF] hover:bg-[#1E3FD6]" : "bg-emerald-500 hover:bg-emerald-600"
  const defaultStatusColor = viewMode === "seller" ? "text-[#2F5EFF] bg-[#2F5EFF]/10" : "text-emerald-600 bg-emerald-500/10"

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {actions.map((a, i) => (
        <div key={i} className={cn(CARD, "relative overflow-hidden p-5 sm:p-6 flex flex-col gap-4 group")}>
          {/* Left Accent Bar */}
          <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[24px]", getActionAccent(a.type))} />
          
          <div className="flex items-center gap-4 pl-2">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm">
              <div className="h-full w-full scale-[1.3] translate-y-1 group-hover:scale-[1.35] transition-transform duration-500">
                <a.Thumb />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-base font-bold text-slate-900">{a.title}</h4>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="text-slate-500">{a.dealId}</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className={cn("rounded-md px-2 py-1 uppercase tracking-wide text-[10px]", a.statusColor || defaultStatusColor)}>
                  {a.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2 pl-2">
            <p className="whitespace-pre-line text-sm font-medium text-slate-600 leading-relaxed">
              {a.desc}
            </p>
            <button className={cn("shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto shadow-md", primaryBtnClass)}>
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
  { label: "Active Deals", value: 3, trend: "↑ +2 this week", trendColor: "text-emerald-600" },
  { label: "Awaiting Delivery", value: 1, trend: "Same as last week", trendColor: "text-slate-400" },
  { label: "In Transit", value: 1, trend: "↓ -1 this week", trendColor: "text-orange-500" },
  { label: "Completed", value: 16, trend: "↑ +4 this month", trendColor: "text-emerald-600" },
]

const BUYER_INSIGHTS = [
  { label: "Active Deals", value: 1, trend: "Same as last week", trendColor: "text-slate-400" },
  { label: "Awaiting Delivery", value: 1, trend: "↑ +1 this week", trendColor: "text-emerald-600" },
  { label: "In Transit", value: 2, trend: "Same as last week", trendColor: "text-slate-400" },
  { label: "Completed", value: 4, trend: "↑ +2 this month", trendColor: "text-emerald-600" },
]

function QuickInsights({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const insights = viewMode === "seller" ? SELLER_INSIGHTS : BUYER_INSIGHTS
  const textColor = viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-600"

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5">
      {insights.map((it, i) => (
        <div key={i} className={cn(CARD, "flex flex-col items-center justify-center gap-2 p-5 sm:p-6 text-center")}>
          <p className={cn("text-3xl sm:text-[2.5rem] font-extrabold tracking-tight", textColor)}>
            <AnimatedCounter value={it.value} />
          </p>
          <p className="text-sm font-bold text-slate-700">{it.label}</p>
          <p className={cn("text-[11px] font-semibold mt-1", it.trendColor)}>{it.trend}</p>
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
    { title: "Charizard Holo 1999", dealId: "TRUST-1024", amount: "$4,300", Thumb: ThumbCharizard, status: "completed" },
    { title: "Vintage Leica M6", dealId: "TRUST-1025", amount: "$2,400", Thumb: ThumbLeica, status: "in-progress" },
    { title: "MacBook Pro M3", dealId: "TRUST-1026", amount: "$1,850", Thumb: ThumbRolex, status: "completed" },
  ]
  const linkColor = viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-600"

  return (
    <section className="pb-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Handbag weight="bold" className="h-5 w-5 text-slate-500" /> Recent Deals
        </h2>
        <Link to="/deals" className={cn("text-sm font-bold hover:underline", linkColor)}>
          View All
        </Link>
      </div>
      <div className={cn(CARD, "flex flex-col overflow-hidden")}>
        {deals.map((deal, i) => (
          <div key={i} className={cn(
            "group flex items-center justify-between p-4 sm:p-5 transition-colors duration-200 border-b border-slate-100 last:border-0",
            viewMode === "seller" ? "hover:bg-blue-50/50" : "hover:bg-emerald-50/50"
          )}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm">
                <div className="h-full w-full scale-125 group-hover:scale-150 transition-transform duration-500">
                  <deal.Thumb />
                </div>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">{deal.title}</h4>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500">{deal.dealId}</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      deal.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-500'
                    )} />
                    <span className={cn("font-bold capitalize", 
                      deal.status === 'completed' ? 'text-emerald-600' : 'text-orange-600'
                    )}>
                      {deal.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <span className="text-base sm:text-lg font-extrabold text-slate-900">{deal.amount}</span>
              <CaretRight weight="bold" className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
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
    <MainLayout className="bg-[#F8FAFC] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F4F7FD] to-[#F8FAFC]" mainClassName="py-8 sm:py-12">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-12 px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Sticky Header with Glass Effect */}
        <div className="sticky top-0 z-50 pt-4 pb-4 sm:pt-6 sm:pb-6 -mt-4 sm:-mt-6 mb-4 sm:mb-6 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-slate-200/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8">
          
          {/* Left: Avatar & Greeting */}
          <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-[30%]">
            <div className="relative shrink-0">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Alex" className="h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-4 ring-white shadow-md transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 truncate">
                Good Evening, Alex
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 truncate">Welcome back! Here's your latest activity.</p>
            </div>
          </div>
          
          {/* Center: Seller / Buyer Toggle - Product Mode Switch */}
          <div className="w-full lg:w-[40%] flex justify-start lg:justify-center">
            <div className="relative inline-flex items-center rounded-full bg-white p-1 shadow-inner ring-1 ring-slate-900/5">
              <div 
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out",
                  viewMode === "seller" ? "translate-x-0 bg-[#2F5EFF] shadow-md" : "translate-x-full bg-emerald-500 shadow-md"
                )} 
              />
              <button
                onClick={() => setViewMode("seller")}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-colors w-28",
                  viewMode === "seller" ? "text-white" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Handshake weight={viewMode === "seller" ? "fill" : "bold"} className="h-4 w-4" /> SELLER
              </button>
              <button
                onClick={() => setViewMode("buyer")}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-colors w-28",
                  viewMode === "buyer" ? "text-white" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Package weight={viewMode === "buyer" ? "fill" : "bold"} className="h-4 w-4" /> BUYER
              </button>
            </div>
          </div>
          
          {/* Right: Create New Deal Button */}
          <div className="w-full lg:w-[30%] hidden lg:flex justify-end">
            {viewMode === "seller" && (
              <Link to="/deals/new" className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#2F5EFF] to-[#1E3FD6] pr-5 pl-2 py-2 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
                  <Plus weight="bold" className="h-4 w-4" />
                </div>
                Create New Deal
              </Link>
            )}
          </div>
        </div>

        {/* 1. Wallet */}
        <WalletHero viewMode={viewMode} />

        {/* 2. Quick Actions Required */}
        <section>
          <div className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900">
            <Lightning weight="fill" className={cn("h-5 w-5", viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-500")} /> 
            Quick Actions Required
          </div>
          <QuickActionsRequired viewMode={viewMode} />
        </section>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* 3. Quick Insights */}
          <section>
            <h2 className="mb-5 text-base font-bold text-slate-900 flex items-center gap-2">
              <ChartBar weight="bold" className="h-5 w-5 text-slate-500" /> Quick Insights
            </h2>
            <QuickInsights viewMode={viewMode} />
          </section>

          {/* 4. Recent Deals */}
          <div>
            <RecentDeals viewMode={viewMode} />
          </div>
        </div>
        
        {/* Mobile Create New Deal Button (Visible only on small screens) */}
        {viewMode === "seller" && (
          <Link to="/deals/new" className="group mt-4 mb-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#2F5EFF] to-[#1E3FD6] py-4 font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 sm:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
              <Plus weight="bold" className="h-5 w-5" />
            </div>
            Create New Deal
          </Link>
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
