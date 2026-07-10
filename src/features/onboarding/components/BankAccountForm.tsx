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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

const bankSchema = z.object({
  accountName: z.string().min(2, "Account holder name is required"),
  routingNumber: z.string().length(9, "Routing number must be 9 digits"),
  accountNumber: z.string().min(8, "Invalid account number"),
  accountType: z.string({ required_error: "Please select account type" }),
})

type BankFormValues = z.infer<typeof bankSchema>

interface BankAccountFormProps {
  onNext: () => void
  onBack: () => void
}

export function BankAccountForm({ onNext, onBack }: BankAccountFormProps) {
  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      accountName: "",
      routingNumber: "",
      accountNumber: "",
    },
  })

  function onSubmit(data: BankFormValues) {
    console.log("Bank details:", data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="TrustLayer Inc." className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="routingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Routing Number</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checking">Business Checking</SelectItem>
                    <SelectItem value="savings">Business Savings</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 pt-6 mt-8">
          <Button type="button" variant="outline" onClick={onBack} size="lg" className="h-12 w-24">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button type="submit" size="lg" className="flex-1 h-12 text-base">Verify & Connect Bank</Button>
        </div>
      </form>
    </Form>
  )
}
