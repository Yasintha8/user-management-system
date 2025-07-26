// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./login";
import Register from "./register";

const AuthPage = () => {
  const location = useLocation();

  // Check location.state for default tab; fallback to login
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (location.state?.defaultTab === "login") {
      setIsLogin(true);
    } else if (location.state?.defaultTab === "register") {
      setIsLogin(false);
    }
  }, [location.state]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-5 bg-gradient-to-tr from-blue-700 to-cyan-400">
      {/* Optional overlay for extra contrast */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
              User Management System
            </h1>

            {/* Toggle buttons */}
            <div className="flex bg-gray-100 rounded-xl p-1 cursor-pointer">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-5 text-base font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-5 text-base font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  !isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-10">
            <div className="min-h-[280px]">
              {isLogin ? <Login /> : <Register />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
