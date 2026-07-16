import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Video, CheckCircle2, ArrowLeft, Play, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CHECKLIST = [
  "Show the entire product",
  "Record in good lighting",
  "Slowly rotate the item",
  "Highlight important details",
  "Keep the video under 30 seconds"
]

const GUIDANCE = [
  { text: "Lighting is too low. Move to a brighter place.", type: "yellow" },
  { text: "Image isn't clear. Hold the phone steady.", type: "yellow" },
  { text: "Move slightly back.", type: "yellow" },
  { text: "Move closer to capture details.", type: "yellow" },
  { text: "Keep the product inside the guide frame.", type: "yellow" },
  { text: "Move slower for better verification.", type: "yellow" },
  { text: "Perfect distance", type: "green" },
  { text: "Great! Recording quality looks good.", type: "green" },
]

type VideoStep = "instruction" | "camera" | "recording" | "preview" | "success"

interface VideoVerificationModalProps {
  open: boolean
  onClose: () => void
  onCapture: () => void
}

export function VideoVerificationModal({
  open,
  onClose,
  onCapture,
}: VideoVerificationModalProps) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState<VideoStep>("instruction")
  const [guideIndex, setGuideIndex] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    if (open) {
      setStep("instruction")
      setRecordingTime(0)
    }
  }, [open])

  // Simulated live guidance cycling
  useEffect(() => {
    if (step !== "camera" && step !== "recording") {
      setGuideIndex(0)
      return
    }
    
    if (reduce) {
      setGuideIndex(6) // Perfect distance
      return
    }

    let currentIdx = 0;
    const interval = setInterval(() => {
      // Pick a random guidance to simulate error detection, but tend towards green
      const isGood = Math.random() > 0.4
      if (isGood) {
        currentIdx = step === "recording" ? 7 : 6
      } else {
        currentIdx = Math.floor(Math.random() * 6)
      }
      setGuideIndex(currentIdx)
    }, 2500)

    // Force good state immediately if recording
    if (step === "recording") setGuideIndex(7)
    else setGuideIndex(4) // Start with "Keep product inside"

    return () => clearInterval(interval)
  }, [step, reduce])

  // Recording timer
  useEffect(() => {
    if (step !== "recording") return
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          clearInterval(interval)
          setStep("preview")
          return 30
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [step])

  const guide = GUIDANCE[guideIndex]
  const ready = guide.type === "green"
  const cornerColor = ready ? "#34d399" : "rgba(255,255,255,0.7)"

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
                  Record Your Product Video
                </h3>
                <p className="mx-auto mt-2 text-center text-muted-foreground text-sm">
                  Help buyers trust your listing by recording a short product verification video.
                </p>

                <div className="mx-auto mt-6 flex h-32 w-full max-w-[280px] items-center justify-center rounded-2xl bg-blue-50/50 border-2 border-dashed border-blue-200 text-blue-400">
                  <Video className="h-10 w-10 opacity-50" />
                </div>

                <div className="mt-8 space-y-3 px-4">
                  {CHECKLIST.map((tip) => (
                    <div key={tip} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2F5EFF]" />
                      <span className="text-sm font-medium text-slate-700">{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Button
                    className="h-12 w-full rounded-xl bg-[#2F5EFF] text-base font-semibold hover:bg-[#2F5EFF]/90"
                    onClick={() => setStep("camera")}
                  >
                    Start Recording
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-12 w-full rounded-xl text-slate-500 font-semibold"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* 2 & 3. Camera / Recording */}
            {(step === "camera" || step === "recording") && (
              <div className="relative flex flex-1 flex-col bg-black">
                {/* Top bar */}
                <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between">
                  <button
                    className="rounded-full bg-black/50 p-2 text-white backdrop-blur"
                    onClick={() => step === "recording" ? setStep("camera") : setStep("instruction")}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  {step === "recording" && (
                    <div className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 backdrop-blur border border-red-500/30">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold text-red-500 font-mono">
                        00:{recordingTime.toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Dynamic guidance bubble */}
                <div className="absolute inset-x-0 top-20 z-20 flex justify-center px-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={guide.text}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                         "rounded-full px-5 py-2.5 text-sm font-semibold backdrop-blur shadow-lg flex items-center gap-2",
                         guide.type === "green" 
                          ? "bg-emerald-500/95 text-white" 
                          : "bg-amber-400/95 text-amber-950"
                      )}
                    >
                      {guide.type === "yellow" && <AlertCircle className="h-4 w-4" />}
                      {guide.type === "green" && <CheckCircle2 className="h-4 w-4" />}
                      {guide.text}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Frame with corner guides */}
                <div className="flex flex-1 items-center justify-center p-10">
                  <div className="relative aspect-[3/4] w-full max-w-[280px]">
                    <span
                      className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-[3px] border-t-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                    <span
                      className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-[3px] border-t-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                    <span
                      className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-[3px] border-l-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                    <span
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-[3px] border-r-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                  </div>
                </div>

                {/* Shutter */}
                <div className="pb-8 pt-2">
                  <div className="flex justify-center items-center h-20">
                    {step === "camera" ? (
                      <button
                        onClick={() => {
                          setStep("recording")
                          setRecordingTime(0)
                        }}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white transition-all active:scale-95 ring-4 ring-white/20 hover:ring-white/40"
                      >
                        <div className="h-14 w-14 rounded-full bg-red-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setStep("preview")}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-all active:scale-95 ring-4 ring-white/10 hover:ring-white/30"
                      >
                        <div className="h-6 w-6 rounded-sm bg-red-500" />
                      </button>
                    )}
                  </div>
                  <p className="mt-4 text-center text-xs font-medium text-white/70">
                    {step === "camera" ? "Tap to record (up to 30s)" : "Tap to stop"}
                  </p>
                </div>
              </div>
            )}

            {/* 4. Preview */}
            {step === "preview" && (
              <div className="flex flex-1 flex-col bg-black">
                <div className="relative m-4 flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <Video className="h-16 w-16 text-slate-700" />
                  <button className="absolute z-20 h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Play className="h-8 w-8 ml-1" fill="currentColor" />
                  </button>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-white font-mono text-sm">00:{recordingTime.toString().padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="space-y-4 rounded-t-3xl bg-white p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-center text-lg font-bold text-slate-900">Review Video</h4>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="h-12 flex-1 rounded-xl text-slate-600 font-semibold border-slate-200"
                      onClick={() => setStep("camera")}
                    >
                      Retake
                    </Button>
                    <Button
                      className="h-12 flex-1 rounded-xl bg-[#2F5EFF] font-semibold hover:bg-[#2F5EFF]/90"
                      onClick={() => setStep("success")}
                    >
                      Submit Video
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Success State */}
            {step === "success" && (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  Product Video Verified
                </h3>
                
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                  <span>+30</span>
                  <span>Trust Score</span>
                </div>
                
                <p className="mt-6 text-muted-foreground text-sm">
                  <span className="font-semibold text-slate-700">Excellent!</span> Buyers are more likely to trust listings with videos.
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
