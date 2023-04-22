import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddExpense = () => {
  const [expense, setExpense] = useState({
    date: '',
    amount: '',
    category: ''
  });
  const [date, setDate] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/expenses', expense)
      .then(() => {
        navigate('/expenses');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-20 ml-20">
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Add Expense</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="date" className="text-lg mb-2">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              className="border rounded-lg py-2 px-3 text-grey-darkest"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="amount" className="text-lg mb-2">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
              className="border rounded-lg py-2 px-3 text-grey-darkest"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="text-lg mb-2">
              Category:
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={expense.category}
              onChange={(e) => setExpense({ ...expense, category: e.target.value })}
              className="border rounded-lg py-2 px-3 text-grey-darkest"
              required
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
