import React, { useEffect, useMemo, useState } from "react";
import {
  DollarSign,
  Package,
  Bike,
  Store,
  AlertCircle,
  Ticket,
  ChevronRight,
  Users,
  Map,
  X,
  Shield,
  CheckCircle2,
  Ban,
  FileText,
  Plus,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");
const money = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(Number(n || 0));

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  OnTheWay: "bg-blue-50 text-blue-700 ring-blue-200",
  Preparing: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Placed: "bg-amber-50 text-amber-700 ring-amber-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const ACTIONS = {
  users: { key: "users", title: "Manage Users", subtitle: "View, ban, or suspend users", icon: Users },
  riders: { key: "riders", title: "Review Riders", subtitle: "Approve pending documents", icon: Bike },
  tickets: { key: "tickets", title: "Support Tickets", subtitle: "Open tickets require attention", icon: Ticket },
  zones: { key: "zones", title: "Configure Zones", subtitle: "Manage delivery areas & fees", icon: Map },
};

function Chip({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-50 text-slate-700 ring-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1", tones[tone])}>
      {children}
    </span>
  );
}

function CenterModal({ open, onClose, title, subtitle, icon: Icon, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
     
      <button
        type="button"
        className="fixed inset-0 z-[90] bg-black/40"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      
      <div className="fixed inset-0 z-[100] grid place-items-center px-4">
        <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
          
          <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 border border-slate-100">
              <Icon className="h-6 w-6 text-slate-700" />
            </span>

            <div className="flex-1">
              <div className="text-lg font-extrabold text-slate-900">{title}</div>
              <div className="text-sm text-slate-500">{subtitle}</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* content */}
          <div className="p-6 max-h-[70vh] overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const nav = useNavigate();

  const kpis = useMemo(
    () => [
      { id: "k1", label: "Total Orders Today", value: 342, delta: 12, icon: Package },
      { id: "k2", label: "Gross Merchandise Value", value: 8456.5, delta: 8.5, icon: DollarSign, money: true },
      { id: "k3", label: "Active Riders", value: 28, delta: null, icon: Bike },
      { id: "k4", label: "Open Restaurants", value: 45, delta: null, icon: Store },
      { id: "k5", label: "Cancellation Rate", value: 3.2, delta: -0.5, icon: AlertCircle, pct: true },
      { id: "k6", label: "Open Tickets", value: 12, delta: null, icon: Ticket },
    ],
    []
  );

  const [orders, setOrders] = useState([
    { id: "ORD-7829", customer: "Sarah Jenkins", restaurant: "Burger King", status: "Delivered", total: 30.46, time: "12:30 PM" },
    { id: "ORD-7830", customer: "John Doe", restaurant: "Sushi Master", status: "OnTheWay", total: 24.95, time: "6:45 PM" },
    { id: "ORD-7831", customer: "Jane Smith", restaurant: "Pizza Hut", status: "Preparing", total: 20.98, time: "7:15 PM" },
    { id: "ORD-7832", customer: "Mike Johnson", restaurant: "Taco Bell", status: "Placed", total: 15.5, time: "7:20 PM" },
    { id: "ORD-7833", customer: "Emily Davis", restaurant: "Starbucks", status: "Cancelled", total: 12.4, time: "9:00 AM" },
  ]);


  const [modalOpen, setModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("users");


  const [usersData, setUsersData] = useState([
    { id: "u1", name: "Sarah Jenkins", role: "Customer", status: "Active" },
    { id: "u2", name: "John Doe", role: "Customer", status: "Suspended" },
    { id: "u3", name: "Mike Rider", role: "Rider", status: "Active" },
  ]);

  const [ridersData, setRidersData] = useState([
    { id: "r1", name: "Mike Rider", docs: "Driver License, NBI", state: "Pending" },
    { id: "r2", name: "Anna Cruz", docs: "OR/CR, Insurance", state: "Pending" },
  ]);

  const [ticketsData, setTicketsData] = useState([
    { id: "t1", subject: "Refund request", from: "Sarah Jenkins", priority: "High", state: "Open" },
    { id: "t2", subject: "Late delivery", from: "John Doe", priority: "Medium", state: "Open" },
  ]);

  const [zonesData, setZonesData] = useState([
    { id: "z1", name: "Santa Rosa Proper", fee: 2.0, eta: "25–35 min", active: true },
    { id: "z2", name: "Tagapo", fee: 1.5, eta: "20–30 min", active: true },
    { id: "z3", name: "Biñan", fee: 3.0, eta: "35–45 min", active: false },
  ]);

  const openActionModal = (key) => {
    setActiveAction(key);
    setModalOpen(true);
  };

  const StatCard = ({ label, value, delta, icon: Icon, moneyMode, pctMode, onClick }) => {
    const deltaUp = typeof delta === "number" && delta > 0;
    const deltaDown = typeof delta === "number" && delta < 0;
    const valText = moneyMode ? money(value) : pctMode ? `${value}%` : value;

    return (
      <button
        type="button"
        onClick={onClick}
        className="text-left rounded-2xl bg-white border border-slate-100 shadow-sm p-5 hover:shadow-md transition"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">{valText}</div>
            {typeof delta === "number" && (
              <div className="mt-2 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <span
                  className={cx(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                    deltaUp && "bg-emerald-50 text-emerald-700",
                    deltaDown && "bg-rose-50 text-rose-700",
                    !deltaUp && !deltaDown && "bg-slate-50 text-slate-600"
                  )}
                >
                  {deltaUp ? "▲" : deltaDown ? "▼" : "•"} {Math.abs(delta)}%
                </span>
                <span>vs last month</span>
              </div>
            )}
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 border border-slate-100">
            <Icon className="h-5 w-5 text-slate-700" />
          </span>
        </div>
      </button>
    );
  };


  const ActionCard = ({ actionKey }) => {
    const a = ACTIONS[actionKey];
    const Icon = a.icon;
    return (
      <button
        type="button"
        onClick={() => openActionModal(actionKey)}
        className="w-full text-left px-5 py-4 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
      >
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 border border-slate-100">
            <Icon className="h-6 w-6 text-slate-700" />
          </span>
          <div className="flex-1">
            <div className="font-extrabold text-slate-900">{a.title}</div>
            <div className="text-sm text-slate-500">{a.subtitle}</div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </div>
      </button>
    );
  };

  const statusChip = (s) => (
    <span
      className={cx(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-extrabold ring-1",
        STATUS_STYLES[s] || "bg-slate-50 text-slate-700 ring-slate-200"
      )}
    >
      {s}
    </span>
  );

 
  const active = ACTIONS[activeAction];
  const ActiveIcon = active.icon;

  const ModalBody = () => {
    if (activeAction === "users") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold text-slate-900">Recent Users</div>
            <button
              type="button"
              onClick={() => nav("/admin/users")}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Open Users Page →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usersData.map((u) => (
              <div key={u.id} className="rounded-2xl border border-slate-100 p-4 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-extrabold text-slate-900">{u.name}</div>
                    <div className="text-sm text-slate-500">{u.role}</div>
                  </div>
                  <Chip tone={u.status === "Active" ? "emerald" : "rose"}>{u.status}</Chip>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setUsersData((s) =>
                        s.map((x) => (x.id === u.id ? { ...x, status: "Suspended" } : x))
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-extrabold hover:bg-slate-50"
                  >
                    <Shield className="h-4 w-4" /> Suspend
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setUsersData((s) =>
                        s.map((x) => (x.id === u.id ? { ...x, status: "Banned" } : x))
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 text-white px-3 py-2 text-xs font-extrabold hover:bg-rose-700"
                  >
                    <Ban className="h-4 w-4" /> Ban
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeAction === "riders") {
      return (
        <div className="space-y-4">
          <div className="text-sm font-extrabold text-slate-900">Pending Rider Documents</div>

          <div className="space-y-3">
            {ridersData.map((r) => (
              <div key={r.id} className="rounded-2xl border border-slate-100 p-4 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-extrabold text-slate-900">{r.name}</div>
                    <div className="text-sm text-slate-500 inline-flex items-center gap-2">
                      <FileText className="h-4 w-4" /> {r.docs}
                    </div>
                  </div>
                  <Chip tone={r.state === "Pending" ? "amber" : "emerald"}>{r.state}</Chip>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRidersData((s) =>
                        s.map((x) => (x.id === r.id ? { ...x, state: "Approved" } : x))
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white px-3 py-2 text-xs font-extrabold hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setRidersData((s) => s.filter((x) => x.id !== r.id))}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-extrabold hover:bg-slate-50"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => nav("/admin/riders")}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-extrabold hover:bg-slate-50"
          >
            Open Riders Page →
          </button>
        </div>
      );
    }

    if (activeAction === "tickets") {
      return (
        <div className="space-y-4">
          <div className="text-sm font-extrabold text-slate-900">Open Tickets</div>

          <div className="space-y-3">
            {ticketsData.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-100 p-4 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-extrabold text-slate-900">{t.subject}</div>
                    <div className="text-sm text-slate-500">From: {t.from}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Chip tone={t.priority === "High" ? "rose" : "blue"}>{t.priority}</Chip>
                    <Chip tone="amber">{t.state}</Chip>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setTicketsData((s) =>
                        s.map((x) => (x.id === t.id ? { ...x, state: "Resolved" } : x))
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-3 py-2 text-xs font-extrabold hover:bg-slate-800"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Resolve
                  </button>
                  <button
                    type="button"
                    onClick={() => nav("/admin/support")}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-extrabold hover:bg-slate-50"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold text-slate-900">Delivery Zones</div>
          <button
            type="button"
            onClick={() =>
              setZonesData((s) => [
                {
                  id: `z${Math.floor(100 + Math.random() * 900)}`,
                  name: "New Zone",
                  fee: 2.5,
                  eta: "30–40 min",
                  active: true,
                },
                ...s,
              ])
            }
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3 py-2 text-xs font-extrabold hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" /> Add Zone
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {zonesData.map((z) => (
            <div key={z.id} className="rounded-2xl border border-slate-100 p-4 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900">{z.name}</div>
                  <div className="text-sm text-slate-500">
                    Fee: {money(z.fee)} • ETA: {z.eta}
                  </div>
                </div>
                <Chip tone={z.active ? "emerald" : "slate"}>{z.active ? "Active" : "Disabled"}</Chip>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setZonesData((s) => s.map((x) => (x.id === z.id ? { ...x, active: !x.active } : x)))
                  }
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-extrabold hover:bg-slate-50"
                >
                  Toggle
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setZonesData((s) =>
                      s.map((x) => (x.id === z.id ? { ...x, fee: Number((x.fee + 0.5).toFixed(2)) } : x))
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-3 py-2 text-xs font-extrabold hover:bg-slate-800"
                >
                  <Pencil className="h-4 w-4" /> Increase Fee
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => nav("/admin/settings")}
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-extrabold hover:bg-slate-50"
        >
          Open Settings →
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {kpis.map((k) => (
              <StatCard
                key={k.id}
                label={k.label}
                value={k.value}
                delta={k.delta}
                icon={k.icon}
                moneyMode={!!k.money}
                pctMode={!!k.pct}
                onClick={() => {
                  if (k.label.includes("Tickets")) nav("/admin/support");
                  if (k.label.includes("Orders")) nav("/admin/orders");
                }}
              />
            ))}
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-slate-900">
                <span className="text-emerald-600">↯</span> Real-time Orders
              </div>
              <button
                type="button"
                onClick={() => nav("/admin/orders")}
                className="text-sm font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-extrabold text-slate-500">
                    <th className="px-5 py-3">Order ID</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Restaurant</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Total</th>
                    <th className="px-5 py-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="hover:bg-slate-50 cursor-pointer"
                      onClick={() => nav("/admin/orders")}
                    >
                      <td className="px-5 py-4 font-extrabold text-slate-900">{o.id}</td>
                      <td className="px-5 py-4 text-slate-700">{o.customer}</td>
                      <td className="px-5 py-4 text-slate-700">{o.restaurant}</td>
                      <td className="px-5 py-4">
                        {statusChip(o.status)}
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900">{money(o.total)}</td>
                      <td className="px-5 py-4 text-slate-500">{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const next = {
                    id: `ORD-${Math.floor(7800 + Math.random() * 200)}`,
                    customer: "New Customer",
                    restaurant: "New Restaurant",
                    status: ["Placed", "Preparing", "OnTheWay", "Delivered"][Math.floor(Math.random() * 4)],
                    total: Number((10 + Math.random() * 40).toFixed(2)),
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  };
                  setOrders((s) => [next, ...s].slice(0, 7));
                }}
                className="rounded-xl px-4 py-2 text-sm font-extrabold bg-slate-900 text-white hover:bg-slate-800"
              >
                Simulate New Order
              </button>
            </div>
          </div>
        </div>

       
        <div className="space-y-4">
          <div className="font-extrabold text-slate-900">Quick Actions</div>
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            <ActionCard actionKey="users" />
            <ActionCard actionKey="riders" />
            <ActionCard actionKey="tickets" />
            <ActionCard actionKey="zones" />
          </div>
        </div>
      </div>

      
      <CenterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={active.title}
        subtitle={active.subtitle}
        icon={ActiveIcon}
      >
        <ModalBody />
      </CenterModal>
    </div>
  );
}