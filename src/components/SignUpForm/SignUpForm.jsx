import { useState } from "react";
import { register } from "../../scripts/auth-api";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await register({
        lastName,
        firstName,
        nickName,
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <form className="sign-up__form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        name="nickName"
        id="nickName"
        placeholder="Nickname"
        value={nickName}
        onChange={(e) => setNickname(e.target.value)}
      />
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
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
