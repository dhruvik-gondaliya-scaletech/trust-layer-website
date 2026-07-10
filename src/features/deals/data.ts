export type DealStatus = "Active" | "Pending" | "Completed" | "Disputed"

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
  category: "Development" | "Design" | "Marketing" | "Consulting"
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
}

export const DEALS: Deal[] = [
  {
    id: "DL-1042",
    title: "Website Redesign",
    category: "Design",
    status: "Active",
    amount: 12500,
    counterparty: "Apex Studios",
    createdAt: "Jul 08, 2026",
    updatedAt: "2 hours ago",
    description:
      "Full redesign of the corporate marketing site, including a new design system, five key page templates, and a headless CMS integration.",
    progress: 60,
    protectedAmount: "$12,500.00",
    releasedAmount: "$5,000.00",
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "Apex Studios", role: "Seller", initials: "AS", trustScore: 792 },
    ],
    payments: [
      { label: "Kick-off deposit", amount: "$5,000.00", date: "Jul 08", status: "Released" },
      { label: "Design approval", amount: "$4,000.00", date: "Jul 22", status: "In Escrow" },
      { label: "Final delivery", amount: "$3,500.00", date: "Aug 05", status: "Scheduled" },
    ],
    reviews: [
      {
        author: "Apex Studios",
        initials: "AS",
        rating: 5,
        date: "Jul 09",
        comment: "Clear brief and fast approvals. A pleasure to work with.",
      },
    ],
    disputes: [],
  },
  {
    id: "DL-1039",
    title: "Q3 Ad Campaign",
    category: "Marketing",
    status: "Pending",
    amount: 8000,
    counterparty: "BrightMedia",
    createdAt: "Jul 06, 2026",
    updatedAt: "Yesterday",
    description:
      "Paid social and search campaign management for Q3, targeting a 3x return on ad spend across three markets.",
    progress: 15,
    protectedAmount: "$8,000.00",
    releasedAmount: "$0.00",
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "BrightMedia", role: "Seller", initials: "BM", trustScore: 715 },
    ],
    payments: [
      { label: "Setup fee", amount: "$2,000.00", date: "Jul 06", status: "In Escrow" },
      { label: "Monthly retainer", amount: "$6,000.00", date: "Aug 01", status: "Scheduled" },
    ],
    reviews: [],
    disputes: [],
  },
  {
    id: "DL-1031",
    title: "Mobile App Build",
    category: "Development",
    status: "Active",
    amount: 34000,
    counterparty: "Nova Labs",
    createdAt: "Jul 02, 2026",
    updatedAt: "4 hours ago",
    description:
      "Cross-platform mobile application with authentication, in-app payments, and a real-time messaging module.",
    progress: 40,
    protectedAmount: "$34,000.00",
    releasedAmount: "$10,000.00",
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "Nova Labs", role: "Seller", initials: "NL", trustScore: 831 },
    ],
    payments: [
      { label: "Milestone 1 — Auth", amount: "$10,000.00", date: "Jul 02", status: "Released" },
      { label: "Milestone 2 — Payments", amount: "$12,000.00", date: "Jul 20", status: "In Escrow" },
      { label: "Milestone 3 — Launch", amount: "$12,000.00", date: "Aug 12", status: "Scheduled" },
    ],
    reviews: [
      {
        author: "Nova Labs",
        initials: "NL",
        rating: 4,
        date: "Jul 03",
        comment: "Well-scoped project with responsive stakeholders.",
      },
    ],
    disputes: [],
  },
  {
    id: "DL-1024",
    title: "Logo & Branding",
    category: "Design",
    status: "Completed",
    amount: 3200,
    counterparty: "Pixel Forge",
    createdAt: "Jun 28, 2026",
    updatedAt: "Jul 05",
    description:
      "Primary logo, wordmark, and a one-page brand guideline covering color, type, and logo usage.",
    progress: 100,
    protectedAmount: "$0.00",
    releasedAmount: "$3,200.00",
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "Pixel Forge", role: "Seller", initials: "PF", trustScore: 768 },
    ],
    payments: [
      { label: "Full payment", amount: "$3,200.00", date: "Jun 28", status: "Released" },
    ],
    reviews: [
      {
        author: "You (Bhavya Patel)",
        initials: "BP",
        rating: 5,
        date: "Jul 05",
        comment: "Delivered ahead of schedule and nailed the brief on the first pass.",
      },
      {
        author: "Pixel Forge",
        initials: "PF",
        rating: 5,
        date: "Jul 05",
        comment: "Prompt payment and great communication throughout.",
      },
    ],
    disputes: [],
  },
  {
    id: "DL-1018",
    title: "SEO Retainer",
    category: "Marketing",
    status: "Disputed",
    amount: 2400,
    counterparty: "RankUp Co.",
    createdAt: "Jun 24, 2026",
    updatedAt: "Jul 07",
    description:
      "Three-month SEO retainer covering technical audits, on-page optimization, and monthly reporting.",
    progress: 50,
    protectedAmount: "$1,200.00",
    releasedAmount: "$1,200.00",
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "RankUp Co.", role: "Seller", initials: "RC", trustScore: 640 },
    ],
    payments: [
      { label: "Month 1", amount: "$800.00", date: "Jun 24", status: "Released" },
      { label: "Month 2", amount: "$800.00", date: "Jul 24", status: "In Escrow" },
      { label: "Month 3", amount: "$800.00", date: "Aug 24", status: "Scheduled" },
    ],
    reviews: [],
    disputes: [
      {
        title: "Deliverables not meeting agreed scope",
        raisedBy: "You (Bhavya Patel)",
        date: "Jul 07",
        status: "Under Review",
        summary:
          "Month 2 reporting did not include the agreed technical audit. Requesting revision or partial refund before release.",
      },
    ],
  },
  {
    id: "DL-1009",
    title: "Growth Strategy Consulting",
    category: "Consulting",
    status: "Active",
    amount: 15000,
    counterparty: "Northwind Advisory",
    createdAt: "Jun 20, 2026",
    updatedAt: "3 days ago",
    description:
      "Six-week engagement to define a go-to-market strategy, pricing model, and 12-month growth roadmap.",
    progress: 70,
    protectedAmount: "$15,000.00",
    releasedAmount: "$7,500.00",
    participants: [
      { name: "You (Bhavya Patel)", role: "Buyer", initials: "BP", trustScore: 850 },
      { name: "Northwind Advisory", role: "Seller", initials: "NA", trustScore: 810 },
    ],
    payments: [
      { label: "Phase 1 — Discovery", amount: "$7,500.00", date: "Jun 20", status: "Released" },
      { label: "Phase 2 — Roadmap", amount: "$7,500.00", date: "Jul 25", status: "In Escrow" },
    ],
    reviews: [],
    disputes: [],
  },
]

export const CATEGORIES = ["Development", "Design", "Marketing", "Consulting"] as const
export const STATUSES: DealStatus[] = ["Active", "Pending", "Completed", "Disputed"]

export function getDeal(id: string): Deal | undefined {
  return DEALS.find((d) => d.id === id)
}

export const STATUS_STYLES: Record<DealStatus, string> = {
  Active: "bg-green-500/10 text-green-600 border-transparent hover:bg-green-500/10",
  Pending: "bg-amber-500/10 text-amber-600 border-transparent hover:bg-amber-500/10",
  Completed: "bg-blue-500/10 text-blue-600 border-transparent hover:bg-blue-500/10",
  Disputed: "bg-destructive/10 text-destructive border-transparent hover:bg-destructive/10",
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })
}
