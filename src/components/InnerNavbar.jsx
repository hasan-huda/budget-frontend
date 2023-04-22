import React from "react";
import { useNavigate } from "react-router-dom";


function InnerNavbar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    navigate("/");
  }
  return (
    <nav className="bg-black bg-opacity-75 fixed w-full z-50 top-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">Budget App</span>
          </div>
          <div className="flex">
            <button
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default InnerNavbar;
