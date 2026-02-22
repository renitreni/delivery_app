import React, { useMemo, useState } from "react";
import {
  DollarSign,
  Package,
  Gift,
  TrendingUp,
  CalendarDays,
  X,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const dailyData = {
  stats: { earnings: 67.5, deliveries: 8, tips: 12, bonuses: 5, delta: "+18%" },
  payout: { label: "Bank Account ending in 4567" },
};

const weeklyData = {
  stats: { earnings: 342, deliveries: 42, tips: 45, bonuses: 15, delta: "+15%" },
  payout: { label: "Bank Account ending in 4567" },
};

const seedRows = [
  { date: "Today, 2:30 PM", orderId: "WOR-7829", base: 5.5, tip: 3.0, total: 8.5 },
  { date: "Today, 1:15 PM", orderId: "WOR-7825", base: 4.0, tip: 2.0, total: 6.0 },
  { date: "Today, 11:45 AM", orderId: "WOR-7822", base: 7.5, tip: 5.0, total: 12.5 },
  { date: "Yesterday", orderId: "WOR-7810", base: 6.0, tip: 0.0, total: 6.0 },
  { date: "Yesterday", orderId: "WOR-7805", base: 5.0, tip: 2.5, total: 7.5 },
];

function money(n) {
  const v = Number(n || 0);
  return `$${v.toFixed(2)}`;
}

function StatCard({ icon: Icon, title, value, delta, tone = "emerald" }) {
  const toneMap = {
    emerald: {
      iconWrap: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    slate: {
      iconWrap: "bg-slate-50 text-slate-700 border-slate-100",
    },
  };
  const t = toneMap[tone] || toneMap.emerald;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-500">{title}</div>
          <div className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">
            {value}
          </div>
          {delta ? (
            <div className="mt-1 text-xs font-semibold text-emerald-600">
              {delta} <span className="text-slate-400 font-medium">vs last month</span>
            </div>
          ) : null}
        </div>

        <div className={cx("h-10 w-10 rounded-xl border grid place-items-center", t.iconWrap)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Segmented({ value, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange("daily")}
        className={cx(
          "px-4 py-2 rounded-xl text-sm font-extrabold transition",
          value === "daily" ? "bg-emerald-500 text-white" : "text-slate-600 hover:bg-slate-50"
        )}
      >
        Daily
      </button>
      <button
        type="button"
        onClick={() => onChange("weekly")}
        className={cx(
          "px-4 py-2 rounded-xl text-sm font-extrabold transition",
          value === "weekly" ? "bg-emerald-500 text-white" : "text-slate-600 hover:bg-slate-50"
        )}
      >
        Weekly
      </button>
    </div>
  );
}

function Modal({ open, title, children, onClose, onSave, saveLabel = "Save" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close overlay"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 flex items-start justify-between">
          <div>
            <div className="text-sm font-extrabold text-slate-900">{title}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-xl hover:bg-slate-100 grid place-items-center"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div className="px-5 pb-5">{children}</div>

        <div className="px-5 pb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="flex-1 rounded-2xl bg-emerald-500 py-3 text-sm font-extrabold text-white hover:bg-emerald-600 active:bg-emerald-700 transition"
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
      />
    </label>
  );
}

export default function RiderEarnings() {
  const [mode, setMode] = useState("daily"); // "daily" | "weekly"
  const [openModal, setOpenModal] = useState(false);

  const [bankName, setBankName] = useState("G_C Chase");
  const [accountNo, setAccountNo] = useState("0000000000");
  const [routingNo, setRoutingNo] = useState("000000000");

  const view = mode === "daily" ? dailyData : weeklyData;

  const rows = useMemo(() => seedRows, []);

  const onSave = () => {
    // demo save
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 py-8">
      <Modal
        open={openModal}
        title="Update Payout Method"
        onClose={() => setOpenModal(false)}
        onSave={onSave}
        saveLabel="Save"
      >
        <div className="space-y-4">
          <Field label="Bank Name" placeholder="e.g. Chase" value={bankName} onChange={setBankName} />
          <Field label="Account Number" placeholder="0000000000" value={accountNo} onChange={setAccountNo} />
          <Field label="Routing Number" placeholder="000000000" value={routingNo} onChange={setRoutingNo} />
        </div>
      </Modal>

      <div className="mx-auto w-full max-w-6xl space-y-6">
        
        <div className="flex justify-center">
          <Segmented value={mode} onChange={setMode} />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={DollarSign}
            title="Total Earnings"
            value={money(view.stats.earnings).replace(".00", "")}
            delta={view.stats.delta}
            tone="emerald"
          />
          <StatCard
            icon={Package}
            title="Deliveries"
            value={view.stats.deliveries}
            tone="emerald"
          />
          <StatCard
            icon={Gift}
            title="Tips"
            value={money(view.stats.tips).replace(".00", "")}
            tone="emerald"
          />
          <StatCard
            icon={TrendingUp}
            title="Bonuses"
            value={money(view.stats.bonuses).replace(".00", "")}
            tone="emerald"
          />
        </div>

        
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-slate-900">Payout Method</div>
            <div className="mt-1 text-sm text-slate-500 truncate">{view.payout.label}</div>
          </div>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-700 hover:bg-emerald-100 transition"
          >
            Update
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
            <div className="text-sm font-extrabold text-slate-900">Recent Transactions</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="text-left text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Order ID</th>
                  <th className="px-5 py-3 text-right">Base</th>
                  <th className="px-5 py-3 text-right">Tip</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 text-slate-600">{r.date}</td>
                    <td className="px-5 py-3">
                      <span className="text-emerald-600 font-extrabold">{r.orderId}</span>
                    </td>
                    <td className="px-5 py-3 text-right text-slate-700 font-semibold">
                      {money(r.base)}
                    </td>
                    <td className="px-5 py-3 text-right text-slate-700 font-semibold">
                      {money(r.tip)}
                    </td>
                    <td className="px-5 py-3 text-right text-slate-900 font-extrabold">
                      {money(r.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 bg-white flex items-center justify-between text-xs text-slate-500">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Showing {rows.length} transactions
            </div>
            <div className="font-semibold">Updated just now</div>
          </div>
        </div>
      </div>
    </div>
  );
}
