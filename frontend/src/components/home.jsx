import { useEffect, useState } from "react";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
   const [recentUsers, setRecentUsers] = useState([]);

  // Fetch some recent users to show as preview
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users");
        setRecentUsers(res.data.slice(0, 5)); // Show first 5 users
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-700 font-">
          <Typewriter
            words={['Welcome to User Management System👋']}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
      <p className="mb-6 text-center text-gray-600">
        Easily manage your users, add new profiles, update details, and
        keep everything organized in one place.
      </p>
      
      <div className="flex gap-3 justify-center mb-8">
        <a
          href="/add-user"
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Add New User
        </a>
        <a
          href="/user-details"
          className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
        >
          View Users
        </a>
      </div>

      {/* Features Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Features</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Secure user registration with encrypted passwords</li>
          <li>• Login authentication and user session management</li>
          <li>• View, update, and delete user profiles with ease</li>
          <li>• Search users by name, email, or ID</li>
          <li>• Download user data reports as PDF</li>
        </ul>
      </div>

      {/* Recent Users Preview */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Recent Users</h2>
        {recentUsers.length === 0 ? (
          <p className="text-gray-500 text-sm">No users to display.</p>
        ) : (
          <div className="border rounded p-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Name</th>
                  <th className="text-left py-1">Email</th>
                  <th className="text-left py-1">Age</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="py-1">{user.name}</td>
                    <td className="py-1">{user.email}</td>
                    <td className="py-1">{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} User Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;