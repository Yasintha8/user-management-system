// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./login";
import Register from "./register";

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (location.state?.defaultTab === "login") {
      setIsLogin(true);
    } else if (location.state?.defaultTab === "register") {
      setIsLogin(false);
    }
  }, [location.state]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-blue-700 to-cyan-400">
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-5 sm:px-10">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-5 text-gray-900">
              User Management System
            </h1>

            {/* Toggle buttons */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-3 sm:py-3 sm:px-6 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-3 sm:py-3 sm:px-6 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 cursor-pointer ${
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
          <div className="px-6 pb-8 sm:px-10">
            <div className="min-h-[240px]">{isLogin ? <Login /> : <Register />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
