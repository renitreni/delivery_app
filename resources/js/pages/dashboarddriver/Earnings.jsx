import React, { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Banknote,
  CalendarDays,
  TrendingUp,
  Download,
  ChevronDown,
  Landmark,
  Smartphone,
  Plus,
  CheckCircle2,
  X,
  ArrowRight,
  BadgeCheck,
  Clock3,
} from "lucide-react";

const STORAGE_KEY = "driver_earnings_dashboard_v1";

const defaultState = {
  selectedRange: "This Week",
  availableBalance: 5300,
  todayEarnings: 1850,
  weeklyTotal: 7200,
  monthlyTotal: 28500,
  payoutMethods: [
    {
      id: 1,
      type: "GCash",
      label: "GCash",
      details: "0917 123 4567",
      accountName: "Juan Dela Cruz",
      accountNumber: "09171234567",
      primary: true,
    },
    {
      id: 2,
      type: "Bank Transfer",
      label: "BDO",
      details: "**** 1234",
      accountName: "Juan Dela Cruz",
      accountNumber: "12345678901234",
      bankName: "BDO",
      primary: false,
    },
  ],
  transactions: [
    {
      id: 1,
      date: "Mar 11, 2026",
      deliveries: "12 deliveries",
      amount: "₱1,850",
      status: "Pending",
      type: "earning",
    },
    {
      id: 2,
      date: "Mar 10, 2026",
      deliveries: "10 deliveries",
      amount: "₱1,650",
      status: "Pending",
      type: "earning",
    },
    {
      id: 3,
      date: "Mar 9, 2026",
      deliveries: "8 deliveries",
      amount: "₱1,200",
      status: "Pending",
      type: "earning",
    },
    {
      id: 4,
      date: "Mar 8, 2026",
      deliveries: "11 deliveries",
      amount: "₱1,750",
      status: "Paid",
      type: "earning",
    },
    {
      id: 5,
      date: "Mar 7, 2026",
      deliveries: "7 deliveries",
      amount: "₱950",
      status: "Paid",
      type: "earning",
    },
  ],
};

