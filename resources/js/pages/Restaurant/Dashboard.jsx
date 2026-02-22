import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock, DollarSign, Star, ClipboardList } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const seedOrders = [
  { id: "ORD-8001", ago: "2 mins ago", items: 2, total: 23.97, status: "New", customer: "John D.", address: "Tagapo, Santa Rosa", notes: "No onion, extra ketchup." },
  { id: "ORD-8002", ago: "5 mins ago", items: 1, total: 7.49, status: "New", customer: "Maria L.", address: "Binan, Laguna", notes: "Call on arrival." },
  { id: "ORD-8003", ago: "8 mins ago", items: 2, total: 12.95, status: "New", customer: "Ken P.", address: "Balibago, Santa Rosa", notes: "Spicy level: medium." },
  { id: "ORD-7998", ago: "15 mins ago", items: 1, total: 5.99, status: "Preparing", customer: "Aira C.", address: "Cabuyao", notes: "Leave at guard." },
  { id: "ORD-7997", ago: "18 mins ago", items: 1, total: 4.49, status: "Preparing", customer: "Mark S.", address: "Nuvali", notes: "Less ice." },
];

function StatCard({ label, value, sub, icon: Icon, tone = "emerald" }) {
  const toneMap = {
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    slate: "text-slate-700 bg-slate-50 border-slate-100",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-slate-500">{label}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
          {sub ? <div className="mt-1 text-xs text-slate-500">{sub}</div> : null}
        </div>
        <div className={cx("grid h-10 w-10 place-items-center rounded-xl border", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function ModalShell({ open, title, onClose, children }) {
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
        aria-label="Close modal overlay"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </>
  );
}

export default function RestaurantDashboard() {
  const navigate = useNavigate();

  const [isOpenForOrders, setIsOpenForOrders] = React.useState(true);
  const [orders, setOrders] = React.useState(seedOrders);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const banner = isOpenForOrders
    ? { text: "OPEN FOR ORDERS", pill: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    : { text: "CLOSED", pill: "bg-rose-50 text-rose-700 border-rose-200" };

  const markPreparing = (id) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Preparing" } : o)));
  };

  const markReady = (id) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Ready" } : o)));
  };

  return (
    <div className="space-y-5">
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Restaurant Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your orders and menu from here</p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-extrabold",
              banner.pill
            )}
          >
            {banner.text}
          </div>

          
          <button
            type="button"
            onClick={() => setIsOpenForOrders((v) => !v)}
            className={cx(
              "relative h-10 w-[78px] rounded-full border transition",
              isOpenForOrders ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-100"
            )}
            aria-label="Toggle open for orders"
          >
            <span
              className={cx(
                "absolute top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white shadow-sm transition-all",
                isOpenForOrders ? "left-[42px]" : "left-1"
              )}
            >
              <span
                className={cx(
                  "h-2 w-2 rounded-full",
                  isOpenForOrders ? "bg-emerald-500" : "bg-slate-400"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Orders" value="45" sub="▲ 10% vs last month" icon={ClipboardList} tone="emerald" />
        <StatCard label="Revenue" value="$1234.50" sub="▲ 5% vs last month" icon={DollarSign} tone="indigo" />
        <StatCard label="Avg Prep Time" value="22m" sub="▼ 2% vs last month" icon={Clock} tone="amber" />
        <StatCard label="Rating" value="4.5" sub="Stable this week" icon={Star} tone="slate" />
      </div>

      
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="text-sm font-extrabold text-slate-900">Recent Orders</div>
          <button
            type="button"
            onClick={() => navigate("/restaurant/orders")}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-extrabold text-slate-900">{o.id}</div>
                  <span
                    className={cx(
                      "rounded-full px-2 py-1 text-[11px] font-extrabold",
                      o.status === "New"
                        ? "bg-sky-50 text-sky-700"
                        : o.status === "Preparing"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    )}
                  >
                    {o.status}
                  </span>

                  {!isOpenForOrders && o.status === "New" ? (
                    <span className="rounded-full bg-rose-50 px-2 py-1 text-[11px] font-extrabold text-rose-700">
                      Closed (manual accept)
                    </span>
                  ) : null}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {o.items} items • ${o.total.toFixed(2)} • {o.ago}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {o.status === "New" ? (
                  <button
                    type="button"
                    onClick={() => markPreparing(o.id)}
                    className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white hover:bg-slate-800"
                  >
                    Accept
                  </button>
                ) : null}

                {o.status === "Preparing" ? (
                  <button
                    type="button"
                    onClick={() => markReady(o.id)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700"
                  >
                    Ready
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => setSelectedOrder(o)}
                  className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50"
                  aria-label={`Open ${o.id}`}
                >
                  <ChevronRight className="h-5 w-5 text-slate-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <ModalShell
        open={!!selectedOrder}
        title={selectedOrder ? `Order Details • ${selectedOrder.id}` : "Order Details"}
        onClose={() => setSelectedOrder(null)}
      >
        {selectedOrder ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">Customer</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">{selectedOrder.customer}</div>
                <div className="mt-2 text-xs text-slate-600">{selectedOrder.address}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">Summary</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  {selectedOrder.items} items • ${selectedOrder.total.toFixed(2)}
                </div>
                <div className="mt-2 text-xs text-slate-600">Placed: {selectedOrder.ago}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-500">Kitchen Notes</div>
              <div className="mt-1 text-sm font-semibold text-slate-800">{selectedOrder.notes}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => alert("Demo: Print ticket")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Print Ticket
              </button>
              <button
                type="button"
                onClick={() => alert("Demo: Message customer")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Message Customer
              </button>
              <button
                type="button"
                onClick={() => alert("Demo: Assign rider")}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Assign Rider
              </button>
            </div>
          </div>
        ) : null}
      </ModalShell>
    </div>
  );
}
