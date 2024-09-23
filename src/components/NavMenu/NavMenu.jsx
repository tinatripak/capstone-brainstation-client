import { NavLink } from "react-router-dom";
import "./NavMenu.scss";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { checkToken, getUserById } from "../../scripts/auth-api";
import defaultUserPhoto from "../../assets/images/default-user-photo.jpg";

const NavMenu = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [showLogout, setShowLogout] = useState(false);

  const validateToken = async () => {
    const responseToken = await checkToken(cookies.token);
    const { data } = await getUserById(responseToken.user.id);
    setUser(data);
  };

  const handleLogout = () => {
    removeCookie("token");
    setUser({});
  };

  useEffect(() => {
    if (cookies?.token) {
      validateToken();
    }
  }, [cookies?.token]);

  return (
    <div className="menu">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `menu__link  ${isActive ? "menu__link--active" : ""}`
        }
      >
        HOME
      </NavLink>
      <NavLink
        to={"/poetry"}
        className={({ isActive }) =>
          `menu__link  ${isActive ? "menu__link--active" : ""}`
        }
      >
        POETRY
      </NavLink>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          `menu__link  ${isActive ? "menu__link--active" : ""}`
        }
      >
        ABOUT US
      </NavLink>
      {Object.keys(user).length !== 0 ? (
        <div
          className="menu__account"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          <NavLink
            to={"/account"}
            className={({ isActive }) =>
              `menu__link menu__link--account  ${
                isActive ? "menu__link--active" : ""
              }`
            }
          >
            {user.photo !== "" ? (
              <img src={user.photo} alt={user.nickName} />
            ) : (
              <img src={defaultUserPhoto} alt={user.nickName} />
            )}
          </NavLink>
          {showLogout && (
            <div className="menu__logout">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            `menu__link menu__link--login  ${
              isActive ? "menu__link--active" : ""
            }`
          }
        >
          SIGN IN
        </NavLink>
      )}
    </div>
  );
};

export default NavMenu;
