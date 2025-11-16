import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "tailwindcss/tailwind.css";

export default function ClinicAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  // ✅ Valid email syntax (any domain)
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
    const response = await fetch("https://fikar-admins.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok) {
      setPasswordError(data.message || "Login failed!");
      return;
    }

    setToastMessage("Login successful! Redirecting...");
    setShowToast(true);

    // You can store user info in localStorage if needed
    localStorage.setItem("adminUsers", JSON.stringify(data.user));

    setTimeout(() => navigate("/admin"), 500);
  } catch (error) {
    console.error("Error during login:", error);
    setPasswordError("Server error. Please try again later.");
  }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute bottom-4 right-4 bg-blue-50 text-blue-900 text-sm p-4 rounded-md shadow-lg border border-blue-200 max-w-xs w-full">
          <p>{toastMessage}</p>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/fikar-logo.svg" alt="Fikar Plus Logo" className="h-20" />
        </div>

        <h3 className="text-center text-lg font-semibold text-slate-700 mb-2">
          Admin Access
        </h3>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in to your Fikar Plus Admin account
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.replace(/\s/g, ""));
                setEmailError("");
              }}
              placeholder="Enter your email"
              required
              className={`w-full px-4 py-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="********"
                required
                className={`w-full px-4 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-600">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium">
            Create Account
          </a>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          Need help? Contact{" "}
          <a
            href="mailto:support@fikarplus.com"
            className="text-blue-600 font-medium"
          >
            support@fikarplus.com
          </a>
        </div>

        <div className="text-center text-[11px] text-gray-400 mt-4">
          © 2025 Fikar Plus. All rights reserved.
        </div>
      </div>
    </div>
  );
}
