// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to register user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Register
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
