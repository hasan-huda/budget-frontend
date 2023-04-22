import { useState } from "react";
import axios from "axios";
import { URL } from "../App";
import { useNavigate } from "react-router-dom";

const AddGoal = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/goals`, {
        userId: localStorage.getItem("userId"),
        name: name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
        dueDate: dueDate,
        isPaused: false,
      })
      .then(() => {
        setName("");
        setTargetAmount("");
        setDueDate("");
        console.log("Goal added.");
        navigate("/goals");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-24 ml-24">
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Add Goal</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="targetAmount"
            >
              Target Amount
            </label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              step="0.01"
              placeholder="Enter target amount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              placeholder="Enter due date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoal;
