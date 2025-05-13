import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-blue-600 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          MyDiary
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-white text-base hover:text-gray-200 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="bg-white text-blue-600 font-medium px-4 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-base hover:text-gray-200 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 font-medium px-4 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
