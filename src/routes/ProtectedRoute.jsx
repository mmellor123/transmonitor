import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/auth";
import { authenticateToken} from "../common/functions";
import { useState, useEffect } from "react";


export const ProtecteRoute = ({ children }) => {
  const { token, setToken } = useAuth();
  const [authorized, setAuthorized] = useState(undefined);

  if (authorized === undefined) {
    authenticateToken(token).then((statusOk) => {
      if (!statusOk) {
        setAuthorized(false);
        setToken();
      }
      else {
        setAuthorized(true);
      }
    });
  }

  if (authorized === undefined) {
    return null;
  }

  return authorized
    ? children
    : <Navigate to="/login" />;
};