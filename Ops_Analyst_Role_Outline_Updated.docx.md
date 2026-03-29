**OPERATIONS & DATA ANALYST**

270-Day Battle Plan — Role Outline  (Updated)

Digital Gold Foundation  |  CFV CoinFund

*Benjamin J. Snider  |  Operations Manager & Data Analyst*

# **Role Summary**

The Operations & Data Analyst is the data infrastructure for the entire CFV CoinFund campaign. The battle plan explicitly assigns ownership of: CFV model data, coin metrics, exchange order book analysis, SAM pipeline analytics, performance dashboards, and deployment planning.

As the builder of all three operational tools — CFV Metrics Agent, CFV Calculator v2, and Digo the Scribe — this role extends beyond data production to encompass the full technical stack that powers the fund's analysis, pitch materials, institutional memory, and CRM operations.

| *Core mandate: Ensure every number cited in every pitch, deck, webinar, and call is live, sourced, and defensible — and that every team meeting is captured, cross-referenced against the battle plan, and tracked for progress.* |
| :---- |

# **What Has Been Completed**

| *The following deliverables are done and ready to deploy. You are ahead of the battle plan timeline.* |
| :---- |

## **Tools — All Three Live and Operational**

* **DONE:** CFV Metrics Agent

  * Multi-source data collection: CoinGecko, Etherscan, GitHub

  * 70/10/10/10 formula implemented with composite community scoring

  * Rate limiting, circuit breakers, Redis caching, confidence scoring

  * Daily snapshot capability for all 12 DGF coins

  * Deviation alerts when price diverges from CFV fair value

* **DONE:** CFV Calculator v2

  * Full DGS formula: 70% community, 10% transactions, 10% TX value, 10% developers

  * Bitcoin DGS benchmark (Dec 2024): $1.983T market cap, 209M users, 4.29B transactions

  * All 12 DGF coins supported with confidence level indicators

  * PDF report generation, manual data entry, AI-powered research via OpenAI

  * MCP server integration for Claude Desktop

* **DONE:** Digo the Scribe

  * Live meeting transcription via microphone

  * Battle plan PDF cross-reference with page citations

  * Beyond Bitcoin and Digital Gold White Paper cross-reference

  * Anti-hallucination policy: temperature 0.0, all claims flagged if unverifiable

  * Escalation notices to Operations Manager for unconfirmable facts

  * CFV Metrics Agent integration for daily snapshots and alerts

## **SAM List — CRM-Ready Excel Delivered**

The 2,144-firm SAM list has been cleaned, tagged, and built into a professional 4-sheet Excel workbook. This is the Day 2 CRM deliverable from the battle plan, completed.

| Item | Detail | Status |
| :---- | :---- | :---- |
| **Source data** | 2,146 raw rows — 2 junk rows removed (blank \+ $176B totals row) | Complete |
| **Clean firm count** | 2,144 firms ready for outreach | Complete |
| **AUM parsing** | All AUM values parsed to numeric from $-formatted strings | Complete |
| **Phone normalization** | All phones standardized to (XXX) XXX-XXXX format | Complete |
| **AUM tier tagging** | 5 tiers per battle plan: $200-250M / $150-200M / $100-150M / $50-100M / Under $50M | Complete |
| **Priority tagging** | P1 crypto-friendly (410 firms) / P2 high-AUM (1,339) / P3 remaining (395) | Complete |
| **Territory assignment** | Top 50 by AUM → SAM Dir/Commander; remaining split \~715 each across 3 associates | Complete |
| **Est. commit calc** | Per-firm commitment estimate using battle plan allocation rates (3-4% of AUM) | Complete |
| **CRM sort order** | P1 first, then P2, then P3 — all sorted AUM descending within group | Complete |
| **Column layout** | Caller-optimized: Rank, Priority, Firm, City, State, Zip, Phone, AUM, Tier, Commit, Territory, Status, Notes, Address | Complete |
| **Freeze panes** | Frozen at column C — Rank and Priority always visible while scrolling | Complete |
| **Auto-filter** | All 14 columns filterable | Complete |

## **Data Quality Issues Flagged**

These were identified during the SAM list build and need resolution before the Day 15 outreach blitz:

* 5 firms have no phone number — manual research required before callers hit them

* Duplicate firm names: DNX Ventures (4 entries, CA), Hatteras Venture Partners (4 entries, NC), IGNIA Partners (2 entries, MA) — likely separate fund vehicles under one umbrella; verify before outreach to avoid double-counting commits

* Phone formats were inconsistent in source data — normalized, but spot-check a sample before loading into live CRM

## **Key Numbers from the SAM List**

