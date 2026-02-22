import React from "react";
import { Tag, X, CalendarDays, Users, Plus } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const SEED_PROMOS = [
  {
    id: "p1",
    name: "Summer Sale",
    type: "Percentage",
    value: 20,
    minOrder: 15,
    start: "2023-06-01",
    end: "2023-08-31",
    used: 450,
    limit: 1000,
    active: true,
  },
  {
    id: "p2",
    name: "Free Delivery",
    type: "Amount",
    value: 2.99,
    minOrder: 20,
    start: "2023-01-01",
    end: "2023-12-31",
    used: 1200,
    limit: 5000,
    active: true,
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cx(
        "relative h-7 w-12 rounded-full border transition",
        checked ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-100"
      )}
      aria-label="Toggle active"
    >
      <span
        className={cx(
          "absolute top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white shadow-sm transition-all",
          checked ? "left-[22px]" : "left-[2px]"
        )}
      >
        <span className={cx("h-2 w-2 rounded-full", checked ? "bg-emerald-500" : "bg-slate-400")} />
      </span>
    </button>
  );
}


function Modal({ open, title, onClose, children }) {
  React.useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/40"
        aria-label="Close overlay"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </>
  );
}

function formatPromoLine(p) {
  if (p.type === "Percentage") return `${p.value}% OFF`;
  return `$${Number(p.value).toFixed(2)} OFF`;
}

export default function Promos() {
  const [promos, setPromos] = React.useState(SEED_PROMOS);
  const [open, setOpen] = React.useState(false);

  const [draft, setDraft] = React.useState({
    name: "",
    type: "Percentage",
    value: "",
    minOrder: "",
    start: "",
    end: "",
  });

  const togglePromo = (id) => {
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const createPromo = () => {
    const name = draft.name.trim();
    const value = Number(draft.value);
    const minOrder = Number(draft.minOrder);

    if (!name || Number.isNaN(value) || Number.isNaN(minOrder) || !draft.start || !draft.end) {
      alert("Please complete the form.");
      return;
    }

    const newPromo = {
      id: `p${Date.now()}`,
      name,
      type: draft.type,
      value,
      minOrder,
      start: draft.start,
      end: draft.end,
      used: 0,
      limit: draft.type === "Percentage" ? 1000 : 5000, // demo default
      active: true,
    };

    setPromos((prev) => [newPromo, ...prev]);
    setOpen(false);
    setDraft({ name: "", type: "Percentage", value: "", minOrder: "", start: "", end: "" });
  };

  return (
    <div className="space-y-5">
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Active Promos</div>
          <div className="text-sm text-slate-500">Create and manage promotions</div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Create Promo
        </button>
      </div>

      
      <div className="grid gap-4 lg:grid-cols-2">
        {promos.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-3 p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Tag className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <div className="mt-1 text-sm font-extrabold text-emerald-600">{formatPromoLine(p)}</div>
                  <div className="mt-1 text-xs text-slate-500">Min. order $ {Number(p.minOrder).toFixed(0)}</div>
                </div>
              </div>

              <Toggle checked={p.active} onChange={() => togglePromo(p.id)} />
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-wrap items-center gap-4 px-5 py-4 text-xs text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                {p.start} - {p.end}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                {p.used} / {p.limit} used
              </span>
            </div>
          </div>
        ))}
      </div>

      
      <Modal open={open} title="Create New Promotion" onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <label className="space-y-1">
            <div className="text-xs font-semibold text-slate-600">Promo Name</div>
            <input
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="e.g. Summer Sale"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <div className="text-xs font-semibold text-slate-600">Discount Type</div>
              <select
                value={draft.type}
                onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option>Percentage</option>
                <option>Amount</option>
              </select>
            </label>

            <label className="space-y-1">
              <div className="text-xs font-semibold text-slate-600">Value</div>
              <input
                value={draft.value}
                onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))}
                placeholder={draft.type === "Percentage" ? "20" : "2.99"}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
          </div>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-slate-600">Minimum Order ($)</div>
            <input
              value={draft.minOrder}
              onChange={(e) => setDraft((d) => ({ ...d, minOrder: e.target.value }))}
              placeholder="15.00"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <div className="text-xs font-semibold text-slate-600">Start Date</div>
              <input
                type="date"
                value={draft.start}
                onChange={(e) => setDraft((d) => ({ ...d, start: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>

            <label className="space-y-1">
              <div className="text-xs font-semibold text-slate-600">End Date</div>
              <input
                type="date"
                value={draft.end}
                onChange={(e) => setDraft((d) => ({ ...d, end: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={createPromo}
            className="mt-2 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-700"
          >
            Create Promo
          </button>
        </div>
      </Modal>
    </div>
  );
}
