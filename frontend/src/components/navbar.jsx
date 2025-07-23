import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">User Management</Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/mainhome" className="hover:text-yellow-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-user" className="hover:text-yellow-300 transition duration-300">
              Add User
            </Link>
          </li>
          <li>
            <Link to="/user-details" className="hover:text-yellow-300 transition duration-300">
              User Details
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
