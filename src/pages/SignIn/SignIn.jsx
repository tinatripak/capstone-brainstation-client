import authBg from "../../assets/images/auth-bg.png";
import SignInForm from "../../components/SignInForm/SignInForm";
import "./SignIn.scss";

const SignIn = () => {
  return (
    <div className="sign-in">
      <div className="sign-in__wrapper">
        <div className="sign-in__content">
          <h1 className="sign-in__heading">Sign In</h1>
          <SignInForm />
          <div className="sign-in__register">
            <p>Not registered yet?</p>
            <a href="/register" className="sign-in__register-link">
              Create an account
            </a>
          </div>
        </div>
        <img className="sign-in__bg-image" src={authBg} alt="Auth bg" />
      </div>
    </div>
  );
};

export default SignIn;
