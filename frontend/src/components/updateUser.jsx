import axios from "axios";  
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateUser = () => {

    const token = localStorage.getItem("token");

    const { id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const onsubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, age, address }
        
        try {
            const response = await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`, 
              data,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            console.log("User updated successfully :", response.data);
            toast.success("User updated successfully");
            navigate('/user-details');
        } catch (error) {
            console.error(error);
            toast.error("Unable to update user");
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`,{
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
                setAddress(response.data.address);
            } catch (error) {
                console.error(error);
            }
        }
        if (!token) {
        toast.error("No token found. Please log in again.");
        navigate("/login");
        return;
        }
        fetchUser();
    }, [id]);

  return (
    <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2 mt-4">Update User</h1>
        <p className="text-center text-gray-600 mb-8">Please fill in the form below to update a user.</p>

        <form 
            onSubmit={onsubmit} 
            className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200">
            
            <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">Age</label>
            <input 
                type="number" 
                id="age" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
            <input 
                type="text" 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out cursor-pointer"
            >
            Update User
            </button>
        </form>
        </div>
  )
}

export default UpdateUser
