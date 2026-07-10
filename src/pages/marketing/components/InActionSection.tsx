import * as React from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { ShieldCheck, CheckCheck, Lock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "../lib/primitives"

type Msg =
  | { kind: "them"; text: string }
  | { kind: "me"; text: string }
  | { kind: "deal" }
  | { kind: "system"; text: string }

const SCRIPT: Msg[] = [
  { kind: "them", text: "Hey! Still have the film camera for $420? 📷" },
  { kind: "me", text: "Yep! It's yours. How do you want to pay?" },
  { kind: "them", text: "Honestly a little nervous sending $420 to someone I don't know 😅" },
  { kind: "me", text: "Same here tbh. Let's just use TrustLayer 👇" },
  { kind: "deal" },
  { kind: "system", text: "Buyer paid $420 — funds secured in escrow 🔒" },
  { kind: "me", text: "Perfect, shipping it out today 🚚" },
  { kind: "system", text: "Delivered · Buyer confirmed the item ✅" },
  { kind: "system", text: "$420 released to seller 🎉" },
]

export function InActionSection() {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setCount(SCRIPT.length)
      return
    }
    setCount(1)
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= SCRIPT.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 1100)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  const visible = SCRIPT.slice(0, count)

  return (
    <section className="bg-background py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="TrustLayer in action"
            title="It fits right into the chat you're already in."
            subtitle="No leaving the conversation, no awkward bank transfers. Drop a TrustLayer link and the whole deal happens safely — right where you found it."
          />
          <ul className="mt-8 space-y-4">
            {[
              { icon: Lock, text: "Money is held safely the moment the buyer pays." },
              { icon: ShieldCheck, text: "Both people are verified before anything ships." },
              { icon: Sparkles, text: "Funds release automatically once the buyer confirms." },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-base font-medium text-foreground/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phone chat mockup */}
        <div ref={ref} className="flex justify-center">
          <div className="relative w-full max-w-[360px] rounded-[36px] border-[8px] border-foreground/90 bg-foreground/90 shadow-2xl">
            <div className="overflow-hidden rounded-[28px] bg-[#e9edf2]">
              {/* chat header */}
              <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-sm font-bold text-white">
                  S
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">stranger_seller</p>
                  <p className="text-[11px] text-success">online</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  <ShieldCheck className="h-3 w-3" /> Protected
                </span>
              </div>

              {/* messages */}
              <div className="flex h-[420px] flex-col gap-2.5 overflow-hidden px-3.5 py-4">
                <AnimatePresence initial={false}>
                  {visible.map((m, i) => (
                    <Bubble key={i} msg={m} reduce={!!reduce} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Bubble({ msg, reduce }: { msg: Msg; reduce: boolean }) {
  const anim = reduce
    ? {}
    : { initial: { opacity: 0, y: 12, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } }

  if (msg.kind === "system") {
    return (
      <motion.div {...anim} transition={{ duration: 0.3 }} className="flex justify-center">
        <span className="rounded-full bg-success/15 px-3 py-1 text-center text-[11px] font-semibold text-success">
          {msg.text}
        </span>
      </motion.div>
    )
  }

  if (msg.kind === "deal") {
    return (
      <motion.div {...anim} transition={{ duration: 0.35 }} className="flex justify-center">
        <div className="w-[85%] rounded-2xl border border-primary/20 bg-white p-3 shadow-md">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold text-foreground">TrustLayer deal</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Retro Film Camera</span>
            <span className="font-bold text-foreground">$420</span>
          </div>
          <div className="mt-2.5 flex items-center justify-center rounded-lg bg-primary py-1.5 text-xs font-bold text-white">
            Pay safely →
          </div>
        </div>
      </motion.div>
    )
  }

  const mine = msg.kind === "me"
  return (
    <motion.div
      {...anim}
      transition={{ duration: 0.3 }}
      className={cn("flex", mine ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
          mine
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md bg-white text-foreground",
        )}
      >
        {msg.text}
        {mine && (
          <span className="ml-1 inline-flex translate-y-0.5">
            <CheckCheck className="h-3.5 w-3.5 text-white/70" />
          </span>
        )}
      </div>
    </motion.div>
  )
}
