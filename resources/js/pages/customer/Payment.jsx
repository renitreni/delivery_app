import React, { useEffect, useMemo, useState } from "react";
import { Plus, CreditCard, Apple, Lock, X } from "lucide-react";

function maskLast4(last4) {
  const clean = (last4 || "").replace(/\D/g, "").slice(-4);
  return clean.padStart(4, "0");
}

function parseExpiryMMYY(value) {
  const v = value.replace(/\s/g, "");
  const m = v.match(/^(\d{1,2})\/?(\d{0,2})$/);
  if (!m) return { mm: "", yy: "" };
  const mm = m[1].slice(0, 2);
  const yy = m[2].slice(0, 2);
  return { mm, yy };
}

function prettyExpiry(mm, yy) {
  if (!mm || !yy) return "";
  return `${mm.padStart(2, "0")}/${yy.padStart(2, "0")}`;
}

function makeId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const initialMethods = [
  {
    id: "cod",
    type: "cod",
    title: "Cash on Delivery",
    subtitle: "",
    isDefault: true,
    removable: false,
    leading: "cash",
  },
  {
    id: "visa-2422",
    type: "card",
    brand: "Visa",
    last4: "2422",
    expiry: "12/28",
    title: "Visa ending in 2422",
    subtitle: "Expires 12/28",
    isDefault: false,
    removable: true,
    leading: "card",
  },
  {
    id: "apple-pay",
    type: "wallet",
    title: "Apple Pay",
    subtitle: "",
    isDefault: false,
    removable: true,
    leading: "apple",
  },
];

const Input = (props) => (
  <input
    {...props}
    className={[
      "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm",
      "placeholder:text-gray-400 outline-none",
      "focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300",
      props.className || "",
    ].join(" ")}
  />
);