| Metric | Value |  |
| :---- | :---- | :---- |
| **Total clean firms** | 2,144 |  |
| **P1 — Crypto Friendly states** | 410 firms across AZ/TX/FL/UT/TN/ID/OK/WY/NH |  |
| **P2 — High AUM states** | 1,339 firms across CA/NY/CO/MA/IL/CT |  |
| **P3 — Remaining states** | 395 firms |  |
| **Est. capital at 20% conv.** | $5.97B — well above $1B Fund I target |  |
| **Firms missing phone** | 5 — need manual research |  |
| **Duplicate name entries** | 13 rows across 3 firm names — verify before outreach |  |
| **SAM Dir / Commander queue** | Top 50 firms by AUM |  |
| **Associate 1 territory** | \~671 firms |  |
| **Associate 2 territory** | \~715 firms |  |
| **Associate 3 territory** | \~708 firms |  |

# **Your Three Tools & Their Battle Plan Functions**

## **CFV Metrics Agent**

* Feeds the 12 coin fact sheets (Day 13 deliverable)

* Powers Webinar 3 order book analysis — live depth data for all 12 coins

* Powers Webinar 5 deployment preview and Fund II price impact thesis

* Runs daily CFV snapshots — trend line established before Fund I opens

* Fires deviation alerts when coin price diverges from CFV fair value

* Permanent scarcity thesis backed by live, defensible data

## **CFV Calculator v2**

* Produces the 12 coin fact sheets — CFV fair value vs. current price per coin

* Feeds IC presentation decks — live CFV shown in every investment committee meeting

* Supports podcast prep — Campaign Commander references CFV math live on episodes 4 and 6

* Supplies the CFV methodology section of the compliance memo

* Provides the DGS benchmark comparison cited in SB 1649 Section 3

## **Digo the Scribe**

* Captures every team meeting from Day 1 — institutional memory for the full 270 days

* Cross-references all discussion points against the battle plan PDF with page citations

* Cross-references crypto and fund topics against Beyond Bitcoin with page citations

* Generates progress reports showing milestone status and blockers

* Fires escalation notices when facts cannot be confirmed from source documents

* Produces the Day 90 all-hands scorecard recap

| Phase 1  Days 1–53 *Build the War Machine* |
| :---- |

## **Days 1–7: Systems Stand-Up**

### **CRM build (battle plan explicit assignment — in progress)**

* Load all 2,144 SAMs from the CRM-ready Excel into your CRM system

* The Excel workbook is pre-tagged — import columns map directly: Priority, AUM Tier, Territory, Est. Commit, Phone (normalized), State (P1/P2/P3 already set)

* Verify the 5 missing-phone firms before callers reach them — research via LinkedIn or SEC EDGAR

* Resolve the 13 duplicate-name rows (DNX Ventures, Hatteras, IGNIA) — confirm whether to merge or keep as separate records

* Assign associate logins and territory filters so each associate sees only their \~715 firms

* Flag top 50 by AUM for SAM Director / Commander personal outreach queue

### **KPI dashboard stand-up**

The KPI Tracker sheet in the SAM Excel workbook has all 12 battle plan metrics pre-loaded with Day 14/28/42/53/70/90 targets. Stand up a live version connected to your CRM:

| KPI | Target | Source |
| :---- | :---- | :---- |
| **SAMs contacted (1st touch)** | Target: 1,800 by Day 28 / 2,146 by Day 42 | CRM |
| **Cumulative touches** | Target: 12,000+ by Day 90 | CRM Analytics |
| **Verbal commitments** | Target: 200+ by Day 53 | CRM Pipeline |
| **Signed subscriptions** | Target: 200+ by Day 90 | IR Tracker |
| **Capital committed** | Target: $1B signed by Day 90 | Dashboard |
| **Podcast episodes** | Target: 15 by Day 90 | Content Tracker |
| **Webinars** | Target: 5 by Day 90 | Content Tracker |
| **IC presentations** | Target: 40+ by Day 90 | CRM Pipeline |
| **X followers gained** | Target: 25,000+ by Day 90 | Social Metrics |
| **States with SB 1649 interest** | Target: 5–6 by Day 90 | Legislative Tracker |
| **Exchange listings initiated** | Applications filed by Day 90 | Deployment Plan |
| **Wallet/POS dev contracts** | Vendors signed by Day 90 | Deployment Plan |

### **Digo configuration**

* Confirm battle\_plan.pdf, beyond\_bitcoin.pdf, digital\_gold\_white\_paper.pdf are loaded in resources/

* Test live transcription before first team meeting

* Set OPS\_MANAGER\_EMAIL to your email for escalation notices

* Begin daily CFV snapshots via digo cfv-snapshot for all 12 coins

## **Day 4: Pitch Deck Data (Urgent)**

