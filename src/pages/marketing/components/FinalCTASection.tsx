import { motion, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "../lib/primitives"

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 53) % 100}%`,
  top: `${(i * 37) % 100}%`,
  size: 4 + (i % 4) * 3,
  delay: (i % 6) * 0.5,
  duration: 6 + (i % 5),
}))

export function FinalCTASection() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-violet-700 py-28 text-white">
      {/* moving glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-blob-drift" />
        <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl animate-blob-drift" style={{ animationDelay: "-8s" }} />
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={reduce ? {} : { y: [0, -24, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
        >
          <ShieldCheck className="h-4 w-4" /> Free to start · No card required
        </motion.span>

        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        >
          Ready for your next deal?
        </motion.h2>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/85"
        >
          Join thousands buying and selling with total confidence. Create your free account and make
          your next transaction the safe one.
        </motion.p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic strength={0.4}>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group h-14 gap-2 px-8 text-base font-semibold text-primary shadow-xl transition-transform hover:scale-[1.03]"
            >
              <Link to="/register">
                Create Free Account
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Magnetic>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 border-white/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* animated wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-[0]">
        <motion.svg
          viewBox="0 0 2880 120"
          className="h-[80px] w-[200%]"
          preserveAspectRatio="none"
          animate={reduce ? {} : { x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <path
            fill="rgba(255,255,255,0.12)"
            d="M0,64 C240,120 480,0 720,48 C960,96 1200,32 1440,64 C1680,120 1920,0 2160,48 C2400,96 2640,32 2880,64 L2880,120 L0,120 Z"
          />
        </motion.svg>
      </div>
    </section>
  )
}
