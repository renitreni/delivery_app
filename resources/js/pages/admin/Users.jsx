import React, { useMemo, useState } from "react";
import { Search, ChevronDown, MoreVertical, Shield, Ban, UserX } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const ROLE_BADGE = {
  customer: "bg-slate-50 text-slate-700 ring-slate-200",
  rider: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  restaurant: "bg-amber-50 text-amber-700 ring-amber-200",
};

const STATUS_BADGE = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Suspended: "bg-amber-50 text-amber-700 ring-amber-200",
  Banned: "bg-rose-50 text-rose-700 ring-rose-200",
};

function Chip({ children, className = "" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1",
        className
      )}
    >
      {children}
    </span>
  );
}

function Menu({ open, items, onClose }) {
  if (!open) return null;
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60]"
        onClick={onClose}
        aria-label="Close row menu"
      />
      <div className="absolute right-0 top-9 z-[70] w-44 rounded-xl border border-slate-100 bg-white shadow-lg overflow-hidden">
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
            {it.icon && <it.icon className="h-4 w-4" />}
            {it.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default function AdminUsersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [rowMenu, setRowMenu] = useState(null); // user id

  const [users, setUsers] = useState([
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      role: "customer",
      status: "Active",
      joined: "2023-01-15",
      orders: 45,
      lastActive: "2 hours ago",
    },
    {
      id: "u2",
      name: "Mike Rider",
      email: "mike@example.com",
      role: "rider",
      status: "Active",
      joined: "2023-02-20",
      orders: 120,
      lastActive: "5 mins ago",
    },
    {
      id: "u3",
      name: "Burger King Manager",
      email: "bk@example.com",
      role: "restaurant",
      status: "Active",
      joined: "2023-01-10",
      orders: 1240,
      lastActive: "10 mins ago",
    },
    {
      id: "u4",
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      status: "Suspended",
      joined: "2023-03-12",
      orders: 2,
      lastActive: "3 days ago",
    },
    {
      id: "u5",
      name: "New Rider Applicant",
      email: "applicant@example.com",
      role: "rider",
      status: "Active",
      joined: "2023-10-05",
      orders: 0,
      lastActive: "1 day ago",
    },
  ]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return users.filter((u) => {
      const matchQ =
        !s ||
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s);
      const matchRole = role === "all" || u.role === role;
      return matchQ && matchRole;
    });
  }, [users, q, role]);

  const setStatus = (id, status) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 lg:p-6">
      
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users by name or email..."
              className={cx(
                "w-full h-11 rounded-2xl border border-slate-200 bg-slate-50/60",
                "pl-11 pr-4 text-sm font-semibold text-slate-700",
                "focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
              )}
            />
          </div>

          <div className="relative w-full lg:w-48">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={cx(
                "w-full h-11 rounded-2xl border border-slate-200 bg-white",
                "px-4 pr-10 text-sm font-semibold text-slate-700",
                "focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
              )}
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="rider">Rider</option>
              <option value="restaurant">Restaurant</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

       
        <div className="mt-5 overflow-auto rounded-2xl border border-slate-100">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-slate-50/60">
              <tr className="text-left text-xs font-extrabold text-slate-500">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Orders</th>
                <th className="px-5 py-4">Last Active</th>
                <th className="px-5 py-4 w-10"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-slate-100 border border-slate-200" />
                      <div className="leading-tight">
                        <div className="font-extrabold text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Chip className={ROLE_BADGE[u.role] || ROLE_BADGE.customer}>
                      {u.role}
                    </Chip>
                  </td>

                  <td className="px-5 py-4">
                    <Chip className={STATUS_BADGE[u.status] || STATUS_BADGE.Active}>
                      {u.status}
                    </Chip>
                  </td>

                  <td className="px-5 py-4 text-slate-600 font-semibold">{u.joined}</td>
                  <td className="px-5 py-4 text-slate-900 font-extrabold">{u.orders}</td>
                  <td className="px-5 py-4 text-slate-500 font-semibold">{u.lastActive}</td>

                  <td className="px-5 py-4">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setRowMenu((v) => (v === u.id ? null : u.id))}
                        className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100"
                        aria-label="Row actions"
                      >
                        <MoreVertical className="h-5 w-5 text-slate-500" />
                      </button>

                      <Menu
                        open={rowMenu === u.id}
                        onClose={() => setRowMenu(null)}
                        items={[
                          {
                            label: "Set Active",
                            icon: CheckIcon,
                            onClick: () => setStatus(u.id, "Active"),
                          },
                          {
                            label: "Suspend",
                            icon: Shield,
                            onClick: () => setStatus(u.id, "Suspended"),
                          },
                          {
                            label: "Ban",
                            icon: Ban,
                            danger: true,
                            onClick: () => setStatus(u.id, "Banned"),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-500 font-semibold">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
