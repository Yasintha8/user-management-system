import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to User Management System
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Easily manage your users, add new profiles, update details, and
        keep everything organized in one place.
      </p>
      <div className="space-x-4 mb-10">
        <a
          href="/add-user"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Add New User
        </a>
        <a
          href="/user-details"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          View Users
        </a>
      </div>

      {/* Features Section */}
      <section className="mb-12 text-left">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 max-w-xl mx-auto">
          <li>Secure user registration with encrypted passwords</li>
          <li>Login authentication and user session management</li>
          <li>View, update, and delete user profiles with ease</li>
          <li>Search users by name, email, or ID</li>
          <li>Download user data reports as PDF</li>
        </ul>
      </section>

      {/* Recent Users Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Recent Users</h2>
        {recentUsers.length === 0 ? (
          <p className="text-gray-500">No users to display.</p>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded shadow p-4 text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2">Name</th>
                  <th className="border-b py-2">Email</th>
                  <th className="border-b py-2">Age</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-sm text-gray-500 mt-20">
        &copy; {new Date().getFullYear()} User Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