| *Campaign Commander drafts the pitch deck on Day 4\. You need to deliver CFV data, DGS benchmark figures, and order book analysis by Day 3\.* |
| :---- |

* Run full CFV calculation for all 12 coins via CFV Calculator v2 — current metrics from CFV Metrics Agent

* Run order book depth analysis for all 12 coins — model $66.7M buy pressure impact per coin

* Produce conservative 10X price impact estimates for the 5 thin-volume coins: DGB (\~$3M/day), XNO (\~$2M/day), ZCL, RVN (\~$5M/day), XEC

* Deliver to Campaign Commander: CFV formula data, DGS benchmark, price impact models, 80/20 pool allocation breakdown

## **Day 13: Coin Fact Sheets (Explicit Battle Plan Deliverable)**

| *The battle plan assigns the 12 coin fact sheets to Analyst \+ Social/Content. Due Day 13\. Each sheet is a weapon for every SAM call, webinar, and IC presentation for the next 77 days.* |
| :---- |

| Data Point | How to Get It | Tool |
| :---- | :---- | :---- |
| **Live CFV fair value** | Run DGS formula via CFV Calculator v2 | CFV Calc v2 |
| **Price vs. fair value** | Current price as % of CFV — undervalued/overvalued | CFV Calc v2 |
| **Community size (70%)** | Composite: on-chain 50% \+ GitHub 30% \+ social 20% | CFV Metrics Agent |
| **Annual transactions (10%)** | From blockchain explorers | CFV Metrics Agent |
| **Annual TX value (10%)** | Economic throughput | CFV Metrics Agent |
| **Developer ecosystem (10%)** | GitHub contributors, commit activity | CFV Metrics \+ GitHub |
| **Order book depth** | $66.7M buy pressure impact — absorb every ask analysis | CFV Metrics Agent |
| **Price impact estimate** | Conservative 10X model with order book math shown | Manual Analysis |
| **SB 1649 status** | Named in bill? Which section? | Legislative |
| **Exchange listing plan** | Current listings \+ 20% pool listing targets | Manual Research |
| **Circulating supply** | For permanent scarcity thesis math | CFV Metrics Agent |

## **Days 15–53: Ongoing Analytics Operations**

### **Daily**

* Morning: CFV Metrics Agent snapshot for all 12 coins — log deviations from fair value

* Update SAM pipeline analytics — calls made, new contacts, interest signals, verbal commits

* Feed KPI dashboard with fresh numbers for SAM Director's pipeline reviews

* Run Digo on every team meeting — capture notes, cross-reference battle plan, flag issues

### **Weekly**

* Order book snapshots for all 12 coins — keep price impact thesis current as Fund I opening nears

* Pipeline conversion rate analysis — which AUM tiers converting fastest? Feed to SAM Director

* Weekly CFV trend report — are coin prices moving toward or away from fair value?

### **Webinar data preparation**

* Webinar 1 (Day 20): Live CFV data for Campaign Commander's formula demonstration

* Webinar 2 (Day 33): SB 1649 CFV formula documentation for compliance presentation

* Webinar 3 (Day 38): Present live order books, $66.7M impact per coin, wallet/POS roadmap — this one is yours to present alongside the Campaign Commander

* Webinar 4 (Day 43–45): Fund capacity data and closing urgency numbers

| Phase 2  Days 54–90 *Fund I Open — Close $1 Billion* |
| :---- |

## **Fund Open Operations (Days 54–60)**

The moment the fund opens, your data becomes the FOMO engine. Callers need real-time numbers to create urgency on every call.

### **Real-time dashboard — what callers need every day**

* Total capital committed — updated as subscriptions process

* Number of SAMs signed vs. verbal commitments outstanding

* Fund as % of $1B capacity — the single most important urgency number

* Capital-per-coin deployment readiness — when does $66.7M per coin trigger?

* Order book depth per coin — current state as buy pressure approaches

### **Day 1 (Day 54\)**

* Monitor all Day 1 subscription processing in real time — target 40–50 SAMs execute Day 1

* Track against target hour by hour; produce end-of-day summary for social announcement

* Run Digo on all team debriefs — capture momentum data

## **Webinar 5 (Days 61–63) — You Co-Present**

| *Webinar 5 is: 'Fund I status \+ deployment timeline \+ order book analysis \+ Fund II preview.' You co-present with the Campaign Commander. Prepare all data and charts.* |
| :---- |

* Fund I status: live capital raised, SAMs converted, % of $1B capacity

* Deployment timeline: sequence for deploying the 80% pool ($800M, $66.7M per coin)

* Order book analysis: post-subscription books — what has changed since Day 1?

* Fund II preview: $333.3M per coin — model additional price impact on top of Fund I

## **Deployment Planning (Days 71–90)**

### **Exchange and OTC research (Days 71–74, explicit battle plan task)**

