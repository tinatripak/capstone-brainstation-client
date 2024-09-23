import NavLogo from "../NavLogo/NavLogo";
import NavMenu from "../NavMenu/NavMenu";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <NavLogo />
      <NavMenu />
    </div>
  );
};

export default Header;
