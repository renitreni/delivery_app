import React, { useEffect, useMemo, useState } from "react";
import { MapPin, Navigation, ChevronDown, ChevronUp, Bell } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const jobsSeed = [
  {
    id: "j1",
    restaurant: "Burger King",
    address: "55 Main Street, New York, NY",
    pickup: { label: "Downtown", km: 2.5 },
    delivery: { label: "Uptown", km: 3 },
    price: 8.5,
  },
  {
    id: "j2",
    restaurant: "Sushi Master",
    address: "128 West Avenue, Brooklyn, NY",
    pickup: { label: "Midtown", km: 4 },
    delivery: { label: "East Side", km: 5 },
    price: 12.0,
  },
  {
    id: "j3",
    restaurant: "Pizza Hut",
    address: "220 Park Lane, Queens, NY",
    pickup: { label: "Westside", km: 1 },
    delivery: { label: "Central", km: 2 },
    price: 6.5,
  },
];


const pad2 = (n) => String(n).padStart(2, "0");
const fmtMMSS = (sec) => `${Math.floor(sec / 60)}:${pad2(sec % 60)}`;


function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const tone =
    toast.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : toast.type === "danger"
      ? "border-rose-200 bg-rose-50 text-rose-800"
      : "border-slate-200 bg-white text-slate-800";

  return (
    <div className="fixed right-5 top-5 z-[999]">
      <div className={cx("rounded-2xl border px-4 py-3 shadow-lg flex items-start gap-3", tone)}>
        <div className="mt-0.5">
          <Bell className="h-5 w-5" />
        </div>
        <div className="min-w-[220px]">
          <div className="text-sm font-extrabold">{toast.title}</div>
          {toast.desc ? <div className="mt-1 text-xs opacity-80">{toast.desc}</div> : null}
        </div>
        <button onClick={onClose} className="ml-2 text-xs font-bold opacity-60 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  );
}

function Pill({ tone = "amber", title, place, km }) {
  const t =
    tone === "amber"
      ? {
          ring: "ring-amber-100",
          bg: "bg-amber-50",
          icon: "text-amber-600",
          km: "text-amber-600",
        }
      : {
          ring: "ring-emerald-100",
          bg: "bg-emerald-50",
          icon: "text-emerald-600",
          km: "text-emerald-600",
        };

  return (
    <div className="flex items-center gap-3">
      <div className={cx("h-10 w-10 rounded-full ring-4 grid place-items-center", t.ring, t.bg)}>
        <MapPin className={cx("h-5 w-5", t.icon)} />
      </div>

      <div className="leading-tight">
        <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </div>
        <div className="text-sm font-bold tracking-tight text-slate-900">{place}</div>
      </div>

      <div className={cx("ml-1 flex items-center gap-1 text-xs font-bold", t.km)}>
        <Navigation className="h-3.5 w-3.5" />
        {km} km
      </div>
    </div>
  );
}

function JobCard({ job, expanded, onToggle, onAccept, secondsLeft, expired }) {
  const danger = secondsLeft <= 10 && !expired;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-bold tracking-tight text-slate-900">
              {job.restaurant}
            </div>
            <div className="mt-1 text-sm text-slate-400">{job.address}</div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400">Payout</div>
            <div className="text-xl font-bold tracking-tight text-emerald-600">
              ${job.price.toFixed(2)}
            </div>

           // countdown
            <div className="mt-2">
              <span
                className={cx(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold",
                  expired
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : danger
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                )}
              >
                {expired ? "EXPIRED" : `Time left: ${fmtMMSS(secondsLeft)}`}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-10">
          <Pill tone="amber" title="Pickup" place={job.pickup.label} km={job.pickup.km} />
          <Pill tone="emerald" title="Delivery" place={job.delivery.label} km={job.delivery.km} />
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          Details{" "}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={onAccept}
          disabled={expired}
          className={cx(
            "rounded-xl px-5 py-3 text-sm font-semibold tracking-wide text-white transition",
            expired
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"
          )}
        >
          ACCEPT JOB
        </button>
      </div>

      {expanded && (
        <div className="px-6 pb-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-bold text-slate-900">Job details</div>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                Pickup at {job.pickup.label} ({job.pickup.km} km away)
              </li>
              <li>
                Deliver to {job.delivery.label} ({job.delivery.km} km away)
              </li>
              <li>Payout: ${job.price.toFixed(2)}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RiderJobs() {
  
  const [jobs, setJobs] = useState(() =>
    jobsSeed.map((j) => ({ ...j, expiresAt: Date.now() + 60_000 }))
  );

  const [openId, setOpenId] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [toast, setToast] = useState(null);

  // Time for jobs
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // notify "new job" once on load
  useEffect(() => {
    setToast({
      type: "success",
      title: "New jobs available",
      desc: "You have new delivery requests.",
    });

  }, []);

  
  useEffect(() => {
    const expired = jobs.filter((j) => j.expiresAt - now <= 0);
    if (expired.length === 0) return;

    
    setToast({
      type: "danger",
      title: "Job expired",
      desc: `${expired[0].restaurant} request expired.`,
    });

    
    setJobs((prev) => prev.filter((j) => j.expiresAt - now > 0));

    
    if (expired.some((j) => j.id === openId)) setOpenId(null);
  }, [now, jobs, openId]);

  const onToggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  const onAccept = (id) => {
    const job = jobs.find((j) => j.id === id);
    if (!job) return;

    
    if (job.expiresAt - now <= 0) {
      setToast({ type: "danger", title: "Too late", desc: "This job already expired." });
      return;
    }

    setToast({
      type: "success",
      title: "Job accepted",
      desc: `You accepted ${job.restaurant}.`,
    });

    // demo: remove accepted job
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (openId === id) setOpenId(null);
  };

  const empty = useMemo(() => jobs.length === 0, [jobs]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="mx-auto w-full max-w-6xl space-y-6">
        {empty ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <div className="text-xl font-extrabold text-slate-900">No jobs right now</div>
            <div className="mt-2 text-sm text-slate-500">Check again in a few minutes.</div>
          </div>
        ) : (
          jobs.map((job) => {
            const secondsLeft = Math.max(0, Math.ceil((job.expiresAt - now) / 1000));
            const expired = secondsLeft <= 0;

            return (
              <JobCard
                key={job.id}
                job={job}
                expanded={openId === job.id}
                onToggle={() => onToggle(job.id)}
                onAccept={() => onAccept(job.id)}
                secondsLeft={secondsLeft}
                expired={expired}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
