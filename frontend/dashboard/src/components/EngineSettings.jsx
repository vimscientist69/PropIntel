import React from "react";
import { cn } from "../lib/cn";
import {
  btnOutline,
  btnPrimary,
  innerPanel,
  inputClass,
  sectionCard,
} from "../lib/propflux-ui";

const btnDanger =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-rose-500/50 bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-200 transition-colors hover:bg-rose-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50";

const RUNTIME_TEMPLATE =
  '{"runtime":{"worker_concurrency":6,"providers":{"google_maps":{"requests_per_second":2.0,"max_concurrent":2},"serper":{"requests_per_second":1.5,"max_concurrent":2}}}}}';

function ActivePill({ active }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        active
          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
          : "border-slate-700 bg-slate-900/80 text-slate-500",
      )}
    >
      {active ? "active" : "inactive"}
    </span>
  );
}

function formatUpdatedAt(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function EngineSettings({
  settingsName,
  setSettingsName,
  settingsPayloadText,
  setSettingsPayloadText,
  settingsStatus,
  settingsProfiles,
  deleteConfirmName,
  setDeleteConfirmName,
  onValidate,
  onSave,
  onActivate,
  onDelete,
}) {
  const isEmptyPayload = String(settingsPayloadText || "").trim() === "{}";
  const statusIsError =
    settingsStatus &&
    (settingsStatus.toLowerCase().includes("fail") ||
      settingsStatus.toLowerCase().includes("error") ||
      settingsStatus.toLowerCase().includes("validation failed"));

  return (
    <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
      <section className={sectionCard}>
        <header className="border-b border-slate-800/80 px-4 pt-4 pb-3">
          <h2 className="text-sm font-semibold text-slate-50">Engine Settings</h2>
          <p className="mt-1 text-xs text-slate-400">
            Manage enrichment and scoring profiles. Edit JSON below, then validate and activate.
          </p>
        </header>

        <div className="space-y-4 px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-[min(100%,240px)] flex-1">
              <label htmlFor="settings-name" className="mb-1.5 block text-xs font-medium text-slate-300">
                Profile name
              </label>
              <input
                id="settings-name"
                value={settingsName}
                onChange={(e) => setSettingsName(e.target.value)}
                className={inputClass}
                placeholder="custom"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={btnOutline} onClick={onValidate}>
                Validate
              </button>
              <button type="button" className={btnPrimary} onClick={onSave}>
                Save + Activate
              </button>
            </div>
          </div>

          <div className={innerPanel}>
            <label htmlFor="settings-payload" className="mb-2 block text-xs font-medium text-slate-300">
              Profile payload (JSON)
            </label>
            <textarea
              id="settings-payload"
              className="custom-scroll min-h-[280px] w-full resize-y rounded-lg border border-slate-800/80 bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-slate-200 outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              value={settingsPayloadText}
              onChange={(e) => setSettingsPayloadText(e.target.value)}
              spellCheck={false}
            />
            {isEmptyPayload && (
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-slate-600">
                Minimal template: {RUNTIME_TEMPLATE}
              </p>
            )}
          </div>

          {settingsStatus && (
            <div
              className={cn(
                "rounded-xl border px-3 py-2 text-xs",
                statusIsError
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                  : "border-slate-800/80 bg-slate-900/80 text-slate-300",
              )}
            >
              {settingsStatus}
            </div>
          )}

          <div className={innerPanel}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold text-slate-50">Saved profiles</h3>
                <p className="mt-0.5 text-[10px] text-slate-500">Activate or delete stored configuration profiles.</p>
              </div>
            </div>
            <div className="custom-scroll overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-1 text-xs">
                <thead>
                  <tr>
                    {["Name", "Active", "Updated", "Actions"].map((col) => (
                      <th
                        key={col}
                        className="px-3 pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {settingsProfiles.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-3 py-8 text-center text-xs text-slate-500">
                        No profiles saved yet.
                      </td>
                    </tr>
                  )}
                  {settingsProfiles.map((profile) => (
                    <tr key={profile.name}>
                      <td className="px-3 py-2 font-mono text-[11px] text-slate-300">{profile.name}</td>
                      <td className="px-3 py-2">
                        <ActivePill active={profile.is_active} />
                      </td>
                      <td className="px-3 py-2 font-mono text-[10px] text-slate-500">
                        {formatUpdatedAt(profile.updated_at)}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            className={btnOutline}
                            disabled={profile.is_active}
                            onClick={() => onActivate(profile.name)}
                          >
                            Activate
                          </button>
                          <button
                            type="button"
                            className={btnOutline}
                            onClick={() => setDeleteConfirmName(profile.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {deleteConfirmName && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-profile-title"
        >
          <div
            className={cn(
              sectionCard,
              "w-full max-w-md shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
            )}
          >
            <div className="space-y-4 px-4 py-4">
              <div>
                <h3 id="delete-profile-title" className="text-sm font-semibold text-slate-50">
                  Delete settings profile?
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  This will permanently remove{" "}
                  <span className="font-mono text-slate-200">{deleteConfirmName}</span>. This action
                  cannot be undone.
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <button type="button" className={btnOutline} onClick={() => setDeleteConfirmName("")}>
                  Cancel
                </button>
                <button type="button" className={btnDanger} onClick={onDelete}>
                  Delete profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
