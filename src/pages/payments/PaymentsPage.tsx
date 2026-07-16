import { useMemo, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/EmptyState"
import { TransactionDetails } from "@/features/payments/components/TransactionDetails"
import {
  TRANSACTIONS,
  TX_STATUSES,
  TX_METHODS,
  signedAmount,
  formatCurrency,
  type Transaction,
} from "@/features/payments/data"
import {
  Search,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"

const PAGE_SIZE = 8

// Relative to "today" = 2026-07-09 (mock). ISO strings compare lexicographically.
const DATE_RANGES = [
  { label: "All time", value: "all", cutoff: "0000-00-00" },
  { label: "Last 7 days", value: "7d", cutoff: "2026-07-02" },
  { label: "Last 30 days", value: "30d", cutoff: "2026-06-09" },
  { label: "Last 90 days", value: "90d", cutoff: "2026-04-10" },
]

const TABS = [
  { label: "All", value: "all" },
  { label: "Payments", value: "Payment" },
  { label: "Escrow", value: "Escrow" },
  { label: "Wallet Activity", value: "Wallet" },
  { label: "Refunds", value: "Refund" },
] as const

export function PaymentsPage() {
  const [tab, setTab] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [method, setMethod] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Transaction | null>(null)

  const filtered = useMemo(() => {
    const range = DATE_RANGES.find((r) => r.value === dateRange) ?? DATE_RANGES[0]
    return TRANSACTIONS.filter((tx) => {
      const matchesTab = tab === "all" || tx.type === tab
      const matchesSearch =
        search.trim() === "" ||
        tx.id.toLowerCase().includes(search.toLowerCase()) ||
        tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.counterparty.toLowerCase().includes(search.toLowerCase()) ||
        tx.reference.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === "all" || tx.status === status
      const matchesMethod = method === "all" || tx.method === method
      const matchesDate = tx.date >= range.cutoff
      return matchesTab && matchesSearch && matchesStatus && matchesMethod && matchesDate
    })
  }, [tab, search, status, method, dateRange])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const netTotal = filtered.reduce(
    (sum, tx) => sum + (tx.direction === "in" ? tx.amount : -tx.amount),
    0
  )

  // Any filter change resets to page 1
  const update = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value)
    setPage(1)
  }

  const resetFilters = () => {
    setSearch("")
    setStatus("all")
    setMethod("all")
    setDateRange("all")
    setPage(1)
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Payments</h1>
            <p className="text-muted-foreground">
              Every payment, escrow movement, wallet action, and refund in one ledger.
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <p className="text-sm font-medium text-slate-500">Available Balance</p>
            <p className="text-3xl font-bold mt-2">$48,250.00</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <p className="text-sm font-medium text-slate-500">Funds on Hold</p>
            <p className="text-3xl font-bold mt-2">$12,400.00</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Ready to Withdraw</p>
              <p className="text-3xl font-bold mt-2 text-emerald-600">$35,850.00</p>
            </div>
            <Button className="mt-4 w-full h-11 text-base">Withdraw Funds</Button>
          </div>
        </div>

        {/* Type tabs */}
        <Tabs value={tab} onValueChange={update(setTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => update(setSearch)(e.target.value)}
                placeholder="Search by ID, reference, party, or description…"
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center">
              <Select value={status} onValueChange={update(setStatus)}>
                <SelectTrigger className="lg:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {TX_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={method} onValueChange={update(setMethod)}>
                <SelectTrigger className="lg:w-[160px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All methods</SelectItem>
                  {TX_METHODS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={update(setDateRange)}>
                <SelectTrigger className="lg:w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  {DATE_RANGES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Summary strip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filtered.length}</span>{" "}
            transaction{filtered.length !== 1 && "s"} · Net{" "}
            <span
              className={`font-semibold ${
                netTotal >= 0 ? "text-green-600" : "text-foreground"
              }`}
            >
              {netTotal >= 0 ? "+" : "-"}
              {formatCurrency(Math.abs(netTotal))}
            </span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Reset filters
          </Button>
        </div>

        {/* Mobile-First Transaction Cards */}
        <div className="space-y-4">
          {pageRows.length > 0 ? (
            pageRows.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelected(tx)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer hover:border-primary/50 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    tx.direction === "in"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {tx.direction === "in" ? (
                      <ArrowDownLeft className="h-6 w-6" />
                    ) : (
                      <ArrowUpRight className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">{tx.description}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500">
                      <span>{tx.displayDate}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{tx.status}</span>
                      <span>•</span>
                      <span className="truncate max-w-[120px] sm:max-w-[200px]">{tx.counterparty}</span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold text-lg sm:text-right ${
                  tx.direction === "in" ? "text-emerald-600" : "text-slate-900"
                }`}>
                  {signedAmount(tx)}
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No transactions found"
              description="No transactions match the current filters. Try widening your search or resetting filters."
              action={{ label: "Reset filters", onClick: resetFilters }}
              className="rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] py-12"
            />
          )}

          {/* Pagination footer */}
          {pageRows.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 border-t px-6 py-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(currentPage - 1) * PAGE_SIZE + 1}
                </span>
                –
                <span className="font-medium text-foreground">
                  {Math.min(currentPage * PAGE_SIZE, filtered.length)}
                </span>{" "}
                of <span className="font-medium text-foreground">{filtered.length}</span>
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    className="w-9"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details dialog */}
      <TransactionDetails
        transaction={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </MainLayout>
  )
}
