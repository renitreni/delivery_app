import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  CalendarDays,
  Pencil,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  LogOut,
  X,
  Lock,
  Smartphone,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  Home,
  Briefcase,
  HeartHandshake,
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  Package,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const initialProfile = {
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 123 4567",
    street: "123 Roxas Boulevard",
    city: "Manila",
    postalCode: "1000",
    memberSince: "Jan 2024",
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorForm, setTwoFactorForm] = useState({
    mobileNumber: "+63 917 123 4567",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const getAddressIcon = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes("home")) return <Home size={18} className="text-orange-500" />;
    if (lower.includes("office") || lower.includes("work"))
      return <Briefcase size={18} className="text-orange-500" />;
    return <HeartHandshake size={18} className="text-orange-500" />;
  };

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      address: "123 Roxas Boulevard, Manila",
      isDefault: true,
      icon: getAddressIcon("Home"),
    },
    {
      id: 2,
      label: "Office",
      address: "Ayala Avenue, Makati CBD",
      isDefault: false,
      icon: getAddressIcon("Office"),
    },
    {
      id: 3,
      label: "Parents",
      address: "Quezon City, Metro Manila",
      isDefault: false,
      icon: getAddressIcon("Parents"),
    },
  ]);

  const [addressForm, setAddressForm] = useState({
    id: null,
    label: "",
    address: "",
    isDefault: false,
  });
  const [addressToDelete, setAddressToDelete] = useState(null);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "GCash",
      details: "**** 4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Credit Card",
      details: "**** 1234",
      isDefault: false,
    },
  ]);

  const [paymentForm, setPaymentForm] = useState({
    id: null,
    name: "GCash",
    details: "",
    isDefault: false,
  });
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const faqData = useMemo(
    () => [
      {
        question: "How do I book a delivery?",
        answer:
          "Go to the Book page, fill in the pickup and drop-off details, choose your payment method, and confirm your booking.",
        icon: <Package size={18} className="text-orange-500" />,
      },
      {
        question: "How can I track my package?",
        answer:
          "You can track your package through the Track Package page where you can see the live status and delivery progress.",
        icon: <MapPin size={18} className="text-orange-500" />,
      },
      {
        question: "What payment methods are available?",
        answer:
          "You can use Cash on Delivery (COD), GCash, Maya, and card payment depending on the available options in the app.",
        icon: <CreditCard size={18} className="text-orange-500" />,
      },
      {
        question: "How do I contact support?",
        answer:
          "You can contact support through live chat, email, or phone for any booking, delivery, or payment concerns.",
        icon: <MessageCircle size={18} className="text-orange-500" />,
      },
    ],
    []
  );

  const filteredFaq = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white";

  const modalInputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white";

  const startEditProfile = () => {
    setDraftProfile(profile);
    setIsEditingProfile(true);
  };

  const cancelEditProfile = () => {
    setDraftProfile(profile);
    setIsEditingProfile(false);
  };

  const saveProfile = () => {
    setProfile(draftProfile);
    setIsEditingProfile(false);
  };

  const handleDraftProfileChange = (e) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  const handlePasswordSave = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password updated successfully.");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  const handleTwoFactorSave = () => {
    if (!twoFactorForm.mobileNumber.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    setTwoFactorEnabled(true);
    alert("Two-factor authentication enabled.");
    setShowTwoFactorModal(false);
  };

  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false);
    alert("Two-factor authentication disabled.");
  };

  const openAddAddress = () => {
    setAddressForm({
      id: null,
      label: "",
      address: "",
      isDefault: false,
    });
    setShowAddressModal(true);
  };

  const openEditAddress = (item) => {
    setAddressForm({
      id: item.id,
      label: item.label,
      address: item.address,
      isDefault: item.isDefault,
    });
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    if (!addressForm.label.trim() || !addressForm.address.trim()) {
      alert("Please complete the address form.");
      return;
    }

    if (addressForm.id) {
      setAddresses((prev) =>
        prev.map((item) => {
          const shouldBeDefault = addressForm.isDefault ? item.id === addressForm.id : item.isDefault;
          return {
            ...item,
            label: item.id === addressForm.id ? addressForm.label : item.label,
            address: item.id === addressForm.id ? addressForm.address : item.address,
            isDefault: shouldBeDefault,
            icon:
              item.id === addressForm.id ? getAddressIcon(addressForm.label) : item.icon,
          };
        })
      );
    } else {
      const newId = Date.now();
      setAddresses((prev) => {
        const updated = addressForm.isDefault
          ? prev.map((item) => ({ ...item, isDefault: false }))
          : prev;

        return [
          ...updated,
          {
            id: newId,
            label: addressForm.label,
            address: addressForm.address,
            isDefault: addressForm.isDefault || prev.length === 0,
            icon: getAddressIcon(addressForm.label),
          },
        ];
      });
    }

    if (addressForm.isDefault) {
      setAddresses((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: item.id === addressForm.id ? true : false,
        }))
      );
    }

    if (!addressForm.id && addressForm.isDefault) {
      setAddresses((prev) =>
        prev.map((item, index) => ({
          ...item,
          isDefault: item.id === Date.now() ? true : false,
        }))
      );
    }

    if (addressForm.id && addressForm.isDefault) {
      setAddresses((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: item.id === addressForm.id,
        }))
      );
    }

    if (!addressForm.id && !addressForm.isDefault) {
      setAddresses((prev) => {
        if (prev.some((item) => item.isDefault)) return prev;
        return prev.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        }));
      });
    }

    setShowAddressModal(false);
  };

  const confirmDeleteAddress = (item) => {
    setAddressToDelete(item);
    setShowDeleteAddressModal(true);
  };

  const deleteAddress = () => {
    if (!addressToDelete) return;

    setAddresses((prev) => {
      const filtered = prev.filter((item) => item.id !== addressToDelete.id);

      if (addressToDelete.isDefault && filtered.length > 0) {
        return filtered.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        }));
      }

      return filtered;
    });

    setAddressToDelete(null);
    setShowDeleteAddressModal(false);
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  const openAddPayment = () => {
    setPaymentForm({
      id: null,
      name: "GCash",
      details: "",
      isDefault: false,
    });
    setShowPaymentModal(true);
  };

  const openEditPayment = (item) => {
    setPaymentForm({
      id: item.id,
      name: item.name,
      details: item.details.replace("**** ", ""),
      isDefault: item.isDefault,
    });
    setShowPaymentModal(true);
  };

  const savePayment = () => {
    if (!paymentForm.name.trim() || !paymentForm.details.trim()) {
      alert("Please complete the payment form.");
      return;
    }

    const formattedDetails = paymentForm.details.startsWith("****")
      ? paymentForm.details
      : `**** ${paymentForm.details}`;

    if (paymentForm.id) {
      setPaymentMethods((prev) =>
        prev.map((item) => ({
          ...item,
          name: item.id === paymentForm.id ? paymentForm.name : item.name,
          details: item.id === paymentForm.id ? formattedDetails : item.details,
          isDefault: paymentForm.isDefault ? item.id === paymentForm.id : item.isDefault,
        }))
      );
    } else {
      setPaymentMethods((prev) => {
        const updated = paymentForm.isDefault
          ? prev.map((item) => ({ ...item, isDefault: false }))
          : prev;

        return [
          ...updated,
          {
            id: Date.now(),
            name: paymentForm.name,
            details: formattedDetails,
            isDefault: paymentForm.isDefault || prev.length === 0,
          },
        ];
      });
    }

    if (paymentForm.id && paymentForm.isDefault) {
      setPaymentMethods((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: item.id === paymentForm.id,
        }))
      );
    }

    setShowPaymentModal(false);
  };

  const confirmDeletePayment = (item) => {
    setPaymentToDelete(item);
    setShowDeletePaymentModal(true);
  };

  const deletePayment = () => {
    if (!paymentToDelete) return;

    setPaymentMethods((prev) => {
      const filtered = prev.filter((item) => item.id !== paymentToDelete.id);

      if (paymentToDelete.isDefault && filtered.length > 0) {
        return filtered.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        }));
      }

      return filtered;
    });

    setPaymentToDelete(null);
    setShowDeletePaymentModal(false);
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f2] via-[#f8fafc] to-[#f1f5f9] pb-24 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-6 py-8 shadow-[0_20px_60px_rgba(249,115,22,0.24)] sm:px-8">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <User size={14} />
                Account settings and personal details
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                My Profile
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
                Manage your personal information, saved addresses, payment methods,
                and account security in one place.
              </p>
            </div>

            <button
              onClick={() =>
                isEditingProfile ? cancelEditProfile() : startEditProfile()
              }
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              <Pencil size={16} />
              {isEditingProfile ? "Close Edit" : "Edit Profile"}
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <section className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 ring-4 ring-orange-50">
                    <User size={40} className="text-orange-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-4 ring-white">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{profile.email}</p>

                <div className="mt-4 inline-flex rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-600">
                  Member since {profile.memberSince}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-left">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-green-600">
                    Verified
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-left">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    City
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {profile.city}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <Shield size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Security & Privacy
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage your account safety
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100">
                      <Lock size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Change Password
                      </p>
                      <p className="text-xs text-slate-500">
                        Update your account password
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </button>

                <button
                  onClick={() => setShowTwoFactorModal(true)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100">
                      <Smartphone size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-slate-500">
                        {twoFactorEnabled
                          ? "Currently enabled on your account"
                          : "Add extra protection to your account"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </button>

                <button
                  onClick={() => setShowFaqModal(true)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100">
                      <HelpCircle size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">FAQ</p>
                      <p className="text-xs text-slate-500">
                        View common questions and answers
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <User size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Personal Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    View and manage your details
                  </p>
                </div>
              </div>

              {isEditingProfile ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={draftProfile.firstName}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={draftProfile.lastName}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={draftProfile.email}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={draftProfile.phone}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={draftProfile.street}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={draftProfile.city}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={draftProfile.postalCode}
                      onChange={handleDraftProfileChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={saveProfile}
                      className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:from-orange-600 hover:to-orange-700"
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={cancelEditProfile}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <Mail size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Email
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <Phone size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Phone
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.phone}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <MapPin size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Address
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.street}, {profile.city}, {profile.postalCode}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <CalendarDays size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Member Since
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.memberSince}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <CreditCard size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Account Status
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-green-600">
                      Verified
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Saved Addresses
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage your delivery locations
                  </p>
                </div>

                <button
                  onClick={openAddAddress}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                        {item.icon}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[15px] font-semibold text-slate-900">
                            {item.label}
                          </h3>

                          {item.isDefault && (
                            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-500">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-slate-600">
                          {item.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 pl-16 md:pl-0">
                      {!item.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(item.id)}
                          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                        >
                          Set Default
                        </button>
                      )}

                      <button
                        onClick={() => openEditAddress(item)}
                        className="flex items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-orange-500"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDeleteAddress(item)}
                        className="flex items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-600"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Payment Methods
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage how you pay for deliveries
                  </p>
                </div>

                <button
                  onClick={openAddPayment}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                        <CreditCard size={18} className="text-blue-600" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[15px] font-semibold text-slate-900">
                            {item.name}
                          </h3>

                          {item.isDefault && (
                            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-500">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-slate-600">
                          {item.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 pl-16 md:pl-0">
                      {!item.isDefault && (
                        <button
                          onClick={() => setDefaultPayment(item.id)}
                          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                        >
                          Set Default
                        </button>
                      )}

                      <button
                        onClick={() => openEditPayment(item)}
                        className="flex items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-orange-500"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDeletePayment(item)}
                        className="flex items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-600"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-red-100 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Logout</h2>
                  <p className="text-sm text-slate-500">
                    Sign out from your customer account
                  </p>
                </div>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Change Password
                </h3>
                <p className="text-sm text-slate-500">
                  Update your login password
                </p>
              </div>
              <button onClick={() => setShowPasswordModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSave}
                className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showTwoFactorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-slate-500">
                  Add extra security to your account
                </p>
              </div>
              <button onClick={() => setShowTwoFactorModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                Enable two-factor authentication to protect your account using a
                one-time verification code sent to your mobile device.
              </p>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="+63 9XX XXX XXXX"
                value={twoFactorForm.mobileNumber}
                onChange={(e) =>
                  setTwoFactorForm({ mobileNumber: e.target.value })
                }
                className={modalInputClass}
              />
            </div>

            {twoFactorEnabled && (
              <button
                onClick={handleDisableTwoFactor}
                className="mt-4 w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                Disable Two-Factor Authentication
              </button>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowTwoFactorModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTwoFactorSave}
                className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                {twoFactorEnabled ? "Update" : "Enable"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">FAQ</h3>
                <p className="text-sm text-slate-500">
                  Common questions and answers
                </p>
              </div>
              <button onClick={() => setShowFaqModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="mb-5 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </div>

            <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
              {filteredFaq.length > 0 ? (
                filteredFaq.map((item, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:border-orange-200"
                  >
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50">
                          {item.icon}
                        </div>
                        <span className="text-sm font-semibold text-slate-900">
                          {item.question}
                        </span>
                      </div>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                          openFaqIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        openFaqIndex === index
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-medium text-slate-700">
                    No FAQ found for "{searchTerm}"
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try searching booking, tracking, or payment.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowFaqModal(false)}
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {addressForm.id ? "Edit Address" : "Add Address"}
                </h3>
                <p className="text-sm text-slate-500">
                  Save a delivery location
                </p>
              </div>
              <button onClick={() => setShowAddressModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Label
                </label>
                <input
                  type="text"
                  placeholder="Home / Office / Parents"
                  value={addressForm.label}
                  onChange={(e) =>
                    setAddressForm((prev) => ({
                      ...prev,
                      label: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Address
                </label>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={addressForm.address}
                  onChange={(e) =>
                    setAddressForm((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) =>
                    setAddressForm((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-slate-700">Set as default address</span>
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={24} className="text-red-500" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delete this address?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {addressToDelete?.label} will be removed from your saved addresses.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDeleteAddressModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteAddress}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {paymentForm.id ? "Edit Payment Method" : "Add Payment Method"}
                </h3>
                <p className="text-sm text-slate-500">
                  Save your preferred payment option
                </p>
              </div>
              <button onClick={() => setShowPaymentModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Payment Type
                </label>
                <select
                  value={paymentForm.name}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                >
                  <option>GCash</option>
                  <option>Maya</option>
                  <option>Credit Card</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4567"
                  value={paymentForm.details}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      details: e.target.value,
                    }))
                  }
                  className={modalInputClass}
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={paymentForm.isDefault}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-slate-700">
                  Set as default payment method
                </span>
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={savePayment}
                className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={24} className="text-red-500" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Remove this payment method?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {paymentToDelete?.name} will be removed from your payment methods.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDeletePaymentModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={deletePayment}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <LogOut size={26} className="text-red-500" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Are you sure you want to logout?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              You will be returned to the default page.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}