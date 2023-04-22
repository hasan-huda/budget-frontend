import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "../App";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/budgets/user/${localStorage.getItem("userId")}`)
      .then(async (res) => {
        const newBudgets = [];

        for (const budget of res.data) {
          const categoryRes = await axios.get(
            `${URL}/api/categories/category/${budget.categoryId}`
          );
          console.log(budget.total);
          const category = categoryRes.data;

          newBudgets.push({ ...budget, category });
        }

        setBudgets(newBudgets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getTitle = (startDate, category) => {
    const start = new Date(startDate);
    const monthYear = start.toLocaleString("default", {
      month: "long",
      year: "numeric",
      timeZone: "UTC" // set the time zone to UTC
    });
    return `${monthYear} - ${category.name}`;
  };
  

  return (
    <div className="mt-20 ml-24">
      <div className="mx-auto max-w-7xl py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold inline-block">Budgets</h1>
          <div className="inline-block">
            <Link
              to="/budgets/add"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              + Budget
            </Link>
          </div>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Limit</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget._id}>
                <td className="border px-4 py-2">
                  {getTitle(budget.startDate, budget.category)}
                </td>
                <td className="border px-4 py-2">${budget.limit}</td>
                <td className="border px-4 py-2">
                  ${budget.total}
                </td>
                <td className="border px-4 py-2">
                  <div className="h-4 w-full bg-gray-300 rounded-full mt-2">
                    <div
                      className={`h-4 ${
                        budget.total / budget.limit >= 1
                          ? "bg-red-500"
                          : "bg-green-500"
                      } rounded-full`}
                      style={{
                        width: `${Math.min(
                          100,
                          (budget.total / budget.limit) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budgets;
