import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  FilePlus2,
  CreditCard,
  ShieldCheck,
  Truck,
  PackageCheck,
  BadgeDollarSign,
} from "lucide-react"
import { SectionHeading } from "../lib/primitives"

const STEPS = [
  { icon: FilePlus2, title: "Create Deal", desc: "Set your price and get a secure link to share." },
  { icon: CreditCard, title: "Buyer Pays", desc: "The buyer pays directly into the TrustLayer vault." },
  { icon: ShieldCheck, title: "Funds Protected", desc: "Your money is held securely in the TrustLayer Vault." },
  { icon: Truck, title: "Seller Ships", desc: "The seller ships the item knowing the money is ready." },
  { icon: PackageCheck, title: "Buyer Receives", desc: "The buyer receives the item and confirms everything is right." },
  { icon: BadgeDollarSign, title: "Funds Released", desc: "Money is released to the seller." },
]

export function HowItWorksSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  })
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="how-it-works" className="bg-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="The flow"
          title="Six steps. Zero guesswork."
          className="mb-12 md:mb-16 lg:mb-20"
        />

        <div ref={ref} className="relative">
          {/* ---- Desktop: horizontal timeline ---- */}
          <div className="hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-1 rounded-full bg-border" />
            <motion.div
              style={{ width: lineWidth }}
              className="absolute left-0 top-8 h-1 rounded-full bg-gradient-to-r from-primary to-violet-500"
            />
            <div className="relative grid grid-cols-6 gap-4">
              {STEPS.map((s, i) => (
                <TimelineNode key={s.title} step={s} index={i} />
              ))}
            </div>
          </div>

          {/* ---- Mobile / tablet: vertical timeline ---- */}
          <div className="lg:hidden">
            <div className="absolute bottom-0 left-[27px] top-2 w-1 rounded-full bg-border" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[27px] top-2 w-1 rounded-full bg-gradient-to-b from-primary to-violet-500"
            />
            <div className="space-y-8">
              {STEPS.map((s, i) => (
                <TimelineNode key={s.title} step={s} index={i} vertical />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineNode({
  step,
  index,
  vertical = false,
}: {
  step: (typeof STEPS)[number]
  index: number
  vertical?: boolean
}) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: vertical ? 0 : 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={vertical ? "relative flex items-start gap-5" : "flex flex-col items-center text-center"}
    >
      <motion.div
        whileHover={{ scale: 1.12, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-background bg-primary text-white shadow-lg shadow-primary/25"
      >
        <Icon className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary shadow">
          {index + 1}
        </span>
      </motion.div>
      <div className={vertical ? "pt-1" : "mt-5"}>
        <h3 className="text-base font-bold text-foreground">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
      </div>
    </motion.div>
  )
}
