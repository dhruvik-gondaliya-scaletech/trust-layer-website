import { useState } from "react"
import { BrowserRouter, Routes, Route, Link as RouterLink } from "react-router-dom"
import { LandingPage } from "./pages/marketing/LandingPage"
import { RegistrationFlowPage } from "./pages/auth/RegistrationFlowPage"
import { RegisterPage } from "./pages/auth/RegisterPage"
import { LoginPage } from "./pages/auth/LoginPage"
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage"
import { OTPVerificationPage } from "./pages/auth/OTPVerificationPage"
import { EmailVerificationPage } from "./pages/auth/EmailVerificationPage"
import { OnboardingPage } from "./pages/onboarding/OnboardingPage"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import { DealsPage } from "./pages/deals/DealsPage"
import { DealDetailsPage } from "./pages/deals/DealDetailsPage"
import { PaymentsPage } from "./pages/payments/PaymentsPage"
import { MainLayout } from "./components/layout/MainLayout"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Badge } from "./components/ui/badge"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Checkbox } from "./components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { toast, Toaster } from "sonner"
import { EmptyState } from "./components/shared/EmptyState"
import { LoadingState } from "./components/shared/LoadingState"
import { MoreHorizontal } from "lucide-react"

function Showcase() {
  const [isLoading, setIsLoading] = useState(false)

  const triggerLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <MainLayout>
      <Toaster />
      <div className="flex flex-col gap-12 py-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">UI Component Library</h1>
          <p className="text-muted-foreground">Adapted for desktop from the TrustLayer mobile app design system.</p>
        </div>

        {/* Quick Demo Links */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2 text-primary">Explore Demo Pages</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild variant="default"><RouterLink to="/login">Login Page</RouterLink></Button>
            <Button asChild variant="default"><RouterLink to="/register">Register Page</RouterLink></Button>
            <Button asChild variant="default"><RouterLink to="/onboarding">Onboarding Flow</RouterLink></Button>
            <Button asChild variant="default"><RouterLink to="/dashboard">Dashboard</RouterLink></Button>
            <Button asChild variant="default"><RouterLink to="/deals">Deals Page</RouterLink></Button>
          </div>
        </section>

        {/* Buttons & Badges */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Buttons & Badges</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        {/* Cards & Modals */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Cards, Modals & Dropdowns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Summary</CardTitle>
                <CardDescription>View your recent activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$12,450.00</p>
                <p className="text-sm text-muted-foreground">+20.1% from last month</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-center p-6 space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Modal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Open Dropdown <MoreHorizontal className="ml-2 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => toast.success("Action completed successfully!")}>
                Show Toast
              </Button>
            </Card>
          </div>
        </section>

        {/* Forms & Inputs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Forms & Inputs</h2>
          <Card>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Notification Preferences</Label>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="r1" />
                      <Label htmlFor="r1">All new messages</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="r2" />
                      <Label htmlFor="r2">Direct messages and mentions</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tables & Tabs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Data Display (Tables & Tabs)</h2>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList>
              <TabsTrigger value="recent">Recent Transactions</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="mt-4">
              <Card>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV002</TableCell>
                      <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                      <TableCell>Bank Transfer</TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <EmptyState 
                title="No pending transactions" 
                description="You're all caught up. There are no pending transactions at the moment."
                action={{ label: "Create Transaction", onClick: () => toast("Creating transaction...") }}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">States (Empty & Loading)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-64 flex items-center justify-center">
              <EmptyState 
                title="No data found" 
                description="Try adjusting your filters or search criteria."
                className="border-none bg-transparent"
              />
            </Card>
            <Card className="h-64 flex items-center justify-center relative overflow-hidden">
              {isLoading ? (
                <LoadingState text="Fetching latest data..." />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <p className="text-muted-foreground mb-4">Click to simulate a loading state</p>
                  <Button onClick={triggerLoading}>Trigger Loading</Button>
                </div>
              )}
            </Card>
          </div>
        </section>

      </div>
    </MainLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/components" element={<Showcase />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-account" element={<RegistrationFlowPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<OTPVerificationPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/deals/:id" element={<DealDetailsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
