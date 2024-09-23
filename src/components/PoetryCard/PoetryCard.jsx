import { FaHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getPoem, getPoetry, likeOrUnlikePoem } from "../../scripts/poetry-api";
import "./PoetryCard.scss";
import { useEffect, useState } from "react";
import { checkToken } from "../../scripts/auth-api";
import { toast } from "react-toastify";

const PoetryCard = ({ id, author, date, title, text }) => {
  const [cookies] = useCookies(["token"]);
  const [isLikedPoem, setIsLikedPoem] = useState(false);

  const validateToken = async () => {
    const responseToken = await checkToken(cookies.token);
    const { data } = await getPoem(id);

    const userLike = data.likes.find(
      (like) => like.userId.toString() === responseToken.user.id.toString()
    );

    userLike ? setIsLikedPoem(true) : setIsLikedPoem(false);
  };

  useEffect(() => {
    if (cookies.token) {
      validateToken();
    }
  }, [cookies.token]);

  const onClickLike = async () => {
    try {
      if (cookies?.token) {
        const data = await likeOrUnlikePoem(id, cookies?.token);
        if (data && data.success) {
          setIsLikedPoem((prev) => !prev);
          console.log(data);
          if (isLikedPoem) {
            toast.error(`Poem '${data.data.title}' was unliked`);
          } else {
            toast.success(`Poem '${data.data.title}' was liked"`);
          }
        } else {
          toast.error(`Your own poem can't be liked`);
        }
      }
    } catch (err) {
      toast.error("Error liking/unliking the poem");
      console.error(err);
    }
  };

  return (
    <div className="poetry-card">
      <div>
        <div className="poetry-card__author-date">
          <p className="poetry-card__author">{author}</p>
          <p className="poetry-card__date">{date}</p>
        </div>
        <div className="poetry-card__title-text">
          <p className="poetry-card__title">{title}</p>
          <p
            className="poetry-card__text"
            dangerouslySetInnerHTML={{
              __html: text
                ?.split(/\n/g)
                .slice(0, 3)
                .join("\n")
                .replace(/\n/g, "<br>"),
            }}
          />
        </div>
      </div>
      <div className="poetry-card__buttons">
        <Link to={`/poem/${id}`}>
          Read More <RiArrowRightSLine className="poetry-card__arrow-icon" />
        </Link>
        {cookies?.token && (
          <FaHeart
            className={`poetry-card__like ${
              isLikedPoem ? "poetry-card__like--liked" : ""
            }`}
            onClick={onClickLike}
          />
        )}
      </div>
    </div>
  );
};

export default PoetryCard;
