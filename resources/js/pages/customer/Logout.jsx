import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, X, ShieldAlert } from "lucide-react";

export default function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const panelRef = useRef(null);

  
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    
  }, [open]);

  
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  const handleConfirm = () => {
    
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    setOpen(false);
    navigate(-1);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* backdrop */}
      <button
        type="button"
        onClick={handleCancel}
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close logout dialog"
      />

      
      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center p-0 sm:p-4">
        <div
          ref={panelRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className={[
            "relative w-full bg-white shadow-xl outline-none border border-slate-100",
            "rounded-t-3xl sm:rounded-3xl",
            "max-h-[92vh] sm:max-h-[85vh]",
            "sm:w-full sm:max-w-md",
            "p-4 sm:p-6",
          ].join(" ")}
        >
          
          <div className="sm:hidden mb-3 flex justify-center">
            <div className="h-1.5 w-10 rounded-full bg-slate-200" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-6 w-6 text-rose-600" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Log out?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  You’ll be signed out of your account on this device.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 shrink-0"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
