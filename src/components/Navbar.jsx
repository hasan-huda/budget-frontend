import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";

function Navbar() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/");
  };
  const handleDemoClick = () => {
    axios
      .post(`${URL}/api/users/login`,{
        email: "test@gmail.com",
        password: "qweasdzxc"
      })
      .then((res)=>{
        console.log(res.data);
        localStorage.setItem("userId", res.data.id);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <nav className="bg-black bg-opacity-75 fixed w-full z-50 top-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">Budget App</span>
          </div>
          <div className="flex">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              onClick={handleRegisterClick}
            >
              Register
            </button>
            <button
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700"
              onClick={handleDemoClick}
            >
              Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
