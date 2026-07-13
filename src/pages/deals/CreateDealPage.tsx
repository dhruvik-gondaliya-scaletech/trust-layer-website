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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Package,
  Truck,
  Image as ImageIcon,
  Video,
  FileBadge,
  Copy,
  ExternalLink,
  ChevronDown,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Types & Constants                                                         */
/* -------------------------------------------------------------------------- */

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
    feeSplit: "split"
  })

  // A single shared camera drives every capture step. `job` records what it's
  // capturing for so the guidance copy and the accept behaviour adapt.
  const [cameraJob, setCameraJob] = useState<{ target: "main" | "additional"; replace?: boolean } | null>(null)

  // Calculations
  const priceNum = parseFloat(deal.price) || 0
  const feePercent = 0.03
  let feeAmount = priceNum * feePercent
  let earnings = priceNum
  
  if (deal.feeSplit === "seller") {
    earnings = priceNum - feeAmount
  } else if (deal.feeSplit === "split") {
    feeAmount = feeAmount / 2
    earnings = priceNum - feeAmount
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
    trustScore >= 90 ? "EXCELLENT" : trustScore >= 70 ? "HIGH" : trustScore >= 40 ? "MEDIUM" : "LOW"

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
              <h2 className="text-2xl font-semibold tracking-tight">Shipping & Handover</h2>
              <p className="text-muted-foreground mt-1">How will the buyer receive this item?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Delivery Method</Label>
                <RadioGroup 
                  value={deal.shippingMethod} 
                  onValueChange={v => updateDeal({ shippingMethod: v })}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label 
                    htmlFor="ship-standard" 
                    className={cn(
                      "flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-5 cursor-pointer transition-all hover:bg-slate-50",
                      deal.shippingMethod === "standard" ? "border-primary bg-primary/5" : "border-slate-100"
                    )}
                  >
                    <RadioGroupItem value="standard" id="ship-standard" className="sr-only" />
                    <Truck className={cn("h-8 w-8", deal.shippingMethod === "standard" ? "text-primary" : "text-slate-400")} />
                    <span className="font-semibold text-slate-900">Ship via Carrier</span>
                  </Label>
                  
                  <Label 
                    htmlFor="ship-local" 
                    className={cn(
                      "flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-5 cursor-pointer transition-all hover:bg-slate-50",
                      deal.shippingMethod === "local" ? "border-primary bg-primary/5" : "border-slate-100"
                    )}
                  >
                    <RadioGroupItem value="local" id="ship-local" className="sr-only" />
                    <Package className={cn("h-8 w-8", deal.shippingMethod === "local" ? "text-primary" : "text-slate-400")} />
                    <span className="font-semibold text-slate-900">Local Pickup</span>
                  </Label>
                </RadioGroup>
              </div>

              {deal.shippingMethod === "standard" && (
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
                </div>
              )}

              {/* Estimated Delivery Card */}
              <div className="mt-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="font-semibold mb-4 text-slate-900">Buyer sees:</h4>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-white border flex items-center justify-center shadow-sm shrink-0">
                    <Truck className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-900">Estimated Delivery: Aug 12 - 15</p>
                    <p className="text-xs text-muted-foreground mt-1">Ships in {deal.shipsIn} business days via Standard Carrier. Tracking will be uploaded to TrustLayer.</p>
                  </div>
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
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Review & Publish</h2>
              <p className="text-muted-foreground mt-1">Double check your deal details before generating the secure link.</p>
            </div>

            <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start gap-5">
                  <div className="h-20 w-20 bg-slate-100 rounded-lg shrink-0 border flex items-center justify-center">
                    {deal.mainPhoto ? <ImageIcon className="h-8 w-8 text-slate-400" /> : <Package className="h-8 w-8 text-slate-300" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-slate-900 truncate">{deal.title || "Untitled Deal"}</h3>
                    <p className="text-muted-foreground mt-1 truncate">{deal.productType ? deal.productType.toUpperCase() : "NO PRODUCT TYPE"} · {deal.condition ? deal.condition.toUpperCase() : "NO CONDITION"}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {deal.isGraded && <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Authenticated</Badge>}
                      {deal.orderType === "online" && <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Online Transaction</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold tracking-tight">${priceNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-900">{deal.shippingMethod === "local" ? "Local Pickup" : `Ships in ${deal.shipsIn} days`}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Platform Fee ({deal.feeSplit === "split" ? "1.5%" : deal.feeSplit === "buyer" ? "0%" : "3%"})</span>
                  <span className="font-medium text-red-600">-${feeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-medium text-slate-900">You will earn</span>
                  <span className="text-lg font-bold text-emerald-600">${earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
            </div>
          )}
        </div>
      </div>

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

type TrustStatus = "LOW" | "MEDIUM" | "HIGH" | "EXCELLENT"
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
            <span className="mt-2 inline-flex rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-bold tracking-wide">
              {status}
            </span>
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

function SuccessRow({ label, onUndo }: { label: string; onUndo: () => void }) {
  return (
    <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3">
      <span className="flex items-center gap-2 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="h-4 w-4" /> {label}
      </span>
      <button onClick={onUndo} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
        Undo
      </button>
    </div>
  )
}

function Step2Verification({
  deal,
  updateDeal,
  openMainCamera,
  openAdditionalCamera,
}: {
  deal: DealState
  updateDeal: (u: Partial<DealState>) => void
  openMainCamera: () => void
  openAdditionalCamera: (replace?: boolean) => void
}) {
  const [open, setOpen] = useState<string | null>("main")
  const [photoSheet, setPhotoSheet] = useState(false)
  const toggle = (k: string) => setOpen((o) => (o === k ? null : k))
  const ctaClass = "mt-3 w-full h-12 rounded-xl bg-[#2F5EFF] hover:bg-[#2F5EFF]/90 text-base font-semibold"

  const replacePhoto = () => openAdditionalCamera(true)
  const deletePhoto = () => updateDeal({ additionalPhotos: Math.max(0, deal.additionalPhotos - 1) })

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
            <div className="mt-3 flex items-center gap-3">
              <div
                className="group relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-slate-100"
                onClick={openMainCamera}
              >
                <ImageIcon className="h-7 w-7 text-slate-300" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-semibold text-white">Retake</span>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> Photo added
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
                return (
                  <div
                    key={i}
                    className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-600"
                  >
                    <ImageIcon className="h-6 w-6" />

                    {/* Desktop: hover overlay with Replace + Delete */}
                    <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
                      <button
                        onClick={replacePhoto}
                        aria-label="Replace photo"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 transition-colors hover:bg-white"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                      <button
                        onClick={deletePhoto}
                        aria-label="Delete photo"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 transition-colors hover:bg-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Touch: tap opens the Photo Options bottom sheet */}
                    <button
                      onClick={() => setPhotoSheet(true)}
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

          {/* Mobile-first Photo Options bottom sheet */}
          <Sheet open={photoSheet} onOpenChange={setPhotoSheet}>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle className="text-left">Photo Options</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-1">
                <button
                  onClick={() => {
                    setPhotoSheet(false)
                    replacePhoto()
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <Camera className="h-5 w-5 text-slate-600" /> Replace Photo
                </button>
                <button
                  onClick={() => {
                    setPhotoSheet(false)
                    deletePhoto()
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" /> Delete Photo
                </button>
                <button
                  onClick={() => setPhotoSheet(false)}
                  className="w-full rounded-xl px-4 py-3 text-center font-medium text-slate-500 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </SheetContent>
          </Sheet>
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
            <SuccessRow label="Video recorded" onUndo={() => updateDeal({ video: false })} />
          ) : (
            <Button onClick={() => updateDeal({ video: true })} className={ctaClass}>
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
            <SuccessRow label="Certificate uploaded" onUndo={() => updateDeal({ certification: false })} />
          ) : (
            <Button onClick={() => updateDeal({ certification: true })} className={ctaClass}>
              Upload Certificate
            </Button>
          )}
        </AccordionItem>
      </div>
    </>
  )
}
