import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [userId1, setUserId1] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    axios
      .get(`${URL}/api/categories/category/${id}`)
      .then((res) => {
        setName(res.data.name);
        setType(res.data.type);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/api/categories/category/${id}`, {
        id: id,
        name: name,
        type: type,
        userId: userId1,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/categories");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mt-20 ml-20">
        <div className="container mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-5">Edit Category</h1>
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
                disabled={type === "Income"}
                required
              >
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
