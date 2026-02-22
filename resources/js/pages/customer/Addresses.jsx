import React, { useMemo, useState, useEffect } from "react";
import { Plus, MapPin, Pencil, Trash2, X, AlertTriangle } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");


function Modal({ open, onClose, children }) {
  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      
      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center p-0 sm:p-4">
        <div
          className={cx(
            "w-full bg-white border border-slate-200 shadow-xl overflow-hidden",
            "rounded-t-3xl sm:rounded-2xl",
            "max-h-[92vh] sm:max-h-[85vh]",
            "sm:max-w-sm"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }) {
  return (
    <div className="px-4 sm:px-5 pt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
          {title || ""}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-slate-100 shrink-0"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="sm:hidden mt-3 flex justify-center">
        <div className="h-1.5 w-10 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function Input({ label, placeholder, value, onChange }) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold text-slate-600">{label}</div>
      <input
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        checked ? "bg-emerald-500" : "bg-slate-300"
      )}
      aria-pressed={checked}
    >
      <span
        className={cx(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

export default function Addresses() {
  const seed = useMemo(
    () => [
      {
        id: "a1",
        label: "Home",
        address: "123 Main St, Apt 4B",
        details: "New York, NY 10001",
        isDefault: true,
      },
      {
        id: "a2",
        label: "Work",
        address: "456 Corporate Blvd, Floor 12",
        details: "New York, NY 10002",
        isDefault: false,
      },
      {
        id: "a3",
        label: "Mom’s House",
        address: "789 Suburbia Ln",
        details: "Queens, NY 11375",
        isDefault: false,
      },
    ],
    []
  );

  const [items, setItems] = useState(seed);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  const [activeId, setActiveId] = useState(null);

  const empty = { label: "", address: "", details: "", isDefault: false };
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const closeAll = () => {
    setAddOpen(false);
    setEditOpen(false);
    setDelOpen(false);
    setActiveId(null);
    setError("");
  };

  const validate = () => {
    if (!form.label.trim()) return "Label is required.";
    if (!form.address.trim()) return "Address is required.";
    if (!form.details.trim()) return "Details is required.";
    return "";
  };

  const openAdd = () => {
    setError("");
    setForm({ ...empty, label: "Home" });
    setAddOpen(true);
  };

  const openEdit = (id) => {
    const a = items.find((x) => x.id === id);
    if (!a) return;
    setActiveId(id);
    setError("");
    setForm({
      label: a.label,
      address: a.address,
      details: a.details,
      isDefault: a.isDefault,
    });
    setEditOpen(true);
  };

  const openDelete = (id) => {
    setActiveId(id);
    setDelOpen(true);
  };

  const pinOnMap = () => alert("Pin on Map (frontend only)");

  const saveNew = () => {
    const msg = validate();
    if (msg) return setError(msg);

    const id = `a${Date.now()}`;
    setItems((prev) => {
      let next = [{ id, ...form }, ...prev];

      if (form.isDefault) {
        next = next.map((x) => ({ ...x, isDefault: x.id === id }));
      } else {
        if (!next.some((x) => x.isDefault)) next[0] = { ...next[0], isDefault: true };
      }

      return next;
    });

    closeAll();
  };

  const saveEdit = () => {
    const msg = validate();
    if (msg) return setError(msg);

    setItems((prev) => {
      let next = prev.map((x) => (x.id === activeId ? { ...x, ...form } : x));

      if (form.isDefault) {
        next = next.map((x) => ({ ...x, isDefault: x.id === activeId }));
      } else {
        if (!next.some((x) => x.isDefault) && next.length) next[0] = { ...next[0], isDefault: true };
      }

      return next;
    });

    closeAll();
  };

  const doDelete = () => {
    setItems((prev) => {
      const next = prev.filter((x) => x.id !== activeId);
      if (!next.some((x) => x.isDefault) && next.length) next[0] = { ...next[0], isDefault: true };
      return next;
    });
    closeAll();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold text-slate-900">Addresses</div>
            <div className="text-sm text-slate-500">Manage your delivery locations.</div>
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add New Address
          </button>
        </div>

        
        <div className="mt-6 space-y-4">
          {items.map((a) => (
            <div
              key={a.id}
              className={cx(
                "rounded-2xl border bg-white shadow-sm p-4 sm:p-5",
                "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                a.isDefault ? "border-emerald-200" : "border-slate-200"
              )}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-sm font-extrabold text-slate-900">{a.label}</div>
                  {a.isDefault ? (
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700">
                      Default
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 text-sm text-slate-700 break-words">{a.address}</div>
                <div className="mt-1 text-xs text-slate-500 break-words">{a.details}</div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => openEdit(a.id)}
                  className="h-10 w-10 rounded-xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4 text-slate-700" />
                </button>

                <button
                  type="button"
                  onClick={() => openDelete(a.id)}
                  className="h-10 w-10 rounded-xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-slate-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <Modal open={addOpen} onClose={closeAll}>
        <ModalHeader title="Add New Address" onClose={closeAll} />

        <div className="px-4 sm:px-5 pb-5">
          {error ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <Input
              label="Label (e.g. Home, Office)"
              placeholder="Home"
              value={form.label}
              onChange={(v) => setForm((p) => ({ ...p, label: v }))}
            />
            <Input
              label="Address"
              placeholder="123 Main St"
              value={form.address}
              onChange={(v) => setForm((p) => ({ ...p, address: v }))}
            />
            <Input
              label="Details (Apt, Floor, etc.)"
              placeholder="Apt 4B"
              value={form.details}
              onChange={(v) => setForm((p) => ({ ...p, details: v }))}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Set as Default</div>
              <Switch checked={form.isDefault} onChange={(v) => setForm((p) => ({ ...p, isDefault: v }))} />
            </div>

            <button
              type="button"
              onClick={pinOnMap}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4" />
              Pin on Map
            </button>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeAll}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNew}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      </Modal>

      
      <Modal open={editOpen} onClose={closeAll}>
        <ModalHeader title="Edit Address" onClose={closeAll} />

        <div className="px-4 sm:px-5 pb-5">
          {error ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <Input
              label="Label (e.g. Home, Office)"
              placeholder="Home"
              value={form.label}
              onChange={(v) => setForm((p) => ({ ...p, label: v }))}
            />
            <Input
              label="Address"
              placeholder="123 Main St, Apt 4B"
              value={form.address}
              onChange={(v) => setForm((p) => ({ ...p, address: v }))}
            />
            <Input
              label="Details (Apt, Floor, etc.)"
              placeholder="New York, NY 10001"
              value={form.details}
              onChange={(v) => setForm((p) => ({ ...p, details: v }))}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Set as Default</div>
              <Switch checked={form.isDefault} onChange={(v) => setForm((p) => ({ ...p, isDefault: v }))} />
            </div>

            <button
              type="button"
              onClick={pinOnMap}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4" />
              Pin on Map
            </button>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeAll}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      </Modal>

      
      <Modal open={delOpen} onClose={closeAll}>
        <div className="px-4 sm:px-5 pt-4">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={closeAll}
              className="rounded-lg p-2 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-50 grid place-items-center">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>

          <div className="mt-3 text-sm font-extrabold text-slate-900">Delete Address?</div>
          <div className="mt-1 text-xs text-slate-500">
            Are you sure you want to delete this address?
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={closeAll}
              className="w-full sm:w-auto min-w-[110px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={doDelete}
              className="w-full sm:w-auto min-w-[110px] rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
