import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useParams, useNavigate } from "react-router-dom";

const EditData = () => {
  const { id } = useParams();
  const { data, updateData } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const item = data.find((item) => item.id === parseInt(id));
    if (item) {
      setName(item.name);
    }
  }, [data, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = { id: parseInt(id), name };
    updateData(parseInt(id), updatedItem);
    navigate("/");
  };

  const containerClass =
    theme === "light"
      ? "min-h-screen flex items-center justify-center bg-white px-6"
      : "min-h-screen  flex items-center justify-center bg-gray-900 px-6";

  const boxClass =
    theme === "light"
      ? "w-full max-w-md p-6 md:p-8 bg-gray-100 text-gray-900 rounded-lg border-black border-[1px] max-h-full"
      : "w-full max-w-md p-6 md:p-8 bg-gray-800 text-white rounded-lg border-gray-300 border-[1px] max-h-full";

  const inputClass =
    theme === "light"
      ? "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-black"
      : "w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white bg-gray-700";

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 ">
          Edit Data
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-base md:text-lg font-medium mb-2"
            >
              Data
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 md:py-3 md:px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditData;
