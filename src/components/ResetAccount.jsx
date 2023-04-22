import React, { useState } from "react";
import axios from "axios";
import { URL } from "../App";

const ResetAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleReset = async () => {
    try {
      await axios.delete(
        `${URL}/api/categories/user/${localStorage.getItem("userId")}`
      );
      await axios.delete(
        `${URL}/api/budgets/user/${localStorage.getItem("userId")}`
      );
      await axios.delete(
        `${URL}/api/goals/user/${localStorage.getItem("userId")}`
      );
      setIsConfirmed(false);
      alert("Account reset successful!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmation = () => {
    setIsConfirmed(true);
  };

  const handleCancel = () => {
    setIsConfirmed(false);
  };

  return (
    <div class="mt-20 ml-28">
      <div className="ml-8">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConfirmation}
        >
          Reset Account
        </button>
      </div>
      {isConfirmed && (
        <div class="mt-5 ml-8">
          <p class="mb-2">Are you sure you want to reset your account?</p>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleReset}
          >
            Yes
          </button>
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default ResetAccount;
