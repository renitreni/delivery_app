import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  MapPin,
  Bike,
  CheckCircle2,
  Loader2,
  Phone,
  MessageSquare,
  ShoppingBag,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function ModalShell({ open, title, subtitle, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close overlay" />
      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl max-h-[92vh] flex flex-col">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-extrabold text-slate-900">{title}</div>
                {subtitle ? <div className="mt-1 text-xs sm:text-sm text-slate-500 truncate">{subtitle}</div> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 hover:bg-slate-50 shrink-0"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 sm:p-5">{children}</div>
          {footer ? <div className="border-t border-slate-100 bg-white p-4 sm:p-5">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    OnTheWay: "bg-blue-50 text-blue-700 border-blue-100",
    Preparing: "bg-indigo-50 text-indigo-700 border-indigo-100",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const labelMap = {
    OnTheWay: "On the way",
    Preparing: "Preparing",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold",
        map[status] ?? "bg-gray-50 text-gray-700 border-gray-200"
      )}
    >
      {labelMap[status] ?? status}
    </span>
  );
}

function ProgressTimeline({ status }) {
  const steps = [
    { key: "Preparing", label: "Preparing" },
    { key: "OnTheWay", label: "On the way" },
    { key: "Delivered", label: "Delivered" },
  ];

  const idx = Math.max(0, steps.findIndex((s) => s.key === status));
  const doneIdx = status === "Cancelled" ? -1 : idx;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-extrabold text-slate-900">Progress</div>
        <StatusPill status={status} />
      </div>

      <div className="mt-4 space-y-3">
        {steps.map((s, i) => {
          const complete = i < doneIdx;
          const active = i === doneIdx;
          return (
            <div
              key={s.key}
              className={cx(
                "rounded-2xl border p-4 flex items-start justify-between gap-3",
                complete
                  ? "border-emerald-200 bg-emerald-50"
                  : active
                  ? "border-slate-200 bg-white"
                  : "border-slate-200 bg-white/70"
              )}
            >
              <div>
                <div className={cx("text-sm font-extrabold", complete ? "text-emerald-800" : "text-slate-900")}>
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  {complete ? "Completed" : active ? "In progress" : "Pending"}
                </div>
              </div>

              {complete ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
              ) : active ? (
                <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
              ) : (
                <div className="h-5 w-5" />
              )}
            </div>
          );
        })}
      </div>

      {status === "Cancelled" ? (
        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
          This order was cancelled.
        </div>
      ) : null}
    </div>
  );
}

