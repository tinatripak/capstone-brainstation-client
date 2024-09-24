import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import PageHeading from "../../components/PageHeading/PageHeading";
import PoetryCard from "../../components/PoetryCard/PoetryCard";
import Quote from "../../components/Quote/Quote";
import { getPoetry } from "../../scripts/poetry-api";
import { formatDistanceToNow } from "date-fns";
import Loading from "../../components/Loading/Loading";
import "./Poetry.scss";

const Poetry = () => {
  const [poetries, setPoetries] = useState([]);
  const [visiblePoetriesCount, setVisiblePoetriesCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPoetries = async () => {
    const { data } = await getPoetry();
    setPoetries(data);
    setIsLoading(false);
  };

  const loadMorePoetries = () => {
    if (visiblePoetriesCount < poetries.length) {
      setVisiblePoetriesCount((prevCount) => prevCount + 3);
    }
  };

  useEffect(() => {
    document.title = "Poems";
    fetchPoetries();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="poetry">
          <PageHeading text1="POETRY" text2="POEMS" />
          <div className="poetry__content">
            {poetries.slice(0, visiblePoetriesCount).map((poetry) => (
              <PoetryCard
                key={poetry._id}
                id={poetry._id}
                author={`${poetry.authorId.lastName} ${poetry.authorId.firstName}`}
                date={formatDistanceToNow(new Date(poetry.createdAt), {
                  addSuffix: true,
                })}
                title={poetry.title}
                text={poetry.poem}
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
      )}
    </>
  );
};

export default Poetry;
