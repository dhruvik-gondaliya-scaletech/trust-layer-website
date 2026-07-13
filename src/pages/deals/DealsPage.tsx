import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
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
import { EmptyState } from "@/components/shared/EmptyState"
import { DealCard } from "@/features/deals/components/DealCard"
import { DEALS, CATEGORIES, STATUSES } from "@/features/deals/data"
import { Search, Plus, SlidersHorizontal } from "lucide-react"

const PRICE_RANGES = [
  { label: "Any price", value: "all", min: 0, max: Infinity },
  { label: "Under $5,000", value: "under5k", min: 0, max: 5000 },
  { label: "$5,000 – $15,000", value: "5to15k", min: 5000, max: 15000 },
  { label: "$15,000 – $30,000", value: "15to30k", min: 15000, max: 30000 },
  { label: "Over $30,000", value: "over30k", min: 30000, max: Infinity },
]

const SORT_OPTIONS = [
  { label: "Newest first", value: "newest" },
  { label: "Amount: high to low", value: "amountDesc" },
  { label: "Amount: low to high", value: "amountAsc" },
  { label: "Progress", value: "progress" },
]

export function DealsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [price, setPrice] = useState("all")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("newest")

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.value === price) ?? PRICE_RANGES[0]

    const result = DEALS.filter((deal) => {
      const matchesSearch =
        search.trim() === "" ||
        deal.title.toLowerCase().includes(search.toLowerCase()) ||
        deal.counterparty.toLowerCase().includes(search.toLowerCase()) ||
        deal.id.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === "all" || deal.status === status
      const matchesCategory = category === "all" || deal.category === category
      const matchesPrice = deal.amount >= range.min && deal.amount <= range.max
      return matchesSearch && matchesStatus && matchesCategory && matchesPrice
    })

    switch (sort) {
      case "amountDesc":
        result.sort((a, b) => b.amount - a.amount)
        break
      case "amountAsc":
        result.sort((a, b) => a.amount - b.amount)
        break
      case "progress":
        result.sort((a, b) => b.progress - a.progress)
        break
      default:
        break // newest — keep source order
    }

    return result
  }, [search, status, price, category, sort])

  const resetFilters = () => {
    setSearch("")
    setStatus("all")
    setPrice("all")
    setCategory("all")
    setSort("newest")
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Deals</h1>
            <p className="text-muted-foreground">
              Browse and manage your escrow-protected agreements.
            </p>
          </div>
          <Button asChild>
            <Link to="/deals/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Deal
            </Link>
          </Button>
        </div>

        {/* Top filters */}
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search deals, parties, or IDs…"
                className="pl-9"
              />
            </div>

            {/* Filter selects */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="lg:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="lg:w-[160px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="lg:w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="lg:w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Result meta */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filtered.length}</span>{" "}
            of {DEALS.length} deals
          </p>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Reset filters
          </Button>
        </div>

        {/* Responsive deal cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No deals match your filters"
            description="Try broadening your search or clearing a filter to see more results."
            action={{ label: "Reset filters", onClick: resetFilters }}
          />
        )}
      </div>
    </MainLayout>
  )
}
