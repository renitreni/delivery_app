import React, { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const SEED_ORDERS = [
  { id: "ORD-7829", customer: "Sarah Jenkins", restaurant: "Burger King", rider: "Mike Rider", status: "Delivered", total: 30.46, date: "2023-10-15" },
  { id: "ORD-7830", customer: "John Doe", restaurant: "Sushi Master", rider: "Sarah Zoom", status: "OnTheWay", total: 24.95, date: "2023-10-15" },
  { id: "ORD-7831", customer: "Jane Smith", restaurant: "Pizza Hut", rider: "Unassigned", status: "Preparing", total: 20.98, date: "2023-10-15" },
  { id: "ORD-7832", customer: "Mike Johnson", restaurant: "Taco Bell", rider: "Unassigned", status: "Placed", total: 15.5, date: "2023-10-15" },
  { id: "ORD-7833", customer: "Emily Davis", restaurant: "Starbucks", rider: "Unassigned", status: "Cancelled", total: 12.4, date: "2023-10-14" },
];

const STATUS_OPTIONS = ["All Statuses", "Delivered", "OnTheWay", "Preparing", "Placed", "Cancelled"];

function Badge({ status }) {
  const map = {
    Delivered: "bg-emerald-100 text-emerald-700",
    OnTheWay: "bg-sky-100 text-sky-700",
    Preparing: "bg-indigo-100 text-indigo-700",
    Placed: "bg-amber-100 text-amber-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={cx("inline-flex rounded-full px-3 py-1 text-xs font-semibold", map[status])}>
      {status}
    </span>
  );
}

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
      >
        <span>{value}</span>
        <ChevronDown className={cx("h-4 w-4 text-slate-400 transition", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cx(
                "w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50",
                opt === value ? "font-semibold text-emerald-700" : "text-slate-700"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersContent() {
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");

  const orders = useMemo(() => {
    let rows = [...SEED_ORDERS];
    if (status !== "All Statuses") rows = rows.filter((r) => r.status === status);
    if (orderIdSearch.trim()) {
      const q = orderIdSearch.trim().toLowerCase();
      rows = rows.filter((r) => r.id.toLowerCase().includes(q));
    }
    return rows;
  }, [orderIdSearch, status]);

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={orderIdSearch}
            onChange={(e) => setOrderIdSearch(e.target.value)}
            placeholder="Search by Order ID..."
            className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
          />
          {orderIdSearch && (
            <button
              type="button"
              onClick={() => setOrderIdSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="w-52">
          <Dropdown value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </div>
      </div>

      
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Restaurant</th>
              <th className="px-4 py-3">Rider</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-4 font-semibold text-slate-900">{o.id}</td>
                <td className="px-4 py-4">{o.customer}</td>
                <td className="px-4 py-4">{o.restaurant}</td>
                <td className="px-4 py-4 text-slate-500">{o.rider}</td>
                <td className="px-4 py-4">
                  <Badge status={o.status} />
                </td>
                <td className="px-4 py-4 font-semibold">${o.total.toFixed(2)}</td>
                <td className="px-4 py-4 text-slate-500">{o.date}</td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
