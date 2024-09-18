import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { checkToken } from "../../scripts/auth-api";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies] = useCookies(["token"]);

  const validateToken = async () => {
    try {
      const success = await checkToken(cookies.token);
      if (success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (!cookies?.token) {
      navigate("/login");
    } else {
      validateToken();
    }
  }, []);

  if (isAuthenticated) {
    return <Component />;
  }
};

export default ProtectedRoute;
