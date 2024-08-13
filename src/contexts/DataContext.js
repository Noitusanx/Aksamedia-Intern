import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set("search", searchTerm);
    if (currentPage > 1) queryParams.set("page", currentPage);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [searchTerm, currentPage]);

  const addData = (newItem) => {
    if (!newItem.name) {
      console.error("New item must have a name property");
      return;
    }
    setData([...data, newItem]);
  };

  const updateData = (id, updatedItem) => {
    if (!updatedItem.name) {
      console.error("Updated item must have a name property");
      return;
    }
    setData(data.map((item) => (item.id === id ? updatedItem : item)));
  };

  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
        totalPages,
        addData,
        updateData,
        deleteData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
