import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // this is from context

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/login/loginUser",
        { email, password }
      );

      const { token, user } = res.data;
      console.log("Login response:", res.data);

      if (token && user) {
        login(user, token); // store both in context/localStorage
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error("Invalid login response");
      }
    } catch (error) {
      console.error("Login failed", error.response?.data || error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-[280px]">
      <h2 className="text-3xl font-semibold mb-2 text-center text-blue-600">Login</h2>
      <p className="text-gray-600 text-center mb-8">Please enter your email and password to login.</p>

      <label className="block mb-2 font-medium text-gray-700">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 outline-none mb-6 transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block mb-2 font-medium text-gray-700">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 outline-none mb-8 transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition w-full cursor-pointer"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
