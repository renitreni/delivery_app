import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Star,
  Upload,
  FileText,
  Pencil,
  Download,
  CheckCircle2,
  Bike,
  Info,
  X,
  Save,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function StarsRow({ value = 4.9 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < full;
          const isHalf = !filled && half && i === full;
          return (
            <span key={i} className="relative inline-block">
              <Star
                className={cx(
                  "h-5 w-5",
                  filled ? "text-amber-400 fill-amber-400" : "text-slate-200"
                )}
              />
              {isHalf ? (
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
      <div className="text-sm font-semibold text-slate-500">({value} Rating)</div>
    </div>
  );
}

function Card({ title, right, children, className = "" }) {
  return (
    <div className={cx("rounded-3xl bg-white border border-slate-200 shadow-sm", className)}>
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="text-xl font-extrabold text-slate-900">{title}</div>
        {right}
      </div>
      <div className="px-8 pb-8">{children}</div>
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
      {children}
    </div>
  );
}

function Input({ value, onChange, disabled, placeholder = "", type = "text" }) {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      className={cx(
        "mt-2 w-full h-12 rounded-2xl border px-4 text-sm outline-none transition",
        disabled
          ? "border-slate-200 bg-white text-slate-800"
          : "border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
      )}
    />
  );
}

function Select({ value, onChange, disabled, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cx(
        "mt-2 w-full h-12 rounded-2xl border px-4 text-sm outline-none transition bg-white",
        disabled
          ? "border-slate-200 text-slate-800"
          : "border-emerald-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
      )}
    >
      {children}
    </select>
  );
}

function StatItem({ label, value, accent = false, statusDot, right }) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-1 flex items-center gap-2 min-w-0">
        {statusDot ? <span className={cx("h-2.5 w-2.5 rounded-full", statusDot)} /> : null}
        <div className={cx("font-extrabold truncate", accent ? "text-emerald-700" : "text-slate-900")}>
          {value}
        </div>
        {right ? <div className="ml-2">{right}</div> : null}
      </div>
    </div>
  );
}

function Pill({ children, tone = "emerald" }) {
  const map = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border", map[tone])}>
      {children}
    </span>
  );
}

