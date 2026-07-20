import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, animate } from "framer-motion"
import {
  ArrowRight,
  Handshake,
  Package,
  Plus,
  CaretRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowDown,
  WarningCircle,
  Truck,
  ChartBar,
  Handbag,
  Lightning
} from "@phosphor-icons/react"
import { MainLayout } from "@/components/layout/MainLayout"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */


const CARD = "rounded-[24px] bg-white shadow-[0_4px_12px_rgba(15,23,42,0.03),_0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08),_0_30px_60px_rgba(15,23,42,0.12)]"
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
          ref.current.textContent = Math.round(v).toLocaleString()
        }
      },
    })
    return () => controls.stop()
  }, [value, reduce])

  return <span ref={ref} className={className}>{reduce ? value.toLocaleString() : "0"}</span>
}

/* -------------------------------------------------------------------------- */
/*  1. Wallet Hero (Protection Status)                                        */
/* -------------------------------------------------------------------------- */

function WalletHero({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const reduce = useReducedMotion()
  const gradientClass = viewMode === "seller" 
    ? "bg-gradient-to-br from-[#1E3FD6] via-[#2F5EFF] to-[#4F46E5] bg-[length:200%_200%] animate-gradient"
    : "bg-gradient-to-br from-[#047857] via-[#059669] to-[#10b981] bg-[length:200%_200%] animate-gradient"

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] p-8 sm:p-10 text-white shadow-2xl transition-colors duration-500",
        viewMode === "seller" ? "shadow-blue-900/30" : "shadow-emerald-900/30",
        gradientClass
      )}
    >
      {/* Background Mesh & Shield Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
         <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="shield-pattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
               <path d="M30 4L12 12V26C12 37.1 19.68 47.44 30 50C40.32 47.44 48 37.1 48 26V12L30 4Z" fill="currentColor" fillOpacity="0.08"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#shield-pattern)"/>
         </svg>
      </div>
      
      {/* Shimmer Effect */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }} 
        transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
      />

      <div className="relative flex flex-col md:flex-row items-center justify-between z-10">
        {/* Left — balances */}
        <div className="min-w-0 flex-1 flex flex-col justify-center pr-4 sm:pr-8">
          <div className="flex items-center gap-2 mb-2">
             <ShieldCheck weight="fill" className="h-5 w-5 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
             <p className="text-sm font-bold text-white/90 uppercase tracking-widest drop-shadow-sm">Protected by TrustLayer</p>
          </div>
          <div className="relative inline-block mt-1 group cursor-default">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <p className="text-[3.5rem] sm:text-[4.5rem] font-extrabold leading-none tracking-tight relative z-10 drop-shadow-lg flex items-center">
              $ <AnimatedCounter value={48250} />
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm font-medium text-white/80">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              3 Active Protected Deals
            </span>
          </div>
        </div>

        {/* Right — Animated Payment Vault */}
        <div className="w-[300px] lg:w-[400px] flex-shrink-0 flex items-center justify-center relative mt-12 md:mt-0">
          <div className="relative w-full h-[240px] flex items-center justify-center">
            
            {/* Base Glow */}
            <div className="absolute inset-0 bg-white/10 blur-[60px] rounded-full pointer-events-none" />

            <motion.div 
              animate={reduce ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <div className="relative h-56 w-64 origin-center mt-8">
                
                {/* Vault Back */}
                <div className="absolute left-1/2 top-10 h-40 w-56 -translate-x-1/2 rounded-3xl border border-white/20 bg-black/10 backdrop-blur-md shadow-2xl" />
                
                {/* Floating Money / Deal Card Entering */}
                <motion.div 
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute left-1/2 top-0 h-24 w-40 -translate-x-1/2 rotate-[-5deg] rounded-2xl border border-white/30 bg-white/15 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl"
                >
                  <div className="h-4 w-6 rounded bg-gradient-to-br from-amber-200 to-yellow-400/90 shadow-inner" />
                  <div className="mt-4 h-2 w-20 rounded-full bg-white/50" />
                  <div className="mt-2 h-2 w-12 rounded-full bg-white/30" />
                </motion.div>

                {/* Vault Front Glass */}
                <div className="absolute left-1/2 top-14 h-36 w-60 -translate-x-1/2 rounded-3xl border border-white/40 bg-white/20 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl z-20 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                     <ShieldCheck weight="duotone" className="h-8 w-8 text-white drop-shadow-md" />
                     <div className="h-2.5 w-16 rounded-full bg-white/40" />
                  </div>
                  <div className="h-10 w-full rounded-xl bg-black/10 border border-white/10 flex items-center justify-center">
                     <div className="h-2 w-24 rounded-full bg-emerald-400/80 animate-pulse" />
                  </div>
                </div>

              </div>
            </motion.div>
            
            {/* View Wallet Button (z-index 30) */}
            <button className={cn(
              "group relative z-30 flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-extrabold shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:scale-105 active:scale-95 w-full max-w-[220px] mt-32",
              viewMode === "seller" ? "text-[#1E3FD6]" : "text-emerald-700"
            )}>
              View Wallet
              <ArrowRight weight="bold" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Flow Arrow Indicator                                                      */
/* -------------------------------------------------------------------------- */

function FlowArrow() {
  return (
    <div className="flex justify-center -my-3 sm:-my-5 relative z-0 pointer-events-none opacity-40">
      <div className="flex flex-col items-center">
        <div className="h-10 sm:h-12 w-px bg-gradient-to-b from-slate-300 to-transparent" />
        <ArrowDown weight="bold" className="h-4 w-4 text-slate-300 -mt-2" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Quick Actions Required                                                 */
/* -------------------------------------------------------------------------- */

const SELLER_ACTIONS = [
  { type: "link", title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "LINK CREATED", desc: "Link is ready to be shared with the buyer.", cta: "View Deal", Thumb: ThumbGradedCard, step: 1 },
  { type: "dispute", title: "Vintage Leica M6", dealId: "TRUST-0845", status: "DISPUTE OPEN", statusColor: "text-red-600 bg-red-500/10 border border-red-500/20", desc: "Buyer reported:\n\"Missing Items\"\n\nFunds are temporarily frozen.", cta: "Review Dispute", Thumb: ThumbCamera, step: 4 },
  { type: "tracking", title: "Nike Air Jordan 1", dealId: "TRUST-1024", status: "PAYMENT RECEIVED", desc: "Upload Tracking Details", cta: "Add Tracking", Thumb: ThumbSneaker, step: 2 },
]

const BUYER_ACTIONS = [
  { type: "tracking", title: "MacBook Pro M3", dealId: "TRUST-1024", status: "PAYMENT RECEIVED", desc: "Waiting for Seller Shipment", cta: "View Deal", Thumb: ThumbLaptop, step: 2 },
  { type: "verification", title: "Rolex Submariner", dealId: "TRUST-0992", status: "SHIPPED", desc: "Tracking Available", cta: "View Shipment", Thumb: ThumbRolex, step: 3 },
  { type: "dispute", title: "Shadowless Mewtwo PSA 10", dealId: "TRUST-0845", status: "WAITING FOR SELLER", statusColor: "text-red-600 bg-red-500/10 border border-red-500/20", desc: "Seller has 72 hours to respond.", cta: "View Dispute", Thumb: ThumbGradedCard, step: 4 },
]

function getActionAccent(type: string) {
  switch(type) {
    case 'link': return "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    case 'tracking': return "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
    case 'dispute': return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
    case 'verification': return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
    default: return "bg-slate-300"
  }
}

function getGlowBorder(type: string) {
  switch(type) {
    case 'link': return "hover:border-blue-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    case 'tracking': return "hover:border-orange-200 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
    case 'dispute': return "hover:border-red-200 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
    case 'verification': return "hover:border-emerald-200 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    default: return "hover:border-slate-200"
  }
}

function DealTimeline({ currentStep }: { currentStep: number }) {
  const steps = ["Created", "Paid", "Shipped", "Delivered", "Released"]
  
  return (
    <div className="flex items-center gap-1 sm:gap-2 w-full mt-4 bg-slate-50/50 p-2 sm:p-3 rounded-xl border border-slate-100/50">
      {steps.map((step, idx) => {
        const isActive = idx < currentStep
        const isCurrent = idx === currentStep - 1
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1.5 flex-1 group/step">
              <div className={cn(
                "h-2 w-full rounded-full transition-colors duration-500",
                isActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-slate-200",
                isCurrent && "animate-pulse bg-emerald-400"
              )} />
              <span className={cn(
                "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors duration-300",
                isActive ? "text-emerald-700" : "text-slate-400"
              )}>
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <CaretRight weight="bold" className={cn("h-3 w-3 shrink-0 mb-4", isActive ? "text-emerald-400" : "text-slate-200")} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function QuickActionsRequired({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const actions = viewMode === "seller" ? SELLER_ACTIONS : BUYER_ACTIONS
  const primaryBtnClass = viewMode === "seller" ? "bg-[#2F5EFF] hover:bg-[#1E3FD6] shadow-blue-500/25" : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
  const defaultStatusColor = viewMode === "seller" ? "text-[#2F5EFF] bg-[#2F5EFF]/10 border border-[#2F5EFF]/20" : "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20"

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {actions.map((a, i) => (
        <div key={i} className={cn(CARD, "relative overflow-hidden p-5 sm:p-6 flex flex-col gap-4 group border border-transparent transition-all duration-300", getGlowBorder(a.type))}>
          {/* Left Accent Bar */}
          <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[24px] transition-all duration-300", getActionAccent(a.type))} />
          
          <div className="flex items-start sm:items-center gap-4 pl-2">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner relative group-hover:shadow-md transition-shadow">
               <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-10 pointer-events-none" />
              <div className="h-full w-full scale-[1.3] translate-y-1 group-hover:scale-[1.4] transition-transform duration-500 ease-out">
                <a.Thumb />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#1E3FD6] transition-colors">{a.title}</h4>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="text-slate-500">{a.dealId}</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className={cn("rounded-md px-2.5 py-1 uppercase tracking-wider text-[10px] flex items-center gap-1 font-extrabold shadow-sm", a.statusColor || defaultStatusColor)}>
                  {a.status === 'DISPUTE OPEN' || a.status === 'WAITING FOR SELLER' ? <WarningCircle weight="bold" /> : <Clock weight="bold" />}
                  {a.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pl-2">
            <DealTimeline currentStep={a.step} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pl-2 border-t border-slate-50 pt-4">
            <p className="whitespace-pre-line text-sm font-medium text-slate-600 leading-relaxed max-w-[200px]">
              {a.desc}
            </p>
            <button className={cn("shrink-0 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 w-full sm:w-auto shadow-md", primaryBtnClass)}>
              {a.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Quick Insights & Trust Score                                           */
/* -------------------------------------------------------------------------- */

const SELLER_INSIGHTS = [
  { label: "Active Deals", value: 3, trend: "↑ +2 this week", trendColor: "text-emerald-600" },
  { label: "Awaiting Delivery", value: 1, trend: "Same as last week", trendColor: "text-slate-400" },
]

const BUYER_INSIGHTS = [
  { label: "Active Deals", value: 1, trend: "Same as last week", trendColor: "text-slate-400" },
  { label: "Awaiting Delivery", value: 1, trend: "↑ +1 this week", trendColor: "text-emerald-600" },
]

function Sparkline({ color }: { color: string }) {
  return (
    <svg className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 100 30" preserveAspectRatio="none">
       <path d="M0,25 Q10,20 20,25 T40,15 T60,20 T80,5 T100,10" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
       <path d="M0,25 Q10,20 20,25 T40,15 T60,20 T80,5 T100,10 L100,30 L0,30 Z" fill={color} opacity="0.15" />
    </svg>
  )
}

function QuickInsights({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const insights = viewMode === "seller" ? SELLER_INSIGHTS : BUYER_INSIGHTS
  const textColor = viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-600"
  const sparkColor = viewMode === "seller" ? "#2F5EFF" : "#10b981"

  return (
    <div className="flex flex-col gap-4 sm:gap-5 h-full">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 flex-1">
        {insights.map((it, i) => (
          <div key={i} className={cn(CARD, "flex flex-col items-center justify-center gap-1 p-5 sm:p-6 text-center group h-full")}>
            <p className={cn("text-4xl sm:text-[3rem] font-extrabold tracking-tight drop-shadow-sm group-hover:scale-110 transition-transform duration-300", textColor)}>
              <AnimatedCounter value={it.value} />
            </p>
            <p className="text-sm font-extrabold text-slate-700 mt-2">{it.label}</p>
            <div className="flex items-center gap-2 mt-1">
               <span className={cn("text-[11px] font-bold", it.trendColor)}>{it.trend}</span>
            </div>
            <div className="mt-4">
               <Sparkline color={sparkColor} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Trust Score Card */}
      <div className={cn(CARD, "p-6 flex items-center justify-between relative overflow-hidden group hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:border-amber-200 border border-transparent")}>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
             <ShieldCheck weight="fill" className="h-6 w-6 text-amber-500 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
             <h3 className="text-base font-extrabold text-slate-900">Trust Score</h3>
          </div>
          <p className="text-sm font-semibold text-slate-500 mt-1">Based on 16 successful transactions</p>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-extrabold text-slate-900">5.0</span>
          </div>
        </div>
        <div className="relative z-10 text-right">
           <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-500 drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-right">
             98%
           </div>
           <div className="text-xs font-bold text-amber-600 mt-1">Protected Ratio</div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Recent Deals                                                           */
/* -------------------------------------------------------------------------- */

function getHumanStatus(status: string) {
  switch(status) {
    case 'funds-released': return { label: 'Funds Released', icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-100', dot: 'bg-emerald-500', border: 'border-emerald-200' }
    case 'awaiting-buyer': return { label: 'Awaiting Buyer', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-500', border: 'border-amber-200' }
    case 'tracking-uploaded': return { label: 'Tracking Uploaded', icon: Truck, color: 'text-blue-700', bg: 'bg-blue-100', dot: 'bg-blue-500', border: 'border-blue-200' }
    case 'dispute-open': return { label: 'Dispute Open', icon: WarningCircle, color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500', border: 'border-red-200' }
    default: return { label: 'In Progress', icon: Clock, color: 'text-slate-700', bg: 'bg-slate-100', dot: 'bg-slate-500', border: 'border-slate-200' }
  }
}

function RecentDeals({ viewMode }: { viewMode: "seller" | "buyer" }) {
  const deals = [
    { title: "Charizard Holo 1999", dealId: "TRUST-1024", amount: "$4,300", Thumb: ThumbCharizard, status: "funds-released" },
    { title: "Vintage Leica M6", dealId: "TRUST-1025", amount: "$2,400", Thumb: ThumbCamera, status: "awaiting-buyer" },
    { title: "MacBook Pro M3", dealId: "TRUST-1026", amount: "$1,850", Thumb: ThumbLaptop, status: "tracking-uploaded" },
    { title: "Nike Air Jordan 1", dealId: "TRUST-1027", amount: "$850", Thumb: ThumbSneaker, status: "funds-released" },
  ]
  const linkColor = viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-600"

  return (
    <section className="pb-4 h-full flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Handbag weight="bold" className="h-6 w-6 text-slate-500" /> Recent Deals
        </h2>
        <Link to="/deals" className={cn("text-sm font-bold hover:underline", linkColor)}>
          View All
        </Link>
      </div>
      <div className={cn(CARD, "flex flex-col overflow-hidden flex-1 justify-center")}>
        {deals.map((deal, i) => {
          const statusInfo = getHumanStatus(deal.status)
          
          return (
            <div key={i} className={cn(
              "group flex items-center justify-between p-4 sm:p-5 transition-all duration-300 border-b border-slate-100 last:border-0",
              viewMode === "seller" ? "hover:bg-blue-50/60" : "hover:bg-emerald-50/60"
            )}>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm relative group-hover:shadow-md transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-10 pointer-events-none" />
                  <div className="h-full w-full scale-125 group-hover:scale-150 transition-transform duration-500 ease-out">
                    <deal.Thumb />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#1E3FD6] transition-colors">{deal.title}</h4>
                  <div className="mt-1.5 flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-400">{deal.dealId}</span>
                    <span className="text-slate-300">•</span>
                    <div className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm font-bold uppercase tracking-wider text-[10px]",
                      statusInfo.bg, statusInfo.color, statusInfo.border
                    )}>
                      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", statusInfo.dot)} />
                      {statusInfo.label}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-base sm:text-lg font-extrabold text-slate-900 drop-shadow-sm group-hover:scale-105 transition-transform origin-right">{deal.amount}</span>
                <CaretRight weight="bold" className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors group-hover:translate-x-1" />
              </div>
            </div>
          )
        })}
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
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Sticky Header with Glass Effect */}
        <div className="sticky top-0 z-50 pt-4 pb-4 sm:pt-6 sm:pb-6 -mt-4 sm:-mt-6 mb-2 sm:mb-4 bg-[#F8FAFC]/90 backdrop-blur-2xl border-b border-slate-200/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          
          {/* Left: Avatar & Greeting */}
          <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-[30%] group">
            <div className="relative shrink-0">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Alex" className="h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-4 ring-white shadow-lg transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                Good Evening, Alex
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 truncate flex items-center gap-1.5">
                 <ShieldCheck weight="fill" className="h-4 w-4 text-emerald-500" />
                 Your money is protected.
              </p>
            </div>
          </div>
          
          {/* Center: Seller / Buyer Toggle */}
          <div className="w-full lg:w-[40%] flex justify-start lg:justify-center">
            <div className="relative inline-flex items-center rounded-full bg-white p-1.5 shadow-inner ring-1 ring-slate-900/5 hover:shadow-md transition-shadow">
              <div 
                className={cn(
                  "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-transform duration-500 ease-out",
                  viewMode === "seller" ? "translate-x-0 bg-[#2F5EFF] shadow-lg shadow-blue-500/30" : "translate-x-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
                )} 
              />
              <button
                onClick={() => setViewMode("seller")}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-colors w-32 tracking-wide",
                  viewMode === "seller" ? "text-white" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Handshake weight={viewMode === "seller" ? "fill" : "bold"} className="h-4 w-4" /> SELLER
              </button>
              <button
                onClick={() => setViewMode("buyer")}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-colors w-32 tracking-wide",
                  viewMode === "buyer" ? "text-white" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Package weight={viewMode === "buyer" ? "fill" : "bold"} className="h-4 w-4" /> BUYER
              </button>
            </div>
          </div>
          
          {/* Right: Create New Deal Button */}
          <div className="w-full lg:w-[30%] hidden lg:flex justify-end">
            {viewMode === "seller" && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500 group-hover:duration-200 animate-pulse"></div>
                <Link to="/deals/new" className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#2F5EFF] to-[#1E3FD6] pr-6 pl-2 py-2 text-sm font-extrabold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-90 transition-transform duration-500">
                    <Plus weight="bold" className="h-4 w-4" />
                  </div>
                  Create New Deal
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 1. Wallet */}
        <WalletHero viewMode={viewMode} />
        
        <FlowArrow />

        {/* 2. Quick Actions Required */}
        <section>
          <div className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <Lightning weight="fill" className={cn("h-6 w-6 animate-pulse drop-shadow-sm", viewMode === "seller" ? "text-[#2F5EFF]" : "text-emerald-500")} /> 
            Quick Actions Required
          </div>
          <QuickActionsRequired viewMode={viewMode} />
        </section>

        <FlowArrow />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* 3. Quick Insights */}
          <section className="flex flex-col">
            <h2 className="mb-5 text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ChartBar weight="bold" className="h-6 w-6 text-slate-500" /> Performance
            </h2>
            <QuickInsights viewMode={viewMode} />
          </section>

          {/* 4. Recent Deals */}
          <div className="flex flex-col">
            <RecentDeals viewMode={viewMode} />
          </div>
        </div>
        
        {/* Mobile Create New Deal Button */}
        {viewMode === "seller" && (
          <div className="relative group mt-8 mb-10 sm:hidden">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
            <Link to="/deals/new" className="relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#2F5EFF] to-[#1E3FD6] py-4 font-extrabold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/25">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
                <Plus weight="bold" className="h-5 w-5" />
              </div>
              Create New Deal
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

/* -------------------------------------------------------------------------- */
/*  Thumbnails                                                                */
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

function ThumbSneaker() {
  return (
    <svg viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="snkBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef2f2" />
          <stop offset="1" stopColor="#fee2e2" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#snkBg)" />
      <g transform="translate(40, -10)">
        <path d="M70 90 Q 80 50 120 60 Q 150 65 170 90 Z" fill="#ef4444" opacity="0.9" />
        <path d="M70 90 L 170 90 L 160 100 L 80 100 Z" fill="#b91c1c" />
        <circle cx="120" cy="75" r="8" fill="#fff" opacity="0.8" />
      </g>
    </svg>
  )
}

function ThumbLaptop() {
  return (
    <svg viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="lapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#lapBg)" />
      <rect x="60" y="30" width="120" height="70" rx="4" fill="#94a3b8" />
      <rect x="64" y="34" width="112" height="62" rx="2" fill="#1e293b" />
      <rect x="50" y="100" width="140" height="6" rx="3" fill="#cbd5e1" />
      <path d="M110 100 L130 100 L125 102 L115 102 Z" fill="#94a3b8" />
    </svg>
  )
}
