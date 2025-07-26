import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/register/registerUser",
        formData
      );
      console.log(response.data);
      toast.success(response.data.message || "User registered successfully");
      localStorage.setItem("token", response.data.token);
      navigate("/login", { state: { defaultTab: "login" } });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to register user");
    }
  };

  return (
    <div className="flex flex-col justify-center px-4">
      <h2 className="text-3xl font-semibold mb-2 text-center text-blue-600">Register</h2>
      <p className="text-center text-gray-600 mb-8">Please fill in the form below to create an account.</p>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 outline-none mb-6 transition"
        />

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 outline-none mb-6 transition"
        />

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 outline-none mb-6 transition"
        />

        <label className="block mb-2 font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
          className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 outline-none mb-8 transition"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition w-full cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
