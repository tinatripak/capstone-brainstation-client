import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import PageHeading from "../../components/PageHeading/PageHeading";
import PoetryCard from "../../components/PoetryCard/PoetryCard";
import Quote from "../../components/Quote/Quote";
import { getPoetry } from "../../scripts/poetry-api";
import { formatDistanceToNow } from "date-fns";
import "./Poetry.scss";

const Poetry = () => {
  const [poetries, setPoetries] = useState([]);
  const [visiblePoetriesCount, setVisiblePoetriesCount] = useState(6);

  const fetchPoetries = async () => {
    const { data } = await getPoetry();
    setPoetries(data);
  };

  useEffect(() => {
    fetchPoetries();
  }, []);

  const onClickLike = () => {
    console.log("like");
  };
  const loadMorePoetries = () => {
    setVisiblePoetriesCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="poetry">
      <PageHeading text1="POETRY" text2="POEMS" />
      <div className="poetry__content">
        {poetries.map((poetry) => (
          <PoetryCard
            key={poetry._id}
            id={poetry._id}
            author={`${poetry.authorId.lastName} ${poetry.authorId.firstName}`}
            date={formatDistanceToNow(new Date(poetry.createdAt), {
              addSuffix: true,
            })}
            title={poetry.title}
            text={poetry.poem}
            onClickLike={onClickLike}
          />
        ))}
      </div>
      {visiblePoetriesCount < poetries.length && (
        <Button text="Load more" onClick={loadMorePoetries} />
      )}
      <Quote
        quoteText="Painting is silent poetry, and poetry is painting that speaks."
        author="— Plutarch"
      />
    </div>
  );
};

export default Poetry;
