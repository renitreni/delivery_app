import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  Banknote,
  ShieldCheck,
  Pencil,
  X,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  LogOut,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

/* ------------------------------ Mock Data ------------------------------ */
const seedPayouts = [
  { id: "p1", date: "Oct 8, 2023", period: "Oct 1 - Oct 7", status: "Processed", amount: 1200.0 },
  { id: "p2", date: "Oct 1, 2023", period: "Sep 24 - Sep 30", status: "Processed", amount: 1150.0 },
  { id: "p3", date: "Sep 24, 2023", period: "Sep 17 - Sep 23", status: "Processed", amount: 1300.0 },
  { id: "p4", date: "Sep 17, 2023", period: "Sep 10 - Sep 16", status: "Pending", amount: 980.0 },
  { id: "p5", date: "Sep 10, 2023", period: "Sep 3 - Sep 9", status: "Failed", amount: 640.0 },
  { id: "p6", date: "Sep 3, 2023", period: "Aug 27 - Sep 2", status: "Processed", amount: 1025.5 },
  { id: "p7", date: "Aug 27, 2023", period: "Aug 20 - Aug 26", status: "Processed", amount: 890.0 },
  { id: "p8", date: "Aug 20, 2023", period: "Aug 13 - Aug 19", status: "Pending", amount: 760.0 },
];

/* ------------------------------ Helpers ------------------------------ */
const money = (n) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(Number(n || 0));

const safeLower = (v) => String(v ?? "").toLowerCase();
const parseDate = (s) => {
  const t = Date.parse(s);
  return Number.isNaN(t) ? 0 : t;
};

function useOutsideClose(open, refs, onClose) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const hit = refs.some((r) => r?.current && r.current.contains(e.target));
      if (!hit) onClose?.();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, refs, onClose]);
}

/* ------------------------------ UI ------------------------------ */
function Badge({ tone = "emerald", children }) {
  const map = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1", map[tone])}>
      {children}
    </span>
  );
}

function IconButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-200",
        className
      )}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-60",
        className
      )}
    >
      {children}
    </button>
  );
}

function SoftButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-60",
        className
      )}
    >
      {children}
    </button>
  );
}

