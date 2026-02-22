import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Clock3,
  MapPin,
  Truck,
  ArrowLeft,
  Phone,
  ExternalLink,
  X,
  Minus,
  Plus,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const SectionTitle = ({ children }) => (
  <div className="text-sm font-extrabold text-slate-900">{children}</div>
);

const Chip = ({ children }) => (
  <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
    {children}
  </span>
);

const TabBtn = ({ active, children, onClick, badge }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      "relative px-3 sm:px-4 py-2 text-sm font-semibold",
      active ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
    )}
  >
    <span className="inline-flex items-center gap-2">
      {children}
      {typeof badge === "number" ? (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-emerald-100 px-2 text-[11px] font-bold text-emerald-700">
          {badge}
        </span>
      ) : null}
    </span>
    {active ? <span className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-emerald-500" /> : null}
  </button>
);

const MenuItemRow = ({ item, onAdd }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
    <div className="min-w-0">
      <div className="text-sm font-extrabold text-slate-900">{item.name}</div>
      {item.desc ? <div className="mt-1 text-xs text-slate-600">{item.desc}</div> : null}
      <div className="mt-2 text-sm font-bold text-slate-900">${item.price.toFixed(2)}</div>
    </div>

    <div className="flex items-center justify-between sm:justify-end gap-3">
      {item.img ? (
        <img
          src={item.img}
          alt={item.name}
          className="h-14 w-16 rounded-xl object-cover border border-slate-200"
        />
      ) : null}

      <button
        type="button"
        onClick={() => onAdd(item)}
        className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 grid place-items-center"
        title="Add"
      >
        <span className="text-lg leading-none font-bold text-emerald-600">+</span>
      </button>
    </div>
  </div>
);

