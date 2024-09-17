import flowerImage from "../../assets/images/flower-main.png";
import grayBg from "../../assets/images/gray-bg.png";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        <h2 className="hero__heading">Poetry</h2>
        <h2 className="hero__heading hero__heading--second"> of Life</h2>
      </div>
      <div className="hero__image-stack">
        <div className="hero__image-item hero__image-item--bottom">
          <img className="hero__image" src={flowerImage} alt="Flower" />
        </div>
        <div className="hero__image-item hero__image-item--top">
          <img className="hero__image" src={grayBg} alt="Gray bg" />
        </div>
      </div>
      <p className="hero__text">
        <span>Soul, </span> <span>music,</span> <span>poetry and</span> life -
        all this <span>is important, </span>and all this is in us.
      </p>
    </div>
  );
};

export default Hero;
