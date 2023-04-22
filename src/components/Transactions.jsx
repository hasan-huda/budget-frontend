import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/transactions/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        const transactionsData = res.data;
        // Fetch the category name for each transaction
        Promise.all(
          transactionsData.map((transaction) =>
            axios.get(`${URL}/api/categories/category/${transaction.category}`)
          )
        )
          .then((responses) => {
            // Map the category name to each transaction and update the state
            const transactionsWithCategoryName = transactionsData.map(
              (transaction, index) => ({
                ...transaction,
                categoryName: responses[index].data.name,
                categoryType: responses[index].data.type,
              })
            );
            setTransactions(transactionsWithCategoryName);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [transactions]);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };
  const handleDelete = (id) => {
    axios
      .get(`${URL}/api/budgets/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        const matchingBudget = res.data.find((budget) => {
          return budget.transactions.includes(id);
        });
        // If matching budget found, remove the transaction from its transactions list and update the budget total
        if (matchingBudget) {
          const transactionToDelete = transactions.find(
            (transaction) => transaction.id === id
          );
          axios
            .put(`${URL}/api/budgets/budget/${matchingBudget.id}`, {
              total: matchingBudget.total - parseFloat(transactionToDelete.amount),
              transactions: matchingBudget.transactions.filter(
                (transaction) => transaction !== id
              ),
            })
            .then(() => {
            })
            .catch((err) => console.log(err));
        }

        // Delete the transaction
        axios
          .delete(`${URL}/api/transactions/${id}`)
          .then(() => {
            // Remove the deleted transaction from the state
            setTransactions(
              transactions.filter((transaction) => transaction.id !== id)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mt-24 ml-24">
      <div className="container mx-auto mt-10">
        <div className="container mx-auto mt-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-5">Transactions</h1>
          <Link
            to="/transactions/add"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            + Transaction
          </Link>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">
                  {formatDate(transaction.date)}
                </td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td
                  className="border px-4 py-2"
                  style={{
                    color:
                      transaction.categoryType === "Income" ? "green" : "red",
                  }}
                >
                  {transaction.categoryType !== "Income" ? "-" : null}$
                  {transaction.amount.toFixed(2)}
                </td>

                <td className="border px-4 py-2">{transaction.categoryName}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/transactions/${transaction.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(transaction.id)}
                  >
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

export default Transactions;
