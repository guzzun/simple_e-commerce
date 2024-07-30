import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/logare");
  };

  return (
    <div className="min-h-screen p-3 space-y-2 w-60 dark:border dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center p-2 space-x-4">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 rounded-full dark:bg-gray-500"
        />
        <div>
          <h2 className="text-2xl font-semibold dark:text-white">
            Leroy Jenkins
          </h2>
          <span className="flex items-center space-x-1">
            <button
              rel="noopener noreferrer"
              href="#"
              className="text-xs hover:underline dark:text-gray-300"
            >
              View profile
            </button>
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-gray-300 dark:text-white">
        {!localStorage.getItem("accessToken") && (
          <>
            <Link to="/logare">
              <div className="flex items-center p-2 space-x-3 rounded-md">
                <span>Logare</span>
              </div>
            </Link>

            <Link to="/registrare">
              <div className="flex items-center p-2 space-x-3 rounded-md">
                <span>Registrare</span>
              </div>
            </Link>
          </>
        )}
        {localStorage.getItem("accessToken") && (
          <>
            <Link to="/products">
              <div className="flex items-center p-2 space-x-3 rounded-md">
                <span>Products</span>
              </div>
            </Link>

            <Link to="/brands">
              <div className="flex items-center p-2 space-x-3 rounded-md">
                <span>Brands</span>
              </div>
            </Link>

            <Link to="/appointment">
              <div className="flex items-center p-2 space-x-3 rounded-md">
                <span>Appointments</span>
              </div>
            </Link>
          </>
        )}
        <div
          className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          {localStorage.getItem("accessToken") && (
            <span onClick={handleLogout}>Logout</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
