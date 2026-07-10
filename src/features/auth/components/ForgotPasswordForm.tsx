import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    setTimeout(() => {
      console.log("Forgot password submitted:", data)
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-medium tracking-tight">Check your email</h3>
          <p className="text-muted-foreground">
            We've sent a password reset link to <span className="font-medium text-foreground">{form.getValues("email")}</span>.
          </p>
        </div>
        <Button className="w-full" variant="outline" onClick={() => setIsSubmitted(false)}>
          Back to reset
        </Button>
        <div className="pt-4 text-sm">
          <Link to="/login" className="font-medium flex items-center justify-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
        <div className="text-center text-sm text-muted-foreground mt-4">
          <Link to="/login" className="font-medium flex items-center justify-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
          </Link>
        </div>
      </form>
    </Form>
  )
}
