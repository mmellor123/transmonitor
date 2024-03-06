import { useNavigate, Navigate} from "react-router-dom";
import { useAuth } from "./auth";
import { useEffect, useState } from "react";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(true);

  const handleLogout = () => {
    setToken();
    setAuthorized(false);
  };

  useEffect(() => {
    handleLogout();
  }, []);


  return authorized?<>LogoutPage</> : <Navigate to="/login" />
};

export default Logout;