import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Car,
  Shield,
  ShieldCheck,
  CalendarDays,
  Star,
  Pencil,
  TrendingUp,
  Award,
  LogOut,
  X,
  Lock,
  Smartphone,
  FileText,
  BadgeCheck,
  CheckCircle2,
  Save,
} from "lucide-react";

const STORAGE_KEY = "driver_profile_modern_v1";

const defaultProfile = {
  firstName: "Juan",
  lastName: "Dela Cruz",
  email: "juan.driver@email.com",
  phone: "+63 917 555 1234",
  vehicleType: "Motorcycle",
  plateNumber: "ABC 1234",
  licenseNumber: "N01-23-456789",
  memberSince: "June 2023",
};

const defaultSettings = {
  isOnline: true,
  acceptingOrders: true,
  twoFactorEnabled: false,
  password: "driver123",
};

const documentsList = [
  {
    title: "Driver's License",
    subtitle: "Valid until Dec 2026",
    status: "Verified",
  },
  {
    title: "Vehicle Registration (OR/CR)",
    subtitle: "Valid until Oct 2026",
    status: "Verified",
  },
  {
    title: "Background Check",
    subtitle: "Completed on Jan 15, 2024",
    status: "Passed",
  },
  {
    title: "Vehicle Insurance",
    subtitle: "Valid until Aug 2026",
    status: "Active",
  },
];

