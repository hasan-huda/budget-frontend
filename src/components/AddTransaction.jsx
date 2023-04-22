import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";

const AddTransaction = (props) => {
  const navigate = useNavigate();
  const { goalFlag, flagFalse, flagTrue } = props;
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/categories/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/api/goals/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        setGoals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const checkAndUpdateGoals = (transaction, goals, flagTrue, flagFalse) => {
    const { date, category, amount } = transaction;

    // Check if goalFlag is true
    if (goalFlag) {
      // Check if there is a paused goal and if transaction is past due
      const pausedGoal = goals.find((goal) => goal.paused === true);
      if (pausedGoal && new Date(date) > new Date(pausedGoal.dueDate)) {
        // Check if category is of type "Income" or "Expense"
        axios
          .get(`${URL}/api/categories/category/${category}`)
          .then((categoryRes) => {
            const type = categoryRes.data.type;
            const goalAmount = parseFloat(amount);
            if (type === "Income") {
              // Add to currentAmount of the goal
              const updatedAmount = pausedGoal.currentAmount + goalAmount;
              axios
                .put(`${URL}/api/goals/goal/${pausedGoal.id}`, {
                  currentAmount: updatedAmount,
                })
                .then(() => {
                  // Check if currentAmount is greater than or equal to target
                  if (updatedAmount >= pausedGoal.target) {
                    axios
                      .put(`${URL}/api/goals/goal/${pausedGoal.id}`, {
                        paused: true,
                      })
                      .then(() => {
                        flagFalse();
                        // Check if there is a paused goal
                        const activeGoal = goals.find(
                          (goal) => goal.paused === false
                        );
                        if (activeGoal) {
                          flagTrue();
                        }
                      })
                      .catch((err) => console.log(err));
                  } else {
                    flagFalse();
                  }
                })
                .catch((err) => console.log(err));
            } else if (type === "Expense") {
              // Subtract from currentAmount of the goal
              const updatedAmount = pausedGoal.currentAmount - goalAmount;
              axios
                .put(`${URL}/api/goals/goal/${pausedGoal.id}`, {
                  currentAmount: updatedAmount,
                })
                .then(() => {
                  // Check if currentAmount is greater than or equal to target
                  if (updatedAmount >= pausedGoal.target) {
                    axios
                      .put(`${URL}/api/goals/goal/${pausedGoal.id}`, {
                        paused: true,
                      })
                      .then(() => {
                        flagFalse();
                        // Check if there is a paused goal
                        const activeGoal = goals.find(
                          (goal) => goal.paused === false
                        );
                        if (activeGoal) {
                          flagTrue();
                        }
                      })
                      .catch((err) => console.log(err));
                  } else {
                    flagFalse();
                  }
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${URL}/api/budgets/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        const matchingBudget = res.data.find((budget) => {
          return (
            budget.categoryId === category &&
            new Date(budget.startDate) <= new Date(date) &&
            new Date(budget.endDate) >= new Date(date)
          );
        });
        // If matching budget found, add transaction to its transactions list
        if (matchingBudget) {
          axios
            .post(`${URL}/api/transactions`, {
              userId: localStorage.getItem("userId"),
              description: description,
              category: category,
              amount: parseFloat(amount),
              date: date,
            })
            .then((res) => {
              const transaction = {
                userId: localStorage.getItem("userId"),
                description: description,
                category: category,
                amount: parseFloat(amount),
                date: date,
              };
              console.log([...matchingBudget.transactions, res.data.id]);
              axios
                .put(`${URL}/api/budgets/budget/${matchingBudget.id}`, {
                  total: matchingBudget.total + parseFloat(amount),
                  transactions: [...matchingBudget.transactions, res.data.id],
                })
                .then(() => {
                  checkAndUpdateGoals(transaction, goals, flagTrue, flagFalse);
                })
                .then(() => {
                  navigate("/transactions");
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } else {
          // No matching budget found, add transaction as usual
          axios
            .post(`${URL}/api/transactions`, {
              userId: localStorage.getItem("userId"),
              description: description,
              category: category,
              amount: parseFloat(amount),
              date: date,
            })
            .then(() => {
              navigate("/transactions");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-20 ml-24">
      <div className="mx-auto max-w-7xl py-10">
        <h1 className="text-3xl font-bold mb-5">Add Transaction</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              name="date"
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="amount"
            >
              Amount ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700 sm:text-sm">
                $
              </span>
              <input
                className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5 rounded-md focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                id="amount"
                name="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 sm:text-sm">
                USD
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
