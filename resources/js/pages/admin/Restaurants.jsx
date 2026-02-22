import React, { useMemo, useState } from "react";
import { Star, Store } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const DATA = [
  {
    id: 1,
    name: "Burger King",
    category: "Burgers, Fast Food",
    owner: "BK Manager",
    status: "active",
    rating: 4.5,
    orders: 1240,
    commission: "15%",
    revenue: "$24,500",
  },
  {
    id: 2,
    name: "New Pizza Place",
    category: "Pizza, Italian",
    owner: "Mario Rossi",
    status: "pending",
    rating: 0.0,
    orders: 0,
    commission: "15%",
    revenue: "$0",
  },
  {
    id: 3,
    name: "Suspended Sushi",
    category: "Sushi, Japanese",
    owner: "Kenji Tanaka",
    status: "suspended",
    rating: 3.2,
    orders: 45,
    commission: "20%",
    revenue: "$1,200",
  },
];

const TABS = [
  { key: "all", label: "All Restaurants" },
  { key: "pending", label: "Pending Approval" },
  { key: "active", label: "Active" },
  { key: "suspended", label: "Suspended" },
];

const StatusBadge = ({ status }) => {
  const map = {
    active: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    suspended: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", map[status])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function Restaurants() {
  const [tab, setTab] = useState("all");

  const pendingCount = DATA.filter((x) => x.status === "pending").length;

  const rows = useMemo(() => {
    if (tab === "all") return DATA;
    return DATA.filter((x) => x.status === tab);
  }, [tab]);

  return (
    <div className="p-6">
      
      <div className="mb-6 flex gap-6 border-b">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cx(
              "relative pb-3 text-sm font-semibold text-slate-500 hover:text-emerald-600",
              tab === t.key && "text-emerald-600"
            )}
          >
            {t.label}
            {t.key === "pending" && pendingCount > 0 && (
              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                {pendingCount}
              </span>
            )}
            {tab === t.key && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-emerald-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Restaurant</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Commission</th>
              <th className="px-4 py-3 text-right">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600">
                      <Store className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{r.name}</div>
                      <div className="text-xs text-slate-500">{r.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{r.owner}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {r.rating.toFixed(1)}
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700">{r.orders}</td>
                <td className="px-4 py-4 text-slate-700">{r.commission}</td>
                <td className="px-4 py-4 text-right font-semibold text-emerald-600">
                  {r.revenue}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No restaurants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
