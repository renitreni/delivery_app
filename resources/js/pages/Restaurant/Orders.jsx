import React from "react";
import { Clock, X, Search, CheckCircle2, XCircle } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

const SEED = [
  {
    id: "ORD-8001",
    status: "New",
    timeAgo: "2 mins ago",
    customer: "Alice Johnson",
    items: [
      { qty: 2, name: "Whopper Meal" },
      { qty: 1, name: "Onion Rings" },
    ],
    total: 23.97,
    address: "Tagapo, Santa Rosa",
    note: "No onion, extra ketchup.",
  },
  {
    id: "ORD-8002",
    status: "New",
    timeAgo: "5 mins ago",
    customer: "Bob Smith",
    items: [{ qty: 1, name: "Chicken Royale" }],
    total: 7.49,
    address: "Balibago, Santa Rosa",
    note: "Call on arrival.",
  },
  {
    id: "ORD-8003",
    status: "New",
    timeAgo: "8 mins ago",
    customer: "Charlie Brown",
    items: [
      { qty: 3, name: "Cheeseburger" },
      { qty: 2, name: "Fries" },
    ],
    total: 12.95,
    address: "Binan, Laguna",
    note: "Spicy level: medium.",
  },

  { id: "ORD-7998", status: "Preparing", timeAgo: "15 mins ago", customer: "David Wilson", items: [{ qty: 1, name: "Whopper" }], total: 5.99, address: "Cabuyao", note: "Leave at guard." },
  { id: "ORD-7997", status: "Preparing", timeAgo: "18 mins ago", customer: "Eva Green", items: [{ qty: 1, name: "Nuggets (10pc)" }], total: 4.49, address: "Nuvali", note: "Less ice." },
  { id: "ORD-7996", status: "Preparing", timeAgo: "20 mins ago", customer: "Frank White", items: [{ qty: 1, name: "Double Whopper" }], total: 7.99, address: "Santa Rosa", note: "" },
  { id: "ORD-7995", status: "Preparing", timeAgo: "22 mins ago", customer: "Grace Lee", items: [{ qty: 2, name: "Chicken Jr" }], total: 3.98, address: "Sta. Rosa", note: "" },

  { id: "ORD-7990", status: "Ready", timeAgo: "30 mins ago", customer: "Henry Ford", items: [{ qty: 1, name: "Family Bundle" }], total: 24.99, address: "Cabuyao", note: "" },
  { id: "ORD-7989", status: "Ready", timeAgo: "35 mins ago", customer: "Ivy Chen", items: [{ qty: 1, name: "Salad" }], total: 6.99, address: "Binan", note: "" },

  { id: "ORD-7980", status: "Completed", timeAgo: "1 hour ago", customer: "Jack Black", items: [{ qty: 2, name: "Soda" }], total: 3.98, address: "Nuvali", note: "" },
  { id: "ORD-7979", status: "Completed", timeAgo: "1.2 hours ago", customer: "Kelly Clarkson", items: [{ qty: 1, name: "Ice Cream" }], total: 2.49, address: "Santa Rosa", note: "" },
  { id: "ORD-7978", status: "Completed", timeAgo: "1.5 hours ago", customer: "Liam Neeson", items: [{ qty: 1, name: "Coffee" }], total: 1.49, address: "Binan", note: "" },
  { id: "ORD-7977", status: "Completed", timeAgo: "2 hours ago", customer: "Mia Kunis", items: [{ qty: 1, name: "Tea" }], total: 1.49, address: "Cabuyao", note: "" },

  { id: "ORD-7900", status: "Cancelled", timeAgo: "3 hours ago", customer: "Noah Centineo", items: [{ qty: 1, name: "Water" }], total: 0.99, address: "Tagapo", note: "" },
  { id: "ORD-7899", status: "Cancelled", timeAgo: "4 hours ago", customer: "Olivia Rodrigo", items: [{ qty: 1, name: "Milkshake" }], total: 3.99, address: "Balibago", note: "" },
];

const TABS = ["New", "Preparing", "Ready", "Completed", "Cancelled"];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
      {children}
    </span>
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
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
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

function StatusDot({ status }) {
  const map = {
    New: "bg-emerald-500",
    Preparing: "bg-amber-500",
    Ready: "bg-sky-500",
    Completed: "bg-slate-400",
    Cancelled: "bg-rose-500",
  };
  return <span className={cx("h-2.5 w-2.5 rounded-full", map[status] || "bg-slate-400")} />;
}

