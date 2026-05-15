import React, { useState } from "react";
import {
  BarChart3,
  Database,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  X,
  History,
} from "lucide-react";
import { cn } from "../lib/cn";

const NAV_ITEMS = [
  { id: "control", label: "Control Panel", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "history", label: "Job History", icon: History },
  { id: "explorer", label: "Data Explorer", icon: Database },
  { id: "settings", label: "Engine Settings", icon: Settings },
];

const API_FOOTER = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

export function AppShell({ activeTab, onTabChange, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-6 flex items-center gap-3 px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-500/20 shadow-lg shadow-indigo-500/30">
          <Sparkles className="h-4 w-4 text-indigo-300" strokeWidth={1.75} />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-50">PropIntel</div>
          <div className="text-[11px] text-slate-500">Dashboard Control Center</div>
        </div>
      </div>

      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Overview</p>
      <nav className="space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onTabChange(id);
                setMobileOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                active
                  ? "border border-indigo-500/20 bg-slate-800/90 text-slate-50 shadow-sm shadow-slate-900/40"
                  : "border border-transparent text-slate-400 hover:bg-slate-900/80 hover:text-slate-100",
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-indigo-300" : "text-slate-500")} strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </nav>

      <p className="mt-auto px-2 pt-8 font-mono text-[10px] text-slate-600">
        FastAPI at: {API_FOOTER}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-900/60 p-4 transition-transform duration-200 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:bg-slate-800/80 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
        {nav}
      </aside>

      <div className="md:ml-64">
        <main className="px-3 py-4 md:px-4 md:py-6">
          <header className="mb-4 md:mb-6">
            <div className="mb-3 flex items-center gap-3 md:hidden">
              <button
                type="button"
                className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-300 hover:bg-slate-800/80"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/80 px-3 py-1 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              Live enrichment environment
            </span>
            <h1 className="mt-3 text-lg font-semibold tracking-tight text-slate-50 md:text-xl">
              Dashboard Control Center
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-slate-400 md:text-sm">
              Configure job input, monitor progress, and inspect enriched lead results.
            </p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
