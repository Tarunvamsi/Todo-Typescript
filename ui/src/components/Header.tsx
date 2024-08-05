// Header.tsx
import React, { useState } from "react";
import DateTime from "./DateTime";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useAuth } from "../auth/authContext";
import Modal from "../utils/Modal";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = async (logoutAll = false) => {
    const endpoint = logoutAll ? "/logout-all" : "/logout";
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        logout();
        toast.done("Logged out !")
        if (logoutAll) {
          navigate("/login");
          // alert("Session terminated: logged out of all devices");
          toast.info("logged out of all devices")
        }
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setModalOpen(false);
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
                onClick={() => setModalOpen(true)}
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Header;
