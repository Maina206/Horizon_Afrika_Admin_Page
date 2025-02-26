import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h3 className="font-bold mb-4 text-[#FF6700] text-2xl">
              HorizonAfrika
            </h3>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font text-[#FF6700] text-2xl">
              Home
            </Link>
            <Link to="/bookings" className="font text-[#FF6700] text-2xl">
              Bookings
            </Link>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Log Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-500"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500"
              >
                Home
              </Link>
              <Link
                to="/bookings"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500"
              >
                Bookings
              </Link>
              <button className="w-full text-left px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
