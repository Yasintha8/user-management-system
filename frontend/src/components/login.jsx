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
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login