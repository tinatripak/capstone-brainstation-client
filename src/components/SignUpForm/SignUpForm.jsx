import { useState } from "react";
import { register } from "../../scripts/auth-api";
import "./SignUpForm.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiMiniExclamationCircle } from "react-icons/hi2";

const SignUpForm = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    lastName: false,
    firstName: false,
    nickName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      lastName: !lastName,
      firstName: !firstName,
      nickName: !nickName,
      email: !email,
      password: !password,
      confirmPassword: !confirmPassword,
    };
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.error("All fields must be filled");
      return;
    }

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
      if (response) {
        navigate("/login");
      } else {
        toast.error("Check all the fields and try again");
      }
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
      {formErrors.lastName && (
        <p className="error-message">
          <HiMiniExclamationCircle />
          The field shouldn't be empty
        </p>
      )}
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {formErrors.firstName && (
        <p className="error-message">
          <HiMiniExclamationCircle />
          The field shouldn't be empty
        </p>
      )}
      <input
        type="text"
        name="nickName"
        id="nickName"
        placeholder="Nickname"
        value={nickName}
        onChange={(e) => setNickname(e.target.value)}
      />
      {formErrors.nickName && (
        <p className="error-message">
          <HiMiniExclamationCircle />
          The field shouldn't be empty
        </p>
      )}
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
          The field shouldn't be empty
        </p>
      )}

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
          The field shouldn't be empty
        </p>
      )}

      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {formErrors.confirmPassword && (
        <p className="error-message">
          <HiMiniExclamationCircle />
          The field shouldn't be empty
        </p>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
