import NavLogo from "../NavLogo/NavLogo";
import NavMenu from "../NavMenu/NavMenu";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <NavLogo />
      <NavMenu />
    </header>
  );
};

export default Header;
