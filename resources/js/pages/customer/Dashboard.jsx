import React from "react";
import { Clock3, Star, ChevronRight } from "lucide-react";

const PromoCard = ({ tone = "green", title, subtitle }) => {
  const bg =
    tone === "green"
      ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
      : "bg-gradient-to-r from-indigo-600 to-indigo-500";

  return (
    <div className={`relative overflow-hidden rounded-2xl ${bg} p-6 text-white shadow-sm`}>
      <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute right-10 bottom-[-20px] h-24 w-24 rounded-full bg-white/10" />
      <div className="relative">
        <div className="text-xs font-semibold opacity-90">Free Delivery</div>
        <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
        <p className="mt-2 text-sm text-white/90 max-w-md">{subtitle}</p>
      </div>
    </div>
  );
};

const Category = ({ label, emoji }) => (
  <button
    type="button"
    className="group w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm hover:shadow-md hover:border-slate-300 transition"
  >
    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200">
      <span className="text-lg">{emoji}</span>
    </div>
    <div className="mt-2 text-xs font-medium text-slate-700 group-hover:text-slate-900">
      {label}
    </div>
  </button>
);

const FoodCard = ({ img, title, tags, eta, rating, promo }) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition">
    <div className="relative">
      <img src={img} alt={title} className="h-36 w-full object-cover" />

      {promo ? (
        <span className="absolute left-3 top-3 rounded-lg bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
          PROMO
        </span>
      ) : null}

      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-[10px] font-semibold text-slate-700 shadow">
        <Clock3 className="h-3 w-3" />
        {eta}
      </span>
    </div>

    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
          <Star className="h-3.5 w-3.5" />
          {rating}
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        <span className="font-medium">6.1k</span> reviews ·{" "}
        <span className="font-medium">Delivery</span>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const categories = [
    { label: "Burgers", emoji: "🍔" },
    { label: "Pizza", emoji: "🍕" },
    { label: "Sushi", emoji: "🍣" },
    { label: "Asian", emoji: "🥡" },
    { label: "Desserts", emoji: "🍰" },
    { label: "Drinks", emoji: "🥤" },
    { label: "Healthy", emoji: "🥗" },
    { label: "Mexican", emoji: "🌮" },
    { label: "Indian", emoji: "🍛" },
    { label: "Chicken", emoji: "🍗" },
    { label: "Coffee", emoji: "☕" },
    { label: "Breakfast", emoji: "🍳" },
  ];

  const foods = [
    {
      title: "Burger King",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=60",
      tags: ["Burgers", "American", "Fast Food"],
      eta: "25-35 min",
      rating: "4.6",
      promo: true,
    },
    {
      title: "Sushi Master",
      img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=60",
      tags: ["Sushi", "Japanese", "Healthy"],
      eta: "40-50 min",
      rating: "4.8",
      promo: false,
    },
    {
      title: "Pizza Hut",
      img: "https://images.unsplash.com/photo-1548365328-9f547f5963c0?auto=format&fit=crop&w=1200&q=60",
      tags: ["Pizza", "Italian", "Fast Food"],
      eta: "20-35 min",
      rating: "4.2",
      promo: true,
    },
    {
      title: "Taco Bell",
      img: "https://images.unsplash.com/photo-1604908177522-432aa729f71b?auto=format&fit=crop&w=1200&q=60",
      tags: ["Mexican", "Tacos", "Fast Food"],
      eta: "20-30 min",
      rating: "4.4",
      promo: false,
    },
    {
      title: "Starbucks",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=60",
      tags: ["Coffee", "Beverages", "Bakery"],
      eta: "15-25 min",
      rating: "4.7",
      promo: true,
    },
    {
      title: "Panda Express",
      img: "https://images.unsplash.com/photo-1604908177097-6f7d1f0f2a4d?auto=format&fit=crop&w=1200&q=60",
      tags: ["Chinese", "Asian", "Fast Food"],
      eta: "25-35 min",
      rating: "4.3",
      promo: false,
    },
    {
      title: "Green Smoothie Bar",
      img: "https://images.unsplash.com/photo-1553530666-ba11a90a0868?auto=format&fit=crop&w=1200&q=60",
      tags: ["Healthy", "Drinks", "Vegan"],
      eta: "15-25 min",
      rating: "4.6",
      promo: true,
    },
    {
      title: "Breakfast & Co.",
      img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=60",
      tags: ["Breakfast", "Coffee", "Bakery"],
      eta: "20-30 min",
      rating: "4.5",
      promo: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* PROMOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PromoCard
          tone="green"
          title="First Order?"
          subtitle="Get free delivery on your first order with code WELCOME"
        />
        <PromoCard
          tone="blue"
          title="50% Off Lunch"
          subtitle="Order between 11AM - 3PM to get 50% off selected items"
        />
      </div>

      {/* CATEGORIES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Categories</h2>
          <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {categories.map((c) => (
            <Category key={c.label} label={c.label} emoji={c.emoji} />
          ))}
        </div>
      </section>

      {/* RECOMMENDED */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Recommended For You</h2>
          <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foods.map((f) => (
            <FoodCard key={f.title} {...f} />
          ))}
        </div>
      </section>
    </div>
  );
}
