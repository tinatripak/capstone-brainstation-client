import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkToken } from "../../scripts/auth-api";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const validateToken = async () => {
    const token = Cookies.get("token");
    try {
      if (token) {
        const success = await checkToken(token);
        if (success) setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
