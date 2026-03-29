# CFV CoinFund KPI Dashboard

**270-Day Battle Plan KPI Tracker · Fund I ($1B Target) · Digital Gold Foundation**

A live KPI dashboard for tracking all 12 battle plan metrics from the CFV CoinFund 270-Day Battle Plan with Day 14/28/42/53/70/90 checkpoint targets.

## Features

- **12 Battle Plan KPIs** with real-time progress tracking against milestone targets
- **Campaign day calculator** — automatically shows current day, phase, and next milestone
- **Phase indicator** — Phase 1 (Build the War Machine), Phase 2 (Fund I Open), Phase 3 (Fund II), Phase 4 (Fund III)
- **SAM Pipeline Overview** — parsed from the 2,144-firm CRM master list with priority, AUM tier, and territory breakdowns
- **Editable KPI values** — click the edit icon on any KPI card to update the current value; persisted to localStorage
- **Full milestone targets table** — all 12 KPIs × 6 checkpoints at a glance
- **Color-coded progress** — green (≥100%), amber (≥75%), orange (≥50%), red (<50%)

## KPIs Tracked

| KPI | Target | Source |
|-----|--------|--------|
| SAMs Contacted (1st Touch) | 1,800 by Day 28 / 2,146 by Day 42 | CRM |
| Cumulative Touches | 12,000+ by Day 90 | CRM Analytics |
| Verbal Commitments | 200+ by Day 53 | CRM Pipeline |
| Signed Subscriptions | 200+ by Day 90 | IR Tracker |
| Capital Committed | $1B signed by Day 90 | Dashboard |
| Podcast Episodes | 15 by Day 90 | Content Tracker |
| Webinars | 5 by Day 90 | Content Tracker |
| IC Presentations | 40+ by Day 90 | CRM Pipeline |
| X Followers Gained | 25,000+ by Day 90 | Social Metrics |
| States with SB 1649 Interest | 5–6 by Day 90 | Legislative Tracker |
| Exchange Listings Initiated | Applications filed by Day 90 | Deployment Plan |
| Wallet/POS Dev Contracts | Vendors signed by Day 90 | Deployment Plan |

## Getting Started

```bash
cd dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS 4**
- **Recharts** (charting library)

## Data Sources

- **SAM CRM Data**: Loaded from `/public/sam_data.csv` — the 2,144-firm master list with priority tagging, AUM tiers, territory assignments, and estimated commitments
- **KPI Values**: Manually entered via the dashboard UI and persisted to browser localStorage. In production, these would connect to your CRM, IR tracker, content tracker, social metrics, legislative tracker, and deployment plan systems.

## Project Structure

```
dashboard/
├── public/
│   └── sam_data.csv          # SAM CRM master list (2,144 firms)
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main page
│   ├── components/
│   │   └── KPIDashboard.tsx  # Main dashboard component
│   └── lib/
│       └── kpi-data.ts       # KPI definitions, targets, utilities
└── package.json
```