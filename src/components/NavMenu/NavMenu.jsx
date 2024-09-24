import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { checkToken, getUserById } from "../../scripts/auth-api";
import defaultUserPhoto from "../../assets/images/default-user-photo.jpg";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "./NavMenu.scss";

const NavMenu = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const validateToken = async () => {
    const responseToken = await checkToken(cookies.token);
    const { data } = await getUserById(responseToken.user.id);
    setUser(data);
  };

  const handleLogout = () => {
    removeCookie("token");
    setUser({});
  };

  const linkClickHandler = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 769) {
      setMenuOpen(false);
    }
  }, [size.width]);

  useEffect(() => {
    if (cookies?.token) {
      validateToken();
    }
  }, [cookies?.token]);

  return (
    <div className="header-wrapper">
      <div
        className={`menu ${menuOpen ? "menu--isMenu" : "menu--withoutMenu"}`}
      >
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `menu__link  ${isActive ? "menu__link--active" : ""}`
          }
          onClick={linkClickHandler}
        >
          HOME
        </NavLink>
        <NavLink
          to={"/poetry"}
          className={({ isActive }) =>
            `menu__link  ${isActive ? "menu__link--active" : ""}`
          }
          onClick={linkClickHandler}
        >
          POETRY
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `menu__link  ${isActive ? "menu__link--active" : ""}`
          }
          onClick={linkClickHandler}
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
              onClick={linkClickHandler}
            >
              {user.photo !== "" ? (
                <img src={user.photo} alt={user.nickName} />
              ) : (
                <img src={defaultUserPhoto} alt={user.nickName} />
              )}
            </NavLink>
            {size.width <= 769 ? (
              <div className="menu__logout">
                <div onClick={handleLogout}>Logout</div>
              </div>
            ) : (
              showLogout && (
                <div className="menu__logout">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )
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
            onClick={linkClickHandler}
          >
            SIGN IN
          </NavLink>
        )}
      </div>
      <div className="header-wrapper__menu">
        {!menuOpen ? (
          <BiMenuAltRight onClick={menuToggleHandler} />
        ) : (
          <AiOutlineClose
            onClick={menuToggleHandler}
            className="header-wrapper__close-icon"
          />
        )}
      </div>
    </div>
  );
};

export default NavMenu;
