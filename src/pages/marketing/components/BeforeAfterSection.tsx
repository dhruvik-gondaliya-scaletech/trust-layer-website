import { motion } from "framer-motion"
import { X, Check, Frown, Smile } from "lucide-react"
import { SectionHeading } from "../lib/primitives"
import { cn } from "@/lib/utils"

const WITHOUT = [
  "Send money and just hope they ship",
  "No idea if the seller is even real",
  "Chargebacks, fakes and ghosting",
  "Zero protection when it goes wrong",
]

const WITH = [
  "Money held safely in escrow first",
  "Both sides verified before shipping",
  "Live tracking on every package",
  "Full protection and dispute support",
]

export function BeforeAfterSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading
          eyebrow="The difference"
          title="Paying directly vs. paying with TrustLayer"
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-destructive/20 bg-destructive/[0.03] p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <Frown className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-destructive">Without TrustLayer</p>
                <p className="text-lg font-bold text-foreground">Paying a stranger directly</p>
              </div>
            </div>
            <ul className="space-y-3">
              {WITHOUT.map((t, i) => (
                <Row key={t} text={t} tone="bad" index={i} />
              ))}
            </ul>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-success/30 bg-gradient-to-br from-success/[0.07] to-primary/[0.05] p-8 shadow-lg shadow-success/5"
          >
            <div className="absolute right-5 top-5 rounded-full bg-success px-3 py-1 text-xs font-bold text-white">
              Recommended
            </div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/15 text-success">
                <Smile className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-success">With TrustLayer</p>
                <p className="text-lg font-bold text-foreground">Paying through escrow</p>
              </div>
            </div>
            <ul className="space-y-3">
              {WITH.map((t, i) => (
                <Row key={t} text={t} tone="good" index={i} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Row({ text, tone, index }: { text: string; tone: "good" | "bad"; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
      className="flex items-center gap-3"
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white",
          tone === "good" ? "bg-success" : "bg-destructive",
        )}
      >
        {tone === "good" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className={cn("text-[15px] font-medium", tone === "good" ? "text-foreground" : "text-muted-foreground line-through decoration-destructive/40")}>
        {text}
      </span>
    </motion.li>
  )
}
