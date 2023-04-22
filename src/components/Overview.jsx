import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../App";
import { Link } from 'react-router-dom';


function Overview() {
  const [goals, setGoals] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US");
  }
  const getTitle = (startDate, category) => {
    const start = new Date(startDate);
    const monthYear = start.toLocaleString("default", {
      month: "long",
      year: "numeric",
      timeZone: "UTC" // set the time zone to UTC
    });
    return `${monthYear} - ${category.name}`;
  };

  useEffect(() => {
    axios
      .get(`${URL}/api/goals/user/${localStorage.getItem("userId")}?limit=3`)
      .then((res) => {
        
        setGoals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`${URL}/api/budgets/user/${localStorage.getItem("userId")}?limit=3&sortBy=endDate:desc`)
      .then(async (res) => {
        const newBudgets = [];
    
        for (const budget of res.data) {
          const categoryRes = await axios.get(`${URL}/api/categories/category/${budget.categoryId}`);
          const category = categoryRes.data;
          const title = getTitle(budget.startDate, category);
          const newBudget = { ...budget, category, title };
          newBudgets.push(newBudget);
        }
    
        setBudgets(newBudgets);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `${URL}/api/transactions/user/${localStorage.getItem(
          "userId"
        )}?limit=3&sortBy=date:desc`
      )
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-20 ml-24">
      <div className="mx-auto max-w-7xl py-10">
        <h1 className="text-3xl font-bold mb-5">Overview</h1>
        <div className="grid grid-cols-3 gap-10">
          <div className="border rounded-md">
            <h2 className="bg-gray-200 text-gray-700 text-lg font-bold p-3 rounded-t-md">
              Latest Goals
            </h2>
            <ul className="divide-y divide-gray-300">
              {goals.map((goal) => (
                <li className="p-3" key={goal.id}>
                  <Link
                    to={`/goals`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {goal.name}
                  </Link>
                  <p className="text-sm text-gray-700">{formatDate(goal.dueDate)}</p>
                  <p className="text-sm text-gray-700">{`$${goal.currentAmount} / $${goal.targetAmount}`}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-md">
            <h2 className="bg-gray-200 text-gray-700 text-lg font-bold p-3 rounded-t-md">
              Latest Budgets
            </h2>
            <ul className="divide-y divide-gray-300">
              {budgets.map((budget) => (
                <li className="p-3" key={budget.id}>
                  <Link
                    to={`/budgets`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {budget.title}
                  </Link>
                  <p className="text-sm text-gray-700">{formatDate(budget.startDate)} - {formatDate(budget.endDate)}</p>
                  <p className="text-sm text-gray-700">{`$${budget.total} / $${budget.limit}`}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-md">
            <h2 className="bg-gray-200 text-gray-700 text-lg font-bold p-3 rounded-t-md">
              Latest Transactions
            </h2>
            <ul className="divide-y divide-gray-300">
              {transactions.map((transaction) => (
                <li className="p-3" key={transaction.id}>
                  <Link
                    to={`/transactions`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {transaction.description}
                  </Link>
                  <p className="text-sm text-gray-700">{formatDate(transaction.date)}</p>
                  <p className="text-sm text-gray-700">{`$${transaction.amount}`}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Overview