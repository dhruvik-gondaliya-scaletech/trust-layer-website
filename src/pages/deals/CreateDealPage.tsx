import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, animate, useReducedMotion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CameraCaptureModal } from "@/features/deals/components/CameraCaptureModal"
import { VideoVerificationModal } from "@/features/deals/components/VideoVerificationModal"
import { CertificationModal } from "@/features/deals/components/CertificationModal"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  Video,
  FileBadge,
  Copy,
  ExternalLink,
  ChevronDown,
  Plus,
  Trash2,
  Play,
  Trophy,
  type LucideIcon,
} from "lucide-react"

import pokemonMain from "@/assets/pokemon-main.jpg"
import pokemonFront from "@/assets/pokemon-front.jpg"
import pokemonBack from "@/assets/pokemon-back.jpg"
import pokemonDetail from "@/assets/pokemon-detail.jpg"
import pokemonSide from "@/assets/pokemon-side.jpg"

/* -------------------------------------------------------------------------- */
/*  Types & Constants                                                         */
/* -------------------------------------------------------------------------- */

const CONFETTI = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * Math.PI * 2
  return {
    id: i,
    x: Math.cos(angle) * (150 + (i % 4) * 50),
    y: Math.sin(angle) * (150 + (i % 3) * 50),
    color: ["#2563eb", "#22c55e", "#a855f7", "#f59e0b", "#ef4444"][i % 5],
    delay: (i % 5) * 0.05,
  }
})

type Step = 1 | 2 | 3 | 4 | 5 | 6

