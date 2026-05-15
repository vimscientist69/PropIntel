import React from "react";
import { cn } from "../lib/cn";

const sectionCard =
  "rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/80 shadow-[0_18px_60px_rgba(15,23,42,0.9)] overflow-hidden";

const inputClass =
  "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40";

const selectClass = cn(
  inputClass,
  "appearance-none bg-[length:14px] bg-[right_12px_center] bg-no-repeat pr-9",
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")]",
);

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-50 shadow-md shadow-indigo-500/30 transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50";

const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-medium text-slate-100 transition-colors hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50";

function StatusPill({ status }) {
  const styles = {
    verified: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
    completed: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
    likely: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
    processing: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
    uploaded: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
    low: "border-rose-500/40 bg-rose-500/15 text-rose-300",
    failed: "border-rose-500/40 bg-rose-500/15 text-rose-300",
    terminated: "border-rose-500/40 bg-rose-500/15 text-rose-300",
  };
  const key = String(status || "unknown").toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        styles[key] || "border-slate-700 bg-slate-900/80 text-slate-400",
      )}
    >
      {status || "unknown"}
    </span>
  );
}

function JobStatusPill({ status }) {
  const styles = {
    completed: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
    processing: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
    uploaded: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
    failed: "border-rose-500/40 bg-rose-500/15 text-rose-300",
    terminated: "border-rose-500/40 bg-rose-500/15 text-rose-300",
  };
  const key = String(status || "").toLowerCase();
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase",
        styles[key] || "border-slate-700 bg-slate-900/80 text-slate-400",
      )}
    >
      {status}
    </span>
  );
}

function TelemetryBadge({ tone, label }) {
  const styles = {
    completed: "border-emerald-500/40 text-emerald-300",
    processing: "border-indigo-500/40 text-indigo-300",
    uploaded: "border-indigo-500/40 text-indigo-300",
    failed: "border-rose-500/40 text-rose-300",
    terminated: "border-rose-500/40 text-rose-300",
    idle: "border-slate-700 text-slate-400",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
        styles[tone] || styles.idle,
      )}
    >
      {label}
    </span>
  );
}

