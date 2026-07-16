import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CreditCard, Box, ShieldCheck, Trophy, AlertTriangle, Wallet, MessageSquare, Mail, ChevronDown } from "lucide-react"

const TOPICS = [
  { icon: <CreditCard className="h-6 w-6" />, title: "Payments", desc: "Fees, escrows, and bank transfers" },
  { icon: <Box className="h-6 w-6" />, title: "Shipping", desc: "Tracking, insurance, and carriers" },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Verification", desc: "Identity and item authenticity" },
  { icon: <Trophy className="h-6 w-6" />, title: "Trust Score", desc: "How it works and how to improve it" },
  { icon: <AlertTriangle className="h-6 w-6" />, title: "Disputes", desc: "Resolutions, claims, and returns" },
  { icon: <Wallet className="h-6 w-6" />, title: "Wallet", desc: "Balances, holds, and withdrawals" },
]

export function HelpPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-12">
        
        {/* Hero Search */}
        <div className="text-center max-w-2xl mx-auto pt-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">How can we help?</h1>
          <p className="text-muted-foreground mt-3 text-lg">Search our knowledge base or browse topics below.</p>
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for articles, questions..."
              className="pl-12 h-14 rounded-xl text-lg shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-slate-200"
            />
          </div>
        </div>
        
        {/* Popular Topics */}
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Popular Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic, i) => (
              <div key={i} className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-primary/50 cursor-pointer transition-colors group">
                <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                  {topic.icon}
                </div>
                <h3 className="font-semibold text-slate-900 text-lg">{topic.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Need more help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-50 flex shrink-0 items-center justify-center text-emerald-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 text-lg">Live Chat</h3>
                <p className="text-sm text-slate-500 mt-1">Get immediate assistance from our support team (24/7).</p>
                <Button className="mt-4">Start Chat</Button>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex shrink-0 items-center justify-center text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 text-lg">Email Support</h3>
                <p className="text-sm text-slate-500 mt-1">Send us an email and we'll respond within 24 hours.</p>
                <Button variant="outline" className="mt-4">Send Email</Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ - Accordion */}
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <div className="rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden divide-y">
            {[
              "How does TrustLayer protect my payments?",
              "What happens if the buyer disputes an item?",
              "How long does it take for funds to be released?",
              "Can I change the shipping method after creating a deal?"
            ].map((q, i) => (
              <div key={i} className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                <h3 className="font-medium text-slate-900">{q}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  )
}
