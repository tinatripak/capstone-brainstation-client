import logo from "../../assets/logos/logo.png";
import { NavLink } from "react-router-dom";
import "./NavLogo.scss";

const NavLogo = () => {
  return (
    <NavLink
      to={"/"}
      className={({ isActive }) => `logo  ${isActive ? "logo--active" : ""}`}
    >
      <img className="logo__image" src={logo} alt="Logo" />
    </NavLink>
  );
};

export default NavLogo;
