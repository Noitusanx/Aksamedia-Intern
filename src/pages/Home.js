import React, { useContext } from "react";
import DataList from "./DataList";
import { ThemeContext } from "../contexts/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  const containerClass =
    theme === "light"
      ? "min-h-screen flex flex-col items-center justify-center bg-white text-gray-900"
      : "min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white";

  const boxClass =
    theme === "light"
      ? "w-full max-w-4xl p-8 bg-gray-100 text-gray-900 rounded-lg shadow-lg"
      : "w-full max-w-4xl p-8 bg-gray-800 text-white rounded-lg shadow-lg";

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 md:mb-8">
          Welcome to the Home Page
        </h1>
        <p className="text-base md:text-lg text-center mb-8 md:mb-12">
          Here you can manage your data easily and efficiently!
        </p>
        <div className="w-full">
          <DataList />
        </div>
      </div>
    </div>
  );
};

export default Home;
