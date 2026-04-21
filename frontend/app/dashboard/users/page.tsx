"use client";

import {
  approveUserAPI,
  deleteUserAPI,
  disapproveUserAPI,
  fetchAllUsersAPI,
  registerWorkerAPI,
  setPaymentAPI,
} from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Ellipsis } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type UserType = "ADMIN" | "MODERATOR" | "WORKER";

interface User {
  id: string;
  name: string;
  email: string;
  user_type: UserType;
  status: boolean;
  daily_payment: number;
  created_at: string;
}

const USER_TYPE_FILTERS: { label: string; value: UserType | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Admin", value: "ADMIN" },
  { label: "Moderator", value: "MODERATOR" },
  { label: "Worker", value: "WORKER" },
];

const roleBadge: Record<UserType, string> = {
  ADMIN: "bg-blue-100 text-blue-700",
  MODERATOR: "bg-purple-100 text-purple-700",
  WORKER: "bg-emerald-100 text-emerald-700",
};

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const Users = () => {
  const { hydrate, token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<UserType | "ALL">("ALL");

  const [paymentDialog, setPaymentDialog] = useState(false);

  const [dailyPayment, setDailyPayment] = useState("");
  const [workerName, setWorkerName] = useState("");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchAllUsersAPI();
      setUsers(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    hydrate();
  }, []);

  const addWorker = async () => {
    if (!workerName) {
      alert("Worker's name is required to add");
      return;
    }
    try {
      await registerWorkerAPI(workerName);
      alert("New worker added, please wait until admin approves.");
      setWorkerName("");
      fetchAllUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  const handlePayment = async (userId: string) => {
    if (!dailyPayment) {
      alert("Please enter an amount.");
      return;
    }
    try {
      const res = await setPaymentAPI(userId, parseFloat(dailyPayment), token!);
      alert("Payment assign successful");
      setDailyPayment("");
      fetchAllUsers();

      setPaymentDialog(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to update payment");
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await approveUserAPI(userId, token!);
      alert("User approved successfully.");
      fetchAllUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to approve employee");
    }
  };

  const handleDisapprove = async (userId: string) => {
    try {
      await disapproveUserAPI(userId, token!);
      alert("User disapproved successfully.");
      fetchAllUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to disapprove employee");
    }
  };

  const handleUserRemove = async (userId: string) => {
    try {
      await deleteUserAPI(userId, token!);
      alert("User deleted successfully.");
      fetchAllUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to delete employee");
    }
  };

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();
    return users.filter((u) => {
      const matchesSearch =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.user_type.toLowerCase().includes(query) ||
        u.id.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "ALL" || u.user_type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, activeFilter]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-sans px-4 py-10 lg:px-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and monitor all accounts in the Executive Layer.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search by name, email, role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {USER_TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 border ${
                activeFilter === f.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {f.label}
            </button>
          ))}
          <Dialog>
            <DialogTrigger
              className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 lg:ml-60 border bg-neutral-800 text-white border-neutral-800 shadow-md shadow-neutral-200`}
            >
              Add Worker
            </DialogTrigger>
            <DialogContent
              className={
                "lg:w-120 lg:h-min flex justify-start items-start flex-col p-6"
              }
            >
              <h5 className="lg:text-xl font-semibold">Worker&apos;s Name</h5>
              <input
                placeholder="Type full name of the worker..."
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                className="w-full pl-4 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
              <div className="flex justify-start items-start w-full flex-row lg:gap-x-4 lg:mt-10">
                <Button
                  onClick={addWorker}
                  className={"bg-blue-600 hover:bg-blue-500"}
                >
                  {loading ? (
                    <svg
                      className="animate-spin w-7 h-7 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </Button>
                <Button variant={"ghost"}>Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Result count */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">{users.length}</span>{" "}
            users
          </span>
          {search || activeFilter !== "ALL" ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("ALL");
              }}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {[
                  "Name",
                  "Email",
                  "Role",
                  "Status",
                  "Daily Payment",
                  "Joined",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <svg
                        className="animate-spin w-7 h-7 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      <span className="text-sm">Loading users…</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <p className="text-sm font-medium text-gray-500">
                        No users found
                      </p>
                      <p className="text-xs text-gray-400">
                        Try adjusting your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, i) => (
                  <tr
                    key={u.id}
                    className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors duration-150 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    {/* Name + Avatar */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {u.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {u.email}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${roleBadge[u.user_type] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {u.user_type}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          u.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${u.status ? "bg-green-500" : "bg-red-400"}`}
                        />
                        {u.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Daily Payment */}
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap font-medium">
                      {u.user_type === "ADMIN"
                        ? "-"
                        : `₹${u.daily_payment.toFixed(2)}`}
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap text-xs">
                      {formatDate(u.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        {u.user_type !== "ADMIN" && (
                          <DropdownMenuTrigger>
                            <Ellipsis className="w-4 h-4 lg:ml-6 cursor-pointer" />
                          </DropdownMenuTrigger>
                        )}
                        <DropdownMenuContent
                          className="w-40 text-sm rounded-lg"
                          align="start"
                        >
                          <DropdownMenuGroup>
                            {u.status ? (
                              <DropdownMenuItem
                                onClick={() => handleDisapprove(u.id)}
                                className="w-44"
                              >
                                Disapprove
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleApprove(u.id)}
                                className="w-44"
                              >
                                Approve
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUserId(u.id);
                                setPaymentDialog(true);
                              }}
                            >
                              Update Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUserRemove(u.id)}
                              className="w-44 bg-red-500/10 text-red-500"
                            >
                              Remove Employee
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
        <DialogContent className="lg:w-105 rounded-2xl p-0 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Update Payment
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Set the daily payment amount for this worker.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Daily Payment (₹)
              </label>
              <Input
                className="w-full h-11 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter amount (e.g. 500)"
                value={dailyPayment}
                onChange={(e) => setDailyPayment(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setPaymentDialog(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedUserId) handlePayment(selectedUserId);
              }}
              className="bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-200"
            >
              Update Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
