export type DealStatus = "Draft" | "Open" | "Funded" | "Awaiting Shipment" | "Shipped" | "In Transit" | "Delivered" | "Awaiting Confirmation" | "Completed" | "Disputed" | "Funds Released"

export interface Participant {
  name: string
  role: "Buyer" | "Seller"
  initials: string
  trustScore: number
}

export interface PaymentMilestone {
  label: string
  amount: string
  date: string
  status: "Released" | "In Escrow" | "Scheduled"
}

export interface Review {
  author: string
  initials: string
  rating: number
  date: string
  comment: string
}

export interface DisputeEntry {
  title: string
  raisedBy: string
  date: string
  status: "Open" | "Under Review" | "Resolved"
  summary: string
}

export interface Deal {
  id: string
  title: string
  category: "Collectibles" | "Electronics" | "Watches" | "Vehicles" | "Other"
  status: DealStatus
  amount: number
  counterparty: string
  createdAt: string
  updatedAt: string
  description: string
  progress: number
  protectedAmount: string
  releasedAmount: string
  participants: Participant[]
  payments: PaymentMilestone[]
  reviews: Review[]
  disputes: DisputeEntry[]
  role: "Buyer" | "Seller"
  action: string
  trust: number
}

export const DEALS: Deal[] = [
  {
    id: "TRUST-0845",
    title: "Shadowless Mewtwo PSA 10",
    category: "Collectibles",
    status: "Funded",
    amount: 4300,
    counterparty: "PokeVault Inc.",
    createdAt: "Jul 08, 2026",
    updatedAt: "2 hours ago",
    description: "Mint condition Shadowless Mewtwo PSA 10. Shipped via FedEx overnight with signature required.",
    progress: 25,
    protectedAmount: "$4,300.00",
    releasedAmount: "$0.00",
    role: "Buyer",
    action: "View Deal",
    trust: 812,
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "PokeVault Inc.", role: "Seller", initials: "PV", trustScore: 812 },
    ],
    payments: [
      { label: "Escrow Deposit", amount: "$4,300.00", date: "Jul 08", status: "In Escrow" }
    ],
    reviews: [],
    disputes: [],
  },
  {
    id: "TRUST-1024",
    title: "Vintage Leica M6 Camera",
    category: "Electronics",
    status: "Awaiting Shipment",
    amount: 2400,
    counterparty: "Classic Optics",
    createdAt: "Jul 06, 2026",
    updatedAt: "5 hours ago",
    description: "Fully functional Vintage Leica M6. Includes original leather strap and body cap.",
    progress: 40,
    protectedAmount: "$2,400.00",
    releasedAmount: "$0.00",
    role: "Seller",
    action: "Upload Tracking",
    trust: 774,
    participants: [
      { name: "You (Bhavya Patel)", role: "Seller", initials: "BP", trustScore: 850 },
      { name: "Classic Optics", role: "Buyer", initials: "CO", trustScore: 774 },
    ],
    payments: [
      { label: "Escrow Deposit", amount: "$2,400.00", date: "Jul 06", status: "In Escrow" }
    ],
    reviews: [],
    disputes: [],
  },
  {
    id: "TRUST-1088",
    title: "Charizard Holo 1999 Base Set",
    category: "Collectibles",
    status: "Delivered",
    amount: 7850,
    counterparty: "Retro Games Ltd",
    createdAt: "Jul 02, 2026",
    updatedAt: "1 day ago",
    description: "Charizard Holo 1999 Base Set. Slight whitening on back edge, otherwise near mint.",
    progress: 90,
    protectedAmount: "$7,850.00",
    releasedAmount: "$0.00",
    role: "Buyer",
    action: "Confirm Delivery",
    trust: 905,
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "Retro Games Ltd", role: "Seller", initials: "RG", trustScore: 905 },
    ],
    payments: [
      { label: "Escrow Deposit", amount: "$7,850.00", date: "Jul 02", status: "In Escrow" },
    ],
    reviews: [],
    disputes: [],
  },
  {
    id: "TRUST-1127",
    title: "Rolex Submariner 16610",
    category: "Watches",
    status: "Disputed",
    amount: 9900,
    counterparty: "Timepiece Haven",
    createdAt: "Jun 24, 2026",
    updatedAt: "3 hours ago",
    description: "Rolex Submariner 16610 with box and papers. Serviced in 2023.",
    progress: 50,
    protectedAmount: "$9,900.00",
    releasedAmount: "$0.00",
    role: "Seller",
    action: "Review Dispute",
    trust: 631,
    participants: [
      { name: "You (Bhavya Patel)", role: "Seller", initials: "BP", trustScore: 850 },
      { name: "Timepiece Haven", role: "Buyer", initials: "TH", trustScore: 631 },
    ],
    payments: [
      { label: "Escrow Deposit", amount: "$9,900.00", date: "Jun 24", status: "In Escrow" },
    ],
    reviews: [],
    disputes: [
      {
        title: "Item received does not match description",
        raisedBy: "Timepiece Haven",
        date: "Jul 07",
        status: "Open",
        summary: "The buyer claims the watch has aftermarket parts not mentioned in the listing.",
      },
    ],
  },
]

export const CATEGORIES = ["Collectibles", "Electronics", "Watches", "Vehicles", "Other"] as const
export const STATUSES: DealStatus[] = ["Draft", "Open", "Funded", "Awaiting Shipment", "Shipped", "In Transit", "Delivered", "Awaiting Confirmation", "Completed", "Disputed", "Funds Released"]

export function getDeal(id: string): Deal | undefined {
  return DEALS.find((d) => d.id === id)
}

export const STATUS_STYLES: Record<DealStatus, string> = {
  Draft: "bg-gray-500/10 text-gray-600 border-transparent hover:bg-gray-500/10",
  Open: "bg-blue-500/10 text-blue-600 border-transparent hover:bg-blue-500/10",
  Funded: "bg-indigo-500/10 text-indigo-600 border-transparent hover:bg-indigo-500/10",
  "Awaiting Shipment": "bg-amber-500/10 text-amber-600 border-transparent hover:bg-amber-500/10",
  Shipped: "bg-blue-500/10 text-blue-600 border-transparent hover:bg-blue-500/10",
  "In Transit": "bg-blue-500/10 text-blue-600 border-transparent hover:bg-blue-500/10",
  Delivered: "bg-emerald-500/10 text-emerald-600 border-transparent hover:bg-emerald-500/10",
  "Awaiting Confirmation": "bg-amber-500/10 text-amber-600 border-transparent hover:bg-amber-500/10",
  Completed: "bg-green-500/10 text-green-600 border-transparent hover:bg-green-500/10",
  Disputed: "bg-destructive/10 text-destructive border-transparent hover:bg-destructive/10",
  "Funds Released": "bg-green-500/10 text-green-600 border-transparent hover:bg-green-500/10",
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })
}
