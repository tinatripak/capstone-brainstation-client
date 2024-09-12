import { NavLink } from "react-router-dom";
import "./NavMenu.scss";

const NavMenu = () => {
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
    </div>
  );
};

export default NavMenu;
