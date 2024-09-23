import NavLogo from "../NavLogo/NavLogo";
import NavMenu from "../NavMenu/NavMenu";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <NavMenu />
        <NavLogo />
      </div>

      <p className="footer__copyright">
        &copy; 2024 Poetry | All rights reserved
      </p>
    </div>
  );
};

export default Footer;
