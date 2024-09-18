import { Route, Routes } from "react-router-dom";
import EditAccount from "../../pages/Account/EditAccount/EditAccount";
import MyAccount from "../../pages/Account/MyAccount/MyAccount";
import MyPoems from "../../pages/Account/MyPoems/MyPoems";
import EditPoem from "../../pages/Account/EditPoem/EditPoem";
import FavouritePoems from "../../pages/Account/FavouritePoems/FavouritePoems";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import "./AccountPanel.scss";

const AccountPanel = () => {
  return (
    <div className="account-panel">
      <div className="account-panel__menu"></div>
      <div className="account-panel__main">
        <Routes>
          <Route
            path="/home"
            element={<ProtectedRoute element={MyAccount} />}
          />
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
        </Routes>
      </div>
    </div>
  );
};

export default AccountPanel;
