"use client";

import { resetPasswordAPI } from "@/api/user.api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      alert("Existing email is required to reset");
      return;
    }
    setLoading(true);
    try {
      await resetPasswordAPI(email);
      alert("Kindly check new password sent to your mail.");
      setEmail("");
    } catch (error) {
      console.log(error);
      alert("Email does not exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1f8] font-sans flex flex-col">
      {/* Main centered content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          {/* Left Panel */}
          <div
            className="w-full lg:w-[52%] p-8 lg:p-10 flex flex-col justify-between min-h-85 lg:min-h-110"
            style={{
              background:
                "linear-gradient(145deg, #dde4f0 0%, #c9d4e8 60%, #bcc9e0 100%)",
            }}
          >
            {/* Logo */}
            <div>
              <h2 className="text-4xl font-bold text-gray-600 tracking-tight">
                Wood Furniture
                <br /> & Decore.
              </h2>
            </div>

            {/* Hero text */}
            <div className="my-auto pt-10 lg:pt-0">
              <h3 className="text-3xl font-bold text-gray-800 leading-snug mb-3">
                Security &amp;
                <br />
                Resilience.
              </h3>
              <p className="text-gray-600 text-base leading-relaxed max-w-xs">
                Restoring access to your command center with enterprise-grade
                protection.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-[48%] bg-white px-8 lg:px-12 py-10 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Enter your email to receive a temporary password.
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5">
              {/* Work Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Work Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="wood@furniture.decore"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 7l10 7 10-7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleResetPassword}
                className="cursor-pointer w-full py-3.5 mt-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md shadow-blue-200 text-sm tracking-wide"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>

            {/* Back to login */}
            <div className="mt-8 flex justify-end">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
