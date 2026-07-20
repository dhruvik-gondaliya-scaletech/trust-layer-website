import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  User,
  Store,
  ShieldCheck,
  DollarSign,
  Package,
  Check,
  RotateCcw,
  ArrowRight,
  PartyPopper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SectionHeading } from "../lib/primitives"

/* phase: 0 idle · 1 paid/escrow · 2 shipped · 3 confirmed · 4 released/complete */
const ACTIONS = [
  { label: "Buyer pays $420", hint: "The buyer securely sends the payment to TrustLayer." },
  { label: "Seller ships item", hint: "The seller sees the funds are secured and ships with confidence." },
  { label: "Buyer confirms delivery", hint: "The package arrives and the buyer checks that everything is right." },
  { label: "Release the funds", hint: "The buyer taps confirm and the money is released to the seller." },
]

const STEP_STATE = [
  "Waiting for the buyer to pay.",
  "$420 is locked safely in the vault.",
  "Item shipped. Funds remain protected.",
  "Delivery confirmed by the buyer.",
  "Funds released. Deal complete!",
]

export function EscrowDemoSection() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = React.useState(0)
  const complete = phase === 4

  const fundsInVault = phase >= 1 && phase < 4

  return (
    <section id="demo" className="bg-secondary/40 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="LIVE PAYMENT PROTECTION DEMO"
          title="See exactly how your money is protected."
          subtitle="No sign-up. Just tap through a real deal and watch where the money goes."
          className="mb-10 md:mb-12 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Controls */}
          <div className="order-2 lg:order-1">
            <ol className="mb-8 space-y-3">
              {ACTIONS.map((a, i) => {
                const done = phase > i
                const current = phase === i
                return (
                  <li
                    key={a.label}
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-4 transition-all duration-300",
                      current
                        ? "border-primary bg-white shadow-md shadow-primary/10"
                        : done
                          ? "border-success/40 bg-success/5"
                          : "border-border bg-white/50 opacity-60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                        done ? "bg-success" : current ? "bg-primary" : "bg-muted-foreground/40",
                      )}
                    >
                      {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{a.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.hint}</p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {!complete ? (
              <Button
                size="lg"
                onClick={() => setPhase((p) => Math.min(p + 1, 4))}
                className="group h-auto w-full gap-2 py-4 text-base font-semibold shadow-lg shadow-primary/25"
              >
                {ACTIONS[phase].label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPhase(0)}
                className="h-auto w-full gap-2 py-4 text-base font-semibold"
              >
                <RotateCcw className="h-4 w-4" /> Run it again
              </Button>
            )}
          </div>

          {/* Stage */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-white p-6 shadow-soft-lg">
              <div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-60" />
              <div className="relative z-10">
                {/* actors + vault */}
                <div className="relative flex h-[240px] items-center justify-between px-2">
                  <DemoActor icon={<User className="h-7 w-7" />} label="Buyer" active={phase === 0 || phase === 2} done={phase >= 2} />

                  {/* vault */}
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={reduce ? {} : { scale: fundsInVault ? [1, 1.08, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "relative flex h-20 w-20 items-center justify-center rounded-3xl border-2 transition-colors duration-500",
                        fundsInVault
                          ? "border-primary bg-primary text-white shadow-xl shadow-primary/30"
                          : complete
                            ? "border-success bg-success/10 text-success"
                            : "border-border bg-white text-muted-foreground",
                      )}
                    >
                      <ShieldCheck className="h-10 w-10" />
                      {fundsInVault && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-2 -top-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-white shadow"
                        >
                          $420
                        </motion.span>
                      )}
                    </motion.div>
                    <span className="text-xs font-semibold text-muted-foreground">Payment Vault</span>
                  </div>

                  <DemoActor icon={<Store className="h-7 w-7" />} label="Seller" active={phase === 1 || phase === 3} done={complete} />

                  {/* traveling tokens */}
                  <AnimatePresence>
                    {phase === 1 && !reduce && (
                      <DemoToken key="pay" from="12%" to="calc(50% - 14px)" tone="primary">
                        <DollarSign className="h-4 w-4" strokeWidth={3} />
                      </DemoToken>
                    )}
                    {phase === 2 && !reduce && (
                      <DemoToken key="ship" from="calc(88% - 28px)" to="12%" tone="amber">
                        <Package className="h-4 w-4" strokeWidth={2.5} />
                      </DemoToken>
                    )}
                    {phase === 4 && !reduce && (
                      <DemoToken key="release" from="calc(50% - 14px)" to="calc(88% - 28px)" tone="success">
                        <DollarSign className="h-4 w-4" strokeWidth={3} />
                      </DemoToken>
                    )}
                  </AnimatePresence>

                  {/* completion confetti */}
                  <AnimatePresence>
                    {complete && !reduce && (
                      <div className="pointer-events-none absolute right-[12%] top-1/2">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{ x: (i - 6) * 12, y: -40 - (i % 3) * 18, opacity: 0 }}
                            transition={{ duration: 1.1, delay: (i % 4) * 0.05 }}
                            className="absolute h-2 w-2 rounded-[2px]"
                            style={{ backgroundColor: ["#2563eb", "#22c55e", "#a855f7", "#f59e0b"][i % 4] }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* status caption */}
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-secondary/70 px-4 py-3 text-center">
                  {complete && <PartyPopper className="h-4 w-4 text-success" />}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={phase}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className={cn("text-sm font-semibold", complete ? "text-success" : "text-foreground")}
                    >
                      {STEP_STATE[phase]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoActor({
  icon,
  label,
  active,
  done,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  done: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ scale: active ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-white transition-colors duration-300",
          active ? "border-primary text-primary shadow-md shadow-primary/20" : done ? "border-success/50 text-success" : "border-border text-muted-foreground",
        )}
      >
        {icon}
        {active && <span className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-pulse-ring" />}
      </motion.div>
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
    </div>
  )
}

function DemoToken({
  from,
  to,
  tone,
  children,
}: {
  from: string
  to: string
  tone: "primary" | "success" | "amber"
  children: React.ReactNode
}) {
  const tones = {
    primary: "bg-primary text-white shadow-primary/40",
    success: "bg-success text-white shadow-success/40",
    amber: "bg-amber-500 text-white shadow-amber-500/40",
  } as const
  return (
    <motion.div
      initial={{ left: from, opacity: 0, scale: 0.5 }}
      animate={{ left: to, opacity: [0, 1, 1, 0], scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
      className={cn("absolute top-[38%] z-20 flex h-7 w-7 items-center justify-center rounded-full shadow-lg", tones[tone])}
    >
      {children}
    </motion.div>
  )
}
