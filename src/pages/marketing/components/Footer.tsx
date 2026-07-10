import { ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">TrustLayer</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
        
        <div className="text-center md:text-left text-sm text-muted-foreground border-t pt-8">
          &copy; {new Date().getFullYear()} TrustLayer Inc. All rights reserved. Built for secure private transactions.
        </div>
      </div>
    </footer>
  )
}
