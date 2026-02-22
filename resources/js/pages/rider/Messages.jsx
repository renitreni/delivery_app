import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Send, PhoneCall, Info, CheckCheck } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const avatarUrl = (seed) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

const seedConvos = [
  {
    id: "c1",
    name: "Mike Rider",
    role: "Rider",
    time: "12:38 PM",
    unread: true,
    preview: "I am arriving in 2 minutes",
    messages: [
      { id: "m1", from: "them", text: "I am arriving in 2 minutes", at: "12:38 PM" },
      { id: "m2", from: "me", text: "Okay, I’ll be ready. Thanks!", at: "12:39 PM" },
    ],
  },
  {
    id: "c2",
    name: "Burger King",
    role: "Restaurant",
    time: "12:10 PM",
    unread: true,
    preview: "Sorry, we are out of onion rings. Can we…",
    messages: [
      { id: "m1", from: "them", text: "Sorry, we are out of onion rings. Can we replace it with fries?", at: "12:10 PM" },
      { id: "m2", from: "me", text: "Yes, fries is fine. Thanks!", at: "12:11 PM" },
    ],
  },
  {
    id: "c3",
    name: "Customer Support",
    role: "Support",
    time: "Yesterday",
    unread: false,
    preview: "Your refund has been processed.",
    messages: [
      { id: "m1", from: "them", text: "Your refund has been processed.", at: "Yesterday" },
      { id: "m2", from: "me", text: "Thank you!", at: "Yesterday" },
    ],
  },
];

function Pill({ children, tone = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-extrabold", map[tone])}>
      {children}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="text-center">
        <div className="text-lg font-extrabold text-slate-900">Select a conversation</div>
        <div className="mt-1 text-sm text-slate-500">
          Choose a thread from the list to start chatting.
        </div>
      </div>
    </div>
  );
}

function Bubble({ from, text, at }) {
  const me = from === "me";
  return (
    <div className={cx("flex", me ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm border",
          me
            ? "bg-emerald-500 text-white border-emerald-600/20 rounded-br-md"
            : "bg-white text-slate-800 border-slate-200 rounded-bl-md"
        )}
      >
        <div className="whitespace-pre-wrap">{text}</div>
        <div className={cx("mt-1 text-[10px] font-semibold opacity-80", me ? "text-emerald-50" : "text-slate-400")}>
          {at} {me ? <CheckCheck className="inline-block h-3 w-3 ml-1 -mt-0.5" /> : null}
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [query, setQuery] = useState("");
  const [convos, setConvos] = useState(seedConvos);
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return convos;
    return convos.filter((c) => (c.name + " " + c.role).toLowerCase().includes(q));
  }, [query, convos]);

  const active = useMemo(() => convos.find((c) => c.id === activeId) || null, [convos, activeId]);

  // mark active as read
  useEffect(() => {
    if (!activeId) return;
    setConvos((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, unread: false } : c))
    );
  }, [activeId]);

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active?.messages?.length]);

  const send = () => {
    const text = draft.trim();
    if (!text || !activeId) return;

    setConvos((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const next = {
          ...c,
          time: "Now",
          preview: text,
          messages: [...c.messages, { id: "m" + Math.random(), from: "me", text, at: "Now" }],
        };
        return next;
      })
    );

    setDraft("");
  };

  const roleTone = (role) => {
    if (role === "Rider") return "emerald";
    if (role === "Restaurant") return "rose";
    if (role === "Support") return "blue";
    return "slate";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 py-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="h-[72vh] min-h-[520px] rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[320px_1fr]">
          {/* LEFT: conversations */}
          <aside className="border-r border-slate-200 bg-white">
            <div className="p-4 border-b border-slate-100">
              <div className="text-sm font-extrabold text-slate-900">Conversations</div>

              <div className="mt-3 relative">
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-10 rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                />
              </div>
            </div>

            <div className="p-2 overflow-auto h-[calc(72vh-73px)] min-h-[447px]">
              {list.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cx(
                    "w-full text-left rounded-2xl p-3 transition border",
                    activeId === c.id
                      ? "bg-emerald-50 border-emerald-100"
                      : "bg-white border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={avatarUrl(c.name)}
                      alt={c.name}
                      className="h-10 w-10 rounded-full bg-slate-200 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-extrabold text-slate-900 truncate">
                          {c.name}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-400">
                          {c.time}
                        </div>
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-2">
                        <Pill tone={roleTone(c.role)}>{c.role}</Pill>
                        {c.unread ? (
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                        ) : null}
                      </div>

                      <div className="mt-2 text-sm text-slate-500 truncate">
                        {c.preview}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

           
          <section className="bg-slate-50/40">
            {!active ? (
              <EmptyState />
            ) : (
              <div className="h-full flex flex-col">
                {/* chat header */}
                <div className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={avatarUrl(active.name)}
                      alt={active.name}
                      className="h-9 w-9 rounded-full bg-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900 truncate">
                        {active.name}
                      </div>
                      <div className="mt-0.5">
                        <Pill tone={roleTone(active.role)}>{active.role}</Pill>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="h-10 w-10 rounded-2xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50">
                      <PhoneCall className="h-4 w-4 text-slate-700" />
                    </button>
                    <button className="h-10 w-10 rounded-2xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50">
                      <Info className="h-4 w-4 text-slate-700" />
                    </button>
                  </div>
                </div>

                
                <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-3">
                  {active.messages.map((m) => (
                    <Bubble key={m.id} from={m.from} text={m.text} at={m.at} />
                  ))}
                  <div ref={endRef} />
                </div>

                
                <div className="p-4 sm:p-6 bg-white border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") send();
                      }}
                      placeholder="Type a message..."
                      className="flex-1 h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                    />
                    <button
                      type="button"
                      onClick={send}
                      className="h-12 px-4 rounded-2xl bg-emerald-500 text-white font-extrabold hover:bg-emerald-600 active:bg-emerald-700 transition inline-flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
