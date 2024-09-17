import { useState } from "react";
import { login } from "../../scripts/auth-api";
import "./SignInForm.scss";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
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
