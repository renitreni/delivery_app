import React, { useEffect, useMemo, useState } from "react";
import { Globe, DollarSign, Bell, Pencil, Save } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function Card({ title, icon: Icon, iconTone = "blue", right, children }) {
  const tone = useMemo(() => {
    const map = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-emerald-50 text-emerald-600",
      orange: "bg-orange-50 text-orange-600",
    };
    return map[iconTone] || map.blue;
  }, [iconTone]);

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <span className={cx("grid h-10 w-10 place-items-center rounded-xl", tone)}>
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
        </div>
        {right}
      </div>
      <div className="px-6 pb-6">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-slate-500">{label}</div>
      {children}
    </div>
  );
}

function Input({ value, onChange, disabled, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={cx(
        "w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
        disabled
          ? "bg-slate-50 text-slate-600 border-slate-200"
          : "bg-white text-slate-900 border-slate-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
      )}
    />
  );
}

function Select({ value, onChange, disabled, options = [] }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={cx(
        "w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
        disabled
          ? "bg-slate-50 text-slate-600 border-slate-200"
          : "bg-white text-slate-900 border-slate-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-7 w-12 items-center rounded-full transition",
        checked ? "bg-emerald-500" : "bg-slate-300"
      )}
      aria-pressed={checked}
    >
      <span
        className={cx(
          "inline-block h-5 w-5 rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

function Toast({ show, text, onClose }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-lg">
      {text}
    </div>
  );
}

export default function Settings() {
  
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(false);

  
  const [platformName, setPlatformName] = useState("FoodDelivery");
  const [supportEmail, setSupportEmail] = useState("support@fooddelivery.com");
  const [supportPhone, setSupportPhone] = useState("(555) 123-4567");
  const [currency, setCurrency] = useState("USD");

  
  const [serviceFee, setServiceFee] = useState("5");
  const [minOrder, setMinOrder] = useState("10");
  const [defaultCommission, setDefaultCommission] = useState("15");

  
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "PHP", label: "PHP (₱)" },
    { value: "EUR", label: "EUR (€)" },
  ];

  const onEditSave = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    setIsEditing(false);
    setToast(true);
  };

  return (
    <div className="p-6">
      <Toast show={toast} text="Settings saved successfully." onClose={() => setToast(false)} />

      <div className="mx-auto max-w-5xl space-y-6">
        
        <Card
          title="General Information"
          icon={Globe}
          iconTone="blue"
          right={
            <button
              type="button"
              onClick={onEditSave}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition",
                isEditing
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              {isEditing ? "Save Changes" : "Edit"}
            </button>
          }
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Platform Name">
              <Input
                value={platformName}
                onChange={setPlatformName}
                disabled={!isEditing}
                placeholder="Platform name"
              />
            </Field>

            <Field label="Support Email">
              <Input
                value={supportEmail}
                onChange={setSupportEmail}
                disabled={!isEditing}
                placeholder="Email"
                type="email"
              />
            </Field>

            <Field label="Support Phone">
              <Input
                value={supportPhone}
                onChange={setSupportPhone}
                disabled={!isEditing}
                placeholder="Phone"
              />
            </Field>

            <Field label="Default Currency">
              <Select
                value={currency}
                onChange={setCurrency}
                disabled={!isEditing}
                options={currencyOptions}
              />
            </Field>
          </div>
        </Card>

        {/* Fees & Commission */}
        <Card title="Fees & Commission" icon={DollarSign} iconTone="green">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Field label="Service Fee (%)">
              <Input
                value={serviceFee}
                onChange={setServiceFee}
                disabled={!isEditing}
                placeholder="e.g. 5"
                type="number"
              />
            </Field>

            <Field label="Min Order Amount ($)">
              <Input
                value={minOrder}
                onChange={setMinOrder}
                disabled={!isEditing}
                placeholder="e.g. 10"
                type="number"
              />
            </Field>

            <Field label="Default Commission (%)">
              <Input
                value={defaultCommission}
                onChange={setDefaultCommission}
                disabled={!isEditing}
                placeholder="e.g. 15"
                type="number"
              />
            </Field>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Note: Commission rates can be overridden per restaurant in the Restaurant Management section.
          </div>
        </Card>

        {/* System Notifications */}
        <Card title="System Notifications" icon={Bell} iconTone="orange">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Email Notifications</div>
                <div className="text-xs text-slate-500">Send system alerts via email</div>
              </div>
              <Toggle checked={emailNotif} onChange={setEmailNotif} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">SMS Notifications</div>
                <div className="text-xs text-slate-500">Send critical alerts via SMS</div>
              </div>
              <Toggle checked={smsNotif} onChange={setSmsNotif} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Push Notifications</div>
                <div className="text-xs text-slate-500">Send in-app push notifications</div>
              </div>
              <Toggle checked={pushNotif} onChange={setPushNotif} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
