import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, MessageCircleQuestion } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "../lib/primitives"

interface Faq {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: "How does TrustLayer actually work?",
    a: "The buyer pays into TrustLayer instead of paying the seller directly. We hold the money safely in escrow and tell the seller to ship. Once the buyer confirms the item is as described, we release the funds to the seller.",
  },
  {
    q: "When does the seller get paid?",
    a: "The moment the buyer confirms they received the item in the agreed condition. If tracking shows delivery and the buyer doesn't respond within the agreed window, funds can auto-release to protect the seller.",
  },
  {
    q: "What if something goes wrong?",
    a: "If the item never arrives or isn't as described, the buyer can open a dispute. Our resolution team reviews evidence from both sides and mediates a fair outcome — money stays protected the whole time.",
  },
  {
    q: "Is my money and identity safe?",
    a: "Yes. We use bank-level 256-bit encryption, strict identity verification, and regulated trust accounts. Your funds are never mixed with anyone else's and your data is fully encrypted.",
  },
  {
    q: "Can I use it outside of marketplaces?",
    a: "Absolutely. TrustLayer works for any private deal — Instagram, Discord, WhatsApp, Craigslist, forums, or even in person. Just create a deal and share the secure link.",
  },
  {
    q: "How much does TrustLayer cost?",
    a: "Creating an account is free. A small, transparent escrow fee applies per completed transaction — always shown up front before anyone pays. No hidden charges.",
  },
]

const POPULAR = ["seller get paid", "cost", "dispute", "safe"]

export function FAQSection() {
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState<number | null>(0)

  const filtered = FAQS.map((f, i) => ({ ...f, i })).filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section id="faq" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-[760px] px-6">
        <SectionHeading
          eyebrow="Questions?"
          title="Everything you're wondering, answered."
          className="mb-8"
        />

        {/* search */}
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an answer…"
            className="h-14 w-full rounded-2xl border border-border bg-white pl-12 pr-4 text-base shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {/* popular */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Popular:</span>
          {POPULAR.map((p) => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className="rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>

        {/* list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white py-12 text-center">
              <MessageCircleQuestion className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No matches. Try another word — or just{" "}
                <a href="#" className="font-semibold text-primary hover:underline">
                  ask our team
                </a>
                .
              </p>
            </div>
          )}

          {filtered.map((f) => {
            const isOpen = open === f.i
            return (
              <div
                key={f.i}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-colors",
                  isOpen ? "border-primary/40 shadow-md shadow-primary/5" : "border-border",
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : f.i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-foreground">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen ? "bg-primary text-white" : "bg-secondary text-foreground",
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