export default function DriverProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [draftProfile, setDraftProfile] = useState(defaultProfile);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

  const [isOnline, setIsOnline] = useState(defaultSettings.isOnline);
  const [acceptingOrders, setAcceptingOrders] = useState(
    defaultSettings.acceptingOrders
  );
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    defaultSettings.twoFactorEnabled
  );
  const [savedPassword, setSavedPassword] = useState(defaultSettings.password);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [twoFactorMessage, setTwoFactorMessage] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (parsed.profile) {
        setProfile(parsed.profile);
        setDraftProfile(parsed.profile);
      }

      if (typeof parsed.isOnline === "boolean") {
        setIsOnline(parsed.isOnline);
      }

      if (typeof parsed.acceptingOrders === "boolean") {
        setAcceptingOrders(parsed.acceptingOrders);
      }

      if (typeof parsed.twoFactorEnabled === "boolean") {
        setTwoFactorEnabled(parsed.twoFactorEnabled);
      }

      if (parsed.savedPassword) {
        setSavedPassword(parsed.savedPassword);
      }
    } catch (error) {
      console.error("Failed to load driver profile:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profile,
        isOnline,
        acceptingOrders,
        twoFactorEnabled,
        savedPassword,
      })
    );
  }, [profile, isOnline, acceptingOrders, twoFactorEnabled, savedPassword]);

  const stats = useMemo(
    () => [
      {
        label: "Total Deliveries",
        value: "487",
        icon: <Car size={18} className="text-blue-600" />,
      },
      {
        label: "Average Rating",
        value: "4.8",
        icon: <Star size={18} className="text-amber-500" />,
      },
      {
        label: "Total Earnings",
        value: "₱45,680",
        icon: <TrendingUp size={18} className="text-emerald-600" />,
      },
      {
        label: "Completion Rate",
        value: "98%",
        icon: <Award size={18} className="text-violet-600" />,
      },
    ],
    []
  );

  const fullName = `${profile.firstName} ${profile.lastName}`;

  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartEdit = () => {
    setDraftProfile(profile);
    setProfileMessage("");
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setDraftProfile(profile);
    setProfileMessage("");
    setIsEditingProfile(false);
  };

  const handleSaveProfile = () => {
    if (
      !draftProfile.firstName.trim() ||
      !draftProfile.lastName.trim() ||
      !draftProfile.email.trim() ||
      !draftProfile.phone.trim() ||
      !draftProfile.vehicleType.trim() ||
      !draftProfile.plateNumber.trim() ||
      !draftProfile.licenseNumber.trim()
    ) {
      setProfileMessage("Please complete all fields before saving.");
      return;
    }

    setProfile(draftProfile);
    setProfileMessage("Profile updated successfully.");
    setIsEditingProfile(false);
  };

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePassword = () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage("Please complete all password fields.");
      return;
    }

    if (passwordForm.currentPassword !== savedPassword) {
      setPasswordMessage("Current password is incorrect.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New password and confirm password do not match.");
      return;
    }

    setSavedPassword(passwordForm.newPassword);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordMessage("Password changed successfully.");
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordMessage("");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleToggleTwoFactor = () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    setTwoFactorMessage(
      next
        ? "Two-factor authentication has been enabled."
        : "Two-factor authentication has been disabled."
    );
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  const getStatusStyle = (status) => {
    if (status === "Verified") return "bg-emerald-100 text-emerald-700";
    if (status === "Passed") return "bg-emerald-100 text-emerald-700";
    if (status === "Active") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-24 text-slate-800">
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-6 text-white shadow-xl md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 left-20 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-white shadow-lg ring-4 ring-white/10">
                <User size={34} />
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                  <BadgeCheck size={14} />
                  Verified Driver Profile
                </div>

                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {fullName}
                </h1>
                <p className="mt-1 text-sm text-slate-200 md:text-base">
                  {profile.email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    4.8 Rating
                  </div>
                  <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm">
                    Driver since {profile.memberSince}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={isEditingProfile ? handleCancelEdit : handleStartEdit}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <Pencil size={16} />
              {isEditingProfile ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left side */}
          <div className="space-y-6 lg:col-span-1">
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <User size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Account Status
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage your availability
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Online Status
                    </p>
                    <p className="text-xs text-slate-500">
                      Show that you are available
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOnline(!isOnline)}
                    className={`relative h-8 w-14 rounded-full transition ${
                      isOnline ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                        isOnline ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Accepting Orders
                    </p>
                    <p className="text-xs text-slate-500">
                      Receive new booking requests
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAcceptingOrders(!acceptingOrders)}
                    className={`relative h-8 w-14 rounded-full transition ${
                      acceptingOrders ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                        acceptingOrders ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <Shield size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Security
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage your account safety
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Lock size={18} className="text-blue-600" />
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
                  <span className="text-sm font-medium text-slate-400">Open</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowTwoFactorModal(true);
                    setTwoFactorMessage("");
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Smartphone size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-slate-500">
                        Extra protection for your account
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      twoFactorEnabled
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </button>
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Performance Stats
              </h2>

              <div className="mt-5 grid gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
                  >
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right side */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <User size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Personal Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    View and manage your profile details
                  </p>
                </div>
              </div>

              {profileMessage && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {profileMessage}
                </div>
              )}

              {isEditingProfile ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={draftProfile.firstName}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={draftProfile.lastName}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={draftProfile.email}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={draftProfile.phone}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
                      <CalendarDays size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Driver Since
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.memberSince}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <Car size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Vehicle Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    View and manage your vehicle details
                  </p>
                </div>
              </div>

              {isEditingProfile ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Vehicle Type
                    </label>
                    <input
                      type="text"
                      name="vehicleType"
                      value={draftProfile.vehicleType}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Plate Number
                    </label>
                    <input
                      type="text"
                      name="plateNumber"
                      value={draftProfile.plateNumber}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Driver's License Number
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={draftProfile.licenseNumber}
                      onChange={handleDraftChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <Car size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Vehicle Type
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.vehicleType}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <BadgeCheck size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Plate Number
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.plateNumber}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Driver's License Number
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {profile.licenseNumber}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <FileText size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Documents & Verification
                  </h2>
                  <p className="text-sm text-slate-500">
                    Check your submitted and verified documents
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {documentsList.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[30px] border border-red-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Logout</h2>
                  <p className="text-sm text-slate-500">
                    Sign out from your driver account
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Change Password
              </h3>
              <button type="button" onClick={handleClosePasswordModal}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInput}
                  placeholder="Enter current password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInput}
                  placeholder="Enter new password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordInput}
                  placeholder="Confirm new password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-400"
                />
              </div>

              {passwordMessage && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    passwordMessage.includes("successfully")
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {passwordMessage}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClosePasswordModal}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePassword}
                  className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Two-Factor Authentication
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowTwoFactorModal(false);
                  setTwoFactorMessage("");
                }}
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Current Status
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {twoFactorEnabled
                  ? "Two-factor authentication is currently enabled."
                  : "Two-factor authentication is currently disabled."}
              </p>
            </div>

            {twoFactorMessage && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {twoFactorMessage}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowTwoFactorModal(false);
                  setTwoFactorMessage("");
                }}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleToggleTwoFactor}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
                  twoFactorEnabled
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[30px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <LogOut size={24} className="text-red-500" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Are you sure you want to logout?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              You will be returned to the default page.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600"
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