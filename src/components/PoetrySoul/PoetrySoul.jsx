import flowerPoetry from "../../assets/images/flower-poetry.jpg";
import flowerSoul from "../../assets/images/flower-soul.jpg";
import "./PoetrySoul.scss";

const PoetrySoul = () => {
  return (
    <div className="poetry-soul">
      <div className="poetry">
        <div className="poetry__heading-image">
          <img
            className="poetry__image"
            src={flowerPoetry}
            alt="Poetry flower"
          />
          <h2 className="poetry__heading">WHERE POETRY</h2>
        </div>
        <p className="poetry__text">
          <span>Stunning dawn lit up the whole room, </span>
          <span>The cherry trees full in bloom,</span>
          <span>Tree branches and small buds</span>
          <span>Seeped through the window like floods.</span>
        </p>
      </div>
      <div className="soul">
        <p className="soul__text">
          <span>Every bit of the radiance of a blooming tree</span>
          <span>Creates a non-existent incredible sea. </span>
          <span>The beauty of nature is like harmony in a poem </span>
          <span>It all starts with a small seed in loam.</span>
        </p>
        <div className="soul__heading-image">
          <h2 className="soul__heading">MEETS SOUL</h2>
          <img className="soul__image" src={flowerSoul} alt="Soul flower" />
        </div>
      </div>
    </div>
  );
};

export default PoetrySoul;
