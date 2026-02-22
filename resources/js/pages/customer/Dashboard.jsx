import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Percent,
  Sandwich,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Star,
  Truck,
  MapPin,
  X,
  Sliders,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const PromoCard = ({ tone = "green", kicker, title, subtitle }) => {
  const styles =
    tone === "green"
      ? {
          wrap: "bg-gradient-to-r from-emerald-600 to-emerald-500",
          icon: <Sandwich className="h-24 w-24 sm:h-28 sm:w-28 text-white/15" />,
        }
      : {
          wrap: "bg-gradient-to-r from-indigo-600 to-indigo-500",
          icon: <Percent className="h-24 w-24 sm:h-28 sm:w-28 text-white/15" />,
        };

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl",
        styles.wrap,
        "px-4 sm:px-7 py-5 sm:py-6 text-white"
      )}
    >
      <div className="absolute right-[-18px] top-[-18px] h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white/10" />
      <div className="absolute right-12 sm:right-16 bottom-[-22px] h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/10" />
      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2">
        {styles.icon}
      </div>

      <div className="relative max-w-[560px] pr-24 sm:pr-32">
        <div className="text-[11px] sm:text-xs font-semibold opacity-90">{kicker}</div>
        <h3 className="mt-2 text-xl sm:text-2xl font-extrabold leading-tight">{title}</h3>
        <p className="mt-2 text-sm text-white/90">{subtitle}</p>
      </div>
    </div>
  );
};

const CategoryItem = ({ label, emoji, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      "shrink-0 flex flex-col items-center justify-center gap-1 rounded-xl border bg-white transition",
      "h-[64px] w-[84px] sm:h-[68px] sm:w-[90px]",
      active
        ? "border-emerald-400 shadow-sm"
        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
    )}
  >
    <span className="text-xl leading-none">{emoji}</span>
    <span className="text-[10px] font-semibold text-slate-700">{label}</span>
  </button>
);

const Tag = ({ children }) => (
  <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
    {children}
  </span>
);

