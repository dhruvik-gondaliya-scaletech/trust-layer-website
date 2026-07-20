import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ShieldCheck,
  User,
  Store,
  DollarSign,
  Package,
  Check,
  PartyPopper,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { label: "Seller lists the item", actor: "seller" },
  { label: "Buyer joins the deal", actor: "buyer" },
  { label: "Payment secured in vault", actor: "money-in" },
  { label: "Seller ships the package", actor: "ship" },
  { label: "Buyer confirms delivery", actor: "confirm" },
  { label: "Funds released to seller", actor: "money-out" },
  { label: "Deal complete - everyone safe", actor: "done" },
] as const

const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  return {
    id: i,
    x: Math.cos(angle) * (70 + (i % 4) * 22),
    y: Math.sin(angle) * (70 + (i % 3) * 20),
    color: ["#2563eb", "#22c55e", "#a855f7", "#f59e0b"][i % 4],
    delay: (i % 5) * 0.03,
  }
})

interface JourneyProps {
  /** ms between steps; the loop restarts after the final step */
  interval?: number
  className?: string
}

export function LiveEscrowJourney({ interval = 2400, className }: JourneyProps) {
  const reduce = useReducedMotion()
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    if (reduce) {
      // Park on the "funds protected" beat for reduced-motion users.
      setStep(2)
      return
    }
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [interval, reduce])

  // For layout matching
  const fundsInEscrow = step >= 2 && step < 5
  const shieldActive = step >= 2
  const done = step === 6

  return (
    <div
      className={cn(
        "relative w-full max-w-[340px] rounded-[28px] border border-border/70 bg-white/90 p-5 shadow-xl backdrop-blur-sm",
        className,
      )}
    >
      {/* header */}
      <div className="flex items-center justify-between px-1 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">TrustLayer Vault</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Live
        </span>
      </div>

      {/* stage */}
      <div className="relative h-[220px] rounded-2xl bg-gradient-to-b from-primary/[0.04] to-transparent bg-grid-faint overflow-hidden">
        {/* connecting rail */}
        <div className="absolute left-[14%] right-[14%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-border" />
        <motion.div
          className="absolute left-[14%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: step / (STEPS.length - 1) }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ width: "72%" }}
        />

        {/* buyer */}
        <Actor
          side="left"
          active={step === 1 || step === 4}
          done={step >= 4}
          icon={<User className="h-6 w-6" />}
          label="Buyer"
        />
        {/* seller */}
        <Actor
          side="right"
          active={step === 0 || step === 3 || step === 5}
          done={done}
          icon={<Store className="h-6 w-6" />}
          label="Seller"
        />

        {/* central vault / shield */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={
              reduce
                ? {}
                : {
                  scale: shieldActive ? [1, 1.08, 1] : 1,
                }
            }
            transition={{ duration: 0.5 }}
            className={cn(
              "relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-colors duration-500",
              shieldActive
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                : "border-border bg-white text-muted-foreground",
            )}
          >
            <ShieldCheck className="h-8 w-8" />
            {fundsInEscrow && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white shadow"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* traveling money token: buyer -> vault */}
        <AnimatePresence>
          {step === 2 && !reduce && (
            <TravelToken key="in" from="8%" to="calc(50% - 14px)" color="primary">
              <DollarSign className="h-4 w-4" strokeWidth={3} />
            </TravelToken>
          )}
          {step === 5 && !reduce && (
            <TravelToken key="out" from="calc(50% - 14px)" to="calc(92% - 28px)" color="success">
              <DollarSign className="h-4 w-4" strokeWidth={3} />
            </TravelToken>
          )}
          {step === 3 && !reduce && (
            <TravelToken key="ship" from="calc(92% - 28px)" to="8%" color="amber">
              <Package className="h-4 w-4" strokeWidth={2.5} />
            </TravelToken>
          )}
        </AnimatePresence>

        {/* completion confetti */}
        <AnimatePresence>
          {done && !reduce && (
            <div className="pointer-events-none absolute left-1/2 top-1/2">
              {CONFETTI.map((c) => (
                <motion.span
                  key={c.id}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: c.x, y: c.y, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 1, ease: "easeOut", delay: c.delay }}
                  className="absolute h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* step caption */}
      <div className="flex items-center gap-3 px-1 pt-4">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-colors",
            done ? "bg-success" : "bg-primary",
          )}
        >
          {done ? <PartyPopper className="h-4 w-4" /> : <span className="text-sm font-bold">{step + 1}</span>}
        </span>
        <div className="flex h-10 min-w-0 flex-1 items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-semibold text-foreground"
            >
              {STEPS[step].label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* progress dots */}
      <div className="mt-3 flex items-center gap-1.5 px-1">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-500",
              i <= step ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </div>
    </div>
  )
}

function Actor({
  side,
  active,
  done,
  icon,
  label,
}: {
  side: "left" | "right"
  active: boolean
  done: boolean
  icon: React.ReactNode
  label: string
}) {
  return (
    <div
      className={cn(
        "absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5",
        side === "left" ? "left-[3%]" : "right-[3%]",
      )}
    >
      <motion.div
        animate={{ scale: active ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-2xl border bg-white transition-colors duration-300",
          active
            ? "border-primary text-primary shadow-md shadow-primary/20"
            : done
              ? "border-success/50 text-success"
              : "border-border text-muted-foreground",
        )}
      >
        {icon}
        {active && (
          <span className="absolute inset-0 rounded-2xl border-2 border-primary/60 animate-pulse-ring" />
        )}
        {done && (
          <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </motion.div>
      <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
    </div>
  )
}

function TravelToken({
  from,
  to,
  color,
  children,
}: {
  from: string
  to: string
  color: "primary" | "success" | "amber"
  children: React.ReactNode
}) {
  const colorMap = {
    primary: "bg-primary text-white shadow-primary/40",
    success: "bg-success text-white shadow-success/40",
    amber: "bg-amber-500 text-white shadow-amber-500/40",
  } as const
  return (
    <motion.div
      initial={{ left: from, opacity: 0, scale: 0.5 }}
      animate={{ left: to, opacity: [0, 1, 1, 0], scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
      className={cn(
        "absolute top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full shadow-lg",
        colorMap[color],
      )}
    >
      {children}
    </motion.div>
  )
}
