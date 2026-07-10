import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#demo", label: "Live demo" },
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "#faq", label: "FAQ" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-white/70 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">TrustLayer</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" asChild className="hidden font-medium sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild className="h-11 px-5 font-semibold shadow-sm shadow-primary/20">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
