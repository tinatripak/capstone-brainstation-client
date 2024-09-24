import { NavLink } from "react-router-dom";
import NavLogo from "../NavLogo/NavLogo";
import NavMenu from "../NavMenu/NavMenu";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `footer__link  ${isActive ? "footer__link--active" : ""}`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to={"/poetry"}
          className={({ isActive }) =>
            `footer__link  ${isActive ? "footer__link--active" : ""}`
          }
        >
          POETRY
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `footer__link  ${isActive ? "footer__link--active" : ""}`
          }
        >
          ABOUT US
        </NavLink>
        <NavLogo />
      </div>

      <p className="footer__copyright">
        &copy; 2024 Poetry | All rights reserved
      </p>
    </div>
  );
};

export default Footer;