function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal overlay"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-24 w-[92%] max-w-lg rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-200">
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-2xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50 transition"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-slate-700" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function DocRow({ title, date, status, onDownload, hasFile, fileName, onReplace }) {
  const tone = status === "Approved" ? "emerald" : status === "Pending" ? "amber" : status === "Rejected" ? "rose" : "slate";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-12 w-12 rounded-2xl bg-emerald-50 grid place-items-center shrink-0">
          <FileText className="h-5 w-5 text-emerald-600" />
        </div>

        <div className="min-w-0">
          <div className="text-sm font-extrabold text-slate-900 truncate">{title}</div>
          <div className="text-xs text-slate-500">
            Uploaded: {date}
            {hasFile ? (
              <span className="text-slate-400">
                {" "}
                • <span className="truncate">{fileName}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Pill tone={tone}>{status}</Pill>

        <button
          type="button"
          onClick={onReplace}
          className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition"
          title="Replace file"
        >
          <Upload className="h-4 w-4" />
          Replace
        </button>

        <button
          type="button"
          onClick={onDownload}
          disabled={!hasFile}
          className={cx(
            "h-10 w-10 rounded-2xl border grid place-items-center transition",
            hasFile
              ? "border-slate-200 bg-white hover:bg-slate-50"
              : "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
          )}
          aria-label="Download"
          title={hasFile ? "Download file" : "No file uploaded yet"}
        >
          <Download className="h-4 w-4 text-slate-700" />
        </button>
      </div>
    </div>
  );
}

function VehicleTile({ label, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-2 text-base font-extrabold text-slate-900">{children}</div>
    </div>
  );
}

function formatDate(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function safeRevoke(url) {
  try {
    if (url) URL.revokeObjectURL(url);
  } catch {}
}

const COLOR_SWATCH = {
  Black: "bg-black",
  White: "bg-white border border-slate-200",
  Red: "bg-rose-500",
  Blue: "bg-blue-500",
  Green: "bg-emerald-500",
  Yellow: "bg-amber-400",
  Gray: "bg-slate-400",
};

export default function RiderProfileLikeScreenshot() {
  const [editingPI, setEditingPI] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(false);

  const [driver, setDriver] = useState({
    username: "1021299100",
    sfd: "Full Time",
    name: "ibraheem cute",
    driverNumber: "2327150658",
    accountStatus: "Active",
    suspended: "No",
    ceased: "No",
    verified: true,
    rating: 4.9,

    email: "test@rider.com",
    phone: "(555) 123-4567",

    vehicle: { type: "Motorcycle", model: "Honda PCX", plate: "ABC-1234", color: "Black" },

    avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=240&q=60",
  });

  
  const [piDraft, setPiDraft] = useState({ name: driver.name, email: driver.email, phone: driver.phone });
  const [vehDraft, setVehDraft] = useState({ ...driver.vehicle });

  
  const [docs, setDocs] = useState(() => [
    { id: "dl", title: "Driver License", date: "2023-01-15", status: "Approved", fileUrl: "", fileName: "" },
    { id: "id", title: "ID Card", date: "2023-01-15", status: "Approved", fileUrl: "", fileName: "" },
    { id: "vr", title: "Vehicle Registration", date: "2023-10-20", status: "Pending", fileUrl: "", fileName: "" },
  ]);

  
  const fileInputRef = useRef(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("dl");
  const [pendingFile, setPendingFile] = useState(null);

  const initials = useMemo(() => {
    const parts = driver.name.trim().split(/\s+/);
    return (parts[0]?.[0] || "D") + (parts[1]?.[0] || "R");
  }, [driver.name]);

  
  useEffect(() => {
    if (editingPI) setPiDraft({ name: driver.name, email: driver.email, phone: driver.phone });
  }, [editingPI]); 

  useEffect(() => {
    if (editingVehicle) setVehDraft({ ...driver.vehicle });
  }, [editingVehicle]); 

  
  useEffect(() => {
    return () => {
      docs.forEach((d) => safeRevoke(d.fileUrl));
    };
    
  }, []);

  const startUpload = (docId = "dl") => {
    setSelectedDocId(docId);
    setPendingFile(null);
    setUploadOpen(true);
  };

  const pickFile = () => fileInputRef.current?.click();

  const onFileChosen = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPendingFile(f);
    
    e.target.value = "";
  };

  const commitUpload = () => {
    if (!pendingFile) return;

    const url = URL.createObjectURL(pendingFile);
    setDocs((prev) =>
      prev.map((d) => {
        if (d.id !== selectedDocId) return d;
        safeRevoke(d.fileUrl); 
        return {
          ...d,
          date: formatDate(new Date()),
          status: "Pending", 
          fileUrl: url,
          fileName: pendingFile.name,
        };
      })
    );

    setUploadOpen(false);
    setPendingFile(null);
  };

  const downloadDoc = (doc) => {
    if (!doc.fileUrl) return;
    const a = document.createElement("a");
    a.href = doc.fileUrl;
    a.download = doc.fileName || `${doc.title}.file`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const savePI = () => {
    setDriver((d) => ({ ...d, name: piDraft.name, email: piDraft.email, phone: piDraft.phone }));
    setEditingPI(false);
  };
  const cancelPI = () => {
    setPiDraft({ name: driver.name, email: driver.email, phone: driver.phone });
    setEditingPI(false);
  };

  const saveVehicle = () => {
    setDriver((d) => ({ ...d, vehicle: { ...vehDraft } }));
    setEditingVehicle(false);
  };
  const cancelVehicle = () => {
    setVehDraft({ ...driver.vehicle });
    setEditingVehicle(false);
  };

  const colorDotClass = COLOR_SWATCH[driver.vehicle.color] || "bg-slate-400";
  const colorDotClassDraft = COLOR_SWATCH[vehDraft.color] || "bg-slate-400";

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 py-8">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onFileChosen}
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <Modal open={uploadOpen} title="Upload Document" onClose={() => setUploadOpen(false)}>
        <div className="space-y-4">
          <div>
            <Label>Document Type</Label>
            <Select value={selectedDocId} onChange={(e) => setSelectedDocId(e.target.value)} disabled={false}>
              {docs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-extrabold text-slate-900">File</div>
            <div className="mt-1 text-xs text-slate-600">
              Accepted: PDF / JPG / PNG. This is demo only (no server upload yet).
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={pickFile}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
              >
                <Upload className="h-4 w-4" />
                Choose File
              </button>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {pendingFile ? (
                  <span className="font-semibold">{pendingFile.name}</span>
                ) : (
                  <span className="text-slate-500">No file selected</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setUploadOpen(false)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              type="button"
              disabled={!pendingFile}
              onClick={commitUpload}
              className={cx(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold text-white transition",
                pendingFile ? "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700" : "bg-emerald-300 cursor-not-allowed"
              )}
            >
              <Save className="h-4 w-4" />
              Upload
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto w-full max-w-6xl space-y-6">
        
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start gap-6">
              
              <div className="relative shrink-0">
                <img
                  src={driver.avatar}
                  alt="Driver"
                  className="h-20 w-20 rounded-2xl object-cover border border-slate-200"
                />
                <span className="absolute -right-2 -bottom-2 h-10 w-10 rounded-2xl bg-emerald-500 text-white grid place-items-center font-extrabold shadow-md">
                  {initials.toLowerCase()}
                </span>
              </div>

              
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10">
                  <StatItem label="Username" value={driver.username} />
                  <StatItem label="SFD" value={driver.sfd} />
                  <StatItem label="Driver Name" value={driver.name} />
                  <StatItem label="Driver Number" value={driver.driverNumber} />
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10">
                  <StatItem
                    label="Account Status"
                    value={driver.accountStatus}
                    accent
                    statusDot={driver.accountStatus === "Active" ? "bg-emerald-500" : "bg-rose-500"}
                  />
                  <StatItem label="Suspended" value={driver.suspended} />
                  <StatItem label="Ceased" value={driver.ceased} />
                  <div className="flex items-start lg:justify-end">
                    {driver.verified ? (
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-extrabold text-slate-700 border border-slate-200">
                        Not verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-7 h-px bg-slate-200" />

            <div className="text-center">
              <div className="text-xl font-extrabold text-slate-900">{driver.name}</div>
              <div className="mt-2">
                <StarsRow value={driver.rating} />
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title="Personal Information"
            right={
              editingPI ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={cancelPI}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={savePI}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-extrabold text-white hover:bg-emerald-600 active:bg-emerald-700 transition"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingPI(true)}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 hover:text-emerald-800"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              )
            }
          >
            <div className="space-y-6">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={editingPI ? piDraft.name : driver.name}
                  disabled={!editingPI}
                  onChange={(e) => setPiDraft((p) => ({ ...p, name: e.target.value }))}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={editingPI ? piDraft.email : driver.email}
                  disabled={!editingPI}
                  onChange={(e) => setPiDraft((p) => ({ ...p, email: e.target.value }))}
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={editingPI ? piDraft.phone : driver.phone}
                  disabled={!editingPI}
                  onChange={(e) => setPiDraft((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          <Card
            title="Vehicle Details"
            right={
              editingVehicle ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={cancelVehicle}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveVehicle}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-extrabold text-white hover:bg-emerald-600 active:bg-emerald-700 transition"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingVehicle(true)}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 hover:text-emerald-800"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              )
            }
          >
            {!editingVehicle ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VehicleTile label="Type">
                  <span className="inline-flex items-center gap-2">
                    <Bike className="h-4 w-4 text-emerald-600" />
                    {driver.vehicle.type}
                  </span>
                </VehicleTile>
                <VehicleTile label="Model">{driver.vehicle.model}</VehicleTile>
                <VehicleTile label="Plate Number">{driver.vehicle.plate}</VehicleTile>
                <VehicleTile label="Color">
                  <span className="inline-flex items-center gap-2">
                    <span className={cx("h-3 w-3 rounded-full", colorDotClass)} />
                    {driver.vehicle.color}
                  </span>
                </VehicleTile>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={vehDraft.type} onChange={(e) => setVehDraft((v) => ({ ...v, type: e.target.value }))}>
                      <option>Motorcycle</option>
                      <option>Bicycle</option>
                      <option>Car</option>
                      <option>Scooter</option>
                    </Select>
                  </div>

                  <div>
                    <Label>Model</Label>
                    <Input
                      value={vehDraft.model}
                      onChange={(e) => setVehDraft((v) => ({ ...v, model: e.target.value }))}
                      disabled={false}
                      placeholder="e.g. Honda PCX"
                    />
                  </div>

                  <div>
                    <Label>Plate Number</Label>
                    <Input
                      value={vehDraft.plate}
                      onChange={(e) => setVehDraft((v) => ({ ...v, plate: e.target.value }))}
                      disabled={false}
                      placeholder="e.g. ABC-1234"
                    />
                  </div>

                  <div>
                    <Label>Color</Label>
                    <Select value={vehDraft.color} onChange={(e) => setVehDraft((v) => ({ ...v, color: e.target.value }))}>
                      {Object.keys(COLOR_SWATCH).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      <span className={cx("h-3 w-3 rounded-full", colorDotClassDraft)} />
                      Preview
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800 flex items-start gap-3">
                  <Info className="h-4 w-4 mt-0.5" />
                  Vehicle changes will be saved only when you click <b>Save</b>.
                </div>
              </div>
            )}
          </Card>
        </div>

        
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="px-8 py-6 flex items-center justify-between gap-3">
            <div className="text-xl font-extrabold text-slate-900">Documents</div>
            <button
              type="button"
              onClick={() => startUpload("dl")}
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-600 active:bg-emerald-700 transition"
            >
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </div>

          <div className="px-8 pb-8 space-y-4">
            {docs.map((d) => (
              <DocRow
                key={d.id}
                title={d.title}
                date={d.date}
                status={d.status}
                hasFile={!!d.fileUrl}
                fileName={d.fileName}
                onDownload={() => downloadDoc(d)}
                onReplace={() => startUpload(d.id)}
              />
            ))}

            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 flex items-center gap-3 text-sm text-blue-800">
              <Info className="h-4 w-4" />
              Your documents are reviewed by admin. New uploads are marked <b>Pending</b> automatically.
            </div>

            <button
              type="button"
              onClick={() => startUpload(selectedDocId)}
              className="w-full rounded-2xl bg-emerald-500 py-4 text-sm font-extrabold text-white hover:bg-emerald-600 active:bg-emerald-700 transition inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <Upload className="h-4 w-4" />
              Upload New Document
            </button>

            <div className="text-xs text-slate-500">
              Demo behavior: uploads are stored in-memory using <code>URL.createObjectURL</code>. To make it real,
              replace <code>commitUpload()</code> with an API upload (Laravel/S3/etc) and store returned file URL + status.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}