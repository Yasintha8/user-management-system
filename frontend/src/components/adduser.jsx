import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import {toast}  from "react-hot-toast";
const Adduser = () => {
    
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const onsubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, age, address }

        const token = localStorage.getItem("token"); // get token from localStorage
        console.log("🚀 Sending token:", token); 
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users', 
              data,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            console.log("User added successfully :", response.data);
            console.log("Token from localStorage:", localStorage.getItem("token"));
            toast.success("User added successfully");
            navigate('/user-details');
        } catch (error) {
            console.error(error);
            toast.error("Unable to add user");
        }
    }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mt-6">Add User</h1>
    <p className="text-center text-gray-600 mb-6 sm:mb-8">Please fill in the form below to add a new user.</p>
    
    <form
      onSubmit={onsubmit}
      className="w-full max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-md"
    >
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          required
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Age */}
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 font-semibold mb-1">
          Age:
        </label>
        <input
          type="number"
          id="age"
          required
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Address */}
      <div className="mb-6">
        <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">
          Address:
        </label>
        <input
          type="text"
          id="address"
          required
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
      >
        Submit
      </button>
    </form>
</div>

  )
}

export default Adduser