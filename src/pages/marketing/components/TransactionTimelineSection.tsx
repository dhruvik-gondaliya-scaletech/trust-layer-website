import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function TransactionTimelineSection() {
  const timeline = [
    "Deal Created",
    "Buyer Pays",
    "Funds Protected",
    "Seller Ships",
    "Buyer Receives",
    "Funds Released"
  ]

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Transaction Timeline</h2>
        </div>

        <div className="relative">
          {/* Connecting Line background */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full" />
          
          {/* Animated fill line */}
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-6 left-0 h-1 bg-primary rounded-full z-0"
          />

          <div className="relative z-10 flex justify-between items-start">
            {timeline.map((step, index) => (
              <div key={index} className="flex flex-col items-center group w-16 sm:w-24 md:w-32">
                <motion.div 
                  initial={{ scale: 0, backgroundColor: "hsl(var(--muted))" }}
                  whileInView={{ scale: 1, backgroundColor: "hsl(var(--primary))" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: (index * 0.3) }}
                  className="w-12 h-12 rounded-full border-4 border-background flex items-center justify-center text-white mb-4 shadow-sm"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: (index * 0.3) + 0.1 }}
                  className="text-xs sm:text-sm font-semibold text-center text-foreground group-hover:text-primary transition-colors"
                >
                  {step}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
