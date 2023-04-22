import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../App";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/transactions/transaction/${id}`)
      .then((res) => {
        setDate(res.data.date.substring(0, 10));
        setDescription(res.data.description);
        setAmount(res.data.amount);
        setCategory(res.data.categoryId);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${URL}/api/categories/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/api/transactions/${id}`, {
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
  };

  return (
    <div className="mt-20 ml-24">
      <div className="mx-auto max-w-7xl py-10">
        <h1 className="text-3xl font-bold mb-5">Edit Transaction</h1>
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
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditTransaction;
