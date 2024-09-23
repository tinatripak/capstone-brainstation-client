import { useEffect, useState } from "react";
import { login } from "../../scripts/auth-api";
import "./SignInForm.scss";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { HiMiniExclamationCircle } from "react-icons/hi2";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: !email,
      password: !password,
    };
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.error("Both email and password must be filled");
      return;
    }

    try {
      const { data } = await login({
        email,
        password,
      });

      setCookie("token", data?.token, {
        maxAge: 86400,
        sameSite: "None",
        secure: true,
        path: "/",
      });
      navigate("/account");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (cookies.token === "undefined" || cookies.token === undefined) {
      removeCookie("token");
    }
  }, []);

  return (
    <form className="sign-in__form" onSubmit={handleSubmit}>
      <div className="sign-in__form-field">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formErrors.email && (
          <p className="error-message">
            <HiMiniExclamationCircle />
            The email field shouldn't be empty
          </p>
        )}
      </div>
      <div className="sign-in__form-field">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formErrors.password && (
          <p className="error-message">
            <HiMiniExclamationCircle />
            The password field shouldn't be empty
          </p>
        )}
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
