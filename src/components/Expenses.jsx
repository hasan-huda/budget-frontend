import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { URL } from "../App";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/api/expenses`).then((res) => {
      setExpenses(res.data);
    });
  }, []);

  return (
    <div className="mt-24 ml-24">
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Expenses</h1>
        <div className="mt-5 flex justify-end">
          <Link
            to="/expenses/add"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5"
          >
            Add Expense
          </Link>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.amount}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/expenses/${expense.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Expenses;
