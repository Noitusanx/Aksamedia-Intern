import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const [name, setName] = useState("");
  const { addData } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: Date.now(), name };
      addData(newItem);
      navigate("/");
    } else {
      console.error("Name is undefined or empty");
    }
  };

  const containerClass =
    theme === "light"
      ? "min-h-screen flex items-center justify-center bg-white px-6"
      : "min-h-screen flex items-center justify-center bg-gray-900 px-6";

  const boxClass =
    theme === "light"
      ? "w-full max-w-md p-8 bg-gray-100 text-gray-900 rounded-lg border-black border-[1px]"
      : "w-full max-w-md p-8 bg-gray-800 text-white rounded-lg border-gray-400 border-[1px]";

  const labelClass = theme === "light" ? "text-gray-500" : "text-gray-400";

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        <h2 className="text-2xl font-bold text-center mb-12">Add New Data</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="block w-full py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              required
            />
            <label
              className={`absolute top-0 transform -translate-y-6 scale-75 origin-[0] transition-all duration-200 ease-in-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 ${labelClass}`}
            >
              Enter Data
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
          >
            Add Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddData;
