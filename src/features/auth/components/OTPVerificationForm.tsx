import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { Loader2, ShieldCheck } from "lucide-react"

const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

type OTPFormValues = z.infer<typeof otpSchema>

interface OTPVerificationFormProps {
  onNext?: () => void
}

export function OTPVerificationForm({ onNext }: OTPVerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data: OTPFormValues) {
    setIsLoading(true)
    setTimeout(() => {
      console.log("Phone OTP submitted:", data)
      setIsLoading(false)
      if (onNext) onNext()
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <InputOTP maxLength={6} {...field} containerClassName="gap-2">
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-14 w-12 text-lg rounded-xl border" />
                    <InputOTPSlot index={1} className="h-14 w-12 text-lg rounded-xl border" />
                    <InputOTPSlot index={2} className="h-14 w-12 text-lg rounded-xl border" />
                    <InputOTPSlot index={3} className="h-14 w-12 text-lg rounded-xl border" />
                    <InputOTPSlot index={4} className="h-14 w-12 text-lg rounded-xl border" />
                    <InputOTPSlot index={5} className="h-14 w-12 text-lg rounded-xl border" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4 mb-4 text-left">
            <div className="font-medium mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              Why verify your phone?
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Phone verification helps:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
              <li>Protect your account</li>
              <li>Prevent fraud</li>
              <li>Receive important alerts</li>
              <li>Recover your account securely</li>
            </ul>
          </div>

          <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Phone Number
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-6">
            Didn't receive the code?{" "}
            <button type="button" className="font-medium text-primary hover:underline">
              Resend Code
            </button>
          </div>
        </div>
      </form>
    </Form>
  )
}
