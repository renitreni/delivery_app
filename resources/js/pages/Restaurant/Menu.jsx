import React from "react";
import { Plus, Pencil, Trash2, Search, X, Check, Image as ImageIcon } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const money = (n) => `$${Number(n || 0).toFixed(2)}`;


const SEED_CATEGORIES = [
  { id: "c1", name: "Burgers" },
  { id: "c2", name: "Chicken" },
  { id: "c3", name: "Sides" },
  { id: "c4", name: "Drinks" },
  { id: "c5", name: "Desserts" },
];

const SEED_ITEMS = [
  {
    id: "m1",
    categoryId: "c1",
    name: "Whopper Meal",
    desc: "Flame-grilled beef patty with fresh toppings.",
    price: 9.99,
    available: true,
    image: "",
  },
  {
    id: "m2",
    categoryId: "c1",
    name: "Cheeseburger",
    desc: "Classic cheeseburger with pickles and onions.",
    price: 4.49,
    available: true,
    image: "",
  },
  {
    id: "m3",
    categoryId: "c2",
    name: "Chicken Royale",
    desc: "Crispy chicken fillet with creamy mayo.",
    price: 5.99,
    available: true,
    image: "",
  },
  {
    id: "m4",
    categoryId: "c3",
    name: "Onion Rings",
    desc: "Golden crispy onion rings.",
    price: 2.99,
    available: false,
    image: "",
  },
  {
    id: "m5",
    categoryId: "c4",
    name: "Iced Coffee",
    desc: "Chilled coffee with ice.",
    price: 1.99,
    available: true,
    image: "",
  },
];


function Toggle({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={ariaLabel}
      className={cx(
        "relative h-7 w-12 rounded-full border transition",
        checked ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-100"
      )}
    >
      <span
        className={cx(
          "absolute top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white shadow-sm transition-all",
          checked ? "left-[22px]" : "left-1"
        )}
      >
        <span className={cx("h-2 w-2 rounded-full", checked ? "bg-emerald-500" : "bg-slate-400")} />
      </span>
    </button>
  );
}

function Modal({ open, title, onClose, children, footer }) {
  React.useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/40"
        aria-label="Close overlay"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
          {footer ? <div className="border-t border-slate-200 px-5 py-4">{footer}</div> : null}
        </div>
      </div>
    </>
  );
}

