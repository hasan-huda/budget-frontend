import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";

const EditGoal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/api/goals/goal/${id}`)
      .then((res) => {
        const goal = res.data;
        setName(goal.name);
        setCurrentAmount(goal.currentAmount);
        setTargetAmount(goal.targetAmount);
        setDueDate(goal.dueDate);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTargetAmountChange = (event) => {
    setTargetAmount(parseFloat(event.target.value));
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedGoal = {
      name: name,
      currentAmount: currentAmount,
      targetAmount: targetAmount,
      dueDate: dueDate,
    };

    axios
      .put(`${URL}/api/goals/goal/${id}`, updatedGoal)
      .then(() => {
        console.log("Goal updated successfully.");
        navigate("/goals");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="mt-24 ml-24">
        <div className="container mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-5">Edit Goal</h1>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="targetAmount"
              >
                Target Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="targetAmount"
                type="number"
                placeholder="Enter target amount"
                value={targetAmount}
                onChange={handleTargetAmountChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dueDate"
                type="date"
                placeholder="Enter due date"
                value={dueDate}
                onChange={handleDueDateChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
              <Link
                to="/goals"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditGoal;