function Modal({ open, title, children, onClose, footer }) {
  const panelRef = useRef(null);
  useOutsideClose(open, [panelRef], onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4">
      <div ref={panelRef} className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
          <IconButton onClick={onClose} aria-label="Close modal">
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer ? <div className="border-t border-slate-100 px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}

/* ------------------------------ Page ------------------------------ */
export default function Payouts() {
  const [payouts, setPayouts] = useState(seedPayouts);

  // filters/sort/pagination
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "date", dir: "desc" });
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // modals/drawer
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPayoutId, setSelectedPayoutId] = useState(null);

  const [bank, setBank] = useState({
    bankName: "BPI",
    accountName: "Burger King",
    accountNumber: "****4567",
    email: "burgerking@demo.com",
  });

  const metrics = useMemo(() => {
    const pending = payouts.filter((p) => p.status === "Pending").reduce((a, b) => a + b.amount, 0);
    const processedSorted = payouts
      .filter((p) => p.status === "Processed")
      .slice()
      .sort((a, b) => parseDate(b.date) - parseDate(a.date));
    const last = processedSorted[0]?.amount ?? 0;
    const total = payouts.filter((p) => p.status === "Processed").reduce((a, b) => a + b.amount, 0);
    return { pending, last, total };
  }, [payouts]);

  const filtered = useMemo(() => {
    const q = safeLower(query.trim());
    let rows = payouts.slice();

    if (statusFilter !== "All") rows = rows.filter((r) => r.status === statusFilter);

    if (q) {
      rows = rows.filter((r) => `${r.date} ${r.period} ${r.status} ${r.amount}`.toLowerCase().includes(q));
    }

    rows.sort((a, b) => {
      const { key, dir } = sortBy;
      const mult = dir === "asc" ? 1 : -1;
      if (key === "amount") return (a.amount - b.amount) * mult;
      if (key === "status") return a.status.localeCompare(b.status) * mult;
      return (parseDate(a.date) - parseDate(b.date)) * mult;
    });

    return rows;
  }, [payouts, query, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    const start = (clamped - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, totalPages]);

  useEffect(() => setPage(1), [query, statusFilter]);

  const selected = useMemo(() => payouts.find((p) => p.id === selectedPayoutId) || null, [payouts, selectedPayoutId]);

  const statusPill = (status) => {
    if (status === "Processed") return <Badge tone="emerald">Processed</Badge>;
    if (status === "Pending") return <Badge tone="amber">Pending</Badge>;
    return <Badge tone="rose">Failed</Badge>;
  };

  const toggleSort = (key) => {
    setSortBy((s) => (s.key !== key ? { key, dir: "asc" } : { key, dir: s.dir === "asc" ? "desc" : "asc" }));
  };

  const exportCSV = () => {
    const header = ["Date", "Period", "Status", "Amount"];
    const lines = [
      header.join(","),
      ...filtered.map((r) => [r.date, r.period, r.status, r.amount.toFixed(2)].map(csvEscape).join(",")),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payout_history_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const simulateRetry = (id) => setPayouts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Pending" } : p)));
  const simulateMarkProcessed = (id) =>
    setPayouts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Processed" } : p)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Payouts</h1>
          <p className="mt-1 text-sm text-slate-600">Track payouts, update bank details, and export history.</p>
        </div>

        <div className="flex items-center gap-2">
          <SoftButton>
            <ShieldCheck className="h-4 w-4" />
            Refresh
          </SoftButton>
          <PrimaryButton onClick={exportCSV}>
            <Download className="h-4 w-4" />
            Export CSV
          </PrimaryButton>
        </div>
      </div>

      
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard title="Pending Payout" value={money(metrics.pending)} hint="Awaiting processing" icon={<Wallet className="h-5 w-5" />} />
        <MetricCard title="Last Payout" value={money(metrics.last)} hint="Most recent processed" icon={<CheckCircle2 className="h-5 w-5" />} />
        <MetricCard title="Total Earned" value={money(metrics.total)} hint="Processed total" icon={<Banknote className="h-5 w-5" />} />
      </div>

      
      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">Bank Account</div>
              <div className="text-sm text-slate-600">
                {bank.bankName} • {bank.accountNumber} • {bank.accountName}
              </div>
            </div>
          </div>

          <PrimaryButton onClick={() => setBankModalOpen(true)}>
            <Pencil className="h-4 w-4" />
            Update Details
          </PrimaryButton>
        </div>

        <div className="border-t border-slate-100 px-5 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow label="Payout email" value={bank.email} />
            <InfoRow label="Verification" value={<Badge tone="emerald">Verified</Badge>} />
          </div>
        </div>
      </section>

      
      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Payout History</div>
            <div className="text-sm text-slate-600">Click a row to view details & actions.</div>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search payouts..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-9 py-2.5 text-sm font-semibold text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option>All</option>
              <option>Processed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>

            <SoftButton onClick={exportCSV}>
              <Download className="h-4 w-4" />
              Export
            </SoftButton>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-slate-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-wide text-slate-500">
              <tr>
                <ThSort label="Date" active={sortBy.key === "date"} dir={sortBy.dir} onClick={() => toggleSort("date")} />
                <th className="px-5 py-3">Period</th>
                <ThSort label="Status" active={sortBy.key === "status"} dir={sortBy.dir} onClick={() => toggleSort("status")} />
                <ThSort
                  label="Amount"
                  className="text-right"
                  active={sortBy.key === "amount"}
                  dir={sortBy.dir}
                  onClick={() => toggleSort("amount")}
                />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paged.map((r) => (
                <tr
                  key={r.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => {
                    setSelectedPayoutId(r.id);
                    setDetailsOpen(true);
                  }}
                >
                  <td className="px-5 py-4 font-semibold text-slate-900">{r.date}</td>
                  <td className="px-5 py-4 text-slate-700">{r.period}</td>
                  <td className="px-5 py-4">{statusPill(r.status)}</td>
                  <td className="px-5 py-4 text-right font-extrabold text-slate-900">{money(r.amount)}</td>
                </tr>
              ))}

              {!paged.length ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan={4}>
                    No payouts match your filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
          <div className="text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{paged.length}</span> of{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span> payout(s)
          </div>

          <div className="flex items-center gap-2">
            <IconButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className={page <= 1 ? "opacity-50" : ""}>
              <ChevronLeft className="h-5 w-5" />
            </IconButton>

            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800">
              Page {Math.min(page, totalPages)} / {totalPages}
            </div>

            <IconButton
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={page >= totalPages ? "opacity-50" : ""}
            >
              <ChevronRight className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </section>

      
      <Modal
        open={bankModalOpen}
        title="Update Bank Details"
        onClose={() => setBankModalOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <SoftButton onClick={() => setBankModalOpen(false)}>Cancel</SoftButton>
            <PrimaryButton onClick={() => setBankModalOpen(false)}>Save</PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-3">
          <Field label="Bank name" value={bank.bankName} onChange={(v) => setBank((s) => ({ ...s, bankName: v }))} />
          <Field label="Account name" value={bank.accountName} onChange={(v) => setBank((s) => ({ ...s, accountName: v }))} />
          <Field label="Account number" value={bank.accountNumber} onChange={(v) => setBank((s) => ({ ...s, accountNumber: v }))} />
          <Field label="Payout email" value={bank.email} onChange={(v) => setBank((s) => ({ ...s, email: v }))} />
        </div>
      </Modal>

      {/* Logout modal (optional) */}
      <Modal
        open={logoutOpen}
        title="Logout"
        onClose={() => setLogoutOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <SoftButton onClick={() => setLogoutOpen(false)}>Cancel</SoftButton>
            <PrimaryButton onClick={() => setLogoutOpen(false)}>
              <LogOut className="h-4 w-4" />
              Logout
            </PrimaryButton>
          </div>
        }
      >
        <div className="text-sm text-slate-600">Demo only.</div>
      </Modal>

      {/* Details drawer */}
      <PayoutDetailsDrawer
        open={detailsOpen}
        payout={selected}
        onClose={() => setDetailsOpen(false)}
        onRetry={() => selected && simulateRetry(selected.id)}
        onMarkProcessed={() => selected && simulateMarkProcessed(selected.id)}
      />
    </div>
  );
}


function MetricCard({ title, value, hint, icon }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-slate-600">{title}</div>
          <div className="mt-2 text-2xl font-black text-slate-900">{value}</div>
          <div className="mt-1 text-sm text-slate-500">{hint}</div>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function ThSort({ label, active, dir, onClick, className = "" }) {
  return (
    <th className={cx("px-5 py-3", className)}>
      <button type="button" onClick={onClick} className={cx("inline-flex items-center gap-1.5 rounded-lg px-2 py-1 hover:bg-white/70", active ? "text-slate-700" : "")}>
        <span>{label}</span>
        <span className={cx("text-[10px] font-black", active ? "opacity-100" : "opacity-40")}>{dir === "asc" ? "▲" : "▼"}</span>
      </button>
    </th>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-extrabold uppercase tracking-wide text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200"
      />
    </label>
  );
}

function PayoutDetailsDrawer({ open, payout, onClose, onRetry, onMarkProcessed }) {
  const panelRef = useRef(null);
  useOutsideClose(open, [panelRef], onClose);
  if (!open) return null;

  const isFailed = payout?.status === "Failed";
  const isProcessed = payout?.status === "Processed";

  return (
    <div className="fixed inset-0 z-[85]">
      <div className="absolute inset-0 bg-black/40" />
      <div ref={panelRef} className="absolute right-0 top-0 h-full w-full max-w-md overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Payout details</div>
            <div className="mt-0.5 text-sm text-slate-600">{payout ? payout.period : "—"}</div>
          </div>
          <IconButton onClick={onClose} aria-label="Close details">
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        {!payout ? (
          <div className="p-5 text-sm text-slate-600">No payout selected.</div>
        ) : (
          <div className="p-5">
            <div className="grid gap-3">
              <DetailRow label="Date" value={payout.date} />
              <DetailRow label="Period" value={payout.period} />
              <DetailRow label="Status" value={payout.status} />
              <DetailRow label="Amount" value={money(payout.amount)} />

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-sm font-extrabold text-slate-900">Actions</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <PrimaryButton onClick={onMarkProcessed} disabled={isProcessed}>
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Processed
                  </PrimaryButton>

                  <SoftButton onClick={onRetry} disabled={!isFailed}>
                    <AlertTriangle className="h-4 w-4" />
                    Retry (Failed only)
                  </SoftButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3">
      <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm font-extrabold text-slate-900">{value}</div>
    </div>
  );
}

function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
