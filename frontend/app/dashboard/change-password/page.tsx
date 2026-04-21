"use client";

import { changePasswordAPI } from "@/api/user.api";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChangePassword = () => {
  const { hydrate, token, logout } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please do not leave any fields blank.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords did not match.");
      return;
    }

    setLoading(true);
    try {
      await changePasswordAPI(oldPassword, newPassword, token!);
      await logout();

      alert("Password changed successfully, please login again.");
      router.replace("/auth/login");
    } catch (error) {
      // alert("Please enter current password");
      alert(error);
      console.log(token!);
      console.log(error);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="min-h-screen bg-[#eef1f8] flex font-sans">
      {/* Main Content */}
      <main className="flex-1 px-10 py-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Change Password
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Update your credentials to keep your executive access secure. We
            recommend using a unique password you don't use elsewhere.
          </p>
        </div>

        {/* Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Current Password */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="••••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
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

          {/* New + Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                New Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Confirm New Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 lg:mt-14">
            <button
              onClick={handleChangePassword}
              className="cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-200 transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Change Password"
              )}
            </button>

            <button className="cursor-pointer text-gray-500 text-sm hover:text-gray-700 px-4 py-3 hover:bg-gray-100 transition duration-300 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
