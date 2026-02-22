import React, { useMemo, useState } from "react";
import {
  MapPin,
  Navigation,
  PhoneCall,
  MessageSquareText,
  CheckCircle2,
  Circle,
  ArrowRight,
  X,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function Modal({ open, title, desc, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999]">
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal overlay"
        onClick={onClose}
        type="button"
      />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 flex items-start justify-between">
          <div>
            <div className="text-lg font-extrabold text-slate-900">{title}</div>
            <div className="mt-1 text-sm text-slate-600">{desc}</div>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl hover:bg-slate-100 grid place-items-center"
            aria-label="Close"
            type="button"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-extrabold text-white hover:bg-emerald-600 active:bg-emerald-700 transition"
            type="button"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, tone = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold", map[tone])}>
      {children}
    </span>
  );
}

function Card({ title, right, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">{title}</div>
        {right}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

function ActionIcon({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
    >
      <Icon className="h-4 w-4 text-slate-600" />
      {label}
    </button>
  );
}

function ProgressStep({ done, label }) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      ) : (
        <Circle className="h-5 w-5 text-slate-300" />
      )}
      <span className={cx("text-sm font-semibold", done ? "text-slate-800" : "text-slate-500")}>
        {label}
      </span>
    </div>
  );
}

export default function RiderDeliveryTracking() {
  const [pickedUp, setPickedUp] = useState(false);
  const [onTheWay, setOnTheWay] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [popup, setPopup] = useState(false);

  const order = useMemo(
    () => ({
      id: 7829,
      status: delivered ? "Delivered" : onTheWay ? "On the way" : pickedUp ? "Picked up" : "Arrived",
      pickup: {
        name: "Burger King",
        address: "123 Main St, New York, NY",
      },
      dropoff: {
        name: "Sarah Jenkins",
        address: "123 Main St, Apt 4B, New York, NY",
      },
      items: [
        { qty: 2, name: "Whopper Meal" },
        { qty: 1, name: "Onion Rings" },
      ],
    }),
    [pickedUp, onTheWay, delivered]
  );

  const canPickup = !pickedUp;
  const canOnTheWay = pickedUp && !onTheWay;
  const canDelivered = onTheWay && !delivered;

  const handlePickup = () => {
    setPickedUp(true);
    setPopup(true); //demo "customer notified"
  };

  const handleOnTheWay = () => setOnTheWay(true);
  const handleDelivered = () => setDelivered(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <Modal
        open={popup}
        title="Order Picked Up!"
        desc="The customer has been notified that the order is on the way."
        onClose={() => setPopup(false)}
      />

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 space-y-5">
        
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">#{order.id}</div>
            <div className="text-xs font-semibold text-slate-400">Order ID</div>
          </div>
          <Chip tone="blue">{order.status}</Chip>
        </div>

        
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="relative h-48 sm:h-56 bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-100">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,.4),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(16,185,129,.35),transparent_55%)]" />
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
              <div className="h-12 w-12 rounded-full bg-rose-500/15 grid place-items-center">
                <MapPin className="h-7 w-7 text-rose-600" />
              </div>
            </div>

            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-sm"
              >
                <Navigation className="h-4 w-4 text-emerald-600" />
                Nav
              </button>
            </div>
          </div>
        </div>

        
        <Card
          title="Pickup"
          right={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-700"
            >
              <Navigation className="h-4 w-4" />
              Nav
            </button>
          }
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-lg font-extrabold text-slate-900">{order.pickup.name}</div>
              <div className="mt-1 text-sm text-slate-500">{order.pickup.address}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ActionIcon icon={PhoneCall} label="Call" />
            <ActionIcon icon={MessageSquareText} label="Chat" />
          </div>
        </Card>

        
        <Card
          title="Dropoff"
          right={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-700"
            >
              <Navigation className="h-4 w-4" />
              Nav
            </button>
          }
        >
          <div>
            <div className="text-lg font-extrabold text-slate-900">{order.dropoff.name}</div>
            <div className="mt-1 text-sm text-slate-500">{order.dropoff.address}</div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ActionIcon icon={PhoneCall} label="Call" />
            <ActionIcon icon={MessageSquareText} label="Chat" />
          </div>
        </Card>

        
        <Card title="Order Items">
          <div className="space-y-3">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <span className="inline-flex h-7 min-w-10 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                  {it.qty}x
                </span>
                <span className="font-semibold text-slate-800">{it.name}</span>
              </div>
            ))}
          </div>
        </Card>

        
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-4">
          <ProgressStep done={true} label="Arrived at Restaurant" />
          <ProgressStep done={pickedUp} label="Picked Up Order" />
          <ProgressStep done={onTheWay} label="On the Way" />
          <ProgressStep done={delivered} label="Delivered" />

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePickup}
              disabled={!canPickup}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition",
                canPickup
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              )}
            >
              Picked Up Order <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleOnTheWay}
              disabled={!canOnTheWay}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition",
                canOnTheWay
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              )}
            >
              On the Way <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleDelivered}
              disabled={!canDelivered}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition",
                canDelivered
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              )}
            >
              Delivered <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        
        <div className="sticky bottom-3">
          <button
            type="button"
            onClick={handlePickup}
            disabled={!canPickup}
            className={cx(
              "w-full rounded-2xl py-4 text-sm font-extrabold shadow-lg border transition",
              canPickup
                ? "bg-emerald-500 text-white border-emerald-600/20 hover:bg-emerald-600 active:bg-emerald-700"
                : "bg-slate-200 text-slate-500 border-slate-200 cursor-not-allowed"
            )}
          >
            Picked Up Order
          </button>
        </div>
      </div>
    </div>
  );
}
