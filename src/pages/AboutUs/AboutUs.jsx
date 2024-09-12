import flowerStory from "../../assets/images/flower-story.png";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="about">
      <h1 className="about__heading">My Story</h1>
      <h2 className="about__question">Why I started it?</h2>
      <div className="about__content">
        <p className="about__paragraph">
          I started to write poems about 6 years ago in my native language -
          Ukrainian but last year I tried to write a poem in English and the
          process was gorgeous and of course the output was charming and
          awesome. My first English poem will be forever with me.
        </p>
        <p className="about__paragraph">
          Most of my Ukrainian poems are related to my mood and time of my life,
          so sometimes it so sad or happy. Life as it is - this line describes
          my poems ideally.
        </p>
        <p className="about__paragraph">
          My soul are in three points - poetry, music and photography. Several
          years ago I started to share my favourite music with friends and
          photos which I made because I felt this way. And at the end of this
          summer - totally on 31 August I decided why not to do a space where I
          can share my thoughts, poems, favourite music and cozy videos, but I
          don’t want to do it alone, I want to give an opportunity for people to
          do it with me anonymous or by your name - it’s your choice. There is
          no place for bulling, it’s a space where you can feel yourself in safe
          because people are going through the same thing as you - falls and
          rises and it’s absolutely fine. You are not alone.
        </p>
        <p className="about__paragraph">
          Remember one thing that I heard which so helped to me - YOU ARE
          ENOUGH, if somebody dont appreciate you, this person doesn’t deserve
          your kindness and warm.
        </p>
      </div>
      <p className="about__signature">- Khrystyna Tripak</p>
      <img className="about__image" src={flowerStory} alt="Flower story" />
    </div>
  );
};

export default AboutUs;
