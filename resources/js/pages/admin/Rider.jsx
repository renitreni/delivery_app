// resources/js/pages/admin/Rider.jsx
import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Ban,
  Car,
  Bike,
  Zap, 
  X,
  ShieldAlert,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const Chip = ({ tone = "slate", children }) => {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    slate: "bg-slate-50 text-slate-700 ring-slate-200",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold ring-1",
        tones[tone] || tones.slate
      )}
    >
      {children}
    </span>
  );
};

function Select({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm font-semibold text-slate-700",
          "focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
        )}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
    </div>
  );
}

function Menu({ open, onClose, items }) {
  if (!open) return null;
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60]"
        onClick={onClose}
        aria-label="Close menu"
      />
      <div className="absolute right-0 top-9 z-[70] w-52 rounded-xl border border-slate-100 bg-white shadow-lg overflow-hidden">
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            onClick={() => {
              it.onClick?.();
              onClose?.();
            }}
            className={cx(
              "w-full px-3 py-2 text-left text-sm font-semibold hover:bg-slate-50 flex items-center gap-2",
              it.danger && "text-rose-600"
            )}
          >
            {it.icon ? <it.icon className="h-4 w-4" /> : null}
            {it.label}
          </button>
        ))}
      </div>
    </>
  );
}

function Modal({ open, title, subtitle, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[90] bg-black/40"
        onClick={onClose}
        aria-label="Close overlay"
      />
      <div className="fixed inset-0 z-[100] grid place-items-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
            <div>
              <div className="font-extrabold text-slate-900">{title}</div>
              {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-50"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      </div>
    </>
  );
}

const vehicleIcon = (type) => {
  if (type === "Car") return <Car className="h-4 w-4 text-slate-500" />;
  if (type === "Motorcycle") return <Zap className="h-4 w-4 text-slate-500" />;
  return <Bike className="h-4 w-4 text-slate-500" />;
};


const TABS = [
  { id: "all", label: "All Riders" },
  { id: "pending", label: "Pending Verification" },
  { id: "active", label: "Active" },
  { id: "suspended", label: "Suspended" },
];

export default function Rider() {
  const [rows, setRows] = useState([
    {
      id: "43910",
      username: "1021299723",
      sfd: "Full time",
      name: "John Doe",
      phone: "978998723212",
      riderStatus: "Online",
      accountStatus: "Active",
      suspended: false,
      ceased: false,
      city: "Manila",
      vehicleType: "Motorcycle",
      verification: "verified", // verified | pending
    },
    {
      id: "43911",
      username: "1021299733",
      sfd: "Part time",
      name: "Jane Smith",
      phone: "978998723213",
      riderStatus: "Offline",
      accountStatus: "Inactive",
      suspended: true,
      ceased: false,
      city: "Quezon City",
      vehicleType: "Bike",
      verification: "verified",
    },
    {
      id: "43912",
      username: "1021299744",
      sfd: "Part time",
      name: "New Rider Applicant",
      phone: "978998723244",
      riderStatus: "Offline",
      accountStatus: "Inactive",
      suspended: false,
      ceased: false,
      city: "Pasig",
      vehicleType: "Bike",
      verification: "pending",
    },
  ]);

  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");
  const [menuId, setMenuId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const selected = useMemo(() => rows.find((r) => r.id === viewId) || null, [rows, viewId]);

  // counters
  const pendingCount = useMemo(
    () => rows.filter((r) => r.verification === "pending").length,
    [rows]
  );

  const applyTabFilter = (r) => {
    if (tab === "all") return true;
    if (tab === "pending") return r.verification === "pending";
    if (tab === "active") return r.accountStatus === "Active" && !r.suspended;
    if (tab === "suspended") return !!r.suspended;
    return true;
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    return rows
      .filter(applyTabFilter)
      .filter((r) => {
        if (!s) return true;
        return (
          r.id.toLowerCase().includes(s) ||
          r.username.toLowerCase().includes(s) ||
          r.name.toLowerCase().includes(s) ||
          r.phone.toLowerCase().includes(s)
        );
      });
  }, [rows, q, tab]);

  const setRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const TabButton = ({ id, label, badge }) => {
    const active = tab === id;
    return (
      <button
        type="button"
        onClick={() => setTab(id)}
        className={cx(
          "relative px-2.5 py-2 text-sm font-extrabold transition",
          active ? "text-emerald-700" : "text-slate-500 hover:text-slate-700"
        )}
      >
        <span className="inline-flex items-center gap-2">
          {label}
          {typeof badge === "number" && badge > 0 && (
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold">
              {badge}
            </span>
          )}
        </span>
        <span
          className={cx(
            "absolute left-0 right-0 -bottom-[10px] h-0.5 rounded-full transition",
            active ? "bg-emerald-500" : "bg-transparent"
          )}
        />
      </button>
    );
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="text-2xl font-extrabold text-slate-900">Driver Management</div>

      
      <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
       
        <div className="px-4 pt-4">
          <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 pb-3">
            <TabButton id="all" label="All Riders" />
            <TabButton id="pending" label="Pending Verification" badge={pendingCount} />
            <TabButton id="active" label="Active" />
            <TabButton id="suspended" label="Suspended" />
          </div>
        </div>

       
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by ID, username, name, or phone..."
                className={cx(
                  "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3",
                  "text-sm font-semibold text-slate-700",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                )}
              />
            </div>

            
            <div className="w-full sm:w-56">
              <Select value={"all"} onChange={() => {}}>
                <option value="all">All Vehicle Types</option>
                <option value="Bike">Bike</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Car">Car</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-slate-50/60">
              <tr className="text-left text-xs font-extrabold text-slate-500">
                <th className="px-5 py-4">Rider ID</th>
                <th className="px-5 py-4">Username</th>
                <th className="px-5 py-4">Rider Name</th>
                <th className="px-5 py-4">Rider Number</th>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Account</th>
                <th className="px-5 py-4">Verification</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setViewId(r.id)}
                      className="font-extrabold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                    >
                      {r.id}
                    </button>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{r.username}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{r.name}</td>
                  <td className="px-5 py-4 text-slate-700">{r.phone}</td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2">
                      {vehicleIcon(r.vehicleType)}
                      <span className="font-semibold text-slate-700">{r.vehicleType}</span>
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {r.riderStatus === "Online" ? (
                      <Chip tone="emerald">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Online
                      </Chip>
                    ) : (
                      <Chip tone="rose">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        Offline
                      </Chip>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {r.suspended ? (
                      <Chip tone="rose">Suspended</Chip>
                    ) : r.accountStatus === "Active" ? (
                      <Chip tone="emerald">Active</Chip>
                    ) : (
                      <Chip tone="slate">Inactive</Chip>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {r.verification === "pending" ? (
                      <Chip tone="amber">Pending</Chip>
                    ) : (
                      <Chip tone="emerald">Verified</Chip>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setMenuId((v) => (v === r.id ? null : r.id))}
                        className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100"
                        aria-label="Row actions"
                      >
                        <MoreVertical className="h-5 w-5 text-slate-500" />
                      </button>

                      <Menu
                        open={menuId === r.id}
                        onClose={() => setMenuId(null)}
                        items={[
                          {
                            label: r.riderStatus === "Online" ? "Set Offline" : "Set Online",
                            icon: r.riderStatus === "Online" ? XCircle : CheckCircle2,
                            onClick: () =>
                              setRow(r.id, {
                                riderStatus: r.riderStatus === "Online" ? "Offline" : "Online",
                              }),
                          },
                          {
                            label: r.accountStatus === "Active" ? "Set Inactive" : "Set Active",
                            icon: ShieldAlert,
                            onClick: () =>
                              setRow(r.id, {
                                accountStatus: r.accountStatus === "Active" ? "Inactive" : "Active",
                              }),
                          },
                          {
                            label: r.verification === "pending" ? "Approve Verification" : "Mark Pending",
                            icon: CheckCircle2,
                            onClick: () =>
                              setRow(r.id, {
                                verification: r.verification === "pending" ? "verified" : "pending",
                              }),
                          },
                          {
                            label: r.suspended ? "Unsuspend" : "Suspend",
                            icon: Ban,
                            danger: !r.suspended,
                            onClick: () =>
                              setRow(r.id, {
                                suspended: !r.suspended,
                                // if suspend: force inactive
                                accountStatus: !r.suspended ? "Inactive" : r.accountStatus,
                              }),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-slate-500 font-semibold">
                    No riders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      <Modal
        open={!!selected}
        onClose={() => setViewId(null)}
        title={selected ? `Rider ${selected.id}` : "Rider"}
        subtitle={selected ? `${selected.name} • ${selected.city} • ${selected.vehicleType}` : ""}
      >
        {selected && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-100 p-4">
              <div className="font-extrabold text-slate-900">{selected.name}</div>
              <div className="text-sm text-slate-600">{selected.phone}</div>
              <div className="mt-3 flex items-center gap-2">
                {vehicleIcon(selected.vehicleType)}
                <div className="text-sm font-semibold text-slate-700">{selected.vehicleType}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.verification === "pending" ? <Chip tone="amber">Pending Verification</Chip> : <Chip tone="emerald">Verified</Chip>}
                {selected.suspended ? <Chip tone="rose">Suspended</Chip> : <Chip tone="emerald">Not Suspended</Chip>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setRow(selected.id, { verification: "verified" })}
                className="rounded-xl px-4 py-2 text-sm font-extrabold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => setRow(selected.id, { suspended: true, accountStatus: "Inactive" })}
                className="rounded-xl px-4 py-2 text-sm font-extrabold bg-rose-600 text-white hover:bg-rose-700"
              >
                Suspend
              </button>
              <button
                type="button"
                onClick={() => setViewId(null)}
                className="rounded-xl px-4 py-2 text-sm font-extrabold border border-slate-200 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