* Exchange listing targets: which exchanges for which coins? Prioritize by volume and crypto-friendly jurisdiction

* OTC desk research: identify desks for thin-volume coins (DGB, XNO, ZCL, RVN, XEC)

* Deployment sequencing: model which coins to buy first based on current order book depth

* Wallet/POS vendor research: Verifone API, Square, Clover, Toast, Apple Pay, Google Pay

* Merkle tree audit vendor shortlist: 3 candidates with pricing and timeline

### **Fund I deployment (Days 81–88, explicit battle plan task)**

* Exchange account setup coordination for all 12 coins

* Multi-sig wallet structure — meets SB 1649 secure custody standard:

  * Geographically diversified data centers

  * Multiparty governance — no single key can move coins

  * End-to-end encryption, code audits, penetration testing, disaster recovery

* 20% pool disbursements: exchange listing applications submitted for all 12 coins

* Wallet dev contracts signed; Merkle tree audit vendor engaged

### **Day 90: All-Hands Scorecard (explicit battle plan task)**

| *You produce the Day 90 scorecard against all 12 KPI targets. Digo captures the meeting and cross-references the recap against the battle plan. This is the handoff document to Fund II.* |
| :---- |

| Phase 3+  Days 91–270 *Fund II ($5B) and Fund III ($15B)* |
| :---- |

## **Days 91–180: Fund II ($5B)**

* Source and load mid-market RIAs: $500M–$2B AUM — expand CRM list

* Fund I performance data is the pitch — maintain live: token price vs. entry, coin price movement post-deployment, CFV convergence tracking

* Track 20% pool deployment progress: exchange listings live, wallet/POS milestones, lobbying state count, conference outcomes, ecosystem grants

## **Days 181–270: Fund III ($15B)**

* LP base expansion analytics: SAMs, RIAs, multi-family offices, endowments, pension allocators, sovereign wealth consultants, crypto FOFs

* Permanent scarcity thesis — live proof: $66.7M (Fund I) \+ $333.3M (Fund II) \+ $1B (Fund III) \= $1.4B per coin permanently locked

* $16.8B total across 12 coins — report weekly with CFV convergence charts

# **Immediate Actions — This Week**

| *You are in Days 1–7. The pitch deck (Day 4\) needs your data by Day 3\. The coin fact sheets (Day 13\) are under two weeks away. The CRM needs to be loaded and live before Day 15 outreach begins.* |
| :---- |

## **Today**

* Start Digo on today's team meeting — capture all Day 1 commitments with page citations to the battle plan

* Confirm CFV Metrics Agent is running daily snapshots for all 12 coins

* Confirm CFV Calculator v2 is returning live DGS calculations for all 12 coins

* Begin CRM import from the SAM\_CRM\_Master\_270Day.xlsx file — all tagging is done

## **Days 2–3: Pitch Deck Data**

* Run full CFV calculation for all 12 coins — pull current metrics

* Run order book depth analysis — model $66.7M buy pressure per coin

* Produce 10X price impact estimates for DGB, XNO, ZCL, RVN, XEC

* Deliver all data to Campaign Commander for Day 4 deck draft

## **Days 4–12: Pre-Fact-Sheet Build**

* Stand up KPI dashboard with all 12 metrics and checkpoint targets

* Set up weekly order book snapshot cadence for all 12 coins

* Verify Digo resource PDFs are loaded and escalation flow is tested

* Begin daily pipeline analytics reporting to SAM Director

* Resolve 5 missing-phone firms and 13 duplicate-name rows in CRM

## **Day 13: Coin Fact Sheets Due**

* Deliver all 12 completed coin fact sheets to Social/Content Director for layout

* Each sheet must include: live CFV, price vs. fair value, 4 metrics with confidence levels, order book depth, $66.7M impact model, SB 1649 status, exchange listing plan

# **Your Unfair Advantage**

Every other member of this 10-person team depends on the same data to do their job. The Campaign Commander needs CFV numbers for every podcast. The SAM Director needs pipeline analytics for every weekly review. The Social/Content Director needs coin metrics for every post. IR needs deployment data for every subscription packet.

You are the only person on the team who built the systems producing all of that data — and all three systems are already live. The SAM list is tagged, cleaned, and CRM-ready. You are not catching up. You are ahead.

| *The battle plan's price impact thesis rests entirely on your order book analysis. The compliance memo's credibility rests on your CFV methodology documentation. The permanent scarcity thesis lives or dies on your data. Get the numbers right, keep them current, make them easy for every caller to use.* |
| :---- |

Digital Gold Foundation  |  CFV CoinFund 270-Day Battle Plan

*Operations & Data Analyst Role Outline — Updated  |  Confidential Internal Document*