const RatingBar = ({ star, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 text-xs font-semibold text-slate-600">{star}</div>
    <div className="h-2 flex-1 rounded-full bg-slate-200 overflow-hidden">
      <div className="h-full bg-amber-400" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const ReviewCard = ({ r }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm font-extrabold text-slate-900 truncate">{r.name}</div>
      <div className="shrink-0 inline-flex items-center gap-1 text-sm font-bold text-amber-600">
        <Star className="h-4 w-4" /> {r.rating.toFixed(1)}
      </div>
    </div>
    <div className="mt-2 text-xs text-slate-600">{r.text}</div>

    {r.reply ? (
      <div className="mt-3 rounded-2xl bg-slate-50 p-3">
        <div className="text-xs font-extrabold text-slate-800">{r.reply.title}</div>
        <div className="mt-1 text-xs text-slate-600">{r.reply.text}</div>
      </div>
    ) : null}
  </div>
);

function TrackingDemoModal({ open, onClose, restaurantName = "Restaurant" }) {
  const steps = [
    { key: "placed", title: "Order placed", sub: "We sent your order to the restaurant." },
    { key: "prep", title: "Preparing", sub: "Restaurant is preparing your food." },
    { key: "rider", title: "Finding rider", sub: "Searching for a rider near you." },
    { key: "pickup", title: "Picked up", sub: "Rider picked up your order." },
    { key: "deliver", title: "Delivered", sub: "Order delivered. Enjoy!" },
  ];

  const rider = {
    name: "Mike Rider",
    plate: "ABC 1234",
    bike: "Honda Click 125i",
    phone: "+63 912 345 6789",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=60",
  };

  const [step, setStep] = useState(0);
  const [eta, setEta] = useState(18);
  const [orderId] = useState(() => `ORD-${Math.floor(100000 + Math.random() * 900000)}`);

  useEffect(() => {
    if (!open) return;

    setStep(0);
    setEta(18);

    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 3200);
    const t3 = setTimeout(() => setStep(3), 6200);
    const t4 = setTimeout(() => setStep(4), 12000);

    const countdown = setInterval(() => setEta((e) => (e > 0 ? e - 1 : 0)), 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(countdown);
    };
  }, [open]);

  if (!open) return null;

  const progress = Math.round((step / (steps.length - 1)) * 100);
  const done = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-3 sm:p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl max-h-[92vh] flex flex-col">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-extrabold text-slate-900">Order Tracking</div>
            <div className="mt-1 text-xs text-slate-500 truncate">
              {restaurantName} • <span className="font-semibold">{orderId}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 hover:bg-slate-50 shrink-0"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <div className="relative h-48 sm:h-56 w-full">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                <div className="absolute left-4 sm:left-6 top-4 sm:top-8 flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 shadow">
                  📍 Restaurant
                </div>
                <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-8 flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 shadow">
                  🏠 You
                </div>

                {!done ? (
                  <div
                    className="absolute left-8 sm:left-10 top-24 sm:top-28 h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.25)]"
                    style={{ animation: "moveDot 3s ease-in-out infinite" }}
                    title="Rider"
                  />
                ) : (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-extrabold text-white shadow">
                    Delivered ✅
                  </div>
                )}

                <style>{`
                  @keyframes moveDot {
                    0% { transform: translate(0,0); }
                    50% { transform: translate(170px, 35px); }
                    100% { transform: translate(0,0); }
                  }
                  @media (min-width: 1024px){
                    @keyframes moveDot {
                      0% { transform: translate(0,0); }
                      50% { transform: translate(220px, 40px); }
                      100% { transform: translate(0,0); }
                    }
                  }
                `}</style>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="text-xs font-bold text-slate-500">Estimated Arrival</div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                {done ? "0" : eta} <span className="text-base font-bold text-slate-500">min</span>
              </div>

              <div className="mt-4 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-3 text-xs text-slate-600">
                Status: <span className="font-bold text-slate-900">{steps[step].title}</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">{steps[step].sub}</div>

              {step >= 2 && !done ? (
                <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rider.avatar}
                      alt="Rider"
                      className="h-10 w-10 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-slate-900 truncate">{rider.name}</div>
                      <div className="text-xs text-slate-600">
                        {rider.bike} • {rider.plate}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-900 hover:bg-slate-50"
                      onClick={() => alert(`Calling ${rider.phone} (demo)`)}
                    >
                      Call Rider
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-600"
                      onClick={() => alert("Opening chat (demo)")}
                    >
                      Message
                    </button>
                  </div>
                </div>
              ) : null}

              {done ? (
                <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700">
                  Order completed ✅ Thank you!
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-900">Progress</div>
              <div className="text-xs font-bold text-slate-500">{progress}%</div>
            </div>

            <div className="mt-4 space-y-3">
              {steps.map((s, i) => {
                const active = i === step;
                const complete = i < step;

                return (
                  <div
                    key={s.key}
                    className={cx(
                      "rounded-2xl border p-4 transition",
                      complete
                        ? "border-emerald-200 bg-emerald-50"
                        : active
                        ? "border-slate-200 bg-white"
                        : "border-slate-200 bg-white/70"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div
                          className={cx(
                            "text-sm font-extrabold",
                            complete ? "text-emerald-800" : "text-slate-900"
                          )}
                        >
                          {s.title}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">{s.sub}</div>
                      </div>

                      {complete ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                      ) : active ? (
                        <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
                      ) : (
                        <div className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDrawer({ open, onClose, restaurant, cart, onAdd, onDec, onRemove, onCheckout }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const items = Object.values(cart);
  const subtotal = items.reduce((sum, x) => sum + x.price * x.qty, 0);
  const delivery = restaurant?.deliveryFee ?? 0;
  const total = subtotal + (items.length ? delivery : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg font-extrabold text-slate-900">Your Order</div>
                <div className="mt-1 text-xs text-slate-500 truncate">
                  {restaurant?.name} • Delivery fee ${(restaurant?.deliveryFee ?? 0).toFixed(2)}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 hover:bg-slate-50 shrink-0"
                title="Close"
              >
                <X className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 sm:p-5">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <ShoppingBag className="h-5 w-5" />
                  Cart is empty
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  Add items by clicking the <b>+</b> button from the menu.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.key} className="rounded-3xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 truncate">{it.name}</div>
                        <div className="mt-1 text-xs text-slate-600">${it.price.toFixed(2)} each</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(it.key)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 shrink-0"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1">
                        <button
                          type="button"
                          onClick={() => onDec(it.key)}
                          className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-50"
                          title="Decrease"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="w-8 text-center text-sm font-extrabold text-slate-900">{it.qty}</div>
                        <button
                          type="button"
                          onClick={() => onAdd(it)}
                          className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-50"
                          title="Increase"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-sm font-extrabold text-slate-900">
                        ${(it.price * it.qty).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="text-slate-600">Subtotal</div>
                <div className="font-extrabold text-slate-900">${subtotal.toFixed(2)}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-slate-600">Delivery</div>
                <div className="font-extrabold text-slate-900">
                  ${items.length ? delivery.toFixed(2) : "0.00"}
                </div>
              </div>

              <div className="h-px bg-slate-100 my-2" />

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-600">Total</div>
                <div className="text-xl font-extrabold text-slate-900">${total.toFixed(2)}</div>
              </div>

              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => onCheckout?.()}
                className={cx(
                  "mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold shadow-sm",
                  items.length === 0
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700"
                )}
              >
                <CreditCard className="h-4 w-4" />
                Checkout
              </button>

              <div className="mt-2 text-[11px] text-slate-500">(Demo only)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RESTAURANTS = [
  {
    slug: "burger-king",
    name: "Burger King",
    cover:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=60",
    tags: ["Burgers", "American", "Fast Food"],
    time: "25-30 min",
    rating: 4.5,
    deliveryFee: 1.99,
    promo: "Promo Available",
    openNow: true,
    location: "123 Main St, New York, NY",
    phone: "(555) 123-4567",
    menu: [
      {
        title: "Meals",
        items: [
          {
            name: "Whopper Meal",
            desc: "Flame-grilled beef patty, topped with tomatoes, lettuce, mayo, pickles.",
            price: 9.99,
            img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60",
          },
        ],
      },
      {
        title: "Sides",
        items: [
          {
            name: "Onion Rings",
            desc: "Golden crispy onion rings.",
            price: 3.99,
            img: "https://images.unsplash.com/photo-1604908177097-6f7d1f0f2a4d?auto=format&fit=crop&w=800&q=60",
          },
        ],
      },
    ],
    reviews: {
      count: 1280,
      breakdown: { 5: 72, 4: 18, 3: 6, 2: 3, 1: 1 },
      items: [
        { name: "John Doe", rating: 4.5, text: "Best burgers in town!" },
        { name: "Jane Smith", rating: 4.0, text: "Good food but delivery was slow." },
      ],
    },
    info: {
      hours: [
        { label: "Monday - Friday", value: "10:00 AM - 10:00 PM" },
        { label: "Saturday - Sunday", value: "11:00 AM - 11:00 PM" },
      ],
      more: [{ label: "Address", value: "123 Main St, New York, NY" }],
      mapLink: "#",
    },
  },
  {
    slug: "pizza-hut",
    name: "Pizza Hut",
    cover:
      "https://images.unsplash.com/photo-1548365328-9f547f5963c0?auto=format&fit=crop&w=1600&q=60",
    tags: ["Italian", "Pizza", "Fast Food"],
    time: "30-45 min",
    rating: 4.2,
    deliveryFee: 0.99,
    promo: "Promo Available",
    openNow: true,
    location: "Sample Address",
    phone: "(555) 222-3333",
    menu: [
      { title: "Popular", items: [{ name: "Pepperoni Pizza", desc: "Classic pepperoni.", price: 12.99 }] },
      { title: "Sides", items: [{ name: "Garlic Bread", desc: "Buttery garlic bread.", price: 4.99 }] },
    ],
    reviews: {
      count: 210,
      breakdown: { 5: 55, 4: 25, 3: 12, 2: 5, 1: 3 },
      items: [{ name: "Customer", rating: 4.2, text: "Tasty and affordable." }],
    },
    info: {
      hours: [{ label: "Daily", value: "9:00 AM - 11:00 PM" }],
      more: [{ label: "Min. Order", value: "$12" }],
      mapLink: "#",
    },
  },
];

export default function RestaurantShow() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [tab, setTab] = useState("menu");

  const [cartsBySlug, setCartsBySlug] = useState({});
  const cart = cartsBySlug[slug] || {};

  const [orderOpen, setOrderOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);

  const r = useMemo(() => RESTAURANTS.find((x) => x.slug === slug), [slug]);

  useEffect(() => {
    setTab("menu");
    setOrderOpen(false);
  }, [slug]);

  if (!r) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="text-lg font-extrabold text-slate-900">Restaurant not found</div>
        <div className="mt-2 text-sm text-slate-600">Wrong link. Go back.</div>
        <button
          type="button"
          onClick={() => nav(-1)}
          className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const cartCount = Object.values(cart).reduce((sum, x) => sum + x.qty, 0);
  const subtotal = Object.values(cart).reduce((sum, x) => sum + x.price * x.qty, 0);
  const cartTotal = subtotal + (cartCount ? r.deliveryFee : 0);

  const makeKey = (item) => `${r.slug}::${item.name}`;

  const addToCart = (item) => {
    const key = makeKey(item);
    setCartsBySlug((prev) => {
      const current = prev[slug] || {};
      const existing = current[key];
      return {
        ...prev,
        [slug]: {
          ...current,
          [key]: existing
            ? { ...existing, qty: existing.qty + 1 }
            : { key, name: item.name, price: item.price, qty: 1 },
        },
      };
    });
    setOrderOpen(true);
  };

  const decItem = (key) => {
    setCartsBySlug((prev) => {
      const current = prev[slug] || {};
      const existing = current[key];
      if (!existing) return prev;

      const nextCart = { ...current };
      if (existing.qty <= 1) delete nextCart[key];
      else nextCart[key] = { ...existing, qty: existing.qty - 1 };

      return { ...prev, [slug]: nextCart };
    });
  };

  const removeItem = (key) => {
    setCartsBySlug((prev) => {
      const current = prev[slug] || {};
      const nextCart = { ...current };
      delete nextCart[key];
      return { ...prev, [slug]: nextCart };
    });
  };

  const handleCheckout = () => {
    setOrderOpen(false);
    setTrackingOpen(true);
    setCartsBySlug((prev) => ({ ...prev, [slug]: {} }));
  };

  return (
    <div className="w-full space-y-6 relative pb-28 sm:pb-6">
      <TrackingDemoModal open={trackingOpen} onClose={() => setTrackingOpen(false)} restaurantName={r.name} />

      <OrderDrawer
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        restaurant={r}
        cart={cart}
        onAdd={(it) => addToCart({ name: it.name, price: it.price })}
        onDec={decItem}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />

      <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="relative h-52 sm:h-64 md:h-72 w-full">
          <img src={r.cover} alt={r.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

          <button
            type="button"
            onClick={() => nav(-1)}
            className="absolute left-3 sm:left-4 top-3 sm:top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className="absolute right-3 sm:right-4 top-3 sm:top-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-2 text-sm font-extrabold text-white shadow hover:bg-emerald-600 active:bg-emerald-700"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden xs:inline">Order</span> {cartCount ? `(${cartCount})` : ""}
          </button>

          <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-5 right-4 sm:right-6">
            <div className="text-white text-xl sm:text-2xl font-extrabold">{r.name}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Chip>{r.tags.join(" • ")}</Chip>
              <Chip>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-4 w-4" /> {r.time}
                </span>
              </Chip>
              <Chip>
                <span className="inline-flex items-center gap-1">
                  <Truck className="h-4 w-4" /> ${r.deliveryFee.toFixed(2)} delivery
                </span>
              </Chip>
              {r.promo ? <Chip>{r.promo}</Chip> : null}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white">
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 overflow-x-auto">
            <TabBtn active={tab === "menu"} onClick={() => setTab("menu")}>
              Menu
            </TabBtn>
            <TabBtn
              active={tab === "reviews"}
              onClick={() => setTab("reviews")}
              badge={r.reviews?.items?.length || 0}
            >
              Reviews
            </TabBtn>
            <TabBtn active={tab === "info"} onClick={() => setTab("info")}>
              Info
            </TabBtn>
          </div>
        </div>
      </div>

      {tab === "menu" ? (
        <div className="space-y-6">
          {r.menu.map((section) => (
            <div key={section.title} className="space-y-3">
              <SectionTitle>{section.title}</SectionTitle>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <MenuItemRow key={item.name} item={item} onAdd={addToCart} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "reviews" ? (
        <div className="rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-4xl font-extrabold text-slate-900">{r.rating.toFixed(1)}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </div>
              <div className="mt-2 text-xs text-slate-500">{r.reviews.count} ratings</div>
            </div>

            <div className="flex-1 space-y-2">
              <RatingBar star="5" value={r.reviews.breakdown[5]} />
              <RatingBar star="4" value={r.reviews.breakdown[4]} />
              <RatingBar star="3" value={r.reviews.breakdown[3]} />
              <RatingBar star="2" value={r.reviews.breakdown[2]} />
              <RatingBar star="1" value={r.reviews.breakdown[1]} />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {r.reviews.items.map((rev, idx) => (
              <ReviewCard key={idx} r={rev} />
            ))}
          </div>
        </div>
      ) : null}

      {tab === "info" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <SectionTitle>Location</SectionTitle>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 sm:px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                View on Map <ExternalLink className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="h-44 w-full bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center" />
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-slate-700">
              <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
              <div>
                <div className="font-semibold">{r.location}</div>
                <div className="text-xs text-slate-500">{r.time} • Open now</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
              <SectionTitle>Opening Hours</SectionTitle>
              <div className="mt-4 space-y-3">
                {r.info.hours.map((h) => (
                  <div key={h.label} className="flex items-center justify-between text-sm gap-3">
                    <div className="text-slate-600">{h.label}</div>
                    <div className="font-semibold text-slate-900 text-right">{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
              <SectionTitle>More Info</SectionTitle>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold">{r.phone}</span>
                </div>
                {r.info.more.map((m) => (
                  <div key={m.label} className="flex items-center justify-between text-sm gap-3">
                    <div className="text-slate-600">{m.label}</div>
                    <div className="font-semibold text-slate-900 text-right">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOrderOpen(true)}
        className={cx(
          "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 rounded-2xl shadow-lg",
          "bg-slate-900 text-white hover:bg-slate-800 active:bg-black",
          "px-4 py-3 inline-flex items-center gap-3",
          "max-w-[calc(100vw-2rem)]"
        )}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 shrink-0">
          <ShoppingBag className="h-5 w-5" />
        </span>
        <span className="text-left min-w-0">
          <div className="text-sm font-extrabold truncate">Order {cartCount ? `(${cartCount})` : ""}</div>
          <div className="text-[11px] text-white/80 truncate">${cartTotal.toFixed(2)} • Tap to view</div>
        </span>
      </button>
    </div>
  );
}
