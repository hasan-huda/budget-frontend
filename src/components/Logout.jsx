import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId");
    navigate("/");
  }, []);

  return <div className="mt-80 ml-144">Logging out...</div>;
};

export default Logout;
