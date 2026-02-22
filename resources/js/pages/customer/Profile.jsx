import React, { useMemo, useRef, useState, useEffect } from "react";
import { LogOut, Camera, Trash2, Pencil, Check, X } from "lucide-react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function Toggle({ checked, onChange, label, desc, disabled }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={cx(
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          checked ? "bg-emerald-500" : "bg-slate-300",
          disabled && "opacity-50 cursor-not-allowed"
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
    </div>
  );
}

function Chip({ active, children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onClick()}
      className={cx(
        "rounded-full border px-3 py-1 text-xs font-semibold transition",
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, disabled, type = "text" }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => !disabled && onChange(e.target.value)}
        disabled={disabled}
        className={cx(
          "mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
          disabled
            ? "border-slate-200 bg-slate-50 text-slate-500"
            : "border-slate-200 bg-white focus:ring-2 focus:ring-emerald-200"
        )}
      />
    </label>
  );
}


function ModalShell({ open, onClose, title, children, footer }) {
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
    <div className="fixed inset-0 z-[999]">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close dialog" />

      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center p-0 sm:p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className={cx(
            "w-full bg-white shadow-xl border border-slate-100 overflow-hidden",
            "rounded-t-3xl sm:rounded-3xl",
            "max-h-[92vh] sm:max-h-[85vh]",
            "sm:max-w-md"
          )}
        >
          
          <div className="sm:hidden pt-3 flex justify-center">
            <div className="h-1.5 w-10 rounded-full bg-slate-200" />
          </div>

          <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-100">
            <div className="text-sm sm:text-base font-extrabold text-slate-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-slate-50 text-slate-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 sm:px-6 py-5 overflow-auto">{children}</div>

          {footer ? <div className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-white">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const initial = useMemo(
    () => ({
      name: "Keith Pelonio",
      email: "test@customer.com",
      phone: "(555) 123-4567",
      memberSince: "Member since Oct 2023",
      dietary: ["Vegetarian"],
      notifications: {
        orderUpdates: true,
        promotions: true,
        messages: true,
      },
      avatarUrl: "",
    }),
    []
  );

  const [profile, setProfile] = useState(initial);
  const [draft, setDraft] = useState(profile);
  const [editingPI, setEditingPI] = useState(false);

  const fileRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);

 
  const [delOpen, setDelOpen] = useState(false);

  const dietaryOptions = ["Vegetarian", "Vegan", "Halal", "Gluten Free", "Dairy Free", "Nut Free"];

  const onAvatarPick = () => fileRef.current?.click();

  const onAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    setDraft((p) => ({ ...p, avatarUrl: url }));
  };

  const toggleDietary = (label) => {
    setDraft((p) => {
      const has = p.dietary.includes(label);
      return {
        ...p,
        dietary: has ? p.dietary.filter((x) => x !== label) : [...p.dietary, label],
      };
    });
  };

  const setNotif = (key, value) => {
    setDraft((p) => ({
      ...p,
      notifications: { ...p.notifications, [key]: value },
    }));
  };

  const savePI = () => {
    setProfile(draft);
    setEditingPI(false);
    alert("Saved (frontend only)");
  };

  const cancelPI = () => {
    setDraft(profile);
    setEditingPI(false);
  };

  const logout = () => alert("Logout (frontend only)");

  const initials = (draft.name || "User")
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full ring-4 ring-white shadow-md overflow-hidden flex items-center justify-center bg-gradient-to-br from-emerald-200 to-slate-200">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xl font-extrabold text-slate-700">{initials}</span>
                )}
              </div>

              <button
                type="button"
                onClick={onAvatarPick}
                className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-white border border-slate-200 shadow-sm grid place-items-center hover:bg-slate-50"
                title="Change photo"
              >
                <Camera className="h-4 w-4" />
              </button>

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatarFile} />
            </div>

            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 truncate">{profile.name}</div>
              <div className="text-sm text-slate-500">{profile.memberSince}</div>

              {/* Logout */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="mt-6 sm:mt-8 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-slate-900">Personal Information</div>
              <div className="text-xs text-slate-500">Update your details for deliveries and account.</div>
            </div>

            {!editingPI ? (
              <button
                type="button"
                onClick={() => setEditingPI(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={cancelPI}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={savePI}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Check className="h-4 w-4" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                value={draft.name}
                disabled={!editingPI}
                onChange={(v) => setDraft((p) => ({ ...p, name: v }))}
              />
              <Field
                label="Email Address"
                type="email"
                value={draft.email}
                disabled={!editingPI}
                onChange={(v) => setDraft((p) => ({ ...p, email: v }))}
              />
              <Field
                label="Phone Number"
                value={draft.phone}
                disabled={!editingPI}
                onChange={(v) => setDraft((p) => ({ ...p, phone: v }))}
              />
            </div>
          </div>
        </div>

        
        <div className="mt-5 rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="text-sm font-extrabold text-slate-900">Dietary Preferences</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {dietaryOptions.map((opt) => (
              <Chip
                key={opt}
                active={draft.dietary.includes(opt)}
                onClick={() => toggleDietary(opt)}
                disabled={false}
              >
                {opt}
              </Chip>
            ))}
          </div>
        </div>

        
        <div className="mt-5 rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="text-sm font-extrabold text-slate-900">Notifications</div>
          <div className="mt-2 divide-y divide-slate-100">
            <Toggle
              checked={draft.notifications.orderUpdates}
              onChange={(v) => setNotif("orderUpdates", v)}
              label="Order Updates"
              desc="Get notified about your order status."
              disabled={false}
            />
            <Toggle
              checked={draft.notifications.promotions}
              onChange={(v) => setNotif("promotions", v)}
              label="Promotions"
              desc="Receive offers and discounts."
              disabled={false}
            />
            <Toggle
              checked={draft.notifications.messages}
              onChange={(v) => setNotif("messages", v)}
              label="Messages"
              desc="Chat notifications from riders/restaurants."
              disabled={false}
            />
          </div>
        </div>

        
        <div className="mt-5 rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="text-sm font-extrabold text-red-600">Danger Zone</div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setDelOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      
      <ModalShell
        open={delOpen}
        onClose={() => setDelOpen(false)}
        title="Delete account?"
        footer={
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => setDelOpen(false)}
              className="w-full sm:w-auto rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setDelOpen(false);
                alert("Account deleted (frontend only)");
              }}
              className="w-full sm:w-auto rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        }
      >
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
          <div className="text-sm font-extrabold text-red-700">This action is permanent.</div>
          <div className="mt-1 text-sm text-red-700/90">
            Your account and order history will be removed. This cannot be undone.
          </div>
        </div>
      </ModalShell>
    </div>
  );
}
