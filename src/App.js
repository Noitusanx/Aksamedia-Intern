import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddData from "./pages/AddData";
import EditData from "./pages/EditData";
import EditUser from "./pages/EditUser";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <AuthProvider>
      <DataProvider>
        <div>
          {!isLoginPage && <Navbar toggleTheme={toggleTheme} />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/user"
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/data/:id"
              element={
                <ProtectedRoute>
                  <EditData />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