const FoodCard = ({
  slug,
  title,
  img,
  tags = [],
  time = "20-30 min",
  rating = "4.6",
  popular = true,
  closed = false,
  delivery = "$1.99 delivery",
  max = "Max 3 mi",
}) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/customer/restaurant/${slug}`)}
      className="text-left w-full"
      aria-label={`Open ${title}`}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
        <div className="relative h-40 sm:h-44 md:h-40 w-full">
          <img src={img} alt={title} className="h-full w-full object-cover" />

          {popular && !closed ? (
            <span className="absolute left-3 sm:left-4 top-3 sm:top-4 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow">
              Popular
            </span>
          ) : null}

          <span className="absolute left-3 sm:left-4 bottom-3 sm:bottom-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow">
            <Clock className="h-3.5 w-3.5" />
            {time}
          </span>

          {closed ? (
            <>
              <div className="absolute inset-0 bg-black/45" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                Closed
              </span>
            </>
          ) : null}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {title}
            </h3>

            <div className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
              <Star className="h-4 w-4" />
              {rating}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[12px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Truck className="h-4 w-4" />
              {delivery}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {max}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close overlay"
      />
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-xl hover:bg-slate-100 grid place-items-center"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
          <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-auto">{children}</div>
          {footer ? (
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-slate-100 bg-white">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const Pill = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      "rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold transition border",
      active
        ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    )}
  >
    {children}
  </button>
);

const RatingPill = ({ active, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      "inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-semibold transition border",
      active
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    )}
  >
    {label} <Star className="h-4 w-4" />
  </button>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={cx(
      "relative inline-flex h-7 w-12 items-center rounded-full transition",
      checked ? "bg-emerald-500" : "bg-slate-200"
    )}
  >
    <span
      className={cx(
        "inline-block h-5 w-5 transform rounded-full bg-white transition",
        checked ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);

function FilterModal({ open, onClose, value, onChange, onApply, onReset }) {
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Filter Restaurants"
      footer={
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="w-full sm:flex-1 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Apply Filters
          </button>
        </div>
      }
    >
      <div className="space-y-7">
        <div className="space-y-3">
          <div className="text-sm font-extrabold text-slate-900">Sort By</div>
          <div className="flex flex-wrap gap-3">
            <Pill active={value.sortBy === "recommended"} onClick={() => set({ sortBy: "recommended" })}>
              Recommended
            </Pill>
            <Pill active={value.sortBy === "topRated"} onClick={() => set({ sortBy: "topRated" })}>
              Top Rated
            </Pill>
            <Pill active={value.sortBy === "fastest"} onClick={() => set({ sortBy: "fastest" })}>
              Fastest
            </Pill>
            <Pill active={value.sortBy === "lowestFee"} onClick={() => set({ sortBy: "lowestFee" })}>
              Lowest Fee
            </Pill>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-extrabold text-slate-900">Rating</div>
          <div className="flex flex-wrap gap-3">
            <RatingPill active={value.minRating === 3} label="3+" onClick={() => set({ minRating: 3 })} />
            <RatingPill active={value.minRating === 4} label="4+" onClick={() => set({ minRating: 4 })} />
            <RatingPill active={value.minRating === 4.5} label="4.5+" onClick={() => set({ minRating: 4.5 })} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-extrabold text-slate-900">Max Delivery Fee</div>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={value.maxFee}
            onChange={(e) => set({ maxFee: Number(e.target.value) })}
            className="w-full accent-emerald-500"
          />
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Free</span>
            <span>${value.maxFee.toFixed(2)}</span>
            <span>$10+</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Open Now</div>
            <Toggle checked={value.openNow} onChange={(v) => set({ openNow: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Has Promo</div>
            <Toggle checked={value.hasPromo} onChange={(v) => set({ hasPromo: v })} />
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function SortModal({ open, onClose, value, onChange, onApply }) {
  const options = [
    { key: "recommended", label: "Recommended" },
    { key: "topRated", label: "Top Rated" },
    { key: "fastest", label: "Fastest" },
    { key: "lowestFee", label: "Lowest Fee" },
  ];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Sort"
      footer={
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            className="w-full sm:flex-1 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Apply
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {options.map((o) => {
          const active = value === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              className={cx(
                "w-full flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Sliders className="h-4 w-4" />
                {o.label}
              </span>
              <span className={cx("h-2.5 w-2.5 rounded-full", active ? "bg-emerald-500" : "bg-slate-200")} />
            </button>
          );
        })}
      </div>
    </ModalShell>
  );
}

export default function Dashboard() {
  const categories = [
    { label: "Burgers", emoji: "🍔" },
    { label: "Pizza", emoji: "🍕" },
    { label: "Sushi", emoji: "🍣" },
    { label: "Asian", emoji: "🍜" },
    { label: "Desserts", emoji: "🧁" },
    { label: "Drinks", emoji: "🥤" },
    { label: "Healthy", emoji: "🥗" },
    { label: "Chicken", emoji: "🍗" },
    { label: "Coffee", emoji: "☕" },
    { label: "Breakfast", emoji: "🥞" },
  ];

  const foods = [
    {
      slug: "burger-king",
      title: "Burger King",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=60",
      tags: ["American", "Burgers", "Fast Food"],
      time: "20-30 min",
      rating: 4.9,
      popular: true,
      delivery: "$1.99 delivery",
      max: "Max 3 mi",
    },
    {
      slug: "sushi-master",
      title: "Sushi Master",
      img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=60",
      tags: ["Japanese", "Sushi", "Healthy"],
      time: "40-55 min",
      rating: 4.8,
      popular: false,
      delivery: "$2.49 delivery",
      max: "Max 5 mi",
    },
    {
      slug: "pizza-hut",
      title: "Pizza Hut",
      img: "https://images.unsplash.com/photo-1548365328-9f547f5963c0?auto=format&fit=crop&w=1400&q=60",
      tags: ["Italian", "Pizza", "Fast Food"],
      time: "30-45 min",
      rating: 4.2,
      popular: true,
      delivery: "$0.99 delivery",
      max: "Max 2 mi",
    },
    {
      slug: "taco-bell",
      title: "Taco Bell",
      img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1400&q=60",
      tags: ["Mexican", "Tacos", "Fast Food"],
      time: "20-30 min",
      rating: 4.0,
      popular: false,
      closed: true,
      delivery: "$1.49 delivery",
      max: "Max 4 mi",
    },
    {
      slug: "starbucks",
      title: "Starbucks",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=60",
      tags: ["Coffee", "Breakfast", "Bakery"],
      time: "15-20 min",
      rating: 4.7,
      popular: false,
      delivery: "$0.99 delivery",
      max: "Max 1 mi",
    },
    {
      slug: "panda-express",
      title: "Panda Express",
      img: "https://images.unsplash.com/photo-1604908177097-6f7d1f0f2a4d?auto=format&fit=crop&w=1400&q=60",
      tags: ["Asian", "Chinese", "Fast Food"],
      time: "30-40 min",
      rating: 4.3,
      popular: true,
      delivery: "$1.99 delivery",
      max: "Max 3 mi",
    },
  ];

  const defaultFilters = useMemo(
    () => ({
      sortBy: "recommended",
      minRating: 0,
      maxFee: 10,
      openNow: false,
      hasPromo: false,
    }),
    []
  );

  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const openFilter = () => {
    setDraftFilters(appliedFilters);
    setFilterOpen(true);
  };

  const openSort = () => {
    setDraftFilters(appliedFilters);
    setSortOpen(true);
  };

  const filteredFoods = useMemo(() => {
    const f = appliedFilters;

    return foods
      .filter((x) => (activeCategory ? x.tags?.includes(activeCategory) : true))
      .filter((x) => (f.minRating ? x.rating >= f.minRating : true))
      .filter((x) => (f.openNow ? !x.closed : true))
      .filter((x) => (f.hasPromo ? !!x.popular : true))
      .filter((x) => {
        const fee = Number(String(x.delivery).replace("$", "").split(" ")[0]);
        return fee <= f.maxFee;
      })
      .sort((a, b) => {
        if (f.sortBy === "topRated") return b.rating - a.rating;
        if (f.sortBy === "fastest") {
          const at = Number(String(a.time).split("-")[0]);
          const bt = Number(String(b.time).split("-")[0]);
          return at - bt;
        }
        if (f.sortBy === "lowestFee") {
          const fee = (x) => Number(String(x.delivery).replace("$", "").split(" ")[0]);
          return fee(a) - fee(b);
        }
        return 0;
      });
  }, [appliedFilters, activeCategory]);

  const sortLabel =
    appliedFilters.sortBy === "recommended"
      ? "Recommended"
      : appliedFilters.sortBy === "topRated"
      ? "Top Rated"
      : appliedFilters.sortBy === "fastest"
      ? "Fastest"
      : "Lowest Fee";

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PromoCard
          tone="green"
          kicker="Food Delivery"
          title="First Order?"
          subtitle="Get free delivery on your first order with code WELCOME"
        />
        <PromoCard
          tone="blue"
          kicker="Weekly Offer"
          title="50% Off Lunch"
          subtitle="Order between 11AM - 2PM to get 50% off on selected items"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-slate-900">Categories</h2>

          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
          >
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div
          className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((c) => (
            <CategoryItem
              key={c.label}
              label={c.label}
              emoji={c.emoji}
              active={activeCategory === c.label}
              onClick={() => setActiveCategory((prev) => (prev === c.label ? null : c.label))}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <h2 className="text-lg font-extrabold text-slate-900">Recommended For You</h2>

          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:items-center">
            <button
              type="button"
              onClick={openFilter}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:shadow transition"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <button
              type="button"
              onClick={openSort}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:shadow transition"
            >
              {sortLabel} <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredFoods.map((f) => (
            <FoodCard key={f.slug} {...f} rating={String(f.rating)} />
          ))}
        </div>
      </section>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={draftFilters}
        onChange={setDraftFilters}
        onReset={() => setDraftFilters(defaultFilters)}
        onApply={() => {
          setAppliedFilters(draftFilters);
          setFilterOpen(false);
        }}
      />

      <SortModal
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        value={draftFilters.sortBy}
        onChange={(v) => setDraftFilters((p) => ({ ...p, sortBy: v }))}
        onApply={() => {
          setAppliedFilters(draftFilters);
          setSortOpen(false);
        }}
      />
    </div>
  );
}
