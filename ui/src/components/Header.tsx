import React from "react";
import DateTime from "./DateTime";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useAuth } from "../auth/authContext";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-blue-600 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
            ToDo Task Manager
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          <h2 className="text-white font-medium border border-white m-2 p-2 rounded-md hover:bg-blue-800">
            <DateTime />
          </h2>
          {isLoggedIn ? (
            <>
              <Link to="/projects">
                <span className="bg-blue-900 text-white px-4 py-2 rounded-md shadow hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300">
                  Home
                </span>
              </Link>
              <button
                className="bg-rose-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-200 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
