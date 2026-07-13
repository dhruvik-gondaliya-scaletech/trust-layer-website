import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera } from "lucide-react"

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  about: z.string().max(160, "About must be less than 160 characters").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileSetupFormProps {
  onNext: () => void
}

export function ProfileSetupForm({ onNext }: ProfileSetupFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      about: "",
    },
  })

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile Setup:", data)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Photo Upload Area */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer group">
            <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
            Upload Photo
          </span>
          <p className="text-sm text-muted-foreground text-center">
            Optional<br />Upload a profile photo to build trust with buyers and sellers.
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" className="h-12" {...field} />
                </FormControl>
                <FormDescription>Choose a unique public username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Me (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us a little about yourself" 
                    className="resize-none min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>Share a short introduction about yourself. Example: Collector of vintage cameras and photography gear.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full h-12 text-base">
            Finish Setup
          </Button>
        </div>
      </form>
    </Form>
  )
}
