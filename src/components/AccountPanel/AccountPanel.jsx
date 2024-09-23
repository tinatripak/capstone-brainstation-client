import { NavLink, Route, Routes } from "react-router-dom";
import EditAccount from "../../pages/Account/EditAccount/EditAccount";
import MyAccount from "../../pages/Account/MyAccount/MyAccount";
import MyPoems from "../../pages/Account/MyPoems/MyPoems";
import EditPoem from "../../pages/Account/EditPoem/EditPoem";
import FavouritePoems from "../../pages/Account/FavouritePoems/FavouritePoems";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import NoAccountPage from "../../pages/NoAccountPage/NoAccountPage";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { checkToken } from "../../scripts/auth-api";
import AllPoemsOfUsers from "../../pages/Account/AllPoemsOfUsers/AllPoemsOfUsers";
import AllUsers from "../../pages/Account/AllUsers/AllUsers";
import "./AccountPanel.scss";

const AccountPanel = () => {
  const [cookies] = useCookies(["token"]);
  const [userRole, setUserRole] = useState("user");

  const validateToken = async () => {
    const {
      user: { role },
    } = await checkToken(cookies.token);
    setUserRole(role);
  };

  useEffect(() => {
    if (cookies.token) {
      validateToken();
    }
  }, [cookies.token]);

  return (
    <div className="account-panel">
      <div className="account-panel__menu">
        <NavLink
          to={"/account"}
          end
          className={({ isActive }) =>
            `menu__link  ${isActive ? "menu__link--active" : ""}`
          }
        >
          My account
        </NavLink>
        <NavLink
          to={"/account/poems"}
          className={({ isActive }) =>
            `menu__link  ${isActive ? "menu__link--active" : ""}`
          }
        >
          My poems
        </NavLink>
        <NavLink
          to={"/account/fav-poems"}
          className={({ isActive }) =>
            `menu__link  ${isActive ? "menu__link--active" : ""}`
          }
        >
          Favourite poems
        </NavLink>
        {(userRole === "admin" || userRole === "super-admin") && (
          <NavLink
            to={"/account/all-poems"}
            className={({ isActive }) =>
              `menu__link  ${isActive ? "menu__link--active" : ""}`
            }
          >
            All user poems
          </NavLink>
        )}
        {(userRole === "admin" || userRole === "super-admin") && (
          <NavLink
            to={"/account/all-users"}
            className={({ isActive }) =>
              `menu__link  ${isActive ? "menu__link--active" : ""}`
            }
          >
            All users
          </NavLink>
        )}
      </div>
      <div className="account-panel__main">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={MyAccount} />} />
          <Route
            path="/edit"
            element={<ProtectedRoute element={EditAccount} />}
          />
          <Route path="/poems" element={<ProtectedRoute element={MyPoems} />} />
          <Route
            path="/poems/:id/edit"
            element={<ProtectedRoute element={EditPoem} />}
          />
          <Route
            path="/fav-poems"
            element={<ProtectedRoute element={FavouritePoems} />}
          />
          <Route
            path="/all-poems"
            element={
              <ProtectedRoute element={AllPoemsOfUsers} requiredRole="admin" />
            }
          />
          <Route
            path="/all-users"
            element={<ProtectedRoute element={AllUsers} requiredRole="admin" />}
          />
          <Route
            path="*"
            element={<ProtectedRoute element={NoAccountPage} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AccountPanel;
