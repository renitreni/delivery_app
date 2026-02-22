import React, { useMemo, useState, useEffect } from "react";
import { Store, MapPin, Phone, Save, CheckCircle2, AlertTriangle, Edit3 } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const defaultSettings = {
  motto: "Update your store profile, delivery rules, and opening hours.",
  store: {
    name: "Burger King",
    description: "Home of the Whopper",
    address: "123 Main St, New York, NY",
    phone: "(555) 123-4567",
  },
  delivery: {
    radiusKm: 5,
    baseFee: "1.99",
    minOrder: "10.00",
  },
  hours: [
    { day: "Monday", open: true, start: "09:00", end: "22:00" },
    { day: "Tuesday", open: true, start: "09:00", end: "22:00" },
    { day: "Wednesday", open: true, start: "09:00", end: "22:00" },
    { day: "Thursday", open: true, start: "09:00", end: "22:00" },
    { day: "Friday", open: true, start: "09:00", end: "23:00" },
    { day: "Saturday", open: true, start: "10:00", end: "23:00" },
    { day: "Sunday", open: true, start: "10:00", end: "22:00" },
  ],
};

function deepEqual(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const map = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    danger: "border-rose-200 bg-rose-50 text-rose-800",
  };

  const icon =
    toast.type === "success" ? (
      <CheckCircle2 className="h-5 w-5" />
    ) : (
      <AlertTriangle className="h-5 w-5" />
    );

  return (
    <div className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2">
      <div className={cx("flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg", map[toast.type])}>
        {icon}
        <div>
          <div className="text-sm font-extrabold">{toast.title}</div>
          <div className="text-sm opacity-90">{toast.body}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
          {icon}
        </div>
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, icon, disabled = false }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-extrabold uppercase tracking-wide text-slate-600">{label}</span>
      <div className="relative">
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cx(
            "w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold shadow-sm outline-none focus:ring-2 focus:ring-emerald-200",
            disabled ? "border-slate-100 bg-slate-50 text-slate-500" : "border-slate-200"
          )}
        />
        {icon ? <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div> : null}
      </div>
    </label>
  );
}

function Toggle({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cx(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        disabled ? "opacity-60 cursor-not-allowed" : "",
        checked ? "bg-emerald-500" : "bg-slate-300"
      )}
    >
      <span
        className={cx(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

export default function RestaurantSettings() {
  const [initial, setInitial] = useState(defaultSettings);
  const [form, setForm] = useState(defaultSettings);
  const [toast, setToast] = useState(null);

  // edit mode controls when Save button appears
  const [editMode, setEditMode] = useState(false);

  const dirty = useMemo(() => !deepEqual(initial, form), [initial, form]);

  const update = (patch) => setForm((s) => ({ ...s, ...patch }));
  const updateStore = (patch) => setForm((s) => ({ ...s, store: { ...s.store, ...patch } }));
  const updateDelivery = (patch) => setForm((s) => ({ ...s, delivery: { ...s.delivery, ...patch } }));
  const updateHour = (idx, patch) =>
    setForm((s) => ({
      ...s,
      hours: s.hours.map((h, i) => (i === idx ? { ...h, ...patch } : h)),
    }));

  const onClickEdit = () => {
    setEditMode(true);
    setToast({ type: "success", title: "Edit enabled", body: "You can now edit the settings." });
  };

  const save = () => {
    setInitial(form);
    setEditMode(false); // hide Save button again after save
    setToast({ type: "success", title: "Saved", body: "Changes saved successfully." });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Toast toast={toast} onClose={() => setToast(null)} />

      
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>

          
          {!editMode ? (
            <p className="mt-1 text-sm text-slate-600">{form.motto}</p>
          ) : (
            <input
              value={form.motto}
              onChange={(e) => update({ motto: e.target.value })}
              className="mt-1 w-full max-w-2xl rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          )}
        </div>

        
        {!editMode ? (
          <button
            type="button"
            onClick={onClickEdit}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={save}
            disabled={!dirty}
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm",
              dirty ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-300 cursor-not-allowed"
            )}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        )}
      </div>

      
      <div className="grid gap-6">
        <Section title="Store Information" icon={<Store className="h-5 w-5" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Restaurant Name"
              value={form.store.name}
              onChange={(v) => updateStore({ name: v })}
              disabled={!editMode}
            />
            <Field
              label="Phone"
              value={form.store.phone}
              onChange={(v) => updateStore({ phone: v })}
              icon={<Phone className="h-4 w-4" />}
              disabled={!editMode}
            />
            <Field
              label="Description"
              value={form.store.description}
              onChange={(v) => updateStore({ description: v })}
              disabled={!editMode}
            />
            <Field
              label="Address"
              value={form.store.address}
              onChange={(v) => updateStore({ address: v })}
              icon={<MapPin className="h-4 w-4" />}
              disabled={!editMode}
            />
          </div>
        </Section>

        <Section title="Delivery Settings" icon={<Store className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Delivery Radius</span>
              <span className="text-emerald-700">{form.delivery.radiusKm} km</span>
            </div>

            <input
              type="range"
              min={1}
              max={25}
              value={form.delivery.radiusKm}
              disabled={!editMode}
              onChange={(e) => updateDelivery({ radiusKm: clamp(Number(e.target.value), 1, 25) })}
              className={cx("w-full", !editMode && "opacity-60 cursor-not-allowed")}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Base Delivery Fee ($)"
                value={form.delivery.baseFee}
                onChange={(v) => updateDelivery({ baseFee: v })}
                disabled={!editMode}
              />
              <Field
                label="Minimum Order Amount ($)"
                value={form.delivery.minOrder}
                onChange={(v) => updateDelivery({ minOrder: v })}
                disabled={!editMode}
              />
            </div>
          </div>
        </Section>

        <Section title="Opening Hours" icon={<Store className="h-5 w-5" />}>
          <div className="space-y-3">
            {form.hours.map((h, idx) => (
              <div
                key={h.day}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3"
              >
                <div className="w-24 text-sm font-semibold text-slate-800">{h.day}</div>

                <input
                  type="time"
                  value={h.start}
                  disabled={!editMode || !h.open}
                  onChange={(e) => updateHour(idx, { start: e.target.value })}
                  className={cx(
                    "rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold outline-none",
                    (!editMode || !h.open) && "bg-slate-50 text-slate-500"
                  )}
                />

                <input
                  type="time"
                  value={h.end}
                  disabled={!editMode || !h.open}
                  onChange={(e) => updateHour(idx, { end: e.target.value })}
                  className={cx(
                    "rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold outline-none",
                    (!editMode || !h.open) && "bg-slate-50 text-slate-500"
                  )}
                />

                <div className="flex items-center gap-2">
                  <Toggle checked={h.open} onChange={(v) => updateHour(idx, { open: v })} disabled={!editMode} />
                  <span className={cx("text-xs font-semibold", h.open ? "text-emerald-700" : "text-slate-500")}>
                    {h.open ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