function Toast({ toast, onClose }) {
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const tone =
    toast.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : toast.type === "danger"
      ? "border-rose-200 bg-rose-50 text-rose-800"
      : "border-slate-200 bg-white text-slate-800";

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-[92vw] max-w-sm">
      <div className={cx("rounded-2xl border p-4 shadow-lg", tone)}>
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold">{toast.message}</div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-xl hover:bg-black/5"
            aria-label="Close toast"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


export default function RestaurantMenu() {
  const [categories, setCategories] = React.useState(SEED_CATEGORIES);
  const [items, setItems] = React.useState(SEED_ITEMS);

  const [activeCatId, setActiveCatId] = React.useState(SEED_CATEGORIES[0]?.id);
  const [q, setQ] = React.useState("");

  const [toast, setToast] = React.useState(null);

  
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);

  const [draft, setDraft] = React.useState(null); // for add/edit
  const [toDelete, setToDelete] = React.useState(null);

  const activeCategory = React.useMemo(
    () => categories.find((c) => c.id === activeCatId) || categories[0],
    [categories, activeCatId]
  );

  const counts = React.useMemo(() => {
    const map = Object.fromEntries(categories.map((c) => [c.id, 0]));
    for (const it of items) map[it.categoryId] = (map[it.categoryId] || 0) + 1;
    return map;
  }, [categories, items]);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((it) => {
      if (it.categoryId !== activeCatId) return false;
      if (!query) return true;
      const hay = [it.name, it.desc, money(it.price)].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [items, activeCatId, q]);

  const showToast = (message, type = "success") => setToast({ message, type });

  const openAdd = () => {
    setDraft({
      id: `m_${Date.now()}`,
      categoryId: activeCatId,
      name: "",
      desc: "",
      price: 0,
      available: true,
      image: "",
    });
    setAddOpen(true);
  };

  const openEdit = (item) => {
    setDraft({ ...item });
    setEditOpen(true);
  };

  const openDelete = (item) => {
    setToDelete(item);
    setDeleteOpen(true);
  };

  const saveDraft = () => {
    if (!draft?.name?.trim()) {
      showToast("Please enter an item name.", "danger");
      return;
    }
    if (Number.isNaN(Number(draft.price)) || Number(draft.price) < 0) {
      showToast("Please enter a valid price.", "danger");
      return;
    }

    const exists = items.some((x) => x.id === draft.id);

    setItems((prev) => {
      if (exists) return prev.map((x) => (x.id === draft.id ? { ...draft, price: Number(draft.price) } : x));
      return [{ ...draft, price: Number(draft.price) }, ...prev];
    });

    showToast(exists ? "Item updated." : "Item added.");
    setEditOpen(false);
    setAddOpen(false);
    setDraft(null);
  };

  const removeItem = () => {
    if (!toDelete) return;
    setItems((prev) => prev.filter((x) => x.id !== toDelete.id));
    showToast("Item deleted.", "danger");
    setDeleteOpen(false);
    setToDelete(null);
  };

  const toggleItemAvailable = (id) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, available: !x.available } : x))
    );
  };

  const bulkUnavailable = () => {
    setItems((prev) =>
      prev.map((x) =>
        x.categoryId === activeCatId ? { ...x, available: false } : x
      )
    );
    showToast("All items in this category set to unavailable.");
  };

  
  return (
    <div className="space-y-5">
      {/* Top Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="text-xl font-extrabold text-slate-900">Menu</div>
          <div className="text-sm text-slate-500">Manage your categories and items</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={bulkUnavailable}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Bulk Unavailable
          </button>

          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      </div>

      
      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">Categories</div>
            <button
              type="button"
              onClick={() => showToast("Demo: Add category (not implemented)")}
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
              aria-label="Add category"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {categories.map((c) => {
              const isActive = c.id === activeCatId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCatId(c.id)}
                  className={cx(
                    "w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cx("h-2 w-2 rounded-full", isActive ? "bg-emerald-500" : "bg-slate-300")} />
                    {c.name}
                  </span>
                  <span
                    className={cx(
                      "inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-extrabold",
                      isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                    )}
                  >
                    {counts[c.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        
        <section className="space-y-4">
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm font-extrabold text-slate-900">{activeCategory?.name || "Items"}</div>
              <div className="text-sm font-semibold text-slate-400">Items</div>
            </div>

            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search items…"
                className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            {filtered.map((it) => (
              <div key={it.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  {/* Image */}
                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-100 grid place-items-center overflow-hidden">
                    {it.image ? (
                      <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-slate-400" />
                    )}
                  </div>

                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold text-slate-900">{it.name}</div>
                        <div className="mt-1 line-clamp-2 text-xs text-slate-500">{it.desc}</div>
                      </div>

                      
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(it)}
                          className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100"
                          aria-label="Edit item"
                        >
                          <Pencil className="h-4 w-4 text-slate-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDelete(it)}
                          className="grid h-9 w-9 place-items-center rounded-xl hover:bg-rose-50"
                          aria-label="Delete item"
                        >
                          <Trash2 className="h-4 w-4 text-rose-600" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-extrabold text-emerald-700">{money(it.price)}</div>

                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={it.available}
                          onChange={() => {
                            toggleItemAvailable(it.id);
                            showToast(it.available ? "Set to unavailable." : "Set to available.");
                          }}
                          ariaLabel="Toggle availability"
                        />
                        <div className="text-xs font-bold text-slate-700">
                          {it.available ? "Available" : "Unavailable"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center md:col-span-2">
                <div className="text-lg font-extrabold text-slate-900">No items found</div>
                <div className="mt-1 text-sm text-slate-600">Try a different category or search.</div>
                <button
                  type="button"
                  onClick={openAdd}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      
      <Modal
        open={addOpen || editOpen}
        title={addOpen ? "Add Item" : "Edit Item"}
        onClose={() => {
          setAddOpen(false);
          setEditOpen(false);
          setDraft(null);
        }}
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setAddOpen(false);
                setEditOpen(false);
                setDraft(null);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" />
              Save
            </button>
          </div>
        }
      >
        {draft ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Item Name</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="e.g. Whopper Meal"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <textarea
                value={draft.desc}
                onChange={(e) => setDraft((p) => ({ ...p, desc: e.target.value }))}
                rows={3}
                className="mt-1 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Short description shown to customers…"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Price</label>
              <input
                type="number"
                step="0.01"
                value={draft.price}
                onChange={(e) => setDraft((p) => ({ ...p, price: e.target.value }))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={draft.categoryId}
                onChange={(e) => setDraft((p) => ({ ...p, categoryId: e.target.value }))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Image URL (optional)</label>
              <input
                value={draft.image}
                onChange={(e) => setDraft((p) => ({ ...p, image: e.target.value }))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="https://..."
              />
              <div className="mt-2 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-600">Availability</div>
                <div className="flex items-center gap-2">
                  <Toggle
                    checked={!!draft.available}
                    onChange={() => setDraft((p) => ({ ...p, available: !p.available }))}
                    ariaLabel="Toggle availability in form"
                  />
                  <div className="text-xs font-bold text-slate-700">
                    {draft.available ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      
      <Modal
        open={deleteOpen}
        title="Delete item?"
        onClose={() => {
          setDeleteOpen(false);
          setToDelete(null);
        }}
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDeleteOpen(false);
                setToDelete(null);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={removeItem}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        }
      >
        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-800">
            This will permanently remove{" "}
            <span className="font-extrabold">{toDelete?.name}</span>.
          </div>
          <div className="text-sm text-slate-600">You can’t undo this action.</div>
        </div>
      </Modal>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
