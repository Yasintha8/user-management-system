import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  async function handleLogin() {
  if (!email || !password) {
    toast.error("Email and password are required");
    return;
  }

  try {
    const res = await axios.post(
      import.meta.env.VITE_BACKEND_URL + '/api/login/loginUser',
      { email, password }
    );
    console.log(res.data);
    toast.success("Login successful");
    navigate('/');
  } catch (error) {
    console.log("Login failed", error.response.data);
    toast.error(error.response.data.message || "Login failed");
  }
}

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
  <div className="w-full max-w-md bg-white p-6 rounded shadow mx-4 ">
    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Login</h2>
    
    <label className="block mb-1 font-medium">Email</label>
    <input
      type="email"
      placeholder="Email"
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <label className="block mb-1 font-medium">Password</label>
    <input
      type="password"
      placeholder="Password"
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-6"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition"
      onClick={handleLogin}
    >
      Login
    </button>
  </div>
</div>

  )
}

export default Login