function MapPreview({ vendor }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="relative h-44 sm:h-52 w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 shadow">
          <MapPin className="h-4 w-4" /> {vendor}
        </div>

        <div
          className="absolute left-10 top-24 h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.25)]"
          style={{ animation: "moveDot 3s ease-in-out infinite" }}
          title="Rider"
        />
        <div className="absolute right-6 bottom-6 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 shadow">
          <Bike className="h-4 w-4" /> You
        </div>

        <style>{`
          @keyframes moveDot {
            0% { transform: translate(0,0); }
            50% { transform: translate(170px, 35px); }
            100% { transform: translate(0,0); }
          }
          @media (min-width: 640px){
            @keyframes moveDot {
              0% { transform: translate(0,0); }
              50% { transform: translate(240px, 40px); }
              100% { transform: translate(0,0); }
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function TrackOrderModal({ open, onClose, order }) {
  const [eta, setEta] = useState(18);

  useEffect(() => {
    if (!open) return;
    setEta(18);
    const t = setInterval(() => setEta((e) => (e > 0 ? e - 1 : 0)), 1100);
    return () => clearInterval(t);
  }, [open]);

  if (!order) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Track Order"
      subtitle={`${order.vendor} • ${order.id} • ${order.time}`}
      footer={
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => alert("Calling rider (demo)")}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" />
            Call
          </button>
          <button
            type="button"
            onClick={() => alert("Opening chat (demo)")}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-600"
          >
            <MessageSquare className="h-4 w-4" />
            Message
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <MapPreview vendor={order.vendor} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="text-xs font-bold text-slate-500">Estimated Arrival</div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              {order.status === "Delivered" ? "0" : eta}{" "}
              <span className="text-base font-bold text-slate-500">min</span>
            </div>
            <div className="mt-3 rounded-2xl bg-slate-50 p-3">
              <div className="text-xs font-bold text-slate-600">Order Total</div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">${order.price.toFixed(2)}</div>
              <div className="mt-1 text-xs text-slate-500">
                {order.items} item{order.items > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        <ProgressTimeline status={order.status} />

        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-slate-900 truncate">Delivery details</div>
              <div className="mt-1 text-xs text-slate-500">Demo tracking panel</div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              <ShoppingBag className="h-4 w-4" />
              Live
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold text-slate-500">Pickup</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">{order.vendor}</div>
              <div className="mt-1 text-xs text-slate-500">Preparing your items</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold text-slate-500">Drop-off</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">Your address</div>
              <div className="mt-1 text-xs text-slate-500">Rider en route</div>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function ReorderModal({ open, onClose, order, onConfirm }) {
  if (!order) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Reorder"
      subtitle={`${order.vendor} • ${order.id} • ${order.time}`}
      footer={
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm?.(order);
              onClose();
            }}
            className="w-full sm:flex-1 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-600"
          >
            Confirm Reorder
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <img
              src={order.thumb}
              alt={order.vendor}
              className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-extrabold text-slate-900 truncate">{order.vendor}</div>
              <div className="mt-1 text-xs text-slate-500">
                {order.items} item{order.items > 1 ? "s" : ""} • Total ${order.price.toFixed(2)}
              </div>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-100">
              Delivered
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="text-sm font-extrabold text-slate-900">What happens next?</div>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-slate-400" />
              We will recreate the same order (demo).
            </div>
            <div className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-slate-400" />
              You can track it after confirmation.
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export default function OrdersPage() {
  const ordersSeed = [
    {
      id: "o1",
      vendor: "Sushi Master",
      time: "Today, 6:30 PM",
      items: 2,
      price: 24.95,
      status: "OnTheWay",
      thumb: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "o2",
      vendor: "Pizza Hut",
      time: "Today, 7:15 PM",
      items: 1,
      price: 20.98,
      status: "Preparing",
      thumb: "https://images.unsplash.com/photo-1548365328-9f547d0c7b69?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const pastSeed = [
    {
      id: "p1",
      vendor: "Burger Spot",
      time: "Yesterday, 8:10 PM",
      items: 3,
      price: 18.5,
      status: "Delivered",
      thumb: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const [tab, setTab] = useState("active");

  const [trackOpen, setTrackOpen] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const list = useMemo(() => (tab === "active" ? ordersSeed : pastSeed), [tab]);

  const openTrack = (order) => {
    setSelected(order);
    setTrackOpen(true);
  };

  const openReorder = (order) => {
    setSelected(order);
    setReorderOpen(true);
  };

  const OrderCard = ({ order }) => (
    <div className="rounded-3xl bg-white border border-gray-200 shadow-sm px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <img
          src={order.thumb}
          alt={order.vendor}
          className="h-16 w-16 rounded-2xl object-cover border border-gray-200 shrink-0"
        />

        <div className="min-w-0 flex-1">
          <p className="text-base font-extrabold text-gray-900 truncate">{order.vendor}</p>
          <p className="mt-1 text-sm text-gray-500">
            {order.time} <span className="mx-2">•</span> {order.items} item{order.items > 1 ? "s" : ""}
          </p>
          <p className="mt-4 text-base font-extrabold text-gray-900">${order.price.toFixed(2)}</p>
        </div>

        <div className="flex flex-col sm:items-end gap-3 sm:gap-4">
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <StatusPill status={order.status} />
          </div>

          {tab === "active" ? (
            <button
              type="button"
              onClick={() => openTrack(order)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 sm:px-7 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
            >
              Track Order <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openReorder(order)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 sm:px-7 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
            >
              Reorder <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)]">
      <TrackOrderModal open={trackOpen} onClose={() => setTrackOpen(false)} order={selected} />
      <ReorderModal
        open={reorderOpen}
        onClose={() => setReorderOpen(false)}
        order={selected}
        onConfirm={(order) => {
          setToast(`Reorder created for ${order.vendor} (demo)`);
        }}
      />

      {toast ? (
        <div className="fixed top-4 right-4 z-[1000]">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow">
            {toast}
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center gap-6 sm:gap-10 border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setTab("active")}
            className={cx(
              "relative pb-4 text-sm sm:text-base font-extrabold transition whitespace-nowrap",
              tab === "active" ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"
            )}
          >
            <span className="inline-flex items-center gap-2 sm:gap-3">
              Active Orders
              <span className="inline-flex items-center justify-center h-6 sm:h-7 min-w-[26px] sm:min-w-[28px] px-2.5 sm:px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-extrabold">
                {ordersSeed.length}
              </span>
            </span>
            {tab === "active" ? (
              <span className="absolute left-0 right-0 -bottom-[2px] h-[3px] bg-emerald-600 rounded-full" />
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setTab("past")}
            className={cx(
              "relative pb-4 text-sm sm:text-base font-extrabold transition whitespace-nowrap",
              tab === "past" ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"
            )}
          >
            Past Orders
            {tab === "past" ? (
              <span className="absolute left-0 right-0 -bottom-[2px] h-[3px] bg-emerald-600 rounded-full" />
            ) : null}
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {list.length === 0 ? (
            <div className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-12 text-center">
              <p className="text-base font-semibold text-gray-900">No orders found</p>
              <p className="mt-2 text-sm text-gray-500">Switch tabs to view your orders.</p>
            </div>
          ) : (
            list.map((o) => <OrderCard key={o.id} order={o} />)
          )}
        </div>
      </div>
    </div>
  );
}
