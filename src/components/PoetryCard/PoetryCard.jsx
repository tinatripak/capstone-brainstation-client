import { FaHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./PoetryCard.scss";

const PoetryCard = ({ id, author, date, title, text, onClickLike }) => {
  return (
    <div className="poetry-card">
      <div>
        <div className="poetry-card__author-date">
          <p className="poetry-card__author">{author}</p>
          <p className="poetry-card__date">{date}</p>
        </div>
        <div className="poetry-card__title-text">
          <p className="poetry-card__title">{title}</p>
          <div>
            {text
              ?.split("\\n")
              .slice(0, 3)
              .map((line, index) => (
                <p key={index} className="poetry-card__text">
                  {line}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="poetry-card__buttons">
        <Link to={`/poem/${id}`}>
          Read More <RiArrowRightSLine className="poetry-card__arrow-icon" />
        </Link>
        <FaHeart className="poetry-card__like" onClick={onClickLike} />
      </div>
    </div>
  );
};

export default PoetryCard;
