"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const ProfilePage = () => {
  const { hydrate, user } = useAuth();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="min-h-screen bg-[#eef1f8] flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            General Profile
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Top Section */}
          <div className="flex items-center gap-5 mb-8">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
              {user?.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wider">
                ROLE
              </label>
              <div className="mt-1 text-sm text-gray-800 font-medium">
                {user?.user_type}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wider">
                STATUS
              </label>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    user?.status ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {user?.status ? "Active" : "Inactive"}
              </div>
            </div>

            {/* Daily Payment */}
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wider">
                DAILY PAYMENT
              </label>
              <div className="mt-1 text-sm text-gray-800 font-medium">
                ₹ {user?.daily_payment}
              </div>
            </div>

            {/* Created At */}
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wider">
                CREATED AT
              </label>
              <div className="mt-1 text-sm text-gray-800 font-medium">
                {/* {new Date(user?.created_at).toLocaleString()} */}
                {user?.created_at.split("T")[0]}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200" />

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
