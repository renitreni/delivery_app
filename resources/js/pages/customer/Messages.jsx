import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, Search } from "lucide-react";

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
    messages: [{ id: "m1", from: "them", text: "I am arriving in 2 minutes", at: "12:38 PM" }],
  },
  {
    id: "c2",
    name: "Burger King",
    role: "Restaurant",
    time: "12:10 PM",
    unread: true,
    preview: "Sorry, we are out of onion rings. Can we…",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Sorry, we are out of onion rings. Can we replace it with fries?",
        at: "12:10 PM",
      },
    ],
  },
  {
    id: "c3",
    name: "Customer Support",
    role: "Support",
    time: "Yesterday",
    unread: false,
    preview: "Your refund has been processed.",
    messages: [{ id: "m1", from: "them", text: "Your refund has been processed.", at: "Yesterday" }],
  },
];

const Badge = ({ children }) => (
  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
    {children}
  </span>
);

const Bubble = ({ from, text, at }) => {
  const mine = from === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[86%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-sm",
          mine
            ? "bg-emerald-600 text-white rounded-br-md"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-md",
        ].join(" ")}
      >
        <div className="whitespace-pre-wrap break-words">{text}</div>
        <div className={`mt-2 text-[11px] ${mine ? "text-white/80" : "text-slate-400"}`}>{at}</div>
      </div>
    </div>
  );
};

