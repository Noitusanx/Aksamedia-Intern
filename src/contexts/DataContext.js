import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    setData(storedData);

    const queryParams = new URLSearchParams(window.location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const search = queryParams.get("search") || "";
    setCurrentPage(page);
    setSearchTerm(search);
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addData = (newItem) => {
    setData([...data, newItem]);
  };

  const updateData = (id, updatedItem) => {
    setData(data.map((item) => (item.id === id ? updatedItem : item)));
  };

  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DataContext.Provider
      value={{
        data: paginatedData,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        addData,
        updateData,
        deleteData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
