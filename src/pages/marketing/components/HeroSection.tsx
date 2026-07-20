import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"
import { ShieldCheck, ArrowRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic, CountUp } from "../lib/primitives"
import { BRANDS } from "../lib/brands"
import { LiveEscrowJourney } from "./LiveEscrowJourney"

const ROTATING = [
  "Facebook Marketplace?",
  "Instagram?",
  "Discord?",
  "WhatsApp?",
  "Craigslist?",
]

const STATS = [
  { value: 12.8, prefix: "$", suffix: "M", decimals: 1, label: "Protected" },
  { value: 18432, suffix: "", decimals: 0, label: "Secure deals" },
  { value: 1, prefix: "<", suffix: "%", decimals: 0, label: "Disputes" },
  { value: 0, suffix: "", decimals: 0, label: "Chargeback fraud" },
]

// Fixed positions for the floating marketplace logos (percent-based).
const FLOAT_POS = [
  { top: "6%", left: "-2%", depth: 1.4, delay: 0 },
  { top: "0%", left: "60%", depth: 0.8, delay: 0.4 },
  { top: "24%", left: "88%", depth: 1.7, delay: 0.8 },
  { top: "70%", left: "-4%", depth: 1.1, delay: 0.2 },
  { top: "88%", left: "30%", depth: 1.9, delay: 0.6 },
  { top: "80%", left: "82%", depth: 0.9, delay: 1.0 },
]

export function HeroSection() {
  const reduce = useReducedMotion()
  const [rot, setRot] = React.useState(0)
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setRot((r) => (r + 1) % ROTATING.length), 2600)
    return () => window.clearInterval(id)
  }, [reduce])

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const { innerWidth, innerHeight } = window
    setMouse({
      x: (e.clientX / innerWidth - 0.5) * 2,
      y: (e.clientY / innerHeight - 0.5) * 2,
    })
  }

  return (
    <section
      onMouseMove={handleMouse}
      className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20"
    >
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-blob-drift" />
        <div className="absolute top-40 -right-20 h-[380px] w-[380px] rounded-full bg-violet-400/10 blur-3xl animate-blob-drift" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 -left-16 h-[360px] w-[360px] rounded-full bg-sky-300/10 blur-3xl animate-blob-drift" style={{ animationDelay: "-12s" }} />
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Left column */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <motion.span
            initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <ShieldCheck className="h-4 w-4" />
            Trusted for private transactions
          </motion.span>

          <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4.25rem]">
            You found the deal.
            <br />
            <motion.span
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-gradient-brand animate-gradient-x"
            >
              We make it safe.
            </motion.span>
          </h1>

          {/* rotating supporting line */}
          <div className="mb-10 text-lg text-muted-foreground flex flex-col gap-1.5 h-[100px]">
            <span>Found something on</span>
            <div className="relative h-8 w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rot}
                  initial={reduce ? undefined : { opacity: 0, y: 10 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 font-bold text-primary px-3 py-1 bg-primary/10 rounded-md"
                >
                  {ROTATING[rot]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="block mt-1 font-medium text-foreground/80">
              TrustLayer protects every transaction.
            </span>
          </div>

          {/* CTAs */}
          <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Magnetic strength={0.4}>
              <Button
                asChild
                size="lg"
                className="group relative h-14 overflow-hidden px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/40"
              >
                <Link to="/register">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Create Free Account
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group h-14 gap-2 px-6 text-base font-semibold"
            >
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("how-it-works")
                  if (el) {
                    window.scrollTo({
                      top: el.offsetTop - 80,
                      behavior: "smooth",
                    })
                    window.history.pushState(null, "", "#how-it-works")
                  }
                }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                Watch How It Works
              </a>
            </Button>
          </div>

          {/* live trust counter */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  <CountUp
                    to={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                </div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column - live journey with floating marketplace logos */}
        <div className="relative mx-auto flex w-full max-w-[500px] items-center justify-center">
          {/* floating brand logos */}
          {FLOAT_POS.map((pos, i) => {
            const brand = BRANDS[i % BRANDS.length]
            return (
              <motion.div
                key={brand.name}
                className="absolute z-0 hidden sm:flex"
                style={{
                  top: pos.top,
                  left: pos.left,
                  x: mouse.x * pos.depth * -10,
                  y: mouse.y * pos.depth * -10,
                }}
                initial={reduce ? undefined : { opacity: 0, scale: 0.5 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + pos.delay, type: "spring", stiffness: 200 }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-white shadow-lg animate-float-slow"
                  style={{ animationDelay: `${pos.delay}s`, color: brand.color }}
                  title={brand.name}
                >
                  <brand.Glyph className="h-6 w-6" />
                </div>
              </motion.div>
            )
          })}

          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: mouse.x * 6, y: mouse.y * 6 }}
            className="relative z-10 flex w-full justify-center"
          >
            <LiveEscrowJourney />
          </motion.div>

          {/* floating "no fraud" chip */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute -bottom-4 left-2 z-20 hidden items-center gap-2 rounded-full border border-border bg-white px-3 py-2 shadow-xl sm:flex"
          >
            <Sparkles className="h-4 w-4 text-success" />
            <span className="text-xs font-semibold text-foreground">Zero chargeback fraud</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
