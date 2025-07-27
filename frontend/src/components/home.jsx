import { useEffect, useState } from "react";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import { HiCheckCircle } from "react-icons/hi";

const Home = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecentUsers(res.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-blue-700">
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

      <p className="text-center text-gray-600 text-base mb-8 max-w-2xl mx-auto">
        Easily manage your users, add new profiles, update details, and keep everything organized in one place.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <a
          href="/add-user"
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-md text-white text-sm shadow-md"
        >
          Add New User
        </a>
        <a
          href="/user-details"
          className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-md text-white text-sm shadow-md"
        >
          View Users
        </a>
      </div>

      {/* Features Section */}
      <section className="mb-10 bg-white shadow-md rounded-lg p-6 border border-gray-200 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
        <ul className="space-y-3 text-gray-700 text-sm">
          {[
            "Secure user registration with encrypted passwords",
            "Login authentication and user session management",
            "View, update, and delete user profiles with ease",
            "Search users by name, email, or ID",
            "Download user data reports as PDF"
          ].map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <HiCheckCircle className="text-green-500 text-lg mt-[2px]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>    

      {/* Recent Users Preview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h2>

        {recentUsers.length === 0 ? (
          <p className="text-gray-500 text-sm">No users to display.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left ">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {recentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-xs text-gray-400 text-center mt-10">
        &copy; {new Date().getFullYear()} User Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
