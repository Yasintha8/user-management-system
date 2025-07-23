import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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


  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Are you sure, you want to delete this user?
        <div className="flex gap-2 mt-2">
        <button 
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
          onClick={async ()=>{
            toast.dismiss(t.id);
            try {
              const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`);
              console.log(response.data);
              toast.success("User deleted successfully");
              fetchUsers();
            } catch (error) {
              console.error(error);
              toast.error("Unable to delete user");
            }
          }}
          >
          Yes
        </button>
        <button 
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer"
          onClick={() => toast.dismiss(t.id)}
          >
          No
        </button>
        </div>
      </span>
    ))

  }
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
              <button 
                onClick={() => handleDelete(user._id)}
                className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default UserDetails