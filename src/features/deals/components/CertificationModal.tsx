import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileBadge, CheckCircle2, ArrowLeft, Image as ImageIcon, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EXAMPLES = [
  "PSA Certificate",
  "Beckett or CGC",
  "Original Invoice or Receipt",
  "Serial Number Photo",
  "Warranty Card"
]

type CertStep = "instruction" | "camera" | "preview" | "success"

interface CertificationModalProps {
  open: boolean
  onClose: () => void
  onCapture: () => void
}

export function CertificationModal({
  open,
  onClose,
  onCapture,
}: CertificationModalProps) {
  const [step, setStep] = useState<CertStep>("instruction")

  useEffect(() => {
    if (open) setStep("instruction")
  }, [open])

  // Mock file upload trigger
  const handleUploadClick = () => {
    // In a real app, this would open a file picker
    // Here we simulate picking a file and going straight to preview
    setStep("preview")
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget && step === "instruction") onClose()
          }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm",
            step === "instruction" || step === "success" ? "bg-black/65" : "bg-black/90",
          )}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "w-full bg-white shadow-2xl relative overflow-hidden",
              step === "instruction" || step === "success"
                ? "max-w-[460px] rounded-[28px]"
                : "flex h-[700px] max-h-[90vh] max-w-[400px] flex-col rounded-3xl",
            )}
          >
            {/* 1. Instruction Screen */}
            {step === "instruction" && (
              <div className="p-8">
                <h3 className="text-center text-2xl font-bold tracking-tight text-slate-900">
                  Upload Certification
                </h3>
                <p className="mx-auto mt-2 text-center text-muted-foreground text-sm">
                  Provide an authenticity document to verify this product.
                </p>

                <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                  <FileBadge className="h-10 w-10" />
                </div>

                <div className="mt-8 text-center text-sm font-semibold text-slate-700">
                  Examples of accepted documents:
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 px-2">
                  {EXAMPLES.map((ex) => (
                    <span key={ex} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {ex}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Button
                    className="h-12 w-full rounded-xl bg-[#2F5EFF] text-base font-semibold hover:bg-[#2F5EFF]/90 flex items-center gap-2"
                    onClick={() => setStep("camera")}
                  >
                    <Camera className="h-5 w-5" /> Take Photo
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl font-semibold flex items-center gap-2"
                    onClick={handleUploadClick}
                  >
                    <Upload className="h-5 w-5" /> Upload File
                  </Button>
                  <Button
                    variant="ghost"
                    className="mt-2 h-10 w-full rounded-xl text-slate-500 font-semibold"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* 2. Camera */}
            {step === "camera" && (
              <div className="relative flex flex-1 flex-col bg-black">
                {/* Top bar */}
                <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between">
                  <button
                    className="rounded-full bg-black/50 p-2 text-white backdrop-blur"
                    onClick={() => setStep("instruction")}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                </div>

                {/* Frame with corner guides */}
                <div className="flex flex-1 items-center justify-center p-10">
                  <div className="relative aspect-[3/4] w-full max-w-[280px]">
                    <span
                      className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-[3px] border-t-[3px] border-emerald-400 transition-colors duration-300"
                    />
                    <span
                      className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-[3px] border-t-[3px] border-emerald-400 transition-colors duration-300"
                    />
                    <span
                      className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-[3px] border-l-[3px] border-emerald-400 transition-colors duration-300"
                    />
                    <span
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-[3px] border-r-[3px] border-emerald-400 transition-colors duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/50 text-sm font-medium">Align document within frame</p>
                    </div>
                  </div>
                </div>

                {/* Shutter */}
                <div className="pb-8 pt-2">
                  <div className="flex justify-center items-center h-20">
                    <button
                      onClick={() => setStep("preview")}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white transition-all active:scale-95 ring-4 ring-white/20 hover:ring-white/40"
                    />
                  </div>
                  <p className="mt-4 text-center text-xs font-medium text-white/70">
                    Ensure text is readable and clear
                  </p>
                </div>
              </div>
            )}

            {/* 3. Preview */}
            {step === "preview" && (
              <div className="flex flex-1 flex-col bg-black">
                <div className="relative m-4 flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <FileBadge className="h-16 w-16 text-slate-700" />
                </div>
                <div className="space-y-4 rounded-t-3xl bg-white p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-center text-lg font-bold text-slate-900">Review Document</h4>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="h-12 flex-1 rounded-xl text-slate-600 font-semibold border-slate-200"
                      onClick={() => setStep("instruction")}
                    >
                      Retake
                    </Button>
                    <Button
                      className="h-12 flex-1 rounded-xl bg-[#2F5EFF] font-semibold hover:bg-[#2F5EFF]/90"
                      onClick={() => setStep("success")}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Success State */}
            {step === "success" && (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  Certificate Uploaded
                </h3>
                
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                  <span>+10</span>
                  <span>Trust Score</span>
                </div>
                
                <p className="mt-6 text-muted-foreground text-sm">
                  <span className="font-semibold text-slate-700">Great!</span> Verification documents drastically increase buyer confidence.
                </p>

                <Button
                  className="mt-8 h-12 w-full rounded-xl bg-[#2F5EFF] text-base font-semibold hover:bg-[#2F5EFF]/90"
                  onClick={() => {
                    onCapture()
                    onClose()
                  }}
                >
                  Continue
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
