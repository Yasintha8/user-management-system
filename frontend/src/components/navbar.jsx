import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          User Management
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {isOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/add-user" className="hover:text-yellow-300 transition duration-300">Add User</Link>
          </li>
          <li>
            <Link to="/user-details" className="hover:text-yellow-300 transition duration-300">User Details</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contact Us</Link>
          </li>
          <li>
            <Link to="/send-pdf" className="hover:text-yellow-300 transition duration-300">Send PDF</Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-yellow-300 transition duration-300">Gallery</Link>
          </li>
          <li>
            <Link to="/register" className="text-gray-600 font-semibold bg-yellow-400 px-4 py-2 rounded hover:text-yellow-600 hover:bg-white transition duration-300">Register</Link>
          </li>
          <li>
            <Link to="/login" className="text-gray-600 font-semibold bg-yellow-400 px-4 py-2 rounded hover:text-yellow-600 hover:bg-white transition duration-300">Login</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-3 px-4">
          <li>
            <Link to="/" className="block hover:text-yellow-300" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/add-user" className="block hover:text-yellow-300" onClick={toggleMenu}>Add User</Link>
          </li>
          <li>
            <Link to="/user-details" className="block hover:text-yellow-300" onClick={toggleMenu}>User Details</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contact Us</Link>
          </li>
          <li>
            <Link to="/send-pdf" className="hover:text-yellow-300 transition duration-300">Send PDF</Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-yellow-300 transition duration-300">Gallery</Link>
          </li>
          <li>
            <Link to="/register" className="block bg-yellow-400 px-4 py-2 rounded hover:text-yellow-600 hover:bg-white transition duration-300" onClick={toggleMenu}>Register</Link>
          </li>
          <li>
            <Link to="/login" className="block bg-yellow-400 px-4 py-2 rounded hover:text-yellow-600 hover:bg-white transition duration-300" onClick={toggleMenu}>Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
