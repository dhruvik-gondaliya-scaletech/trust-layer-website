import { motion, useReducedMotion } from "framer-motion"
import {
  ShieldCheck,
  UserCheck,
  CreditCard,
  ScanFace,
  LockKeyhole,
  Scale,
  Check,
} from "lucide-react"
import { SectionHeading } from "../lib/primitives"

const ORBIT = [
  { icon: UserCheck, label: "Verified users", color: "#2563eb" },
  { icon: CreditCard, label: "Encrypted payments", color: "#22c55e" },
  { icon: ScanFace, label: "Fraud detection", color: "#a855f7" },
  { icon: LockKeyhole, label: "Vault Custody", color: "#f59e0b" },
  { icon: Scale, label: "Dispute resolution", color: "#0ea5e9" },
]

const CHECKLIST = [
  "Regulated trust-account custody",
  "Bank-level 256-bit encryption",
  "ID & payment verification",
  "Real-time fraud monitoring",
  "Human-backed dispute team",
  "Full transaction audit trail",
]

export function TrustFeaturesSection() {
  const reduce = useReducedMotion()
  const radius = 150

  return (
    <section id="security" className="relative overflow-hidden bg-secondary/40 py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Orbit visual */}
        <div className="relative order-2 flex h-[420px] items-center justify-center lg:order-1">
          {/* orbit rings */}
          <div className="absolute h-[340px] w-[340px] rounded-full border border-primary/15" />
          <div className="absolute h-[240px] w-[240px] rounded-full border border-primary/10" />

          {/* rotating orbit with counter-rotating chips */}
          <motion.div
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="absolute h-[300px] w-[300px]"
          >
            {ORBIT.map((item, i) => {
              const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              return (
                <div
                  key={item.label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <motion.div
                    animate={reduce ? {} : { rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
                    className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-white shadow-soft transition-transform hover:scale-110"
                      style={{ color: item.color }}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
                      {item.label}
                    </span>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>

          {/* assembling central shield */}
          <motion.div
            initial={reduce ? false : { scale: 0.4, opacity: 0, rotate: -20 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
            className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[28px] bg-gradient-to-br from-primary to-violet-600 text-white shadow-2xl shadow-primary/40"
          >
            <ShieldCheck className="h-14 w-14" />
            <span className="absolute inset-0 overflow-hidden rounded-[28px]">
              <span className="absolute -inset-y-2 -left-full w-1/2 skew-x-12 bg-white/20 blur-md animate-shimmer" />
            </span>
          </motion.div>
        </div>

        {/* Copy + checklist */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Security"
            title="Fortified from every angle."
            subtitle="TrustLayer wraps each deal in layers of verification, encryption and oversight - so nothing slips through."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHECKLIST.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[15px] font-semibold text-foreground/90">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
