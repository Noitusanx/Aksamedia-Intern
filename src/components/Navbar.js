import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import lightModeImage from "../images/light-mode.png";
import darkModeImage from "../images/dark-mode.png";
import aksamedia_logo from "../images/aksamedia_logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navbarClass =
    theme === "light"
      ? "bg-gray-100 text-black border-black border-b-[1px]"
      : "bg-gray-800 text-white";
  const linkHoverClass =
    theme === "light"
      ? "hover:bg-gray-200 border-b-[1px]"
      : "hover:bg-gray-700";

  return (
    <nav className={`${navbarClass} p-4 shadow-lg transition`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <img src={aksamedia_logo} alt="Aksamedia Logo" width={30} />
          <span className="hidden sm:inline">Aksamedia</span>
        </Link>

        <button
          className="inline-flex items-center p-2 text-gray-500 rounded-md sm:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="hidden sm:flex flex-grow items-center justify-end space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${linkHoverClass}`}
          >
            Home
          </Link>
          <Link
            to="/add"
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${linkHoverClass}`}
          >
            Add Product
          </Link>
        </div>

        <div className="relative flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition ${linkHoverClass}`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <img src={darkModeImage} alt="Dark Mode" width={25} />
            ) : (
              <img src={lightModeImage} alt="Light Mode" width={25} />
            )}
          </button>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center space-x-2 p-2 rounded-md transition ${linkHoverClass}`}
              >
                <span>{user}</span>
                <span className="text-sm">&#9660;</span>
              </button>
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 shadow-lg rounded-md z-10 ${
                    theme === "light"
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left transition hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${linkHoverClass}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div
        className={`sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-gray-100 dark:bg-gray-800`}
      >
        <Link
          to="/"
          className={`block px-4 py-2 text-sm font-medium transition ${linkHoverClass}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/add"
          className={`block px-4 py-2 text-sm font-medium transition ${linkHoverClass}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Add Product
        </Link>
        {user ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className={`block px-4 py-2 text-sm font-medium transition ${linkHoverClass}`}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`block px-4 py-2 text-sm font-medium transition ${linkHoverClass}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
