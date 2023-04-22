import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Income");
  const navigate = useNavigate();
  const types = ["Income", "Expense"];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/categories`, {
        name: name,
        type: type,
        userId: localStorage.getItem("userId"),
      })
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mt-20 ml-20">
        <div className="container mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-5">Add Category</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="text-lg mb-2">
                Name:
              </label>
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg py-2 px-3 text-grey-darkest"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="type" className="text-lg mb-2">
                Type:
              </label>
              <select
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded-lg py-2 px-3 text-grey-darkest"
                required
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