function OrderCard({ order, onOpen, onAccept, onReject, onMarkReady, onComplete }) {
  const isNew = order.status === "New";
  const isPreparing = order.status === "Preparing";
  const isReady = order.status === "Ready";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={onOpen} className="w-full text-left p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-extrabold text-emerald-600">{order.id}</div>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700">
                <StatusDot status={order.status} />
                {order.status}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="h-4 w-4" />
              <span>{order.timeAgo}</span>
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-700">
            {money(order.total)}
          </span>
        </div>

        <div className="mt-4 text-sm font-semibold text-slate-900">{order.customer}</div>

        <ul className="mt-3 space-y-2 text-xs text-slate-600">
          {order.items.slice(0, 3).map((it, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-slate-400">•</span>
              <span>
                {it.qty}x {it.name}
              </span>
            </li>
          ))}
          {order.items.length > 3 ? (
            <li className="text-xs font-bold text-slate-500">+ {order.items.length - 3} more…</li>
          ) : null}
        </ul>
      </button>

      {(isNew || isPreparing || isReady) && <div className="h-px bg-slate-100" />}

      {/* Actions */}
      {isNew ? (
        <div className="grid grid-cols-2 gap-3 p-4">
          <button
            type="button"
            onClick={onReject}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Accept
          </button>
        </div>
      ) : null}

      {isPreparing ? (
        <div className="p-4">
          <button
            type="button"
            onClick={onMarkReady}
            className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Mark Ready
          </button>
        </div>
      ) : null}

      {isReady ? (
        <div className="p-4">
          <button
            type="button"
            onClick={onComplete}
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Complete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function RestaurantOrders() {
  const [tab, setTab] = React.useState("New");
  const [q, setQ] = React.useState("");
  const [orders, setOrders] = React.useState(SEED);
  const [active, setActive] = React.useState(null);

  const counts = React.useMemo(() => {
    const c = Object.fromEntries(TABS.map((t) => [t, 0]));
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1;
    return c;
  }, [orders]);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (o.status !== tab) return false;
      if (!query) return true;
      const hay = [
        o.id,
        o.customer,
        o.address,
        ...(o.items || []).map((x) => x.name),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [orders, tab, q]);

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const onAccept = (id) => updateStatus(id, "Preparing");
  const onReject = (id) => updateStatus(id, "Cancelled");
  const onMarkReady = (id) => updateStatus(id, "Ready");
  const onComplete = (id) => updateStatus(id, "Completed");

  return (
    <div className="space-y-5">
      {/* Tabs row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-6 border-b border-slate-200">
          {TABS.map((t) => {
            const activeTab = tab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cx(
                  "relative pb-3 text-sm font-semibold",
                  activeTab ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
                )}
              >
                <span className="flex items-center gap-2">
                  {t}
                  <span
                    className={cx(
                      "inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-extrabold",
                      activeTab ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"
                    )}
                  >
                    {counts[t] || 0}
                  </span>
                </span>
                {activeTab ? (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-emerald-600" />
                ) : null}
              </button>
            );
          })}
        </div>

        
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders…"
            className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((o) => (
          <OrderCard
            key={o.id}
            order={o}
            onOpen={() => setActive(o)}
            onAccept={() => onAccept(o.id)}
            onReject={() => onReject(o.id)}
            onMarkReady={() => onMarkReady(o.id)}
            onComplete={() => onComplete(o.id)}
          />
        ))}

        {filtered.length === 0 ? (
          <div className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <div className="text-lg font-extrabold text-slate-900">No orders found</div>
            <div className="mt-1 text-sm text-slate-600">Try a different tab or search.</div>
          </div>
        ) : null}
      </div>

      
      <Modal
        open={!!active}
        title={active ? `Order Details • ${active.id}` : "Order Details"}
        onClose={() => setActive(null)}
      >
        {active ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Pill>
                <span className="inline-flex items-center gap-2">
                  <StatusDot status={active.status} />
                  {active.status}
                </span>
              </Pill>
              <Pill>{active.timeAgo}</Pill>
              <Pill>{money(active.total)}</Pill>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">Customer</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">{active.customer}</div>
                <div className="mt-2 text-xs text-slate-600">{active.address}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">Items</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-800">
                  {active.items.map((it, idx) => (
                    <li key={idx}>
                      <span className="font-bold">{it.qty}x</span> {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {active.note ? (
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">Note</div>
                <div className="mt-1 text-sm font-semibold text-slate-800">{active.note}</div>
              </div>
            ) : null}

            
            <div className="flex flex-wrap gap-2 pt-1">
              {active.status === "New" ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onReject(active.id);
                      setActive((p) => ({ ...p, status: "Cancelled" }));
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onAccept(active.id);
                      setActive((p) => ({ ...p, status: "Preparing" }));
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Accept
                  </button>
                </>
              ) : null}

              {active.status === "Preparing" ? (
                <button
                  type="button"
                  onClick={() => {
                    onMarkReady(active.id);
                    setActive((p) => ({ ...p, status: "Ready" }));
                  }}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Mark Ready
                </button>
              ) : null}

              {active.status === "Ready" ? (
                <button
                  type="button"
                  onClick={() => {
                    onComplete(active.id);
                    setActive((p) => ({ ...p, status: "Completed" }));
                  }}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Complete
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
