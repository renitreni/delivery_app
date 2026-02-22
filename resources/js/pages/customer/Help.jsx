import React, { useMemo, useState, useEffect } from "react";
import { Mail, MessageCircle, Phone, ChevronDown } from "lucide-react";

export default function Support() {
  const faqs = useMemo(
    () => [
      {
        q: "How do I track my order?",
        a: "Go to Order > My Orders, then click the order you want to track. You’ll see the current delivery status and tracking updates.",
      },
      {
        q: "Can I cancel my order?",
        a: "Yes if the order is not yet shipped. Go to Order > My Orders, select the order, and click Cancel. If it’s already shipped, cancellation may not be available.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Cash on Delivery, Credit/Debit Cards (Visa/Mastercard), and supported wallets like Apple Pay (depending on your device/region).",
      },
      {
        q: "How do I change my address?",
        a: "Go to Addresses, select the address you want to update, then click Edit. Save your changes and set it as default if needed.",
      },
      {
        q: "My order is late, what should I do?",
        a: "First, check your tracking status in Order > My Orders. If there’s no update for 24 hours, contact support via Email Support or Live Chat so we can help.",
      },
      {
        q: "Do you offer contactless delivery?",
        a: "Yes. When placing an order, choose contactless delivery if available, or add a note like “Leave at the door.” Availability depends on the courier.",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex((prev) => (prev === index ? null : index));

  
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 sm:px-6 py-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <div className="text-lg font-extrabold text-gray-900">Support</div>
            <div className="text-sm text-gray-500">We’re here to help you.</div>
          </div>
        </div>

        
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <SupportCard
            icon={<Mail className="h-5 w-5 text-emerald-600" />}
            iconBg="bg-emerald-100"
            title="Email Support"
            subtitle="Get a response within 24h"
            onClick={() => alert("Email Support clicked (connect your email flow here).")}
          />
          <SupportCard
            icon={<MessageCircle className="h-5 w-5 text-emerald-600" />}
            iconBg="bg-emerald-100"
            title="Live Chat"
            subtitle="Talk to an agent now"
            onClick={() => alert("Live Chat clicked (open chat widget here).")}
          />
          <SupportCard
            icon={<Phone className="h-5 w-5 text-blue-600" />}
            iconBg="bg-blue-100"
            title="Call Us"
            subtitle="Available 9AM - 9PM"
            onClick={() => alert("Call Us clicked (show phone number here).")}
          />
        </div>

        
        <div className="mt-8">
          <h2 className="text-base sm:text-lg font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-1 text-sm text-gray-500">Tap a question to see the answer.</p>

          <div className="mt-4 space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className={[
                    "w-full text-left rounded-2xl bg-white border border-gray-200 shadow-sm",
                    "px-4 sm:px-5 py-4 transition",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-200",
                    isOpen ? "ring-2 ring-emerald-100 border-emerald-200" : "hover:bg-gray-50",
                  ].join(" ")}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{item.q}</p>

                    <ChevronDown
                      className={[
                        "h-5 w-5 text-gray-400 transition-transform shrink-0",
                        isOpen ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  </div>

                  
                  <div
                    className={[
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr] mt-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportCard({ icon, iconBg, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl bg-white border border-gray-200 shadow-sm",
        "p-4 sm:p-5 text-left hover:bg-gray-50 transition",
        "flex items-center gap-4",
        "focus:outline-none focus:ring-2 focus:ring-emerald-200",
      ].join(" ")}
    >
      <div
        className={[
          "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
          iconBg,
        ].join(" ")}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
      </div>
    </button>
  );
}
