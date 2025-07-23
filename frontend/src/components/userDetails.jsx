import axios from "axios";
import { useEffect, useState } from "react";

const UserDetails = () => {

  const [Users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users')
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
      .catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">User Details Display</h1>
      <p className="text-center text-gray-600 mb-8">Check the details of users</p>

      <div className="grid gap-6">
        {Users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <p className="text-lg font-semibold text-gray-800">Name: <span className="font-normal">{user.name}</span></p>
            <p className="text-gray-600">ID: {user._id}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">Address: {user.address}</p>
            <div className="mt-4">
              <button 
                onClick={() => 
                  window.location.href = `/update-user/${user._id}`
                }
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">Update</button>
              <button className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default UserDetails