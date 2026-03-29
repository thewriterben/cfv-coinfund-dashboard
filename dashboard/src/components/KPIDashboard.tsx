"use client";

import { useState, useEffect, useCallback, useReducer } from "react";
import {
  KPI_DEFINITIONS,
  getCampaignDay,
  getCampaignPhase,
  getCurrentMilestone,
  formatCurrency,
  formatNumber,
  getProgressPercent,
  getStatusColor,
  CAMPAIGN_START_DATE,
  type KPI,
  type SAMSummary,
} from "@/lib/kpi-data";

// ── Persistent state via localStorage ──────────────────────────────

const STORAGE_KEY = "cfv_kpi_current_values";

function loadSavedValues(): Record<string, number | string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveValues(values: Record<string, number | string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

// ── SAM data parser ────────────────────────────────────────────────

async function loadSAMSummary(): Promise<SAMSummary> {
  const res = await fetch("/sam_data.csv");
  const text = await res.text();
  const lines = text.split("\n").slice(2); // skip 2 header rows (title + column headers)

  let totalFirms = 0;
  let p1 = 0;
  let p2 = 0;
  let p3 = 0;
  let totalAUM = 0;
  let totalCommit = 0;
  let missingPhone = 0;
  const tiers: Record<string, { count: number; totalAUM: number }> = {};
  const territories: Record<string, number> = {};
  const states: Record<string, number> = {};

  for (const line of lines) {
    if (!line.trim()) continue;
    // Parse CSV respecting quoted fields
    const cols = parseCSVLine(line);
    if (cols.length < 14) continue;

    const priority = cols[1]?.trim();
    const state = cols[4]?.trim();
    const phone = cols[6]?.trim();
    const aumStr = cols[7]?.trim();
    const tier = cols[8]?.trim();
    const commitStr = cols[9]?.trim();
    const territory = cols[10]?.trim();

    if (!priority) continue;

    totalFirms++;
    if (priority === "P1") p1++;
    else if (priority === "P2") p2++;
    else if (priority === "P3") p3++;

    const aum = parseFloat(aumStr.replace(/[$,]/g, "")) || 0;
    const commit = parseFloat(commitStr.replace(/[$,]/g, "")) || 0;
    totalAUM += aum;
    totalCommit += commit;

    if (!phone || phone === "(   )    -    ") missingPhone++;

    if (tier) {
      if (!tiers[tier]) tiers[tier] = { count: 0, totalAUM: 0 };
      tiers[tier].count++;
      tiers[tier].totalAUM += aum;
    }

    if (territory) {
      territories[territory] = (territories[territory] || 0) + 1;
    }

    if (state) {
      states[state] = (states[state] || 0) + 1;
    }
  }

  return {
    totalFirms,
    p1Count: p1,
    p2Count: p2,
    p3Count: p3,
    totalAUM,
    estCapitalAt20Pct: totalCommit,
    firmsMissingPhone: missingPhone,
    tierBreakdown: Object.entries(tiers)
      .map(([t, d]) => ({ tier: t, count: d.count, totalAUM: d.totalAUM }))
      .sort((a, b) => b.totalAUM - a.totalAUM),
    territoryBreakdown: Object.entries(territories)
      .map(([t, c]) => ({ territory: t, count: c }))
      .sort((a, b) => b.count - a.count),
    stateBreakdown: Object.entries(states)
      .map(([s, c]) => ({ state: s, count: c }))
      .sort((a, b) => b.count - a.count),
  };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ── Components ─────────────────────────────────────────────────────

function PhaseIndicator({
  day,
  phase,
}: {
  day: number;
  phase: ReturnType<typeof getCampaignPhase>;
}) {
  const milestone = getCurrentMilestone(day);
  const milestones = [14, 28, 42, 53, 70, 90];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Day {day}{" "}
            <span className="text-sm font-normal text-gray-400">of 270</span>
          </h2>
          <p className="text-sm mt-1" style={{ color: phase.color }}>
            {phase.phase}: {phase.label}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Campaign started:{" "}
            {CAMPAIGN_START_DATE.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Next Milestone</p>
          <p className="text-xl font-bold text-white">Day {milestone}</p>
          <p className="text-xs text-gray-500">
            {milestone - day > 0 ? `${milestone - day} days away` : "Today!"}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mt-6">
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, (day / 90) * 100)}%`,
              background: `linear-gradient(90deg, ${phase.color}, ${phase.color}88)`,
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {milestones.map((m) => (
            <div key={m} className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full border-2 ${
                  day >= m
                    ? "bg-green-500 border-green-400"
                    : m === milestone
                    ? "border-yellow-400 bg-yellow-500/30"
                    : "border-gray-600 bg-gray-800"
                }`}
              />
              <span className="text-xs text-gray-500 mt-1">D{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPICard({
  kpi,
  currentValue,
  day,
  onUpdate,
}: {
  kpi: KPI;
  currentValue: number | string;
  day: number;
  onUpdate: (id: string, value: number | string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(currentValue));

  // Find the target for the current milestone
  const milestone = getCurrentMilestone(day);
  const target = kpi.targets.find((t) => t.day === milestone);
  const targetValue = target?.value ?? 0;

  const isNumeric = kpi.unit !== "text";
  const numCurrent = typeof currentValue === "number" ? currentValue : 0;
  const numTarget = typeof targetValue === "number" ? targetValue : 0;
  const percent = isNumeric ? getProgressPercent(numCurrent, numTarget) : 0;
  const statusColor = isNumeric ? getStatusColor(percent) : "#6366f1";

  const displayValue =
    kpi.unit === "currency"
      ? formatCurrency(numCurrent)
      : isNumeric
      ? formatNumber(numCurrent)
      : String(currentValue);

  const displayTarget =
    kpi.unit === "currency"
      ? formatCurrency(numTarget)
      : typeof targetValue === "number"
      ? formatNumber(numTarget)
      : String(targetValue);

  const handleSave = () => {
    if (isNumeric) {
      const parsed = parseFloat(editValue.replace(/[$,]/g, ""));
      onUpdate(kpi.id, isNaN(parsed) ? 0 : parsed);
    } else {
      onUpdate(kpi.id, editValue);
    }
    setEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
            {kpi.name}
          </h3>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-400">
            {kpi.source}
          </span>
        </div>
        <button
          onClick={() => {
            setEditValue(String(currentValue));
            setEditing(!editing);
          }}
          className="text-gray-500 hover:text-gray-300 transition-colors p-1"
          title="Update current value"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>

      {editing ? (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="flex-1 bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mb-3">
          <span
            className="text-3xl font-bold"
            style={{ color: statusColor }}
          >
            {displayValue}
          </span>
          {isNumeric && numTarget > 0 && (
            <span className="text-sm text-gray-500 ml-2">
              / {displayTarget}
            </span>
          )}
        </div>
      )}

      {/* Progress bar */}
      {isNumeric && numTarget > 0 && (
        <div className="mb-3">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                backgroundColor: statusColor,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{percent}%</span>
            <span className="text-xs text-gray-500">
              Day {milestone} target
            </span>
          </div>
        </div>
      )}

      {/* Mini milestone tracker */}
      <div className="flex gap-1 mt-2">
        {kpi.targets.map((t) => {
          const tVal = typeof t.value === "number" ? t.value : 0;
          const achieved =
            isNumeric && typeof currentValue === "number"
              ? currentValue >= tVal && tVal > 0
              : false;
          return (
            <div
              key={t.day}
              className="flex-1 text-center"
              title={`Day ${t.day}: ${
                typeof t.value === "number"
                  ? kpi.unit === "currency"
                    ? formatCurrency(t.value)
                    : formatNumber(t.value)
                  : t.value
              }`}
            >
              <div
                className={`h-1.5 rounded-full ${
                  achieved
                    ? "bg-green-500"
                    : day >= t.day
                    ? "bg-red-500/50"
                    : "bg-gray-700"
                }`}
              />
              <span className="text-[10px] text-gray-600">D{t.day}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
        {kpi.description}
      </p>
    </div>
  );
}

function SAMOverview({ summary }: { summary: SAMSummary | null }) {
  if (!summary) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-700 rounded w-2/3" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">
        SAM Pipeline Overview
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-2xl font-bold text-blue-400">
            {formatNumber(summary.totalFirms)}
          </p>
          <p className="text-xs text-gray-500">Total Firms</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-400">
            {summary.p1Count}
          </p>
          <p className="text-xs text-gray-500">P1 Crypto-Friendly</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-400">
            {summary.p2Count}
          </p>
          <p className="text-xs text-gray-500">P2 High AUM</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-400">
            {summary.p3Count}
          </p>
          <p className="text-xs text-gray-500">P3 Remaining</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-lg font-bold text-white">
            {formatCurrency(summary.totalAUM)}
          </p>
          <p className="text-xs text-gray-500">Total AUM</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-lg font-bold text-emerald-400">
            {formatCurrency(summary.estCapitalAt20Pct)}
          </p>
          <p className="text-xs text-gray-500">Est. Capital @ 20% Conv.</p>
        </div>
      </div>

      {/* Tier breakdown */}
      <h3 className="text-sm font-semibold text-gray-400 mt-4 mb-2">
        AUM Tier Breakdown
      </h3>
      <div className="space-y-2">
        {summary.tierBreakdown.map((t) => (
          <div key={t.tier} className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{t.tier}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {t.count} firms
              </span>
              <span className="text-xs text-gray-400">
                {formatCurrency(t.totalAUM)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Territory breakdown */}
      <h3 className="text-sm font-semibold text-gray-400 mt-4 mb-2">
        Territory Assignment
      </h3>
      <div className="space-y-1">
        {summary.territoryBreakdown.map((t) => (
          <div key={t.territory} className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{t.territory}</span>
            <span className="text-xs text-gray-500">{t.count} firms</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneTargetsTable({ kpis, values }: { kpis: KPI[]; values: Record<string, number | string> }) {
  const milestones = [14, 28, 42, 53, 70, 90];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 overflow-x-auto">
      <h2 className="text-lg font-bold text-white mb-4">
        Full KPI Targets by Milestone
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2 text-gray-400 font-medium pr-4">
              KPI
            </th>
            <th className="text-right py-2 text-gray-400 font-medium px-2">
              Current
            </th>
            {milestones.map((m) => (
              <th
                key={m}
                className="text-right py-2 text-gray-400 font-medium px-2"
              >
                Day {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {kpis.map((kpi) => {
            const current = values[kpi.id] ?? kpi.currentValue;
            return (
              <tr
                key={kpi.id}
                className="border-b border-gray-700/50 hover:bg-gray-800"
              >
                <td className="py-2 pr-4 text-gray-300 font-medium text-xs">
                  {kpi.name}
                </td>
                <td className="py-2 px-2 text-right text-blue-400 font-semibold text-xs">
                  {kpi.unit === "currency"
                    ? formatCurrency(Number(current) || 0)
                    : typeof current === "number"
                    ? formatNumber(current)
                    : current}
                </td>
                {milestones.map((m) => {
                  const target = kpi.targets.find((t) => t.day === m);
                  const val = target?.value ?? 0;
                  return (
                    <td
                      key={m}
                      className="py-2 px-2 text-right text-gray-500 text-xs"
                    >
                      {kpi.unit === "currency" && typeof val === "number"
                        ? formatCurrency(val)
                        : typeof val === "number"
                        ? formatNumber(val)
                        : val || "—"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────

interface DashboardState {
  day: number;
  phase: ReturnType<typeof getCampaignPhase>;
  values: Record<string, number | string>;
  samSummary: SAMSummary | null;
}

function dashboardReducer(
  state: DashboardState,
  action:
    | { type: "init"; payload: { day: number; values: Record<string, number | string>; samSummary: SAMSummary } }
    | { type: "update_kpi"; payload: { id: string; value: number | string } }
): DashboardState {
  switch (action.type) {
    case "init":
      return {
        day: action.payload.day,
        phase: getCampaignPhase(action.payload.day),
        values: action.payload.values,
        samSummary: action.payload.samSummary,
      };
    case "update_kpi": {
      const next = { ...state.values, [action.payload.id]: action.payload.value };
      saveValues(next);
      return { ...state, values: next };
    }
  }
}

export default function KPIDashboard() {
  const [state, dispatch] = useReducer(dashboardReducer, {
    day: 1,
    phase: getCampaignPhase(1),
    values: {},
    samSummary: null,
  });

  useEffect(() => {
    const d = getCampaignDay();
    const saved = loadSavedValues();
    loadSAMSummary().then((summary) => {
      dispatch({ type: "init", payload: { day: d, values: saved, samSummary: summary } });
    });
  }, []);

  const handleUpdate = useCallback(
    (id: string, value: number | string) => {
      dispatch({ type: "update_kpi", payload: { id, value } });
    },
    []
  );

  const { day, phase, values, samSummary } = state;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-blue-400">CFV</span> CoinFund KPI
              Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              270-Day Battle Plan · Fund I ($1B Target)
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Digital Gold Foundation</p>
            <p className="text-xs text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Phase indicator */}
        <PhaseIndicator day={day} phase={phase} />

        {/* KPI Grid */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">
            Battle Plan KPIs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KPI_DEFINITIONS.map((kpi) => (
              <KPICard
                key={kpi.id}
                kpi={kpi}
                currentValue={values[kpi.id] ?? kpi.currentValue}
                day={day}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </div>

        {/* Full targets table */}
        <MilestoneTargetsTable kpis={KPI_DEFINITIONS} values={values} />

        {/* SAM Overview */}
        <SAMOverview summary={samSummary} />

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-800">
          <p className="text-xs text-gray-600">
            CFV CoinFund · 270-Day Battle Plan · Operations &amp; Data Analyst
            Dashboard
          </p>
          <p className="text-xs text-gray-700 mt-1">
            Data sources: CRM · CRM Analytics · CRM Pipeline · IR Tracker ·
            Content Tracker · Social Metrics · Legislative Tracker ·
            Deployment Plan
          </p>
        </footer>
      </main>
    </div>
  );
}
