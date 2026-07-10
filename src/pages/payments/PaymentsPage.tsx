import { useMemo, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/EmptyState"
import { TransactionDetails } from "@/features/payments/components/TransactionDetails"
import {
  TRANSACTIONS,
  TX_STATUSES,
  TX_METHODS,
  STATUS_STYLES,
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

        {/* Enterprise table */}
        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
          {pageRows.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-6">Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((tx) => (
                  <TableRow
                    key={tx.id}
                    onClick={() => setSelected(tx)}
                    className="cursor-pointer"
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            tx.direction === "in"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {tx.direction === "in" ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-medium">{tx.description}</div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {tx.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tx.counterparty}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{tx.method}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {tx.displayDate}
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_STYLES[tx.status]}>{tx.status}</Badge>
                    </TableCell>
                    <TableCell
                      className={`whitespace-nowrap pr-6 text-right font-semibold ${
                        tx.direction === "in" ? "text-green-600" : "text-foreground"
                      }`}
                    >
                      {signedAmount(tx)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-6">
              <EmptyState
                title="No transactions found"
                description="No transactions match the current filters. Try widening your search or resetting filters."
                action={{ label: "Reset filters", onClick: resetFilters }}
                className="border-none bg-transparent"
              />
            </div>
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
