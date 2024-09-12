import rose from "../../assets/images/rose.jpg";
import leafs from "../../assets/images/leafs.jpg";
import "./HomePoem.scss";

const HomePoem = () => {
  return (
    <div className="home-poem">
      <img
        className="home-poem__image home-poem__image--rose"
        src={rose}
        alt="Rose"
      />
      <div className="home-poem__wrapper">
        <div className="home-poem__top-border"></div>
        <p className="home-poem__content">
          <span>Everything around you changes color</span>
          <span>As if shedding its skin and protective layer</span>
          <span>In a way that is unusual and unaccustomed </span>
          <span>to us.</span>
          <span>And by becoming defenseless, we can finally</span>
          <span>cognize and get to the core and the middle of</span>
          <span>the unknown</span>
        </p>
        <div className="home-poem__bottom-border"></div>
      </div>
      <img
        className="home-poem__image home-poem__image--leafs"
        src={leafs}
        alt="Leafs"
      />
    </div>
  );
};

export default HomePoem;
