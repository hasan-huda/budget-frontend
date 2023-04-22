import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="bg-black bg-opacity-40 fixed h-screen w-32 top-16 z-50">
        <div className="flex flex-col flex-grow">
          <Link
            to="/dashboard"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/overview"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Overview
          </Link>
          <Link
            to="/transactions"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/transactions"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Transactions
          </Link>
          {/* <Link
            to="/expenses"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/expenses"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Expenses
          </Link> */}
          <Link
            to="/categories"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/categories"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Categories
          </Link>
          <Link
            to="/budgets"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/budgets"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Budgets
          </Link>
          <Link
            to="/goals"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/goals"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Goals
          </Link>
          <hr />
          <Link
            to="/settings"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/settings"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Settings
          </Link>
          <Link
            to="/logout"
            className={`px-4 py-2 text-white transition duration-300 ${
              location.pathname === "/logout"
                ? "bg-gray-700 bg-opacity-50"
                : "hover:bg-gray-700 hover:bg-opacity-50"
            }`}
          >
            Logout
          </Link>
        </div>
    </nav>
  );
};

export default Sidebar;
