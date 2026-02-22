import React, { useMemo, useState } from "react";
import { AlertCircle, User, Clock } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const TICKETS = [
  {
    id: "t1",
    title: "Missing items in order",
    name: "Sarah Jenkins",
    role: "Customer",
    time: "2 hours ago",
    status: "open",
    priority: "Medium",
    category: "Order Issue",
  },
  {
    id: "t2",
    title: "Payout not received",
    name: "Mike Rider",
    role: "Rider",
    time: "1 day ago",
    status: "progress",
    priority: "High",
    category: "Payment",
  },
  {
    id: "t3",
    title: "App crashing on login",
    name: "John Doe",
    role: "Customer",
    time: "3 days ago",
    status: "resolved",
    priority: "Low",
    category: "Technical",
  },
];

const TABS = [
  { key: "open", label: "Open Tickets" },
  { key: "progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
];

function PriorityBadge({ value }) {
  const map = {
    High: "bg-amber-100 text-amber-700",
    Medium: "bg-blue-100 text-blue-700",
    Low: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", map[value])}>
      {value}
    </span>
  );
}

export default function SupportContent() {
  const [tab, setTab] = useState("open");

  const counts = useMemo(
    () => ({
      open: TICKETS.filter((t) => t.status === "open").length,
      progress: TICKETS.filter((t) => t.status === "progress").length,
      resolved: TICKETS.filter((t) => t.status === "resolved").length,
    }),
    []
  );

  const rows = useMemo(() => TICKETS.filter((t) => t.status === tab), [tab]);

  return (
    <div className="p-6">
      
      <div className="mb-6 flex gap-6 border-b">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cx(
              "relative pb-3 text-sm font-semibold",
              tab === t.key ? "text-emerald-600" : "text-slate-500"
            )}
          >
            {t.label}
            {counts[t.key] > 0 && (
              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                {counts[t.key]}
              </span>
            )}
            {tab === t.key && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

     
      <div className="space-y-4">
        {rows.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-600">
                <AlertCircle className="h-5 w-5" />
              </div>

              <div>
                <div className="font-semibold text-slate-900">{t.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {t.name} <span className="text-slate-400">({t.role})</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {t.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <PriorityBadge value={t.priority} />
              <div className="mt-1 text-xs text-slate-400">{t.category}</div>
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
            No tickets here 🎉
          </div>
        )}
      </div>
    </div>
  );
}
