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
        
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users', 
              data
            );
            console.log("User added successfully :", response.data);
            toast.success("User added successfully");
            navigate('/user-details');
        } catch (error) {
            console.error(error);
            toast.error("Unable to add user");
        }
    }

  return (
    <div>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2 mt-4">Add User</h1>
        <p className="text-center text-gray-600 mb-8">Please fill in the form below to add a new user.</p>
      <form onSubmit={onsubmit} className="max-w-md mx-auto bg-gray-100 p-6 rounded-md border border-gray-300 shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input 
            type="text" 
            id="name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input 
            type="email" 
            id="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age:</label>
          <input 
            type="number" 
            id="age" 
            required 
            value={age}
            onChange={(e) => setAge(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
          <input 
            type="text" 
            id="address" 
            required 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer">Submit</button>
      </form>
    </div>
  )
}

export default Adduser