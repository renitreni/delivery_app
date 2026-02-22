// resources/js/pages/Restaurant/Reviews.jsx
import React from "react";
import { Star, Send } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const SEED_REVIEWS = [
  {
    id: "r1",
    name: "John Amores",
    ago: "2 days ago",
    rating: 5,
    text: "Amazing food and fast delivery!",
    reply: { text: "Thank you John!", ago: "1 day ago" },
  },
  {
    id: "r2",
    name: "Keith Pelonio",
    ago: "1 week ago",
    rating: 4,
    text: "Good but fries were a bit cold.",
    reply: null,
  },
  {
    id: "r3",
    name: "Maria L.",
    ago: "2 weeks ago",
    rating: 5,
    text: "Super sarap! Will order again.",
    reply: null,
  },
  {
    id: "r4",
    name: "Ken P.",
    ago: "3 weeks ago",
    rating: 3,
    text: "Okay lang. Packaging could be better.",
    reply: null,
  },
];

function Avatar({ name }) {
  const letter = (name || "?").trim()[0]?.toUpperCase() || "?";
  return (
    <div className="h-11 w-11 rounded-full bg-slate-100 grid place-items-center text-slate-600 font-extrabold">
      {letter}
    </div>
  );
}

function Stars({ value, size = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < Number(value || 0);
        return (
          <Star
            key={i}
            className={cx(size, on ? "fill-amber-400 text-amber-400" : "text-slate-300")}
          />
        );
      })}
    </div>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function RatingBar({ star, count, total }) {
  const pct = total ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 text-xs font-semibold text-slate-600">{star}</div>
      <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full bg-amber-400" style={{ width: `${clamp(pct, 0, 100)}%` }} />
      </div>
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = React.useState(SEED_REVIEWS);
  const [replyingId, setReplyingId] = React.useState(null);
  const [draft, setDraft] = React.useState("");

  const total = reviews.length;

  const avg = React.useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((a, r) => a + Number(r.rating || 0), 0);
    return sum / reviews.length;
  }, [reviews]);

  const dist = React.useMemo(() => {
    const d = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of reviews) d[r.rating] = (d[r.rating] || 0) + 1;
    return d;
  }, [reviews]);

  const openReply = (id) => {
    setReplyingId(id);
    setDraft("");
  };

  const submitReply = () => {
    const text = draft.trim();
    if (!replyingId) return;
    if (!text) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyingId
          ? { ...r, reply: { text, ago: "Just now" } }
          : r
      )
    );

    setReplyingId(null);
    setDraft("");
  };

  return (
    <div className="space-y-5">
      
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
          
          <div className="lg:col-span-3">
            <div className="text-4xl font-extrabold text-slate-900">
              {avg ? avg.toFixed(1) : "0.0"}
            </div>
            <div className="mt-2">
              <Stars value={Math.round(avg)} size="h-5 w-5" />
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Based on {total} reviews
            </div>
          </div>

          
          <div className="lg:col-span-9 space-y-2">
            <RatingBar star={5} count={dist[5]} total={total} />
            <RatingBar star={4} count={dist[4]} total={total} />
            <RatingBar star={3} count={dist[3]} total={total} />
            <RatingBar star={2} count={dist[2]} total={total} />
            <RatingBar star={1} count={dist[1]} total={total} />
          </div>
        </div>
      </section>

      
      <div className="space-y-4">
        {reviews.map((r) => (
          <section
            key={r.id}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar name={r.name} />
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {r.name}
                    </div>
                    <div className="text-xs text-slate-500">{r.ago}</div>
                  </div>
                </div>

                <Stars value={r.rating} />
              </div>

              <div className="mt-4 text-sm text-slate-700">{r.text}</div>

              {/* Reply block */}
              {r.reply ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-extrabold text-emerald-700">
                      Your Reply
                    </div>
                    <div className="text-[11px] text-slate-500">{r.reply.ago}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-700">{r.reply.text}</div>
                </div>
              ) : null}

              {/* Reply action */}
              {!r.reply ? (
                <div className="mt-4">
                  {replyingId !== r.id ? (
                    <button
                      type="button"
                      onClick={() => openReply(r.id)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      Reply
                    </button>
                  ) : (
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="flex items-center gap-2">
                        <input
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Write your reply…"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        />
                        <button
                          type="button"
                          onClick={submitReply}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                          <Send className="h-4 w-4" />
                          Send
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingId(null);
                            setDraft("");
                          }}
                          className="text-xs font-bold text-slate-500 hover:text-slate-700"
                        >
                          Cancel
                        </button>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">
                          Demo: reply saves locally
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
