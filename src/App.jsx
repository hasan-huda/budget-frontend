import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Authentication from "./components/Authentication";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Overview from "./components/Overview";
import InnerNavbar from "./components/InnerNavbar";
import Sidebar from "./components/Sidebar";
import Logout from "./components/Logout";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import Categories from "./components/Categories";
import Expenses from "./components/Expenses";
import AddExpense from "./components/AddExpense";
import AddCategory from "./components/AddCategory";
import AddBudget from "./components/AddBudget";
import AddGoal from "./components/AddGoal";
import Budgets from "./components/Budgets";
import Goals from "./components/Goals";
import EditTransaction from "./components/EditTransaction";
import EditCategory from "./components/EditCategory";
import ResetAccount from "./components/ResetAccount";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const location = useLocation();
  const navbarPaths = ["/", "/register"];
  const [goalFlag, setGoalFlag] = useState(false);

  const flagFalse = () => {
    setGoalFlag(false);
  };
  const flagTrue = () => {
    setGoalFlag(true);
  };
  return (
    <div>
      {navbarPaths.includes(location.pathname) ? (
        <Navbar />
      ) : (
        <>
          <InnerNavbar /> <Sidebar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Authentication />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Overview />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/budgets" element={<Budgets />}></Route>
        <Route path="/settings" element={<ResetAccount />}></Route>
        <Route
          path="/goals"
          element={
            <Goals
              goalFlag={goalFlag}
              flagFalse={flagFalse}
              flagTrue={flagTrue}
            />
          }
        ></Route>
        <Route
          path="/transactions/add"
          element={
            <AddTransaction
              goalFlag={goalFlag}
              flagFalse={flagFalse}
              flagTrue={flagTrue}
            />
          }
        ></Route>
        <Route path="/expenses/add" element={<AddExpense />}></Route>
        <Route path="/categories/add" element={<AddCategory />}></Route>
        <Route path="/budgets/add" element={<AddBudget />}></Route>
        <Route
          path="/goals/add"
          element={
            <AddGoal
              goalFlag={goalFlag}
              flagFalse={flagFalse}
              flagTrue={flagTrue}
            />
          }
        ></Route>
        <Route path="/categories/:id" element={<EditCategory />}></Route>
        <Route path="/transactions/:id" element={<EditTransaction />}></Route>
        <Route path="/expenses/:id"></Route>

        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