export default function Earnings() {
  const [selectedRange, setSelectedRange] = useState(defaultState.selectedRange);
  const [availableBalance, setAvailableBalance] = useState(
    defaultState.availableBalance
  );
  const [todayEarnings] = useState(defaultState.todayEarnings);
  const [weeklyTotal] = useState(defaultState.weeklyTotal);
  const [monthlyTotal] = useState(defaultState.monthlyTotal);
  const [transactions, setTransactions] = useState(defaultState.transactions);
  const [payoutMethods, setPayoutMethods] = useState(defaultState.payoutMethods);

  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [selectedPayoutMethodId, setSelectedPayoutMethodId] = useState(null);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState("");

  const [newMethod, setNewMethod] = useState({
    type: "GCash",
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const weeklyData = [
    { day: "Mon", amount: 800, width: "55%" },
    { day: "Tue", amount: 1200, width: "85%" },
    { day: "Wed", amount: 950, width: "68%" },
    { day: "Thu", amount: 1100, width: "78%" },
    { day: "Fri", amount: 1350, width: "96%" },
    { day: "Sat", amount: 1400, width: "100%" },
    { day: "Sun", amount: 400, width: "28%" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setSelectedRange(parsed.selectedRange ?? defaultState.selectedRange);
      setAvailableBalance(parsed.availableBalance ?? defaultState.availableBalance);
      setTransactions(parsed.transactions ?? defaultState.transactions);
      setPayoutMethods(parsed.payoutMethods ?? defaultState.payoutMethods);
    } catch (error) {
      console.error("Failed to load earnings data:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedRange,
        availableBalance,
        transactions,
        payoutMethods,
      })
    );
  }, [selectedRange, availableBalance, transactions, payoutMethods]);

  const primaryMethod =
    payoutMethods.find((item) => item.primary) || payoutMethods[0] || null;

  useEffect(() => {
    if (!selectedPayoutMethodId && primaryMethod) {
      setSelectedPayoutMethodId(primaryMethod.id);
    }
  }, [primaryMethod, selectedPayoutMethodId]);

  const selectedPayoutMethod = payoutMethods.find(
    (item) => item.id === selectedPayoutMethodId
  );

  const estimatedInstantFee = useMemo(() => {
    const numericAmount = Number(payoutAmount) || 0;
    if (numericAmount <= 0) return 0;
    return 15;
  }, [payoutAmount]);

  const amountAfterFee = Math.max(
    (Number(payoutAmount) || 0) - estimatedInstantFee,
    0
  );

  const isValidPayoutAmount =
    Number(payoutAmount) >= 500 && Number(payoutAmount) <= availableBalance;

  const getStatusStyle = (status) => {
    if (status === "Paid") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Processing") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  const handleOpenPayout = () => {
    if (!primaryMethod) {
      setShowAddMethodModal(true);
      return;
    }

    setSelectedPayoutMethodId(primaryMethod.id);
    setPayoutAmount(String(availableBalance));
    setPayoutSuccess(false);
    setPayoutMessage("");
    setShowPayoutModal(true);
  };

  const handleClosePayoutModal = () => {
    if (isProcessingPayout) return;
    setShowPayoutModal(false);
    setPayoutSuccess(false);
    setPayoutAmount("");
    setPayoutMessage("");
  };

  const handleConfirmPayout = () => {
    if (!selectedPayoutMethod) {
      setPayoutMessage("Please select a payout method.");
      return;
    }

    if (!isValidPayoutAmount) {
      setPayoutMessage("Amount must be at least ₱500 and not exceed your balance.");
      return;
    }

    setPayoutMessage("");
    setIsProcessingPayout(true);

    const amount = Number(payoutAmount);

    setTimeout(() => {
      setAvailableBalance((prev) => prev - amount);

      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const newTransaction = {
        id: Date.now(),
        date: formattedDate,
        deliveries: `Payout to ${selectedPayoutMethod.label}`,
        amount: `₱${amount.toLocaleString()}`,
        status: "Paid",
        type: "payout",
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      setIsProcessingPayout(false);
      setPayoutSuccess(true);
    }, 1200);
  };

  const handleAddMethod = () => {
    const accountName = newMethod.accountName.trim();
    const accountNumber = newMethod.accountNumber.trim();
    const bankName = newMethod.bankName.trim();

    if (!accountName || !accountNumber) return;
    if (newMethod.type === "Bank Transfer" && !bankName) return;

    const label =
      newMethod.type === "Bank Transfer" ? bankName : newMethod.type;

    const details =
      newMethod.type === "Bank Transfer"
        ? `**** ${accountNumber.slice(-4)}`
        : accountNumber;

    const newItem = {
      id: Date.now(),
      type: newMethod.type,
      label,
      details,
      accountName,
      accountNumber,
      bankName: newMethod.type === "Bank Transfer" ? bankName : "",
      primary: payoutMethods.length === 0,
    };

    setPayoutMethods((prev) => [...prev, newItem]);

    if (payoutMethods.length === 0) {
      setSelectedPayoutMethodId(newItem.id);
    }

    setNewMethod({
      type: "GCash",
      accountName: "",
      accountNumber: "",
      bankName: "",
    });
    setShowAddMethodModal(false);
  };

  const handleSetPrimary = (id) => {
    setPayoutMethods((prev) =>
      prev.map((item) => ({
        ...item,
        primary: item.id === id,
      }))
    );
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Amount", "Status", "Type"];
    const rows = transactions.map((item) => [
      item.date,
      item.deliveries,
      item.amount,
      item.status,
      item.type || "earning",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "earnings-transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-6 text-white shadow-xl md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 left-20 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <Wallet size={16} />
                Driver income overview
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Earnings Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                Track your income, manage payout methods, and cash out your
                earnings to your e-wallet or bank account.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-xs text-slate-300">Available</p>
                <p className="mt-1 text-lg font-bold">
                  ₱{availableBalance.toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-xs text-slate-300">Today</p>
                <p className="mt-1 text-lg font-bold">
                  ₱{todayEarnings.toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md col-span-2 sm:col-span-1">
                <p className="text-xs text-slate-300">This Month</p>
                <p className="mt-1 text-lg font-bold">
                  ₱{monthlyTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="rounded-[30px] bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium md:text-base">
                Available to Cash Out
              </p>
              <Banknote size={22} className="opacity-90" />
            </div>

            <h3 className="mt-8 text-3xl font-bold md:text-4xl">
              ₱{availableBalance.toLocaleString()}
            </h3>

            <p className="mt-2 text-sm text-emerald-50">
              Minimum payout is ₱500
            </p>

            <button
              type="button"
              onClick={handleOpenPayout}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Cash Out Now
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-600 md:text-base">Today</p>
              <Banknote size={18} className="text-slate-400" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-slate-900 md:text-3xl">
              ₱{todayEarnings.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-600 md:text-base">This Week</p>
              <CalendarDays size={18} className="text-slate-400" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-slate-900 md:text-3xl">
              ₱{weeklyTotal.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-600 md:text-base">This Month</p>
              <TrendingUp size={18} className="text-slate-400" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-slate-900 md:text-3xl">
              ₱{monthlyTotal.toLocaleString()}
            </h3>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.9fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Weekly Earnings
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Track your income for the current week
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRange((prev) =>
                      prev === "This Week" ? "Last Week" : "This Week"
                    )
                  }
                  className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {selectedRange}
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="space-y-5">
                {weeklyData.map((item) => (
                  <div
                    key={item.day}
                    className="grid grid-cols-[48px_1fr] items-center gap-3"
                  >
                    <span className="text-sm font-medium text-slate-700 md:text-base">
                      {item.day}
                    </span>

                    <div className="h-8 rounded-full bg-slate-200">
                      <div
                        className="flex h-8 items-center justify-end rounded-full bg-gradient-to-r from-emerald-500 to-green-600 pr-4 text-xs font-semibold text-white md:text-sm"
                        style={{ width: item.width }}
                      >
                        ₱{item.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900 md:text-xl">
                    Weekly Total
                  </span>
                  <span className="text-3xl font-bold text-emerald-600 md:text-4xl">
                    ₱{weeklyTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Transaction History
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your recent earnings and payout activity
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>

              <div className="space-y-4">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-[24px] bg-slate-50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-lg font-bold text-slate-900 md:text-xl">
                        {item.date}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 md:text-base">
                        {item.deliveries}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold text-slate-900 md:text-2xl">
                        {item.amount}
                      </p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium md:text-sm ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Payout Methods
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose where your cash out will go
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddMethodModal(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {payoutMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => handleSetPrimary(method.id)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${
                      method.primary
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${
                            method.type === "Bank Transfer"
                              ? "bg-slate-100"
                              : "bg-blue-100"
                          }`}
                        >
                          {method.type === "Bank Transfer" ? (
                            <Landmark size={18} className="text-slate-700" />
                          ) : (
                            <Smartphone size={18} className="text-blue-700" />
                          )}
                        </div>

                        <div>
                          <p className="text-lg font-bold text-slate-900">
                            {method.label}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {method.details}
                          </p>
                        </div>
                      </div>

                      {method.primary && (
                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                          Primary
                        </span>
                      )}
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleOpenPayout}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-emerald-600 hover:to-green-700"
                >
                  Payout to Selected Method
                </button>
              </div>
            </section>

            <section className="rounded-[30px] border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Clock3 size={22} />
                Payout Schedule
              </h3>

              <p className="mt-5 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                Earnings are available for cash out daily at midnight.
                Minimum amount is ₱500.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-4">
                <p className="text-sm text-slate-500 md:text-base">
                  Next payout available:
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900 md:text-lg">
                  Tomorrow, 12:00 AM
                </p>
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-slate-900">This Month</h3>

              <div className="mt-6 space-y-4 text-sm md:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Base Fare</span>
                  <span className="font-semibold text-slate-900">₱24,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Distance Bonus</span>
                  <span className="font-semibold text-slate-900">₱3,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Peak Hours</span>
                  <span className="font-semibold text-slate-900">₱1,800</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Tips</span>
                  <span className="font-semibold text-slate-900">₱500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-500">Platform Fee (5%)</span>
                  <span className="font-semibold text-red-500">-₱1,500</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900 md:text-2xl">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-emerald-600 md:text-4xl">
                      ₱28,500
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Cash Out Earnings
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Send your payout to your selected bank or e-wallet
                </p>
              </div>

              <button
                type="button"
                onClick={handleClosePayoutModal}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {!payoutSuccess ? (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">Available Balance</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₱{availableBalance.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">Minimum Cash Out</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">₱500</p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Select payout method
                  </label>

                  <div className="grid gap-3">
                    {payoutMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayoutMethodId(method.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          selectedPayoutMethodId === method.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {method.label}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {method.details}
                            </p>
                          </div>

                          {selectedPayoutMethodId === method.id && (
                            <CheckCircle2 size={18} className="text-blue-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Amount to cash out
                  </label>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <input
                      type="number"
                      min="500"
                      max={availableBalance}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      className="w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {payoutMessage && (
                  <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {payoutMessage}
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Payout Amount</span>
                    <span className="font-semibold text-slate-900">
                      ₱{Number(payoutAmount || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Instant Payout Fee</span>
                    <span className="font-semibold text-slate-900">
                      ₱{estimatedInstantFee}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        Amount to Receive
                      </span>
                      <span className="text-lg font-bold text-emerald-600">
                        ₱{amountAfterFee.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmPayout}
                  disabled={isProcessingPayout || !isValidPayoutAmount}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-semibold text-white transition ${
                    isProcessingPayout || !isValidPayoutAmount
                      ? "cursor-not-allowed bg-slate-400"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                  }`}
                >
                  {isProcessingPayout ? "Processing Payout..." : "Confirm Cash Out"}
                </button>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <BadgeCheck size={30} className="text-emerald-600" />
                </div>

                <h4 className="mt-5 text-2xl font-bold text-slate-900">
                  Payout Successful
                </h4>
                <p className="mt-2 text-sm text-slate-500">
                  Your payout was sent to{" "}
                  <span className="font-semibold text-slate-700">
                    {selectedPayoutMethod?.label}
                  </span>
                  .
                </p>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Requested Amount</span>
                    <span className="font-semibold text-slate-900">
                      ₱{Number(payoutAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Received Amount</span>
                    <span className="font-semibold text-emerald-600">
                      ₱{amountAfterFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      Paid
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClosePayoutModal}
                  className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showAddMethodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Add Payout Method
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add a bank account or e-wallet for future cash outs
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddMethodModal(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Method type
                </label>
                <select
                  value={newMethod.type}
                  onChange={(e) =>
                    setNewMethod((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                >
                  <option>GCash</option>
                  <option>Maya</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              {newMethod.type === "Bank Transfer" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Bank name
                  </label>
                  <input
                    type="text"
                    value={newMethod.bankName}
                    onChange={(e) =>
                      setNewMethod((prev) => ({
                        ...prev,
                        bankName: e.target.value,
                      }))
                    }
                    placeholder="Enter bank name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Account name
                </label>
                <input
                  type="text"
                  value={newMethod.accountName}
                  onChange={(e) =>
                    setNewMethod((prev) => ({
                      ...prev,
                      accountName: e.target.value,
                    }))
                  }
                  placeholder="Enter account name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {newMethod.type === "Bank Transfer"
                    ? "Account number"
                    : "Mobile number"}
                </label>
                <input
                  type="text"
                  value={newMethod.accountNumber}
                  onChange={(e) =>
                    setNewMethod((prev) => ({
                      ...prev,
                      accountNumber: e.target.value,
                    }))
                  }
                  placeholder={
                    newMethod.type === "Bank Transfer"
                      ? "Enter account number"
                      : "Enter mobile number"
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleAddMethod}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700"
              >
                Save Payout Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}