import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react"

interface IdentityVerificationFormProps {
  onNext: () => void
}

export function IdentityVerificationForm({ onNext }: IdentityVerificationFormProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {!file ? (
          <div 
            className="border-2 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => {
              // In a real app, this would trigger a hidden file input click
              const fakeFile = new File(["dummy content"], "passport_front.jpg", { type: "image/jpeg" })
              setFile(fakeFile)
            }}
          >
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm font-medium">Click or drag and drop to upload</p>
            <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
          </div>
        ) : (
          <div className="border rounded-xl p-4 flex items-center justify-between bg-card">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-6 mt-8">
        <Button type="button" variant="outline" onClick={onBack} size="lg" className="h-12 w-24">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button onClick={onNext} size="lg" disabled={!file} className="flex-1 h-12 text-base">Continue</Button>
      </div>
    </div>
  )
}
