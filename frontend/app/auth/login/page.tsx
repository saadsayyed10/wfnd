"use client";

import { loginUserAPI } from "@/api/user.api";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { hydrate, setAuth, token } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUserAPI(email, password);
      const { token, user } = res.data;

      setAuth(token, user);

      setEmail("");
      setPassword("");

      alert("You are logged in");

      router.replace("/");
    } catch (error) {
      console.log(error);
      setPassword("");
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Panel */}
      <div
        className="relative hidden lg:flex lg:w-[60%] flex-col justify-between p-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #0d2a4a 0%, #050d1a 60%, #000 100%)",
        }}
      >
        {/* Network SVG background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a6fa8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#050d1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#glow)" />
          <line
            x1="200"
            y1="150"
            x2="450"
            y2="300"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <line
            x1="450"
            y1="300"
            x2="600"
            y2="180"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <line
            x1="600"
            y1="180"
            x2="700"
            y2="350"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="700"
            y1="350"
            x2="500"
            y2="500"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="500"
            y1="500"
            x2="300"
            y2="450"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1="300"
            y1="450"
            x2="200"
            y2="150"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1="100"
            y1="350"
            x2="450"
            y2="300"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="450"
            y1="300"
            x2="500"
            y2="500"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="600"
            y1="600"
            x2="700"
            y2="350"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1="150"
            y1="550"
            x2="300"
            y2="450"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="400"
            y1="100"
            x2="600"
            y2="180"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1="200"
            y1="150"
            x2="400"
            y2="100"
            stroke="#2a7fc4"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <circle cx="200" cy="150" r="3" fill="#4ab3f4" opacity="0.8" />
          <circle cx="450" cy="300" r="4" fill="#4ab3f4" opacity="0.9" />
          <circle cx="600" cy="180" r="3" fill="#4ab3f4" opacity="0.7" />
          <circle cx="700" cy="350" r="2.5" fill="#4ab3f4" opacity="0.6" />
          <circle cx="500" cy="500" r="3.5" fill="#4ab3f4" opacity="0.8" />
          <circle cx="300" cy="450" r="2.5" fill="#4ab3f4" opacity="0.6" />
          <circle cx="100" cy="350" r="2" fill="#4ab3f4" opacity="0.5" />
          <circle cx="400" cy="100" r="2" fill="#4ab3f4" opacity="0.5" />
          <circle cx="600" cy="600" r="2.5" fill="#4ab3f4" opacity="0.5" />
          <circle cx="150" cy="550" r="2" fill="#4ab3f4" opacity="0.4" />
        </svg>

        {/* Hero Content */}
        <div className="relative z-10 mt-auto mb-auto">
          <h1 className="text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Wood Furniture
            <br />& Decore.
          </h1>
          <p className="text-[#8ba8c4] text-lg leading-relaxed max-w-sm">
            A system to manage attendance of workers and their weekly pay
            checks.
          </p>
          <div className="flex gap-4 mt-10">
            <button className="px-5 py-2.5 border border-white/30 text-white text-xs font-semibold tracking-widest uppercase rounded hover:bg-white/10 transition-colors duration-200">
              Admin Access
            </button>
            <button className="px-5 py-2.5 border border-white/30 text-white text-xs font-semibold tracking-widest uppercase rounded hover:bg-white/10 transition-colors duration-200">
              Moderator Suite
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-base tracking-wide">
            Employee Management
          </span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col w-full lg:w-[40%] bg-[#f5f6fa] min-h-screen">
        <div className="flex flex-col justify-center flex-1 px-10 lg:px-16 py-16">
          {/* Sign In Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Sign In</h2>
            <p className="text-gray-500 text-sm">
              Access your administrative dashboard.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="name@executive.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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

            {/* Login Button */}
            <button
              type="button"
              className="w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md shadow-blue-200 text-sm tracking-wide cursor-pointer"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
            </button>
          </div>

          {/* Request Access */}
          <div className="mt-10 text-sm text-gray-500">
            New to the Workspace?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Register Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 lg:px-16 py-6 flex items-center justify-between border-t border-gray-200">
          <span className="text-xs text-gray-400 tracking-widest uppercase">
            © Saad Sayyed
          </span>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-gray-400 tracking-widest uppercase hover:text-gray-600 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 tracking-widest uppercase hover:text-gray-600 transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
