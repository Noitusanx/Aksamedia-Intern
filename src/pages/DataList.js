import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

const DataList = () => {
  const {
    data,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    deleteData,
  } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", e.target.value);
    window.history.replaceState(null, "", "?" + queryParams.toString());
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page);
    window.history.replaceState(null, "", "?" + queryParams.toString());
  };

  return (
    <div
      className={`p-6 shadow rounded-lg ${
        theme === "light"
          ? "bg-white text-black"
          : "bg-gray-800 text-white dark:shadow-lg dark:rounded-lg"
      }`}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={`mb-4 p-3 border rounded w-full focus:outline-none focus:ring-2 ${
          theme === "light"
            ? "border-gray-300 text-black"
            : "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
        }`}
      />
      <ul
        className={`divide-y ${
          theme === "light" ? "divide-gray-200" : "divide-gray-700"
        }`}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4"
            >
              <span
                className={`font-medium ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {item.name}
              </span>
              <div className="flex space-x-2">
                <Link
                  to={`/edit/${item.id}`}
                  className={`${
                    theme === "light"
                      ? "text-blue-500 hover:text-blue-700"
                      : "text-blue-400 hover:text-blue-500"
                  }`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteData(item.id)}
                  className={`${
                    theme === "light"
                      ? "text-red-500 hover:text-red-700"
                      : "text-red-400 hover:text-red-500"
                  }`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li
            className={`py-4 ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            No items found.
          </li>
        )}
      </ul>
      <div className="mt-4 flex justify-center space-x-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? theme === "light"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-700 text-white"
                : theme === "light"
                ? "bg-gray-200 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataList;
