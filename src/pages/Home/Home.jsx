import Hero from "../../components/Hero/Hero";
import HomePoem from "../../components/HomePoem/HomePoem";
import PoetrySoul from "../../components/PoetrySoul/PoetrySoul";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home__wrapper">
        <Hero />
      </div>
      <PoetrySoul />
      <HomePoem />
    </div>
  );
};

export default Home;
