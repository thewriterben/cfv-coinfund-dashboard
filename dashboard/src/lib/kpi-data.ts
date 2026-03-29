/**
 * KPI Data Model for CFV CoinFund 270-Day Battle Plan
 *
 * All 12 battle plan metrics with Day 14/28/42/53/70/90 targets
 * sourced from the KPI Tracker sheet in the SAM Excel workbook.
 */

export interface DayTarget {
  day: number;
  label: string;
  value: number | string;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  source: string;
  unit: "number" | "currency" | "text";
  targets: DayTarget[];
  currentValue: number | string;
  targetFinal: string;
}

export const CAMPAIGN_START_DATE = new Date("2026-03-29");

export function getCampaignDay(now: Date = new Date()): number {
  const diff = now.getTime() - CAMPAIGN_START_DATE.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getCampaignPhase(day: number): {
  phase: string;
  label: string;
  color: string;
} {
  if (day <= 53) {
    return {
      phase: "Phase 1",
      label: "Build the War Machine",
      color: "#f59e0b",
    };
  } else if (day <= 90) {
    return {
      phase: "Phase 2",
      label: "Fund I Open — Close $1 Billion",
      color: "#10b981",
    };
  } else if (day <= 180) {
    return {
      phase: "Phase 3",
      label: "Fund II — $5 Billion",
      color: "#6366f1",
    };
  } else {
    return {
      phase: "Phase 4",
      label: "Fund III — $15 Billion",
      color: "#ec4899",
    };
  }
}

export function getCurrentMilestone(day: number): number {
  const milestones = [14, 28, 42, 53, 70, 90];
  for (const m of milestones) {
    if (day <= m) return m;
  }
  return 90;
}

/**
 * All 12 KPIs from the 270-Day Battle Plan with checkpoint targets.
 * Current values default to 0 — updated via the dashboard's data entry
 * or CRM integration.
 */
export const KPI_DEFINITIONS: KPI[] = [
  {
    id: "sams_contacted",
    name: "SAMs Contacted (1st Touch)",
    description:
      "Number of Small Asset Managers contacted for the first time. The 2,146-firm SAM list must be fully contacted by Day 42.",
    source: "CRM",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 1800 },
      { day: 42, label: "Day 42", value: 2146 },
      { day: 53, label: "Day 53", value: 2146 },
      { day: 70, label: "Day 70", value: 2146 },
      { day: 90, label: "Day 90", value: 2146 },
    ],
    currentValue: 0,
    targetFinal: "2,146 by Day 42",
  },
  {
    id: "cumulative_touches",
    name: "Cumulative Touches",
    description:
      "Total contact touches across all SAMs (calls, emails, LinkedIn, webinar invites). Each SAM should be touched 5-6 times by Day 90.",
    source: "CRM Analytics",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 1800 },
      { day: 42, label: "Day 42", value: 6000 },
      { day: 53, label: "Day 53", value: 8500 },
      { day: 70, label: "Day 70", value: 10000 },
      { day: 90, label: "Day 90", value: 12000 },
    ],
    currentValue: 0,
    targetFinal: "12,000+ by Day 90",
  },
  {
    id: "verbal_commitments",
    name: "Verbal Commitments",
    description:
      "SAMs who verbally commit to investing when the fund opens on Day 54. Pre-sell target: $1B+ in verbal commitments before open.",
    source: "CRM Pipeline",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 30 },
      { day: 42, label: "Day 42", value: 180 },
      { day: 53, label: "Day 53", value: 200 },
      { day: 70, label: "Day 70", value: 0 },
      { day: 90, label: "Day 90", value: 0 },
    ],
    currentValue: 0,
    targetFinal: "200+ by Day 53",
  },
  {
    id: "signed_subscriptions",
    name: "Signed Subscriptions",
    description:
      "SAMs who have signed subscription documents. Fund opens Day 54 — target 40-50 SAMs execute Day 1.",
    source: "IR Tracker",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 0 },
      { day: 42, label: "Day 42", value: 0 },
      { day: 53, label: "Day 53", value: 0 },
      { day: 70, label: "Day 70", value: 190 },
      { day: 90, label: "Day 90", value: 200 },
    ],
    currentValue: 0,
    targetFinal: "200+ by Day 90",
  },
  {
    id: "capital_committed",
    name: "Capital Committed",
    description:
      "Total capital committed in signed subscription agreements. Fund I target: $1 billion across 200+ SAMs at ~$5M average.",
    source: "Dashboard",
    unit: "currency",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 0 },
      { day: 42, label: "Day 42", value: 0 },
      { day: 53, label: "Day 53", value: 1000000000 },
      { day: 70, label: "Day 70", value: 950000000 },
      { day: 90, label: "Day 90", value: 1000000000 },
    ],
    currentValue: 0,
    targetFinal: "$1B signed by Day 90",
  },
  {
    id: "podcast_episodes",
    name: "Podcast Episodes",
    description:
      "Episodes recorded and published. 15 episodes across 90 days featuring legislators, coin founders, and SAM testimonials.",
    source: "Content Tracker",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 1 },
      { day: 28, label: "Day 28", value: 4 },
      { day: 42, label: "Day 42", value: 8 },
      { day: 53, label: "Day 53", value: 10 },
      { day: 70, label: "Day 70", value: 13 },
      { day: 90, label: "Day 90", value: 15 },
    ],
    currentValue: 0,
    targetFinal: "15 by Day 90",
  },
  {
    id: "webinars",
    name: "Webinars",
    description:
      "Live webinars hosted. Key webinars: SB 1649 (Day 20), Compliance (Day 33), Portfolio Deep Dive (Day 38), Legislator Panel (Day 45), Fund Status (Day 63).",
    source: "Content Tracker",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 1 },
      { day: 42, label: "Day 42", value: 3 },
      { day: 53, label: "Day 53", value: 4 },
      { day: 70, label: "Day 70", value: 5 },
      { day: 90, label: "Day 90", value: 5 },
    ],
    currentValue: 0,
    targetFinal: "5 by Day 90",
  },
  {
    id: "ic_presentations",
    name: "IC Presentations",
    description:
      "Investment Committee presentations to SAM firms. 2-3 per day during engagement phase. Commander + legislator on Zoom.",
    source: "CRM Pipeline",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 0 },
      { day: 42, label: "Day 42", value: 15 },
      { day: 53, label: "Day 53", value: 30 },
      { day: 70, label: "Day 70", value: 40 },
      { day: 90, label: "Day 90", value: 40 },
    ],
    currentValue: 0,
    targetFinal: "40+ by Day 90",
  },
  {
    id: "x_followers",
    name: "X Followers Gained",
    description:
      "New followers on X (Twitter). Driven by SB 1649 content, podcast clips, Beyond Bitcoin Book Club, and coin data graphics.",
    source: "Social Metrics",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 1000 },
      { day: 28, label: "Day 28", value: 4000 },
      { day: 42, label: "Day 42", value: 10000 },
      { day: 53, label: "Day 53", value: 14000 },
      { day: 70, label: "Day 70", value: 18000 },
      { day: 90, label: "Day 90", value: 25000 },
    ],
    currentValue: 0,
    targetFinal: "25,000+ by Day 90",
  },
  {
    id: "sb1649_states",
    name: "States with SB 1649 Interest",
    description:
      "States showing interest in SB 1649-style legislation. Arizona passed; target 5-6 additional states by Day 90.",
    source: "Legislative Tracker",
    unit: "number",
    targets: [
      { day: 14, label: "Day 14", value: 1 },
      { day: 28, label: "Day 28", value: 1 },
      { day: 42, label: "Day 42", value: 3 },
      { day: 53, label: "Day 53", value: 4 },
      { day: 70, label: "Day 70", value: 5 },
      { day: 90, label: "Day 90", value: 6 },
    ],
    currentValue: 1,
    targetFinal: "5–6 by Day 90",
  },
  {
    id: "exchange_listings",
    name: "Exchange Listings Initiated",
    description:
      "Exchange listing applications filed for the 12 CoinFund coins. Part of the 20% management pool deployment.",
    source: "Deployment Plan",
    unit: "text",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 0 },
      { day: 42, label: "Day 42", value: 0 },
      { day: 53, label: "Day 53", value: 0 },
      { day: 70, label: "Day 70", value: "Planning" },
      { day: 90, label: "Day 90", value: "Applications filed" },
    ],
    currentValue: "Not started",
    targetFinal: "Applications filed by Day 90",
  },
  {
    id: "wallet_pos",
    name: "Wallet/POS Dev Contracts",
    description:
      "Wallet and POS integration vendor contracts. Targets: Verifone API, Square, Clover, Toast, Apple Pay, Google Pay.",
    source: "Deployment Plan",
    unit: "text",
    targets: [
      { day: 14, label: "Day 14", value: 0 },
      { day: 28, label: "Day 28", value: 0 },
      { day: 42, label: "Day 42", value: 0 },
      { day: 53, label: "Day 53", value: 0 },
      { day: 70, label: "Day 70", value: 0 },
      { day: 90, label: "Day 90", value: "Vendors signed" },
    ],
    currentValue: "Not started",
    targetFinal: "Vendors signed by Day 90",
  },
];

export interface SAMRecord {
  rank: number;
  priority: string;
  firmName: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  aum: number;
  aumTier: string;
  estCommit: number;
  territory: string;
  status: string;
  notes: string;
  address: string;
}

export interface SAMSummary {
  totalFirms: number;
  p1Count: number;
  p2Count: number;
  p3Count: number;
  totalAUM: number;
  estCapitalAt20Pct: number;
  firmsMissingPhone: number;
  tierBreakdown: { tier: string; count: number; totalAUM: number }[];
  territoryBreakdown: { territory: string; count: number }[];
  stateBreakdown: { state: string; count: number }[];
}

export function parseAUM(aumStr: string): number {
  if (!aumStr) return 0;
  const cleaned = aumStr.replace(/[$,]/g, "");
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function getProgressPercent(
  current: number,
  target: number
): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

export function getStatusColor(percent: number): string {
  if (percent >= 100) return "#10b981"; // green
  if (percent >= 75) return "#f59e0b"; // amber
  if (percent >= 50) return "#f97316"; // orange
  return "#ef4444"; // red
}
