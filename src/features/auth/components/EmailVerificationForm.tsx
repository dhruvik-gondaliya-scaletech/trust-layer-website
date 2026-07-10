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
import { Loader2 } from "lucide-react"

const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

type OTPFormValues = z.infer<typeof otpSchema>

interface EmailVerificationFormProps {
  onNext?: () => void
}

export function EmailVerificationForm({ onNext }: EmailVerificationFormProps) {
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
      console.log("Email OTP submitted:", data)
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

        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-6">
            Didn't receive the code?{" "}
            <button type="button" className="font-medium text-primary hover:underline">
              Resend in 0:30
            </button>
          </div>
        </div>
      </form>
    </Form>
  )
}
