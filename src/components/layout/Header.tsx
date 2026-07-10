import { useState } from "react"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NAV_LINKS = [
  { name: "Deals", href: "#deals" },
  { name: "Payments", href: "#payments" },
  { name: "Disputes", href: "#disputes" },
  { name: "Wallet", href: "#wallet" },
  { name: "Help", href: "#help" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-6 lg:px-8">
        
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
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">TrustLayer</span>
          </a>
        </div>

        {/* Center/Main Navigation (Tablet + Desktop) */}
        <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Section: Notifications & Avatar */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            {/* Notification Badge Example */}
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-destructive" />
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
