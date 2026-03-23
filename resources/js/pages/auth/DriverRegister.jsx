import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Car,
  FileText,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Upload,
  AlertTriangle,
  ArrowLeft,
  Box,
} from "lucide-react";

export default function DriverRegister() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
  });

  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    plateNumber: "",
    vehicleColor: "",
    makeModel: "",
    year: "",
  });

  const [documents, setDocuments] = useState({
    driversLicense: null,
    orcr: null,
    governmentId: null,
    nbiClearance: null,
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0] || null;
    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      personalData,
      vehicleData,
      documents,
    });

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/driver-login");
    }, 2500);
  };

  const stepCircleClass = (currentStep) =>
    step >= currentStep
      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
      : "bg-slate-200 text-slate-500";

  const stepLineClass = (lineStep) =>
    step > lineStep ? "bg-blue-600" : "bg-slate-200";

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay,
      },
    }),
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-sm";

  const iconInputWrapClass =
    "flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm";

  const UploadBox = ({ title, subtitle, field }) => (
    <label className="block cursor-pointer">
      <input
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, field)}
      />
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-white"
      >
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Upload size={26} className="text-blue-600" />
          </div>
        </div>

        <h4 className="text-base font-semibold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>

        {documents[field] && (
          <p className="mt-3 text-sm font-medium text-blue-600">
            Selected: {documents[field].name}
          </p>
        )}
      </motion.div>
    </label>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#ffffff,_#f8fafc)] text-slate-900">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed left-4 right-4 top-4 z-50 flex justify-center"
          >
            <div className="flex w-full max-w-md items-start gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Application submitted
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  We&apos;ll review your details and get back to you within 24
                  hours.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-2"
        >
          {/* Left Side */}
          <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-10 text-white lg:flex">
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.05}
                className="mb-8 flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Box size={24} />
                </div>
                <div>
                  <h1 className="text-[24px] font-bold tracking-tight">
                    PadalaExpress
                  </h1>
                  <p className="text-sm text-white/80">
                    Driver application portal
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.15}
                className="max-w-md"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                  Join the team
                </p>
                <h2 className="text-[34px] font-bold leading-tight">
                  Become a driver and start earning with confidence
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-white/85">
                  Complete your application, submit your documents, and get ready
                  to accept delivery requests with a cleaner and simpler driver
                  experience.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-4">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.25}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/15 p-4 backdrop-blur-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <User size={18} />
                  <p className="text-sm font-semibold">Simple application</p>
                </div>
                <p className="text-sm text-white/80">
                  Fill in your details step by step with an easy flow.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.35}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/15 p-4 backdrop-blur-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <FileText size={18} />
                  <p className="text-sm font-semibold">Fast verification</p>
                </div>
                <p className="text-sm text-white/80">
                  Upload your documents and wait for quick review.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white/80 px-5 py-8 sm:px-8 sm:py-10">
            <div className="mx-auto w-full max-w-2xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="mb-8"
              >
                <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                    <Box size={20} />
                  </div>
                  <h1 className="text-[22px] font-bold tracking-tight text-slate-900">
                    PadalaExpress
                  </h1>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[26px] font-bold tracking-tight text-slate-900">
                    Driver Registration
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Complete the steps below to submit your application.
                  </p>
                </div>
              </motion.div>

              {/* Steps */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.16}
                className="mb-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-1 flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition ${stepCircleClass(
                        1
                      )}`}
                    >
                      {step > 1 ? <CheckCircle2 size={18} /> : <User size={18} />}
                    </div>
                    <span className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
                      Personal
                    </span>
                  </div>

                  <div
                    className={`h-1 flex-1 rounded-full transition ${stepLineClass(
                      1
                    )}`}
                  />

                  <div className="flex flex-1 flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition ${stepCircleClass(
                        2
                      )}`}
                    >
                      {step > 2 ? <CheckCircle2 size={18} /> : <Car size={18} />}
                    </div>
                    <span className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
                      Vehicle
                    </span>
                  </div>

                  <div
                    className={`h-1 flex-1 rounded-full transition ${stepLineClass(
                      2
                    )}`}
                  />

                  <div className="flex flex-1 flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition ${stepCircleClass(
                        3
                      )}`}
                    >
                      <FileText size={18} />
                    </div>
                    <span className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
                      Documents
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900">
                        Personal Information
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Tell us about yourself.
                      </p>

                      <form onSubmit={nextStep} className="mt-6 space-y-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="Juan"
                              value={personalData.firstName}
                              onChange={handlePersonalChange}
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
                              placeholder="Dela Cruz"
                              value={personalData.lastName}
                              onChange={handlePersonalChange}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Phone Number
                          </label>
                          <div className={iconInputWrapClass}>
                            <Phone size={18} className="text-slate-400" />
                            <input
                              type="text"
                              name="phone"
                              placeholder="09XX XXX XXXX"
                              value={personalData.phone}
                              onChange={handlePersonalChange}
                              className="w-full bg-transparent text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email Address
                          </label>
                          <div className={iconInputWrapClass}>
                            <Mail size={18} className="text-slate-400" />
                            <input
                              type="email"
                              name="email"
                              placeholder="juan@email.com"
                              value={personalData.email}
                              onChange={handlePersonalChange}
                              className="w-full bg-transparent text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Home Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder="123 Main St, Quezon City"
                            value={personalData.address}
                            onChange={handlePersonalChange}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Date of Birth
                          </label>
                          <div className={iconInputWrapClass}>
                            <Calendar size={18} className="text-slate-400" />
                            <input
                              type="date"
                              name="dob"
                              value={personalData.dob}
                              onChange={handlePersonalChange}
                              className="w-full bg-transparent text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                          <div className="flex items-center justify-between">
                            <Link
                              to="/driver-login"
                              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
                            >
                              <ArrowLeft size={16} />
                              Cancel
                            </Link>

                            <button
                              type="submit"
                              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900">
                        Vehicle Information
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Tell us about your vehicle.
                      </p>

                      <form onSubmit={nextStep} className="mt-6 space-y-5">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Vehicle Type
                          </label>
                          <select
                            name="vehicleType"
                            value={vehicleData.vehicleType}
                            onChange={handleVehicleChange}
                            className={inputClass}
                          >
                            <option value="">Select vehicle type</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="bike">Bike</option>
                            <option value="car">Car</option>
                            <option value="van">Van</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Plate Number
                            </label>
                            <input
                              type="text"
                              name="plateNumber"
                              placeholder="ABC 1234"
                              value={vehicleData.plateNumber}
                              onChange={handleVehicleChange}
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Vehicle Color
                            </label>
                            <input
                              type="text"
                              name="vehicleColor"
                              placeholder="Red"
                              value={vehicleData.vehicleColor}
                              onChange={handleVehicleChange}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Vehicle Make & Model
                          </label>
                          <input
                            type="text"
                            name="makeModel"
                            placeholder="Honda Wave 125"
                            value={vehicleData.makeModel}
                            onChange={handleVehicleChange}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Year
                          </label>
                          <input
                            type="text"
                            name="year"
                            placeholder="2022"
                            value={vehicleData.year}
                            onChange={handleVehicleChange}
                            className={inputClass}
                          />
                        </div>

                        <div className="rounded-2xl bg-blue-50 px-5 py-5">
                          <h4 className="text-lg font-semibold text-slate-900">
                            Vehicle Requirements
                          </h4>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                            <li>Must be in good working condition</li>
                            <li>Valid registration and insurance</li>
                            <li>For motorcycles: Top box required</li>
                            <li>Regular maintenance records</li>
                          </ul>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Back
                            </button>

                            <button
                              type="submit"
                              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900">
                        Documents Upload
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Upload the required documents for verification.
                      </p>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <UploadBox
                          title="Driver's License"
                          subtitle="Front and back copy"
                          field="driversLicense"
                        />

                        <UploadBox
                          title="Vehicle OR/CR"
                          subtitle="Official Receipt & Certificate of Registration"
                          field="orcr"
                        />

                        <UploadBox
                          title="Government-Issued ID"
                          subtitle="National ID, Passport, or SSS ID"
                          field="governmentId"
                        />

                        <UploadBox
                          title="NBI Clearance"
                          subtitle="Not older than 6 months"
                          field="nbiClearance"
                        />

                        <div className="rounded-2xl border border-yellow-300 bg-yellow-50 px-5 py-5">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              size={20}
                              className="text-yellow-600"
                            />
                            <h4 className="text-base font-semibold text-yellow-900">
                              Important Notes
                            </h4>
                          </div>

                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-yellow-800">
                            <li>All documents must be clear and readable</li>
                            <li>Accepted formats: JPG, PNG, PDF</li>
                            <li>Max file size: 5MB per document</li>
                            <li>Processing time: 1-2 business days</li>
                          </ul>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Back
                            </button>

                            <button
                              type="submit"
                              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Submit Application
                            </button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.24}
                className="mt-8 text-center text-sm text-slate-500"
              >
                Already have an account?{" "}
                <Link
                  to="/driver-login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}