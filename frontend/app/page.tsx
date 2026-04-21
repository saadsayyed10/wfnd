"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  const { token, logout, hydrate } = useAuth();

  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, []);

  const handleLogout = async () => {
    await logout();
    alert("You are logged out");
    router.replace("/auth/login");
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <h1 className="w-12 truncate">{token}</h1>
      {token && (
        <button
          type="button"
          className="py-3.5 px-8 mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md shadow-blue-200 text-sm tracking-wide cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default App;
