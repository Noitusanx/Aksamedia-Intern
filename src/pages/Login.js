import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import darkModeImage from "../images/dark-mode.png";
import lightModeImage from "../images/light-mode.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      login(username);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const linkHoverClass =
    theme === "light"
      ? "hover:bg-gray-200 border-b-[1px]"
      : "hover:bg-gray-700";

  return (
    <div
      className={`flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-md absolute top-4 right-4 transition ${linkHoverClass}`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <img src={darkModeImage} alt="Dark Mode" width={25} />
        ) : (
          <img src={lightModeImage} alt="Light Mode" width={25} />
        )}
      </button>
      <div className="sm:max-w-md w-full space-y-8">
        <form
          className={`mt-8 space-y-6 ${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-gray-100"
          } p-8 shadow-md rounded-lg`}
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-center text-3xl font-extrabold">
              Sign in to your account
            </h2>
          </div>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                id="username"
                name="username"
                type="username"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                  theme === "light"
                    ? "border-gray-300 text-gray-900"
                    : "border-gray-600 bg-gray-700 text-gray-100"
                }`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                  theme === "light"
                    ? "border-gray-300 text-gray-900"
                    : "border-gray-600 bg-gray-700 text-gray-100"
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
