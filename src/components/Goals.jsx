import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";

const Goals = (props) => {
  const { goalFlag, flagFalse, flagTrue } = props;
  const [goals, setGoals] = useState([]);

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

  useEffect(() => {
    // Check if there is a goal that needs attention
    const goalNeedsAttention = goals.find((goal) => {
      return goal.currentAmount < goal.targetAmount && !goal.paused;
    });

    if (goalNeedsAttention) {
      flagTrue();
    } else {
      flagFalse();
    }
  }, [goals]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const pauseClick = (id) => {
    axios
      .get(`${URL}/api/goals/goal/${id}`)
      .then((res) => {
        const goal = res.data;
        goal.paused = !goal.paused; // toggle the value of isPaused field
        axios
          .put(`${URL}/api/goals/goal/${id}`, goal)
          .then(() => {
            console.log("Goal updated successfully.");
            setGoals(goals.map((g) => (g.id === id ? goal : g))); // update the state with the updated goal object
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-24 ml-24">
      <div className="container mx-auto mt-10">
        <div className="container mx-auto mt-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-5">Goals</h1>
          {goalFlag === false ? (
            <Link
              to="/goals/add"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              + Goal
            </Link>
          ) : null}
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Target Amount</th>
              <th className="px-4 py-2">Current Amount</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id}>
                <td className="border px-4 py-2">{goal.name}</td>
                <td className="border px-4 py-2">
                  ${goal.targetAmount.toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  ${goal.currentAmount.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{formatDate(goal.dueDate)}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/goals/${goal.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => pauseClick(goal.id)}
                    disabled={goal.isPaused}
                  >
                    {goal.paused ? "Paused" : "Pause"}
                  </button>
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

export default Goals;