export function ControlPanel({
  activeJobStatus,
  activeJobMeta,
  statusTone,
  startedPct,
  completedPct,
  isSubmitting,
  onSubmit,
  selectedFileName,
  setSelectedFileName,
  uploadStatus,
  canTerminate,
  canResume,
  terminateActiveJob,
  resumeActiveJob,
  loadJobs,
  jobs,
  jobsOffset,
  jobsPage,
  jobsPageCount,
  isLoadingJobs,
  activeJobId,
  setActiveJobId,
  activeBatchesTotal,
  activeBatchesCompleted,
  jobsStatus,
  setJobsStatus,
  setJobsOffset,
  jobsTotal,
  startIdx,
  endIdx,
  filteredLeads,
  minScore,
  setMinScore,
  qualityFilter,
  setQualityFilter,
  chatbotFilter,
  setChatbotFilter,
  freshnessFilter,
  setFreshnessFilter,
  openExport,
  rejectedRows,
  jobLimit,
}) {
  const showPartial =
    activeJobStatus === "processing" || activeJobStatus === "uploaded";
  const canGoPrev = jobsOffset > 0;
  const canGoNext = jobsOffset + jobLimit < jobsTotal;

  return (
    <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <section className={sectionCard}>
          <header className="border-b border-slate-800/80 px-4 pt-4 pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Main Control Panel</h2>
                <p className="mt-1 text-xs text-slate-400">
                  Choose input format, upload dataset, and dispatch a new job.
                </p>
                {showPartial && (
                  <span className="mt-2 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] text-indigo-300">
                    Partial results available
                  </span>
                )}
              </div>
              <TelemetryBadge tone={statusTone} label={isSubmitting ? "Running" : "Idle"} />
            </div>
          </header>

          <div className="space-y-4 px-4 py-4">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/30 p-3">
              <div
                className={cn(
                  "relative h-2 overflow-hidden rounded-full border border-slate-800/70 bg-slate-900",
                  statusTone === "completed" && "border-emerald-500/30",
                  statusTone === "failed" && "border-rose-500/30",
                )}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 opacity-70 transition-[width] duration-200"
                  style={{ width: `${startedPct}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-emerald-400 transition-[width] duration-200"
                  style={{ width: `${completedPct}%` }}
                />
              </div>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-slate-500 break-all">
                {activeJobMeta}
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-[minmax(140px,170px)_1fr]">
                <div>
                  <label htmlFor="input_format" className="mb-1.5 block text-xs font-medium text-slate-300">
                    Target input
                  </label>
                  <select id="input_format" name="input_format" defaultValue="csv" className={selectClass}>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="propflux">PropFlux JSON</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="file" className="mb-1.5 block text-xs font-medium text-slate-300">
                    Dataset
                  </label>
                  <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-1.5">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      required
                      className="sr-only"
                      onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || "No file selected")}
                    />
                    <label
                      htmlFor="file"
                      className="cursor-pointer rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700/80"
                    >
                      Choose file
                    </label>
                    <span className="min-w-0 truncate text-xs text-slate-500">{selectedFileName}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button type="submit" disabled={isSubmitting} className={btnPrimary}>
                  {isSubmitting ? "Running…" : "Run job"}
                </button>
                <button type="button" className={btnOutline} disabled={!canTerminate} onClick={terminateActiveJob}>
                  Stop job
                </button>
                <button type="button" className={btnOutline} disabled={!canResume} onClick={resumeActiveJob}>
                  Resume job
                </button>
                <button type="button" className={btnOutline} onClick={loadJobs}>
                  Refresh jobs
                </button>
                {uploadStatus && <span className="text-xs text-slate-500">{uploadStatus}</span>}
              </div>
            </form>
          </div>
        </section>

        <section className={sectionCard}>
          <header className="border-b border-slate-800/80 px-4 pt-4 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Recent Jobs</h2>
                <p className="mt-1 text-xs text-slate-400">Snapshot of the latest enrichment runs.</p>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                {startIdx}–{endIdx} of {jobsTotal}
              </span>
            </div>
          </header>

          <div className="space-y-3 px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <select
                id="status"
                value={jobsStatus}
                onChange={(e) => {
                  setJobsStatus(e.target.value);
                  setJobsOffset(0);
                }}
                className={cn(selectClass, "w-auto min-w-[130px] text-[11px] py-1.5")}
              >
                <option value="">all statuses</option>
                <option value="uploaded">uploaded</option>
                <option value="processing">processing</option>
                <option value="completed">completed</option>
                <option value="failed">failed</option>
              </select>
              <button
                type="button"
                className={btnOutline}
                disabled={!canGoPrev || isLoadingJobs}
                onClick={() => setJobsOffset((v) => Math.max(0, v - jobLimit))}
              >
                Prev
              </button>
              <button
                type="button"
                className={btnOutline}
                disabled={!canGoNext || isLoadingJobs}
                onClick={() => setJobsOffset((v) => v + jobLimit)}
              >
                Next
              </button>
              <span className="font-mono text-[10px] text-slate-500">
                Page {jobsPage} / {jobsPageCount}
              </span>
            </div>

            <div className="custom-scroll max-h-[320px] space-y-2 overflow-y-auto pr-1">
              {isLoadingJobs && jobs.length === 0 && (
                <p className="py-6 text-center text-xs text-slate-500">Loading jobs…</p>
              )}
              {!isLoadingJobs && jobs.length === 0 && (
                <p className="py-6 text-center text-xs text-slate-500">No jobs recorded yet.</p>
              )}
              {jobs.map((job) => {
                const selected = job.job_id === activeJobId;
                return (
                  <button
                    type="button"
                    key={job.job_id}
                    onClick={() => setActiveJobId(job.job_id)}
                    className={cn(
                      "flex w-full flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      selected
                        ? "border-indigo-500/70 bg-slate-900/90 shadow-sm shadow-indigo-500/20"
                        : "border-slate-800 bg-slate-950/60 hover:bg-slate-900/80",
                    )}
                  >
                    <span className="font-mono text-[11px] text-slate-300">{job.job_id.slice(0, 8)}</span>
                    <JobStatusPill status={job.status} />
                    <span className="text-[11px] text-slate-500">
                      {job.input_format || "—"}
                      {selected && activeBatchesTotal > 0
                        ? ` · ${activeBatchesCompleted}/${activeBatchesTotal}`
                        : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <section className={sectionCard}>
        <header className="border-b border-slate-800/80 px-4 pt-4 pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">Latest Listings</h2>
              <p className="mt-1 text-xs text-slate-400">
                Filtered lead intelligence grid for the selected job.
              </p>
            </div>
            <span className="font-mono text-[10px] text-slate-500 break-all">
              {activeJobId || "none selected"}
            </span>
          </div>
        </header>

        <div className="space-y-4 px-4 py-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[100px]">
              <label htmlFor="minScore" className="mb-1 block text-xs font-medium text-slate-300">
                Min score
              </label>
              <input
                id="minScore"
                type="number"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                placeholder="0"
                className={cn(inputClass, "text-[11px] py-1.5")}
              />
            </div>
            <div className="min-w-[120px]">
              <label htmlFor="quality" className="mb-1 block text-xs font-medium text-slate-300">
                Quality
              </label>
              <select
                id="quality"
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                className={cn(selectClass, "text-[11px] py-1.5")}
              >
                <option value="">all quality</option>
                <option value="verified">verified</option>
                <option value="likely">likely</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="min-w-[120px]">
              <label htmlFor="chatbot" className="mb-1 block text-xs font-medium text-slate-300">
                Chatbot
              </label>
              <select
                id="chatbot"
                value={chatbotFilter}
                onChange={(e) => setChatbotFilter(e.target.value)}
                className={cn(selectClass, "text-[11px] py-1.5")}
              >
                <option value="">all</option>
                <option value="yes">has chatbot</option>
                <option value="no">no chatbot</option>
              </select>
            </div>
            <div className="min-w-[120px]">
              <label htmlFor="freshness" className="mb-1 block text-xs font-medium text-slate-300">
                Freshness
              </label>
              <select
                id="freshness"
                value={freshnessFilter}
                onChange={(e) => setFreshnessFilter(e.target.value)}
                className={cn(selectClass, "text-[11px] py-1.5")}
              >
                <option value="">all</option>
                <option value="detected">detected</option>
                <option value="unknown">unknown</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2 pb-0.5">
              <button type="button" className={btnOutline} disabled={!activeJobId} onClick={() => openExport("json")}>
                Export JSON
              </button>
              <button type="button" className={btnOutline} disabled={!activeJobId} onClick={() => openExport("csv")}>
                Export CSV
              </button>
            </div>
          </div>

          <div className="custom-scroll overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/30 p-3">
            <table className="min-w-full border-separate border-spacing-y-1 text-xs">
              <thead>
                <tr>
                  {[
                    { label: "Listing", className: "" },
                    { label: "Status", className: "" },
                    { label: "Website", className: "hidden md:table-cell" },
                    { label: "Email", className: "" },
                    { label: "Phone", className: "hidden md:table-cell" },
                    { label: "Score", className: "" },
                    { label: "Reason", className: "hidden lg:table-cell" },
                  ].map(({ label, className }) => (
                    <th
                      key={label}
                      className={cn(
                        "px-3 pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                        className,
                      )}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-10 text-center text-xs text-slate-500">
                      No lead rows yet. Select a completed job to inspect results.
                    </td>
                  </tr>
                )}
                {filteredLeads.map((lead, idx) => (
                  <tr key={`${lead.company_name || "row"}-${idx}`}>
                    <td className="rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-2 font-medium text-slate-100">
                      {lead.company_name || "—"}
                    </td>
                    <td className="px-3 py-2">
                      <StatusPill status={lead.contact_quality} />
                    </td>
                    <td className="hidden max-w-[180px] px-3 py-2 text-slate-400 break-all md:table-cell">
                      {lead.website || "—"}
                    </td>
                    <td className="max-w-[160px] px-3 py-2 text-slate-400 break-all">{lead.email || "—"}</td>
                    <td className="hidden px-3 py-2 font-mono text-[11px] text-slate-400 md:table-cell">
                      {lead.phone || "—"}
                    </td>
                    <td className="px-3 py-2 font-semibold text-indigo-400">{lead.lead_score ?? "—"}</td>
                    <td className="hidden max-w-[200px] px-3 py-2 text-slate-500 break-all lg:table-cell">
                      {lead.lead_reason || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details className="rounded-xl border border-slate-800/80 bg-slate-900/80">
            <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-slate-300">
              Rejected Rows
            </summary>
            <pre className="custom-scroll max-h-48 overflow-auto border-t border-slate-800/80 bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-slate-200">
              {JSON.stringify(rejectedRows, null, 2)}
            </pre>
          </details>
        </div>
      </section>
    </div>
  );
}
