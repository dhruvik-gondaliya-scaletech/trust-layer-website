import type { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
