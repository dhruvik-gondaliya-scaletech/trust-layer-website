import { useState } from "react"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { NavLink, Link } from "react-router-dom"

const NAV_LINKS = [
  { name: "Deals", href: "/deals" },
  { name: "Payments", href: "/payments" },
  { name: "Disputes", href: "/disputes" },
  { name: "Wallet", href: "/wallet" },
  { name: "Help", href: "/help" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-6 lg:px-8">
        
        {/* Left Section: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-bold tracking-tight">TrustLayer</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block text-lg font-medium transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">TrustLayer</span>
          </Link>
        </div>

        {/* Center/Main Navigation (Tablet + Desktop) */}
        <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary relative py-1 ${
                  isActive 
                    ? "text-primary font-semibold after:absolute after:-bottom-[24px] after:left-0 after:h-[2px] after:w-full after:bg-primary" 
                    : "text-muted-foreground"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Notifications & Avatar */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            {/* Notification Badge — pulsing */}
            <span className="absolute right-2 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Avatar className="h-8 w-8 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>TL</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </header>
  )
}