export default function MessagesPage() {
  const [convos, setConvos] = useState(() => seedConvos.map((c) => ({ ...c, avatar: avatarUrl(c.id) })));
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const active = useMemo(() => convos.find((c) => c.id === activeId) || null, [convos, activeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return convos;
    return convos.filter((c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q));
  }, [convos, query]);

  const listEndRef = useRef(null);


  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages?.length, activeId]);

  const openConversation = (id) => {
    setActiveId(id);
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };

  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;

    const now = new Date();
    const at = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setConvos((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              time: at,
              preview: text,
              messages: [...c.messages, { id: `${Date.now()}`, from: "me", text, at }],
            }
          : c
      )
    );

    setDraft("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] min-h-0 rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col">
      
      <div className="flex-1 min-h-0">
        
        <div className={activeId ? "hidden" : "block md:hidden h-full"}>
          <aside className="h-full bg-white flex flex-col min-h-0">
            <div className="p-4">
              <h2 className="text-sm font-extrabold text-slate-900">Conversations</h2>

              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <div className="px-2 pb-3 overflow-auto flex-1 min-h-0">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openConversation(c.id)}
                  className="w-full text-left rounded-2xl px-3 py-3 transition border bg-white border-transparent hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="h-11 w-11 rounded-full border border-slate-200 bg-white"
                      />
                      {c.unread ? <span className="absolute -left-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" /> : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-extrabold text-slate-900 truncate text-sm">{c.name}</div>
                          <div className="mt-1">
                            <Badge>{c.role}</Badge>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-400 whitespace-nowrap">{c.time}</div>
                      </div>
                      <div className="mt-2 text-xs text-slate-500 truncate">{c.preview}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>

        
        <div className={activeId ? "block md:hidden h-full" : "hidden"}>
          <section className="h-full bg-slate-50 flex flex-col min-h-0">
            {!active ? (
              <div className="flex-1 min-h-0 grid place-items-center p-8">
                <div className="text-center">
                  <div className="text-sm font-extrabold text-slate-900">Select a conversation</div>
                  <div className="mt-2 text-sm text-slate-500">Choose a thread from the list to start chatting.</div>
                </div>
              </div>
            ) : (
              <>
                
                <div className="shrink-0 bg-white border-b border-slate-200">
                  <div className="h-16 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => setActiveId(null)}
                        className="rounded-lg p-2 hover:bg-slate-100"
                        title="Back"
                      >
                        ←
                      </button>

                      <img
                        src={active.avatar}
                        alt={active.name}
                        className="h-10 w-10 rounded-full border border-slate-200 bg-white"
                      />

                      <div className="leading-tight min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 truncate">{active.name}</div>
                        <div className="mt-1">
                          <Badge>{active.role}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 whitespace-nowrap">{active.time}</div>
                  </div>
                </div>

                
                <div className="flex-1 min-h-0 overflow-auto p-4 space-y-4">
                  {active.messages.map((m) => (
                    <Bubble key={m.id} from={m.from} text={m.text} at={m.at} />
                  ))}
                  <div ref={listEndRef} />
                </div>

                
                <div className="shrink-0 bg-white border-t border-slate-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={onKeyDown}
                      rows={1}
                      placeholder="Type a message..."
                      className="flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <button
                      type="button"
                      onClick={send}
                      disabled={!draft.trim()}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                      <span className="hidden xs:inline">Send</span>
                    </button>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400">
                    Press <span className="font-semibold">Enter</span> to send,{" "}
                    <span className="font-semibold">Shift+Enter</span> for new line.
                  </div>
                </div>
              </>
            )}
          </section>
        </div>

        
        <div className="hidden md:grid grid-cols-12 h-full min-h-0">
          {/* LEFT */}
          <aside className="col-span-4 lg:col-span-3 border-r border-slate-200 bg-white flex flex-col min-h-0">
            <div className="p-4">
              <h2 className="text-sm font-extrabold text-slate-900">Conversations</h2>

              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <div className="px-2 pb-3 overflow-auto flex-1 min-h-0">
              {filtered.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => openConversation(c.id)}
                    className={[
                      "w-full text-left rounded-2xl px-3 py-3 transition border",
                      isActive ? "bg-emerald-50 border-emerald-100" : "bg-white border-transparent hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-11 w-11 rounded-full border border-slate-200 bg-white"
                        />
                        {c.unread ? <span className="absolute -left-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" /> : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-900 truncate text-sm">{c.name}</div>
                            <div className="mt-1">
                              <Badge>{c.role}</Badge>
                            </div>
                          </div>
                          <div className="text-[11px] text-slate-400 whitespace-nowrap">{c.time}</div>
                        </div>

                        <div className="mt-2 text-xs text-slate-500 truncate">{c.preview}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          
          <section className="col-span-8 lg:col-span-9 bg-slate-50 flex flex-col min-h-0">
            {!active ? (
              <div className="flex-1 min-h-0 grid place-items-center p-8">
                <div className="text-center">
                  <div className="text-sm font-extrabold text-slate-900">Select a conversation</div>
                  <div className="mt-2 text-sm text-slate-500">Choose a thread from the list to start chatting.</div>
                </div>
              </div>
            ) : (
              <>
                
                <div className="shrink-0 bg-white border-b border-slate-200">
                  <div className="h-16 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={active.avatar}
                        alt={active.name}
                        className="h-10 w-10 rounded-full border border-slate-200 bg-white"
                      />
                      <div className="leading-tight min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 truncate">{active.name}</div>
                        <div className="mt-1">
                          <Badge>{active.role}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{active.time}</div>
                  </div>
                </div>

                
                <div className="flex-1 min-h-0 overflow-auto p-6 space-y-4">
                  {active.messages.map((m) => (
                    <Bubble key={m.id} from={m.from} text={m.text} at={m.at} />
                  ))}
                  <div ref={listEndRef} />
                </div>

                
                <div className="shrink-0 bg-white border-t border-slate-200 p-4">
                  <div className="flex items-end gap-3">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={onKeyDown}
                      rows={1}
                      placeholder="Type a message..."
                      className="flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <button
                      type="button"
                      onClick={send}
                      disabled={!draft.trim()}
                      className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </button>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400">
                    Press <span className="font-semibold">Enter</span> to send,{" "}
                    <span className="font-semibold">Shift+Enter</span> for new line.
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
