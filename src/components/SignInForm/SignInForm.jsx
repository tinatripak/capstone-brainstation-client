import { useEffect, useState } from "react";
import { login } from "../../scripts/auth-api";
import "./SignInForm.scss";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        email,
        password,
      });
      setCookie("token", data.token, {
        maxAge: 7200000,
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
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