type DealState = {
  title: string
  price: string
  productType: string
  condition: string
  orderType: string
  isGraded: boolean
  serialNumber: string
  description: string
  
  // Verification
  mainPhoto: boolean
  additionalPhotos: number // 0–4 photos added
  video: boolean
  certification: boolean
  
  // Shipping
  shippingMethod: string
  shipsIn: string
  shippingCost: string
  
  // Fees
  feeSplit: "split" | "buyer" | "seller"
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

export function CreateDealPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [deal, setDeal] = useState<DealState>({
    title: "",
    price: "",
    productType: "",
    condition: "",
    orderType: "online",
    isGraded: false,
    serialNumber: "",
    description: "",
    mainPhoto: false,
    additionalPhotos: 0,
    video: false,
    certification: false,
    shippingMethod: "standard",
    shipsIn: "2",
    shippingCost: "",
    feeSplit: "split"
  })

  // A single shared camera drives every capture step. `job` records what it's
  // capturing for so the guidance copy and the accept behaviour adapt.
  const [cameraJob, setCameraJob] = useState<{ target: "main" | "additional"; replace?: boolean } | null>(null)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [certModalOpen, setCertModalOpen] = useState(false)
  const [maxTrustSeen, setMaxTrustSeen] = useState(false)
  const [maxTrustModalOpen, setMaxTrustModalOpen] = useState(false)

  // Calculations
  const priceNum = parseFloat(deal.price) || 0
  const feePercent = 0.03
  let feeAmount = priceNum * feePercent
  if (deal.feeSplit === "split") {
    feeAmount = feeAmount / 2
  }

  // Trust Score — single source of truth, mirroring the approved mobile buckets.
  // Item Details 20 · Main Photo 15 · Additional Photos 15 · Product Video 30 · Certification 20 = 100
  const itemFields = [deal.title, deal.price, deal.productType, deal.condition, deal.description]
  const itemFilled = itemFields.filter((f) => String(f).length > 0).length
  const itemScore = Math.round((itemFilled / itemFields.length) * 20)
  const mainScore = deal.mainPhoto ? 15 : 0
  const addlScore = Math.round((deal.additionalPhotos / 4) * 15)
  const videoScore = deal.video ? 30 : 0
  const certScore = deal.certification ? 20 : 0
  const trustScore = itemScore + mainScore + addlScore + videoScore + certScore

  useEffect(() => {
    if (trustScore === 100 && !maxTrustSeen) {
      const t = setTimeout(() => {
        setMaxTrustModalOpen(true)
        setMaxTrustSeen(true)
      }, 800) // allow the score card animation to partially finish
      return () => clearTimeout(t)
    }
  }, [trustScore, maxTrustSeen])

  const breakdown: Bucket[] = [
    { label: "Item Details", value: itemScore, max: 20 },
    { label: "Main Photo", value: mainScore, max: 15 },
    { label: "Additional Photos", value: addlScore, max: 15 },
    { label: "Product Video", value: videoScore, max: 30 },
    { label: "Certification Verification", value: certScore, max: 20 },
  ]

  let nextAction = "You're all set"
  if (itemScore < 20) nextAction = "Complete Item Details"
  else if (!deal.mainPhoto) nextAction = "Take Main Photo"
  else if (deal.additionalPhotos < 4) nextAction = "Add Additional Photos"
  else if (!deal.video) nextAction = "Record Product Video"
  else if (!deal.certification) nextAction = "Upload Certificate"

  const status: TrustStatus =
    trustScore === 100 ? "MAXIMUM TRUST" : trustScore >= 90 ? "EXCELLENT" : trustScore >= 70 ? "HIGH" : trustScore >= 40 ? "MEDIUM" : "LOW"

  /* -------------------------------------------------------------------------- */
  /*  Handlers                                                                  */
  /* -------------------------------------------------------------------------- */

  const updateDeal = (updates: Partial<DealState>) => {
    setDeal(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => setStep(s => Math.min(s + 1, 6) as Step)
  const handleBack = () => setStep(s => Math.max(s - 1, 1) as Step)

  const openMainCamera = () => setCameraJob({ target: "main" })
  const openAdditionalCamera = (replace = false) => setCameraJob({ target: "additional", replace })

  /* -------------------------------------------------------------------------- */
  /*  Render Helpers                                                            */
  /* -------------------------------------------------------------------------- */

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Item Details</h2>
              <p className="text-muted-foreground mt-1">Provide clear, accurate details to build buyer trust.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  placeholder="e.g. Shadowless Mewtwo PSA 10" 
                  value={deal.title} 
                  onChange={e => updateDeal({ title: e.target.value })} 
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={deal.price} 
                    onChange={e => updateDeal({ price: e.target.value })} 
                    className="h-12 pl-8 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Product Type</Label>
                  <Select value={deal.productType} onValueChange={v => updateDeal({ productType: v })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  <SelectContent className="max-h-[240px] rounded-[14px] overflow-y-auto">
                    <SelectItem value="trading cards">Trading Cards</SelectItem>
                    <SelectItem value="sports cards">Sports Cards</SelectItem>
                    <SelectItem value="toys">Toys</SelectItem>
                    <SelectItem value="plush">Plush</SelectItem>
                    <SelectItem value="figures">Figures</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={deal.condition} onValueChange={v => updateDeal({ condition: v })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Brand New</SelectItem>
                      <SelectItem value="mint">Mint / Like New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Order Type</Label>
                <Select value={deal.orderType} onValueChange={v => updateDeal({ orderType: v })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-[14px]">
                    <SelectItem value="online">Online Transaction</SelectItem>
                    <SelectItem value="in_person">In-Person Transaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div 
                className={cn("flex items-center gap-3 h-[56px] px-4 rounded-[14px] border bg-white cursor-pointer transition-colors", deal.isGraded ? "border-primary" : "border-slate-200 hover:border-slate-300")}
                onClick={() => updateDeal({ isGraded: !deal.isGraded })}
              >
                <Checkbox 
                  id="graded" 
                  checked={deal.isGraded} 
                  onCheckedChange={(c) => updateDeal({ isGraded: !!c })} 
                  className="rounded text-primary border-slate-300 pointer-events-none"
                />
                <Label htmlFor="graded" className="font-semibold text-slate-800 cursor-pointer flex-1">Graded Product</Label>
              </div>

              <AnimatePresence>
                {deal.isGraded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden p-1 -m-1"
                  >
                    <Label>Serial Number</Label>
                    <Input 
                      placeholder="Enter serial number..." 
                      value={deal.serialNumber} 
                      onChange={e => updateDeal({ serialNumber: e.target.value })} 
                      className="h-12"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Describe any flaws, specific shipping requirements, or inclusions..." 
                  value={deal.description} 
                  onChange={e => updateDeal({ description: e.target.value })} 
                  className="min-h-[120px] resize-none"
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <Step2Verification
              deal={deal}
              updateDeal={updateDeal}
              openMainCamera={openMainCamera}
              openAdditionalCamera={openAdditionalCamera}
              openVideoModal={() => setVideoModalOpen(true)}
              openCertModal={() => setCertModalOpen(true)}
              trustScore={trustScore}
            />
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Shipping</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Handling Time</Label>
                <Select value={deal.shipsIn} onValueChange={v => updateDeal({ shipsIn: v })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Same day or 1 business day</SelectItem>
                    <SelectItem value="2">2-3 business days</SelectItem>
                    <SelectItem value="5">Within 5 business days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-amber-600 flex items-start gap-2 mt-2">
                  <span className="font-bold shrink-0">⚠</span> 
                  If you do not ship within the selected handling time, the transaction may be automatically cancelled.
                </p>
              </div>

              <div className="space-y-3">
                <Label>Shipping Cost (USD)</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-slate-500 font-medium">$</span>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="pl-8 h-12"
                    value={deal.shippingCost}
                    onChange={e => updateDeal({ shippingCost: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Platform Fee</h2>
              <p className="text-muted-foreground mt-1">TrustLayer charges a secure 3% escrow fee. Who pays this?</p>
            </div>

            <RadioGroup 
              value={deal.feeSplit} 
              onValueChange={v => updateDeal({ feeSplit: v as any })}
              className="space-y-4"
            >
              {[
                { id: "split", title: "Split 50/50", desc: "You and the buyer each pay 1.5%", fee: feeAmount * (deal.feeSplit === "split" ? 1 : 0.5) },
                { id: "buyer", title: "Buyer Pays", desc: "Buyer pays the full 3% fee", fee: 0 },
                { id: "seller", title: "I Pay (Seller)", desc: "You cover the full 3% fee", fee: feeAmount * (deal.feeSplit === "seller" ? 1 : 2) },
              ].map(opt => (
                <Label 
                  key={opt.id}
                  htmlFor={`fee-${opt.id}`}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all",
                    deal.feeSplit === opt.id ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={opt.id} id={`fee-${opt.id}`} />
                    <div>
                      <h4 className="font-semibold text-slate-900">{opt.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{opt.desc}</p>
                    </div>
                  </div>
                  {opt.id !== "buyer" && (
                    <span className={cn("font-medium", deal.feeSplit === opt.id ? "text-primary" : "text-slate-500")}>
                      -${(priceNum * (opt.id === "split" ? 0.015 : 0.03)).toFixed(2)}
                    </span>
                  )}
                </Label>
              ))}
            </RadioGroup>

            {/* Estimated Earnings Card */}
            <div className="mt-8 rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-slate-900">Estimated Earnings</h3>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Tap for breakdown</p>
                </div>
                <ChevronDown className="h-5 w-5 text-slate-400" />
              </div>
              
              <div className="p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between text-[15px]">
                  <span className="text-slate-600 font-medium">Item Price</span>
                  <span className="font-semibold text-slate-900">${priceNum.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-[15px]">
                  <div className="flex flex-col">
                    <span className="text-slate-600 font-medium">Platform Fee</span>
                    <span className="text-[13px] text-muted-foreground mt-0.5">Non-refundable</span>
                  </div>
                  <span className="font-medium text-slate-500">
                    -${(priceNum * (deal.feeSplit === "split" ? 0.015 : deal.feeSplit === "seller" ? 0.03 : 0)).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[15px] pb-5 border-b border-slate-200/60">
                  <span className="text-slate-600 font-medium">Buyer Pays</span>
                  <span className="font-semibold text-slate-900">
                    ${(priceNum + (priceNum * (deal.feeSplit === "split" ? 0.015 : deal.feeSplit === "buyer" ? 0.03 : 0))).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-slate-900">Seller Receives</span>
                  <span className="font-bold text-[#2F5EFF] text-lg">
                    ${(priceNum - (priceNum * (deal.feeSplit === "split" ? 0.015 : deal.feeSplit === "seller" ? 0.03 : 0))).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Review & Publish</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => setStep(1)} className="rounded-full px-5">
                Edit Deal
              </Button>
            </div>

            <div className="rounded-2xl border bg-white overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
              {/* Product Media */}
              <div className="p-6 pb-0 space-y-6">
                <div className="h-[300px] w-full bg-slate-100 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden relative group">
                  {deal.mainPhoto ? (
                    <>
                      <img src={pokemonMain} alt="Main Photo" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {/* Camera Capture Time Overlay */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-white/90 text-[11px] font-mono font-medium tracking-wide flex items-center gap-1.5 shadow-lg border border-white/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        14:32:05 EST
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                      <span className="text-sm font-medium">No main photo</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {/* Additional Photos */}
                  {Array.from({ length: Math.max(1, deal.additionalPhotos) }).map((_, i) => {
                    const addlPhotos = [pokemonFront, pokemonBack, pokemonSide, pokemonDetail];
                    return (
                    <div key={`photo-${i}`} className="h-24 w-24 shrink-0 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden relative group">
                      {deal.additionalPhotos > i ? (
                        <>
                          <img src={addlPhotos[i % addlPhotos.length]} alt={`Additional Photo ${i + 1}`} className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-110" />
                          {/* Camera Capture Time Overlay */}
                          <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-white/90 text-[8px] font-mono tracking-wider border border-white/10">
                            14:32:0{i + 6}
                          </div>
                        </>
                      ) : (
                        <ImageIcon className="h-7 w-7 text-slate-300" />
                      )}
                    </div>
                  )})}
                  
                  {/* Video */}
                  <div className="h-24 w-24 shrink-0 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden relative">
                    {deal.video ? (
                      <div className="h-full w-full flex items-center justify-center bg-[#2F5EFF]/5 text-[#2F5EFF]">
                        <Play className="h-8 w-8 ml-1" />
                      </div>
                    ) : (
                      <Play className="h-7 w-7 text-slate-300 ml-0.5" />
                    )}
                  </div>
                  
                  {/* Certification */}
                  <div className="h-24 w-24 shrink-0 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden relative">
                    {deal.certification ? (
                      <div className="h-full w-full flex items-center justify-center bg-emerald-50/50 text-emerald-600">
                        <FileBadge className="h-8 w-8" />
                      </div>
                    ) : (
                      <FileBadge className="h-7 w-7 text-slate-300" />
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Price */}
              <div className="px-6 pb-6 pt-2 border-b border-slate-100">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900">{deal.title || "Untitled Deal"}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {deal.isGraded && <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-xs py-1 px-3">Authenticated</Badge>}
                      {deal.orderType === "online" && <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-xs py-1 px-3">Online Transaction</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold tracking-tight text-[#2F5EFF]">
                      ${priceNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-6 border-b border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-5">Item Details</h4>
                <dl className="space-y-4 text-[15px]">
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="text-slate-500 font-medium">Condition</dt>
                    <dd className="col-span-2 font-medium text-slate-900">{deal.condition ? deal.condition.charAt(0).toUpperCase() + deal.condition.slice(1) : "—"}</dd>
                  </div>
                  {deal.isGraded && (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-slate-500 font-medium">Grade</dt>
                        <dd className="col-span-2 font-medium text-slate-900">Authenticated / Graded</dd>
                      </div>
                      {deal.serialNumber && (
                        <div className="grid grid-cols-3 gap-4">
                          <dt className="text-slate-500 font-medium">Serial</dt>
                          <dd className="col-span-2 font-medium text-slate-900">{deal.serialNumber}</dd>
                        </div>
                      )}
                    </>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="text-slate-500 font-medium">Description</dt>
                    <dd className="col-span-2 text-slate-700 leading-relaxed whitespace-pre-wrap">{deal.description || "—"}</dd>
                  </div>
                </dl>
              </div>

              {/* Transaction */}
              <div className="p-6 bg-slate-50/30">
                <h4 className="text-lg font-bold text-slate-900 mb-5">Transaction</h4>
                
                <dl className="space-y-4 text-[15px] mb-8">
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="text-slate-500 font-medium">Delivery Method</dt>
                    <dd className="col-span-2 font-medium text-slate-900">
                      {deal.shippingMethod === "local" ? "Local Pickup" : "Ship via Carrier"}
                    </dd>
                  </div>
                  {deal.shippingMethod !== "local" && (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-slate-500 font-medium">Handling Time</dt>
                        <dd className="col-span-2 font-medium text-slate-900">{deal.shipsIn} business days</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-slate-500 font-medium">Shipping Cost</dt>
                        <dd className="col-span-2 font-medium text-slate-900">
                          {parseFloat(deal.shippingCost) > 0 ? `$${parseFloat(deal.shippingCost).toFixed(2)}` : "Free"}
                        </dd>
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="text-slate-500 font-medium">Platform Fee</dt>
                    <dd className="col-span-2 font-medium text-slate-900">
                      {deal.feeSplit === "buyer" ? "Buyer Pays" : deal.feeSplit === "split" ? "Split 50/50" : "Seller Pays"}
                    </dd>
                  </div>
                </dl>

                <div className="rounded-xl border border-slate-200/60 bg-white overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="p-4 flex items-center justify-between border-b border-slate-100">
                    <div>
                      <h4 className="font-semibold text-slate-900">Estimated Earnings</h4>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-4 bg-slate-50/50 text-[15px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Item Price</span>
                      <span className="font-semibold text-slate-900">${priceNum.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span className="text-slate-600 font-medium">Platform Fee</span>
                        <span className="text-[13px] text-muted-foreground mt-0.5">Non-refundable</span>
                      </div>
                      <span className="font-medium text-slate-500">
                        -${(priceNum * (deal.feeSplit === "split" ? 0.015 : deal.feeSplit === "seller" ? 0.03 : 0)).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-5 border-b border-slate-200/60">
                      <span className="text-slate-600 font-medium">Buyer Pays</span>
                      <span className="font-semibold text-slate-900">
                        ${(priceNum + (parseFloat(deal.shippingCost) || 0) + (priceNum * (deal.feeSplit === "split" ? 0.015 : deal.feeSplit === "buyer" ? 0.03 : 0))).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-semibold text-slate-900">Seller Receives</span>
                      <span className="font-bold text-[#2F5EFF] text-lg">
                        ${(priceNum + (parseFloat(deal.shippingCost) || 0) - (priceNum * (deal.feeSplit === "split" ? 0.015 : deal.feeSplit === "seller" ? 0.03 : 0))).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Deal Published!</h2>
            <p className="text-muted-foreground mt-3 max-w-sm">Your secure TrustLayer checkout link is ready to share with your buyer.</p>
            
            <div className="mt-8 w-full max-w-md p-4 rounded-xl border-2 border-primary/20 bg-primary/5 flex items-center justify-between">
              <span className="truncate text-primary font-medium pl-2">trustlayer.io/checkout/d/8x9f2a</span>
              <Button size="sm" className="ml-4 shrink-0 rounded-lg">
                <Copy className="h-4 w-4 mr-2" /> Copy Link
              </Button>
            </div>

            <div className="mt-8 flex gap-4">
              <Button variant="outline" className="rounded-xl px-6 h-12" onClick={() => window.open('/deals', '_self')}>
                View Deal Page <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="ghost" className="rounded-xl px-6 h-12" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto w-full">
        {step < 6 && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Deal</h1>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Left Column: Journey (70%) — below Trust Score on tablet, left on desktop */}
          <div className={cn("order-2 lg:order-1 flex-1 w-full transition-all duration-500", step === 6 && "mx-auto lg:max-w-3xl")}>
            
            {step < 6 && (
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Step {step} of 5</p>
                <div className="flex gap-2 w-full max-w-sm">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s} 
                      className={cn("h-1 flex-1 rounded-full transition-all duration-500", step >= s ? "bg-primary" : "bg-slate-200")} 
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 pb-32 relative overflow-hidden min-h-[500px]">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {step < 6 && (
                <div className="absolute bottom-0 left-0 w-full p-6 border-t bg-white flex justify-between">
                  <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="h-12 rounded-[14px] px-6 text-slate-500 hover:text-slate-900">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="h-12 rounded-[14px] px-8 bg-[#2F5EFF] hover:bg-[#2F5EFF]/90 text-white shadow-sm font-semibold text-base">
                    {step === 5 ? "Publish Deal" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Trust Score card (30%) — above content on tablet, sticky sidebar on desktop */}
          {step < 6 && (
            <div className="order-1 lg:order-2 w-full lg:w-[30%] shrink-0 lg:sticky lg:top-[100px]">
              <TrustScoreCard
                score={trustScore}
                status={status}
                nextAction={nextAction}
                breakdown={breakdown}
              />
              <BuildBuyerTrustCard deal={deal} trustScore={trustScore} className="hidden lg:block mt-6" />
            </div>
          )}
        </div>
      </div>

      <VideoVerificationModal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onCapture={() => updateDeal({ video: true })}
      />
      <CertificationModal
        open={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        onCapture={() => updateDeal({ certification: true })}
      />
      
      <MaximumTrustModal 
        open={maxTrustModalOpen} 
        onOpenChange={setMaxTrustModalOpen}
      />

      {/* Shared TrustLayer camera guidance modal */}
      <CameraCaptureModal
        open={cameraJob !== null}
        onClose={() => setCameraJob(null)}
        onCapture={() => {
          if (!cameraJob) return
          if (cameraJob.target === "main") {
            updateDeal({ mainPhoto: true })
          } else if (!cameraJob.replace) {
            // Adding a photo fills the next empty slot; replacing keeps the count.
            updateDeal({ additionalPhotos: Math.min(4, deal.additionalPhotos + 1) })
          }
        }}
        heading={cameraJob?.target === "additional" ? "Additional Photo Guidelines" : "Main Photo Guidelines"}
        description={
          cameraJob?.target === "additional"
            ? "Buyers want to see all angles. Be honest about condition to build trust."
            : "This is the first photo buyers will see. Make sure it's clear, well-lit, and shows the entire item."
        }
        checklist={
          cameraJob?.target === "additional"
            ? [
                "Capture Front, Back, Side, and Details",
                "Keep the camera steady",
                "Ensure details (like corners) are in focus",
              ]
            : [
                "Use natural lighting if possible",
                "Avoid shadows on the item",
                "Place on a clean, solid background",
              ]
        }
      />
    </MainLayout>
  )
}

/* -------------------------------------------------------------------------- */
/*  Trust Score — shared card (mirrors the approved mobile card)              */
/* -------------------------------------------------------------------------- */

type TrustStatus = "LOW" | "MEDIUM" | "HIGH" | "EXCELLENT" | "MAXIMUM TRUST"
type Bucket = { label: string; value: number; max: number }

/* Smooth count-up that respects reduced motion. */
function useCountUp(value: number) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  const prev = useRef(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setN(value)
      prev.current = value
      return
    }
    const controls = animate(prev.current, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    prev.current = value
    return () => controls.stop()
  }, [value, reduce])

  return n
}

function TrustScoreCard({
  score,
  status,
  nextAction,
  breakdown,
}: {
  score: number
  status: TrustStatus
  nextAction: string
  breakdown: Bucket[]
}) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const display = useCountUp(score)

  return (
    <Card className="overflow-hidden border-0 rounded-[20px] bg-gradient-to-br from-[#2F5EFF] to-[#1E3A8A] text-white shadow-[0_8px_30px_rgba(47,94,255,0.25)]">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Trust Score</h3>
            {status === "MAXIMUM TRUST" ? (
              <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-400/20 px-2 py-0.5 text-[11px] font-bold tracking-wide text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <Trophy className="h-3 w-3" /> MAXIMUM TRUST
              </span>
            ) : (
              <span className="mt-2 inline-flex rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-bold tracking-wide">
                {status}
              </span>
            )}
          </div>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold tracking-tight">{display}</span>
            <span className="ml-1 text-sm font-medium text-white/70">/100</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-white"
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Next action + breakdown toggle */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="truncate text-sm text-white/80">
            Next: <span className="font-semibold text-white">{nextAction}</span>
          </p>
          <button
            onClick={() => setShowBreakdown((s) => !s)}
            className="flex shrink-0 items-center gap-1 text-sm font-semibold"
          >
            {showBreakdown ? "Hide Breakdown" : "View Breakdown"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", showBreakdown && "rotate-180")} />
          </button>
        </div>

        {/* Breakdown */}
        <AnimatePresence initial={false}>
          {showBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-t border-white/15 pt-4">
                {breakdown.map((b) => (
                  <div key={b.label} className="flex items-center justify-between text-sm">
                    <span className="text-white/80">{b.label}</span>
                    <span className="font-semibold">
                      {b.value === b.max ? `${b.value}/${b.max} Complete` : `${b.value}/${b.max}`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  Step 2 — Verification Journey (accordion, mirrors mobile)                 */
/* -------------------------------------------------------------------------- */

function AccordionItem({
  index,
  title,
  points,
  extra,
  icon: Icon,
  done,
  open,
  onToggle,
  children,
}: {
  index: number
  title: string
  points: string
  extra?: string
  icon: LucideIcon
  done: boolean
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm">
      <button onClick={onToggle} className="flex w-full items-center justify-between p-4 text-left">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
              done ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600",
            )}
          >
            {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">
              {index}. {title}
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {points}
              {extra ? ` · ${extra}` : ""}
            </p>
          </div>
        </div>
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MaximumTrustModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const reduce = useReducedMotion()
  
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" 
      />
      
      {/* Confetti (only plays on open, fades out after 3s) */}
      <AnimatePresence>
        {!reduce && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-[101]"
          >
            {CONFETTI.map((c) => (
              <motion.span
                key={c.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: c.x, y: c.y, opacity: 0, scale: 0.4 }}
                transition={{ duration: 2, ease: "easeOut", delay: c.delay }}
                className="absolute h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: c.color }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-[102] w-full max-w-sm overflow-hidden rounded-[24px] bg-white p-8 text-center shadow-2xl ring-1 ring-slate-100"
      >
        {/* Animated Trophy */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: [0, 1.2, 1] }} 
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl"
          />
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, y: [0, -6, 0] }}
            transition={{ 
              scale: { duration: 0.5, ease: "backOut" },
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } 
            }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-lg ring-4 ring-amber-50"
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>
        </div>

        <h2 className="mb-2 text-[22px] font-bold tracking-tight text-slate-900">
          🎉 Maximum Trust Achieved
        </h2>
        <p className="mb-8 text-sm text-slate-500 font-medium px-2">
          Your listing is now fully verified and ready to inspire buyer confidence.
        </p>

        {/* Breakdown box */}
        <div className="mb-8 rounded-2xl bg-slate-50 p-5 text-left border border-slate-100">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200/60 pb-4">
            <span className="font-bold text-slate-700 text-sm">Trust Score</span>
            <span className="font-bold text-[#2F5EFF]">100 / 100</span>
          </div>
          <div className="space-y-3 text-[13px]">
            <div className="flex items-center justify-between font-medium text-slate-600">
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Main Photo
              </span>
            </div>
            <div className="flex items-center justify-between font-medium text-slate-600">
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Additional Photos
              </span>
            </div>
            <div className="flex items-center justify-between font-medium text-slate-600">
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Product Video
              </span>
            </div>
            <div className="flex items-center justify-between font-medium text-slate-600">
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Certification
              </span>
            </div>
          </div>
        </div>

        <Button onClick={() => onOpenChange(false)} className="h-12 w-full rounded-xl bg-[#2F5EFF] hover:bg-[#2F5EFF]/90 text-base font-semibold shadow-sm">
          Continue to Deal Review
        </Button>
      </motion.div>
    </div>
  )
}

function BuildBuyerTrustCard({ deal, trustScore, className }: { deal: DealState, trustScore: number, className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-[#2F5EFF]/20 bg-[#2F5EFF]/[0.02] p-6 shadow-sm", className)}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-[#1E3A8A]">Build Buyer Trust</h3>
        <p className="mt-1 text-sm text-[#2F5EFF]/80 font-medium">Complete the remaining verification steps to maximize buyer confidence.</p>
      </div>
      
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200/60">
        <span className="text-sm font-bold text-slate-700">Current Progress</span>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold text-[#2F5EFF]">{useCountUp(trustScore)}</span>
          <span className="text-sm font-semibold text-slate-400">/ 100</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <span className={cn("flex items-center gap-3 w-full", deal.mainPhoto ? "text-emerald-600 font-medium" : "text-slate-400 font-medium")}>
            {deal.mainPhoto ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <span className="h-4 w-4 shrink-0 flex items-center justify-center text-xs font-bold">✕</span>}
            {deal.mainPhoto ? "Main Photo Complete" : "Main Photo Required"}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className={cn("flex items-center gap-3 w-full", deal.additionalPhotos === 4 ? "text-emerald-600 font-medium" : "text-slate-400 font-medium")}>
            {deal.additionalPhotos === 4 ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <span className="h-4 w-4 shrink-0 flex items-center justify-center text-xs font-bold">✕</span>}
            {deal.additionalPhotos === 4 ? "Additional Photos Complete" : "Upload Additional Photos"}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className={cn("flex items-center gap-3 w-full", deal.video ? "text-emerald-600 font-medium" : "text-slate-400 font-medium")}>
            {deal.video ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <span className="h-4 w-4 shrink-0 flex items-center justify-center text-xs font-bold">✕</span>}
            {deal.video ? "Product Video Complete" : "Record Product Video"}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className={cn("flex items-center gap-3 w-full", deal.certification ? "text-emerald-600 font-medium" : "text-slate-400 font-medium")}>
            {deal.certification ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <span className="h-4 w-4 shrink-0 flex items-center justify-center text-xs font-bold">✕</span>}
            {deal.certification ? "Certification Verified" : "Upload Certification"}
          </span>
        </div>
      </div>
    </div>
  )
}


function Step2Verification({
  deal,
  updateDeal,
  openMainCamera,
  openAdditionalCamera,
  openVideoModal,
  openCertModal,
  trustScore,
}: {
  deal: DealState
  updateDeal: (u: Partial<DealState>) => void
  openMainCamera: () => void
  openAdditionalCamera: (replace?: boolean) => void
  openVideoModal: () => void
  openCertModal: () => void
  trustScore: number
}) {
  const [open, setOpen] = useState<string | null>("main")
  const [sheetTarget, setSheetTarget] = useState<"main" | "additional" | "video" | "cert" | null>(null)
  const toggle = (k: string) => setOpen((o) => (o === k ? null : k))
  const ctaClass = "mt-3 w-full h-12 rounded-xl bg-[#2F5EFF] hover:bg-[#2F5EFF]/90 text-base font-semibold"

  const replaceAdditionalPhoto = () => openAdditionalCamera(true)
  const deleteAdditionalPhoto = () => updateDeal({ additionalPhotos: Math.max(0, deal.additionalPhotos - 1) })
  
  const replaceMainPhoto = () => openMainCamera()
  const deleteMainPhoto = () => updateDeal({ mainPhoto: false })

  // Auto-advance: when a step completes, collapse it and open the next one.
  const prevMain = useRef(deal.mainPhoto)
  const prevAddl = useRef(deal.additionalPhotos)
  useEffect(() => {
    if (!prevMain.current && deal.mainPhoto) setOpen("additional")
    prevMain.current = deal.mainPhoto
  }, [deal.mainPhoto])
  useEffect(() => {
    if (prevAddl.current < 4 && deal.additionalPhotos === 4) setOpen("video")
    prevAddl.current = deal.additionalPhotos
  }, [deal.additionalPhotos])

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Proof &amp; Verification</h2>
      </div>

      <div>
        <h3 className="text-lg font-bold tracking-tight text-slate-900">Verification Journey</h3>
        <p className="mt-1 text-sm text-muted-foreground">Complete these steps to build your Trust Score.</p>
      </div>

      <div className="space-y-4">
        {/* 1. Main Photo */}
        <AccordionItem
          index={1}
          title="Main Photo"
          points="+15 Trust Score"
          icon={ImageIcon}
          done={deal.mainPhoto}
          open={open === "main"}
          onToggle={() => toggle("main")}
        >
          <p className="text-sm text-muted-foreground">
            The primary photo buyers see in search results. Make it count.
          </p>
          {deal.mainPhoto ? (
            <div className="mt-3 flex items-center gap-4">
              <div className="group relative flex w-24 aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-600">
                <img src={pokemonMain} alt="Main Photo" className="absolute inset-0 h-full w-full object-cover" />
                
                {/* Desktop: hover overlay with Replace + Delete */}
                <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
                  <button
                    onClick={replaceMainPhoto}
                    aria-label="Replace photo"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 transition-colors hover:bg-white"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <button
                    onClick={deleteMainPhoto}
                    aria-label="Delete photo"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 transition-colors hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Touch: tap opens the Photo Options bottom sheet */}
                <button
                  onClick={() => setSheetTarget("main")}
                  aria-label="Photo options"
                  className="absolute inset-0 lg:hidden"
                />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-5 w-5" /> Main Photo added
              </span>
            </div>
          ) : (
            <Button onClick={openMainCamera} className={ctaClass}>
              Take Main Photo
            </Button>
          )}
        </AccordionItem>

        {/* 2. Additional Photos */}
        <AccordionItem
          index={2}
          title="Additional Photos"
          points="+15 Trust Score"
          extra={`${deal.additionalPhotos}/4 Completed`}
          icon={Camera}
          done={deal.additionalPhotos === 4}
          open={open === "additional"}
          onToggle={() => toggle("additional")}
        >
          <p className="text-sm text-muted-foreground">
            Capture multiple angles to build maximum buyer confidence.
          </p>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => {
              const filled = i < deal.additionalPhotos
              const isNext = i === deal.additionalPhotos // the next empty slot to capture

              if (filled) {
                const addlPhotos = [pokemonFront, pokemonBack, pokemonSide, pokemonDetail];
                return (
                  <div
                    key={i}
                    className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-600"
                  >
                    <img src={addlPhotos[i % addlPhotos.length]} alt={`Additional Photo ${i + 1}`} className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform group-hover:scale-105" />
                    
                    {/* Camera Capture Time Overlay */}
                    <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-white/90 text-[8px] font-mono tracking-wider border border-white/10 z-10 pointer-events-none">
                      14:32:0{i + 6}
                    </div>

                    {/* Desktop: hover overlay with Replace + Delete */}
                    <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100 lg:flex z-20">
                      <button
                        onClick={replaceAdditionalPhoto}
                        aria-label="Replace photo"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 transition-colors hover:bg-white"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                      <button
                        onClick={deleteAdditionalPhoto}
                        aria-label="Delete photo"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 transition-colors hover:bg-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Touch: tap opens the Photo Options bottom sheet */}
                    <button
                      onClick={() => setSheetTarget("additional")}
                      aria-label="Photo options"
                      className="absolute inset-0 lg:hidden"
                    />
                  </div>
                )
              }

              return (
                <button
                  key={i}
                  disabled={!isNext}
                  onClick={() => openAdditionalCamera(false)}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-xl border-2 border-dashed transition-all",
                    isNext
                      ? "border-[#2F5EFF] bg-[#2F5EFF]/5 text-[#2F5EFF] ring-2 ring-[#2F5EFF]/20"
                      : "cursor-not-allowed border-slate-200 text-slate-300",
                  )}
                >
                  <Plus className="h-6 w-6" />
                </button>
              )
            })}
          </div>

          {/* Mobile-first Photo Options bottom sheet moved to universal level */}
        </AccordionItem>

        {/* 3. Product Video */}
        <AccordionItem
          index={3}
          title="Product Video"
          points="+30 Trust Score"
          icon={Video}
          done={deal.video}
          open={open === "video"}
          onToggle={() => toggle("video")}
        >
          <p className="text-sm text-muted-foreground">
            A 360-degree video proves authenticity and physical possession.
          </p>
          {deal.video ? (
            <div className="mt-3 flex items-center gap-4">
              <div className="group relative flex w-24 aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-600">
                {/* Simulated Video Thumbnail */}
                <img src="https://images.unsplash.com/photo-1610321287682-140b9dcbc3b6?q=80&w=200&auto=format&fit=crop" alt="Product Video" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                    <Play className="h-4 w-4 ml-0.5" />
                  </div>
                </div>
                
                {/* Desktop: hover overlay with Replace + Delete */}
                <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
                  <button onClick={openVideoModal} aria-label="Replace video" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 transition-colors hover:bg-white">
                    <Video className="h-4 w-4" />
                  </button>
                  <button onClick={() => updateDeal({ video: false })} aria-label="Delete video" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 transition-colors hover:bg-white">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Touch: tap opens the Options bottom sheet */}
                <button onClick={() => setSheetTarget("video")} aria-label="Video options" className="absolute inset-0 lg:hidden" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-5 w-5" /> Video recorded
              </span>
            </div>
          ) : (
            <Button onClick={openVideoModal} className={ctaClass}>
              Record Video
            </Button>
          )}
        </AccordionItem>

        {/* 4. Certification */}
        <AccordionItem
          index={4}
          title="Certification"
          points="+10 Trust Score"
          icon={FileBadge}
          done={deal.certification}
          open={open === "certification"}
          onToggle={() => toggle("certification")}
        >
          <p className="text-sm text-muted-foreground">
            Upload PSA, receipts, or authenticity documents.
          </p>
          {deal.certification ? (
            <div className="mt-3 flex items-center gap-4">
              <div className="group relative flex w-24 aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-600">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <FileBadge className="h-8 w-8 opacity-60" />
                </div>
                
                {/* Desktop: hover overlay with Replace + Delete */}
                <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
                  <button onClick={openCertModal} aria-label="Replace certification" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 transition-colors hover:bg-white">
                    <FileBadge className="h-4 w-4" />
                  </button>
                  <button onClick={() => updateDeal({ certification: false })} aria-label="Delete certification" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 transition-colors hover:bg-white">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Touch: tap opens the Options bottom sheet */}
                <button onClick={() => setSheetTarget("cert")} aria-label="Certification options" className="absolute inset-0 lg:hidden" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-5 w-5" /> Certificate uploaded
              </span>
            </div>
          ) : (
            <Button onClick={openCertModal} className={ctaClass}>
              Upload Certificate
            </Button>
          )}
        </AccordionItem>
      </div>

      {/* Universal Mobile-first Options bottom sheet */}
      <Sheet open={sheetTarget !== null} onOpenChange={(open) => !open && setSheetTarget(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-left">Options</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-1">
            <button
              onClick={() => {
                if (sheetTarget === "main") replaceMainPhoto()
                else if (sheetTarget === "additional") replaceAdditionalPhoto()
                else if (sheetTarget === "video") openVideoModal()
                else if (sheetTarget === "cert") openCertModal()
                setSheetTarget(null)
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-slate-800 transition-colors hover:bg-slate-50"
            >
              <Camera className="h-5 w-5 text-slate-600" /> Replace
            </button>
            <button
              onClick={() => {
                if (sheetTarget === "main") deleteMainPhoto()
                else if (sheetTarget === "additional") deleteAdditionalPhoto()
                else if (sheetTarget === "video") updateDeal({ video: false })
                else if (sheetTarget === "cert") updateDeal({ certification: false })
                setSheetTarget(null)
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" /> Delete
            </button>
            <button
              onClick={() => setSheetTarget(null)}
              className="w-full rounded-xl px-4 py-3 text-center font-medium text-slate-500 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Build Buyer Trust Checklist (Mobile) */}
      <BuildBuyerTrustCard deal={deal} trustScore={trustScore} className="mt-8 lg:hidden" />
    </>
  )
}
