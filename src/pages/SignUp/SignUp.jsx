import SignUpForm from "../../components/SignUpForm/SignUpForm";
import authBg from "../../assets/images/auth-bg.png";
import { useEffect } from "react";
import "./SignUp.scss";

const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <div className="sign-up">
      <div className="sign-up__wrapper">
        <img className="sign-up__bg-image" src={authBg} alt="Auth bg" />
        <div className="sign-up__content">
          <h1 className="sign-up__heading">Sign Up</h1>
          <SignUpForm />
          <div className="sign-up__login">
            <p>Do you have an account?</p>
            <a href="/login" className="sign-up__login-link">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
