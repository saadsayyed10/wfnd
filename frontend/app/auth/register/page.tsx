"use client";

import { registerAdminAPI, registerModeratorAPI } from "@/api/user.api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Role = "ADMIN" | "MODERATOR";

const AdminIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M17 3l1.5 1.5L21 2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ModeratorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.5 7.1 17.2l.9-5.5L4 7.8l5.5-.8L12 2z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const Register = () => {
  const [role, setRole] = useState<Role>("ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      if (role === "ADMIN") {
        await registerAdminAPI(form.name, form.email, form.password, role);
      }
      if (role === "MODERATOR") {
        await registerModeratorAPI(form.name, form.email, form.password, role);
      }
      setForm({ name: "", email: "", password: "" });
      alert("Account created, please wait until Admin approves.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Main content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Panel */}
        <div
          className="relative w-full lg:w-[50%] min-h-70 lg:min-h-screen flex flex-col justify-between p-8 lg:p-12 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #dde3ee 0%, #c8d0e0 40%, #b8c4d8 100%)",
          }}
        >
          {/* Subtle geometric overlays */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute"
              style={{
                width: "420px",
                height: "420px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                top: "-100px",
                right: "-80px",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                bottom: "60px",
                left: "-60px",
              }}
            />
            {/* Vertical divider fade */}
            <div
              className="absolute right-0 top-0 h-full w-24 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(200,210,225,0.6))",
              }}
            />
          </div>

          {/* Hero Text */}
          <div className="relative z-10 mt-auto lg:mt-[30%]">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Wood Furniture <br /> & Decore.
            </h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-sm">
              Create your account to manage workers, their attendance and weekly
              pay checks.
            </p>

            {/* Badge */}
            <div className="flex items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold text-sm lg:text-base">
                Employee Management
              </span>
            </div>
          </div>

          {/* Spacer for bottom on desktop */}
          <div className="hidden lg:block" />
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[50%] bg-white flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-16">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create {role === "MODERATOR" ? "Moderator" : "Admin"} Account
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Join the Executive Layer and start managing with precision.
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
              Select Your Role
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(["ADMIN", "MODERATOR"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex flex-col cursor-pointer items-center justify-center gap-2 py-4 px-3 rounded-xl border-2 transition-all duration-200 ${
                    role === r
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {r === "MODERATOR" ? <AdminIcon /> : <ModeratorIcon />}
                  <span className="text-xs font-bold tracking-widest uppercase">
                    {r}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/* Work Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Work Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@executivelayer.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full py-3.5 mt-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md shadow-blue-200 text-sm tracking-wide"
              onClick={handleRegister}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Complete Registration"
              )}
            </button>
          </div>

          {/* Log in link */}
          <div className="mt-8 text-sm text-center text-gray-500">
            Already part of the ecosystem?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 bg-white px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-sm font-semibold text-gray-800">
          Employee Management
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Resume
          </Link>
        </div>
        <span className="text-xs text-gray-400">© Saad Sayyyed</span>
      </footer>
    </div>
  );
};

export default Register;
