import { motion } from "framer-motion"
import { MessageCircle, ShoppingBag, ShoppingCart, Store, Users2, MessageSquare, MonitorSmartphone, Gamepad2, PackageSearch, Users } from "lucide-react"

export function SupportedPlatformsSection() {
  const platforms = [
    { icon: Store, name: "Facebook Marketplace" },
    { icon: Users2, name: "Facebook Groups" },
    { icon: ShoppingBag, name: "Instagram" },
    { icon: MessageSquare, name: "Discord" },
    { icon: MessageCircle, name: "WhatsApp" },
    { icon: MonitorSmartphone, name: "Telegram" },
    { icon: PackageSearch, name: "Craigslist" },
    { icon: ShoppingCart, name: "eBay Local" },
    { icon: Gamepad2, name: "OfferUp" },
    { icon: Users, name: "Marketplaces" },
  ]

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Use TrustLayer Anywhere
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-default">
                <platform.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-primary-foreground/90">{platform.name}</span>
            </motion.div>
          ))}
        </div>
        
        <p className="text-xl md:text-2xl font-medium text-primary-foreground/90 max-w-2xl mx-auto">
          Wherever you find the deal, <br className="hidden sm:block" /> TrustLayer makes it safe.
        </p>
      </div>
    </section>
  )
}
