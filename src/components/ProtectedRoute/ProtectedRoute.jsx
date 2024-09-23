import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { checkToken } from "../../scripts/auth-api";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ element: Component, requiredRole }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState();
  const [cookies, removeCookie] = useCookies(["token"]);

  const validateToken = async () => {
    try {
      const data = await checkToken(cookies.token);
      if (data.success) {
        setIsAuthenticated(true);
        setRole(data.user.role);
        setUserId(data.user.id);
      }
    } catch (err) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (
      !cookies?.token ||
      cookies.token === "undefined" ||
      cookies.token === undefined
    ) {
      removeCookie("token");
      navigate("/login");
    } else {
      validateToken();
    }
  }, [cookies.token]);

  if (!isAuthenticated || !role) {
    return null;
  }

  if (requiredRole && role !== requiredRole && role !== "super-admin") {
    navigate("/account");
    return null;
  }

  if (isAuthenticated && userId) {
    return <Component userId={userId} />;
  }
};

export default ProtectedRoute;