function ModalShell({ open, title, onClose, children, footer }) {
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
          className={[
            "w-full bg-white shadow-xl border border-gray-200 overflow-hidden",
            "rounded-t-3xl sm:rounded-2xl",
            "max-h-[92vh] sm:max-h-[85vh]",
            "sm:max-w-xl",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          {/* mobile handle */}
          <div className="sm:hidden pt-3 flex justify-center">
            <div className="h-1.5 w-10 rounded-full bg-gray-200" />
          </div>

          <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <p className="text-sm sm:text-base font-extrabold text-gray-900 truncate">{title}</p>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-50 transition" aria-label="Close">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="px-4 sm:px-6 py-5 overflow-auto">{children}</div>

          {footer ? (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-white">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}


function CardPreview({ number, name, expiry }) {
  const digits = number.replace(/\D/g, "");
  const brand =
    /^4/.test(digits) ? "VISA" : /^5[1-5]/.test(digits) ? "MASTERCARD" : /^3[47]/.test(digits) ? "AMEX" : "CARD";

  const prettyNumber = (() => {
    const d = digits.slice(0, 16);
    const masked = d.padEnd(16, "•");
    return masked.replace(/(.{4})/g, "$1 ").trim();
  })();

  const { mm, yy } = parseExpiryMMYY(expiry);
  const exp = mm && yy ? prettyExpiry(mm, yy) : "MM/YY";

  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold tracking-widest text-white/80">{brand}</div>
        <div className="h-8 w-12 rounded-lg bg-white/10 border border-white/10" />
      </div>

      <div className="mt-6 font-semibold tracking-[0.18em] text-sm sm:text-base">
        {prettyNumber}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] text-white/70">Cardholder</div>
          <div className="text-xs sm:text-sm font-semibold truncate">{name?.trim() ? name : "YOUR NAME"}</div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[10px] text-white/70">Expires</div>
          <div className="text-xs sm:text-sm font-semibold">{exp}</div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSection() {
  const [methods, setMethods] = useState(initialMethods);
  const [open, setOpen] = useState(false);

  
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const canSave = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, "");
    const { mm, yy } = parseExpiryMMYY(expiry);
    const mmNum = Number(mm);
    const okExpiry = mm.length === 2 && yy.length === 2 && mmNum >= 1 && mmNum <= 12;
    const okCvv = cvv.replace(/\D/g, "").length >= 3;
    const okName = name.trim().length >= 2;
    const okCard = digits.length >= 12;
    return okCard && okExpiry && okCvv && okName;
  }, [cardNumber, expiry, cvv, name]);

  const resetForm = () => {
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setName("");
  };

  const handleRemove = (id) => setMethods((prev) => prev.filter((m) => m.id !== id));

  const detectBrand = (digits) => {
    if (/^4/.test(digits)) return "Visa";
    if (/^5[1-5]/.test(digits)) return "Mastercard";
    if (/^3[47]/.test(digits)) return "Amex";
    return "Card";
  };

  const handleSave = () => {
    if (!canSave) return;

    const digits = cardNumber.replace(/\D/g, "");
    const last4 = maskLast4(digits.slice(-4));
    const brand = detectBrand(digits);
    const { mm, yy } = parseExpiryMMYY(expiry);
    const exp = prettyExpiry(mm, yy);

    const newMethod = {
      id: makeId(),
      type: "card",
      brand,
      last4,
      expiry: exp,
      title: `${brand} ending in ${last4}`,
      subtitle: `Expires ${exp}`,
      isDefault: false,
      removable: true,
      leading: "card",
    };

    setMethods((prev) => {
      const cod = prev.find((m) => m.id === "cod");
      const rest = prev.filter((m) => m.id !== "cod");
      return cod ? [cod, newMethod, ...rest] : [newMethod, ...prev];
    });

    setOpen(false);
    resetForm();
  };

  const LeadingIcon = ({ kind }) => {
    if (kind === "apple") {
      return (
        <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
          <Apple className="h-5 w-5 text-gray-700" />
        </div>
      );
    }
    if (kind === "cash") {
      return (
        <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
          <span className="text-sm">💵</span>
        </div>
      );
    }
    return (
      <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
        <CreditCard className="h-5 w-5 text-gray-700" />
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 sm:px-6 py-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Top bar */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </button>
        </div>

        {/* Methods list */}
        <div className="mt-6 space-y-3 sm:space-y-4">
          {methods.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm px-4 sm:px-5 py-4 flex items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <LeadingIcon kind={m.leading} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900 truncate">{m.title}</p>
                    {m.isDefault ? (
                      <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 text-[11px] font-semibold">
                        Default
                      </span>
                    ) : null}
                  </div>
                  {m.subtitle ? <p className="text-xs text-gray-500 mt-1">{m.subtitle}</p> : null}
                </div>
              </div>

              {m.removable ? (
                <button
                  onClick={() => handleRemove(m.id)}
                  className="text-sm text-gray-500 hover:text-gray-800 transition shrink-0"
                >
                  Remove
                </button>
              ) : (
                <div className="text-sm text-gray-400 select-none shrink-0">&nbsp;</div>
              )}
            </div>
          ))}
        </div>

        
        <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-4 sm:p-5 flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <Lock className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-blue-900">Secure Payments</p>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and securely stored. We never share your financial details with merchants.
            </p>
          </div>
        </div>
      </div>

      
      <ModalShell
        open={open}
        title="Add New Card"
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        footer={
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="w-full sm:w-auto rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={[
                "w-full sm:w-auto rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition",
                canSave ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-300 cursor-not-allowed",
              ].join(" ")}
            >
              Save Card
            </button>
          </div>
        }
      >
        
        <CardPreview number={cardNumber} name={name} expiry={expiry} />

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Card Number</label>
            <div className="mt-2">
              <Input
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
                  const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
                  setCardNumber(grouped);
                }}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Expiry Date</label>
              <div className="mt-2">
                <Input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^\d/]/g, "").slice(0, 5);
                    const digits = raw.replace(/\D/g, "");
                    let out = digits.slice(0, 2);
                    if (digits.length > 2) out += "/" + digits.slice(2, 4);
                    setExpiry(out);
                  }}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">CVV</label>
              <div className="mt-2">
                <Input
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Cardholder Name</label>
            <div className="mt-2">
              <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            Tip: This is a demo UI. Don’t store real card details in local state for production—use a PCI-compliant payment provider.
          </div>
        </div>
      </ModalShell>
    </div>
  );
}
