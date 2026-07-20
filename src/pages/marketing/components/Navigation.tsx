import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "#how-it-works", label: "How it Works" },
  { href: "#demo", label: "Demo" },
  { href: "#comparison", label: "Comparison" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      
      // Determine active section
      let current = ""
      const offset = 100 // slightly below sticky header
      LINKS.forEach(link => {
        const id = link.href.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          if (window.scrollY >= el.offsetTop - offset) {
            current = link.href
          }
        }
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      if (window.location.hash === href) return;
      
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', href)
        setMenuOpen(false)
        return
      }

      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: 'smooth'
        })
        window.history.pushState(null, '', href)
      }
      setMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-border/60 bg-white/90 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <a href="#top" onClick={(e) => handleScroll(e, '#top')} className="flex items-center gap-2 relative z-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">TrustLayer</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleScroll(e, l.href)}
              className={cn(
                "relative transition-colors hover:text-foreground",
                active === l.href ? "text-foreground font-semibold" : ""
              )}
            >
              {l.label}
              {active === l.href && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" 
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" asChild className="font-medium">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="h-11 px-5 font-semibold shadow-sm shadow-primary/20">
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[100%] border-b border-border/60 bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <nav className="flex flex-col gap-4 text-base font-medium text-muted-foreground">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleScroll(e, l.href)}
                    className={cn(
                      "transition-colors",
                      active === l.href ? "text-foreground font-bold" : "hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                <Button variant="outline" asChild className="w-full justify-center h-12" onClick={() => setMenuOpen(false)}>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full justify-center h-12 shadow-sm shadow-primary/20" onClick={() => setMenuOpen(false)}>
                  <Link to="/register">Create Free Account</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
