import { motion } from "framer-motion"
import {
  ShieldCheck,
  UserCheck,
  Store,
  LockKeyhole,
  ScanFace,
  Star,
  ArrowUpRight,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading, CountUp, TiltCard } from "../lib/primitives"

function Cell({
  className,
  children,
  delay = 0,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/70 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export function WhyTrustLayerSection() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Why TrustLayer"
          title="Everything a safe deal needs - in one layer."
          subtitle="Protection for both sides, real security, and fraud detection working quietly in the background."
          className="mb-16"
        />

        <div className="grid auto-rows-[minmax(170px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Hero cell - both sides protected */}
          <TiltCard className="md:col-span-2 md:row-span-2" max={6}>
            <Cell className="flex h-full flex-col justify-between bg-gradient-to-br from-primary/[0.06] to-violet-500/[0.06]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" /> Two-sided protection
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
                  Buyers and sellers both come out safe.
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  The buyer's money is protected until the item arrives as described. The seller is
                  guaranteed to get paid once they've done their part.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <ActorBadge icon={<UserCheck className="h-6 w-6" />} label="Buyer protected" tone="primary" />
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-success/40" />
                <ActorBadge icon={<Store className="h-6 w-6" />} label="Seller protected" tone="success" />
              </div>
            </Cell>
          </TiltCard>

          {/* Live demo teaser */}
          <Cell className="md:col-span-2 flex flex-col justify-between bg-primary text-white" delay={0.05}>
            <a href="#demo" className="absolute inset-0" aria-label="Try the live Payment Vault demo" />
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <Play className="h-3 w-3 fill-current" /> Interactive
              </span>
              <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Try the live protection demo</h3>
              <p className="mt-1 text-sm text-white/80">
                Click through a real transaction and watch the money move.
              </p>
            </div>
          </Cell>

          {/* Stat */}
          <Cell className="flex flex-col justify-center bg-gradient-to-br from-success/[0.08] to-transparent" delay={0.1}>
            <div className="text-4xl font-bold tracking-tight text-foreground">
              <CountUp to={12.8} prefix="$" suffix="M" decimals={1} />
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              protected for people like you
            </p>
          </Cell>

          {/* Fraud detection */}
          <FeatureCell
            icon={<ScanFace className="h-6 w-6" />}
            title="Fraud detection"
            desc="Identity checks and monitoring keep scammers out."
            delay={0.15}
          />

          {/* Vault */}
          <FeatureCell
            icon={<LockKeyhole className="h-6 w-6" />}
            title="Secure Vault"
            desc="Funds held in a regulated trust account - never with the seller."
            className="md:col-span-2"
            delay={0.2}
          />

          {/* Reviews */}
          <FeatureCell
            icon={<Star className="h-6 w-6" />}
            title="Verified reviews"
            desc="Reputation you can actually trust."
            delay={0.25}
          />

          {/* Security */}
          <FeatureCell
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Bank-grade security"
            desc="End-to-end encryption on every deal."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}

function ActorBadge({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode
  label: string
  tone: "primary" | "success"
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg",
          tone === "primary" ? "bg-primary shadow-primary/30" : "bg-success shadow-success/30",
        )}
      >
        {icon}
      </div>
      <span className="text-xs font-semibold text-foreground">{label}</span>
    </div>
  )
}

function FeatureCell({
  icon,
  title,
  desc,
  className,
  delay,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  className?: string
  delay?: number
}) {
  return (
    <Cell className={cn("flex flex-col justify-between", className)} delay={delay}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </Cell>
  )
}
