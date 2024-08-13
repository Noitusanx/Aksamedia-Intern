import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(name);
    navigate("/");
  };

  const containerClass =
    theme === "light"
      ? "min-h-screen flex items-center justify-center bg-white text-gray-800 px-6 "
      : "min-h-screen flex items-center justify-center bg-gray-900 text-white px-6";

  const boxClass =
    theme === "light"
      ? "w-full max-w-md p-8 bg-gray-100 text-gray-900 rounded-lg shadow-lg border-black border-[1px]"
      : "w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg border-gray-300 border-[1px]";

  const inputClass =
    theme === "light"
      ? "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-black"
      : "w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white bg-gray-700";

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        <h2 className="text-3xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-2 block w-full rounded-md shadow-sm sm:text-sm p-3  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputClass}`}
              placeholder="Enter your full name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white transition ease-in-out duration-150 hover:bg-blue-600 bg-blue-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
