import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star, X, CheckCircle2, AlertTriangle } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const StatCard = ({ title, value, sub }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="text-xs font-semibold text-slate-500">{title}</div>
    <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
    {sub ? <div className="mt-1 text-xs text-slate-500">{sub}</div> : null}
  </div>
);

const Row = ({ name, time, price }) => (
  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3">
    <div>
      <div className="text-sm font-bold text-slate-900">{name}</div>
      <div className="text-xs text-slate-500">{time}</div>
    </div>
    <div className="text-sm font-extrabold text-emerald-600">{price}</div>
  </div>
);


function Modal({ open, title, tone = "emerald", children, onClose, footer }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose?.();
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const ring =
    tone === "emerald"
      ? "ring-emerald-200"
      : tone === "amber"
      ? "ring-amber-200"
      : "ring-rose-200";

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4">
      <div
        ref={panelRef}
        className={cx(
          "w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl ring-1",
          ring
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer ? <div className="border-t border-slate-100 px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [online, setOnline] = useState(true);

  // popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState(null); // "online" | "offline"

  const openTogglePopup = () => {
    const goingOffline = online === true;
    setNextStatus(goingOffline ? "offline" : "online");
    setPopupOpen(true);
  };

  const confirmToggle = () => {
    setOnline((v) => !v);
    setPopupOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Availability */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold text-slate-900">Availability</div>
          <p className="mt-1 text-sm text-slate-600">
            {online ? "You are online and receiving jobs." : "You are offline and won’t receive jobs."}
          </p>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={openTogglePopup}
          className={cx(
            "flex items-center gap-3 rounded-2xl border px-4 py-2 shadow-sm transition",
            online
              ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100"
          )}
          aria-label="Toggle availability"
        >
          <span
            className={cx(
              "text-xs font-extrabold",
              online ? "text-emerald-700" : "text-slate-700"
            )}
          >
            {online ? "ONLINE" : "OFFLINE"}
          </span>

          <span
            className={cx(
              "relative inline-flex h-5 w-9 items-center rounded-full transition",
              online ? "bg-emerald-500" : "bg-slate-300"
            )}
          >
            <span
              className={cx(
                "inline-block h-4 w-4 transform rounded-full bg-white transition",
                online ? "translate-x-4" : "translate-x-1"
              )}
            />
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Completed Today" value="8" sub="Deliveries completed" />
        <StatCard title="Earnings Today" value="₱67.50" sub="Total earnings" />
        <StatCard
          title="Rating"
          value={
            <span className="inline-flex items-center gap-2">
              4.9 <Star className="h-5 w-5 text-amber-400" />
            </span>
          }
          sub="Average rating"
        />
        <StatCard title="Online Hours" value="5.5h" sub="Time online today" />
      </div>

      {/* Active Delivery */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold text-slate-900">Active Delivery</div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600 transition">
            View details <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Burger King</div>
            <div className="text-xs text-slate-500">Arriving: 3 mins</div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-100">
            ONGOING
          </span>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold text-slate-900">Recent Deliveries</div>
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
            View all
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <Row name="Burger King" time="Today, 7:21 PM" price="₱8.50" />
          <Row name="Sushi Master" time="Today, 7:05 PM" price="₱12.00" />
          <Row name="Pizza Hut" time="Today, 6:40 PM" price="₱6.50" />
          <Row name="Taco Bell" time="Today, 6:15 PM" price="₱7.00" />
          <Row name="Starbucks" time="Today, 5:50 PM" price="₱5.50" />
        </div>
      </div>

      {/* Popup modal */}
      <Modal
        open={popupOpen}
        title={nextStatus === "offline" ? "Go Offline?" : "Go Online?"}
        tone={nextStatus === "offline" ? "amber" : "emerald"}
        onClose={() => setPopupOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmToggle}
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white",
                nextStatus === "offline"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              )}
            >
              {nextStatus === "offline" ? (
                <>
                  <AlertTriangle className="h-4 w-4" /> Go Offline
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Go Online
                </>
              )}
            </button>
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <div
            className={cx(
              "grid h-10 w-10 place-items-center rounded-2xl ring-1",
              nextStatus === "offline"
                ? "bg-amber-50 text-amber-700 ring-amber-100"
                : "bg-emerald-50 text-emerald-700 ring-emerald-100"
            )}
          >
            {nextStatus === "offline" ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
          </div>

          <div>
            <div className="text-sm font-extrabold text-slate-900">
              {nextStatus === "offline"
                ? "You will stop receiving new jobs."
                : "You will start receiving new jobs."}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {nextStatus === "offline"
                ? "You can go back online anytime."
                : "Make sure you’re ready before going online."}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
