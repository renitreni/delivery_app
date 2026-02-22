import React, { useMemo, useState, useEffect } from "react";
import { Download, Clock, CheckCircle2, X, FileText, Check } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const RESTAURANT_PAYOUTS = [
  { id: 1, name: "Burger King", period: "Oct 1 - Oct 7", amount: 1250.0, status: "Pending", date: "2023-10-08" },
  { id: 2, name: "Sushi Master", period: "Oct 1 - Oct 7", amount: 850.5, status: "Processed", date: "2023-10-08" },
];

const RIDER_PAYOUTS = [
  { id: 1, name: "Mike Rider", period: "Oct 1 - Oct 7", amount: 450.0, status: "Pending", date: "2023-10-08" },
  { id: 2, name: "Sarah Zoom", period: "Oct 1 - Oct 7", amount: 320.0, status: "Processed", date: "2023-10-08" },
];

function StatCard({ icon: Icon, label, value, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
      <div className={cx("grid h-10 w-10 place-items-center rounded-full", tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-500">{label}</div>
        <div className="text-xl font-extrabold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    Pending: "bg-amber-100 text-amber-700",
    Processed: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", map[status])}>
      {status}
    </span>
  );
}

function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
      />

      
      <div className="relative mx-auto mt-24 w-[92vw] max-w-lg">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          <div className="px-5 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function toCSV(rows, headers) {
  const escape = (v) => {
    const s = String(v ?? "");
    
    if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
    return s;
  };

  const headerLine = headers.map(escape).join(",");
  const lines = rows.map((r) => headers.map((h) => escape(r[h])).join(","));
  return [headerLine, ...lines].join("\n");
}

function downloadTextFile(filename, content, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Payouts() {
  const [tab, setTab] = useState("restaurant"); // restaurant | rider
  const [exportOpen, setExportOpen] = useState(false);
  const [exportScope, setExportScope] = useState("current"); // current | all
  const [toast, setToast] = useState(null);

  const data = tab === "restaurant" ? RESTAURANT_PAYOUTS : RIDER_PAYOUTS;

  const totalPending = useMemo(
    () => data.filter((x) => x.status === "Pending").reduce((s, x) => s + x.amount, 0),
    [data]
  );

  const processedThisWeek = useMemo(
    () => data.filter((x) => x.status === "Processed").reduce((s, x) => s + x.amount, 0),
    [data]
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const onDownloadCSV = () => {
    const headers = ["name", "period", "amount", "status", "date"];

    const formatRows = (rows) =>
      rows.map((r) => ({
        name: r.name,
        period: r.period,
        amount: Number(r.amount).toFixed(2),
        status: r.status,
        date: r.date,
      }));

    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;

    if (exportScope === "current") {
      const kind = tab === "restaurant" ? "restaurant" : "rider";
      const csv = toCSV(formatRows(data), headers);
      downloadTextFile(`payouts_${kind}_${stamp}.csv`, csv);
    } else {
      // all tabs: merge with a "type" column
      const allHeaders = ["type", ...headers];
      const combined = [
        ...RESTAURANT_PAYOUTS.map((r) => ({ type: "restaurant", ...formatRows([r])[0] })),
        ...RIDER_PAYOUTS.map((r) => ({ type: "rider", ...formatRows([r])[0] })),
      ];
      const csv = toCSV(combined, allHeaders);
      downloadTextFile(`payouts_all_${stamp}.csv`, csv);
    }

    setExportOpen(false);
    setToast({ type: "success", msg: "CSV exported successfully." });
  };

  return (
    <div className="p-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-lg">
          {toast.msg}
        </div>
      )}

      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-6 border-b">
          <button
            onClick={() => setTab("restaurant")}
            className={cx(
              "relative pb-3 text-sm font-semibold",
              tab === "restaurant" ? "text-emerald-600" : "text-slate-500"
            )}
          >
            Restaurant Payouts
            {tab === "restaurant" && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            onClick={() => setTab("rider")}
            className={cx(
              "relative pb-3 text-sm font-semibold",
              tab === "rider" ? "text-emerald-600" : "text-slate-500"
            )}
          >
            Rider Payouts
            {tab === "rider" && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        <button
          onClick={() => setExportOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          icon={Clock}
          label="Total Pending"
          value={`$${totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          tone="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label="Processed This Week"
          value={`$${processedThisWeek.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          tone="green"
        />
      </div>

      
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">{tab === "restaurant" ? "Restaurant" : "Rider"}</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-4 font-semibold text-slate-900">{r.name}</td>
                <td className="px-4 py-4 text-slate-600">{r.period}</td>
                <td className="px-4 py-4 font-semibold">${r.amount.toFixed(2)}</td>
                <td className="px-4 py-4">
                  <Badge status={r.status} />
                </td>
                <td className="px-4 py-4 text-slate-500">{r.date}</td>
                <td className="px-4 py-4">
                  {r.status === "Pending" ? (
                    <button className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600">
                      Process
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <Modal open={exportOpen} title="Export Payouts as CSV" onClose={() => setExportOpen(false)}>
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white">
            <FileText className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900">Choose what to export</div>
            <div className="mt-1 text-xs text-slate-600">
              Export the current table or combine both Restaurant + Rider payouts.
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={() => setExportScope("current")}
            className={cx(
              "w-full flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
              exportScope === "current"
                ? "border-emerald-200 bg-emerald-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            )}
          >
            <div>
              <div className="text-sm font-bold text-slate-900">Current tab only</div>
              <div className="text-xs text-slate-600">
                Export {tab === "restaurant" ? "Restaurant" : "Rider"} payouts you’re viewing now.
              </div>
            </div>
            {exportScope === "current" && (
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white">
                <Check className="h-4 w-4" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setExportScope("all")}
            className={cx(
              "w-full flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
              exportScope === "all"
                ? "border-emerald-200 bg-emerald-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            )}
          >
            <div>
              <div className="text-sm font-bold text-slate-900">All payouts (Restaurant + Rider)</div>
              <div className="text-xs text-slate-600">Export everything into one file with a “type” column.</div>
            </div>
            {exportScope === "all" && (
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white">
                <Check className="h-4 w-4" />
              </span>
            )}
          </button>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setExportOpen(false)}
            className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDownloadCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </Modal>
    </div>
  );
}
