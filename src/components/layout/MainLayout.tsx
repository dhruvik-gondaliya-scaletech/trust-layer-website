import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface MainLayoutProps {
  children: ReactNode
  /** Overrides the root wrapper — use for full-bleed page backgrounds. */
  className?: string
  /** Overrides the centered <main> element (padding / max-width). */
  mainClassName?: string
}

export function MainLayout({ children, className, mainClassName }: MainLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background font-sans antialiased",
        className,
      )}
    >
      <Header />
      <main
        className={cn(
          "mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 md:px-6 lg:px-8",
          mainClassName,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
