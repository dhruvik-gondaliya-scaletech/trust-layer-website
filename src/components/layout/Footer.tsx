export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-primary">TrustLayer</span>
            <p className="text-sm text-muted-foreground">
              Secure deals and payments, unified in one platform.
            </p>
          </div>
          
          <div className="flex gap-4 lg:gap-8">
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex items-center justify-center md:justify-start">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TrustLayer Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
