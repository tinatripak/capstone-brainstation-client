import { Link, useParams } from "react-router-dom";
import flowerPoem from "../../assets/images/flower-poem.jpg";
import rosePoem from "../../assets/images/rose-poem.png";
import { useEffect, useState } from "react";
import { getPoem, getPoemsByAuthor } from "../../scripts/poetry-api";
import "./PoetryItem.scss";

const PoetryItem = () => {
  const { id } = useParams();
  const [poetry, setPoetry] = useState({});

  const fetchPoemById = async () => {
    const { data } = await getPoem(id);
    setPoetry(data);
  };

  const fetchPoemsByAuthorId = async (authorId) => {
    const { data } = await getPoemsByAuthor(authorId);
    setPoetry((prevData) => ({ ...prevData, allPoems: data }));
  };

  useEffect(() => {
    fetchPoemById();
  }, [id]);

  useEffect(() => {
    if (poetry.authorId?._id) {
      fetchPoemsByAuthorId(poetry?.authorId?._id);
    }
  }, [poetry.authorId]);

  console.log(poetry);
  const otherPoems = poetry?.allPoems?.filter((poem) => poem._id !== id);

  return (
    <>
      {poetry && (
        <div className="poetry-item">
          <div className="poetry-item__poem">
            <h1 className="poetry-item__title">{poetry.title}</h1>
            {poetry.poem?.split("\\n").map((line, index) => (
              <p key={index} className="poetry-item__text">
                {line}
              </p>
            ))}
          </div>
          <div className="poetry-item__details">
            <p className="poetry-item__author">
              <span>Author</span> : {poetry.authorId?.lastName}{" "}
              {poetry.authorId?.firstName}
            </p>
            {otherPoems?.length > 0 && (
              <>
                <span>Poems:</span>
                <ul className="poetry-item__poems">
                  {otherPoems.map((poem) => (
                    <Link
                      className="poetry-item__extra"
                      to={`/poem/${poem._id}`}
                    >
                      <div className="poetry-item__extra-image">
                        <img src={flowerPoem} alt="Poem flower" />
                      </div>
                      <div className="poetry-item__extra-title">
                        <h2>{poem.title}</h2>
                      </div>
                    </Link>
                  ))}
                </ul>
              </>
            )}
          </div>
          <img className="poetry-item__image" src={rosePoem} alt="Rose" />
        </div>
      )}
    </>
  );
};

export default PoetryItem;
