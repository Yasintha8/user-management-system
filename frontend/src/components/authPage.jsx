// src/pages/AuthPage.jsx
import { useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-5 bg-gradient-to-tr from-blue-700 to-cyan-400	">
  {/* Optional overlay for extra contrast */}
  <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2 tracking-tight">
              Welcome to User Management System
            </h1>
            <p className="text-gray-600 text-center mb-8">Easy way to manage your users</p>

            {/* Toggle buttons */}
            <div className="flex bg-gray-100 rounded-xl p-1 cursor-pointer">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-5 text-base font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-md cursor-pointer"
                    : "text-gray-600 hover:text-gray-900 cursor-pointer"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-5 text-base font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  !isLogin
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
