import { useEffect, useState } from "react";
import { getFavPoems, likeOrUnlikePoem } from "../../../scripts/poetry-api";
import { FaHeart } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import "./FavouritePoems.scss";

const FavouritePoems = ({ userId }) => {
  const [favPoems, setFavPoems] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavPoems = async () => {
    const { data } = await getFavPoems(userId);
    setFavPoems(data);
    setIsLoading(false);
  };

  const unlikePoem = async (id) => {
    const { data } = await likeOrUnlikePoem(id, cookies?.token);

    if (data) {
      setFavPoems((prevFavPoems) =>
        prevFavPoems.filter((poem) => {
          poem._id !== id;
        })
      );
      toast.error(`The poem ${data.title} was unliked`);
    }
  };

  useEffect(() => {
    document.title = "Favourite Poems";
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFavPoems();
    }
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {favPoems.length > 0 ? (
            <ul className="fav-poems">
              {favPoems.map((poetry) => (
                <li className="fav-poem" key={poetry._id}>
                  <div className="fav-poem__author-like">
                    <p className="fav-poem__author">
                      {poetry.authorId.firstName} {poetry.authorId.lastName}
                    </p>
                    <FaHeart
                      className="fav-poem__icon"
                      onClick={() => unlikePoem(poetry._id)}
                    />
                  </div>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: poetry.poem?.replace(/\n/g, "<br>"),
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>You don't have any favourite poems yet</p>
          )}
        </>
      )}
    </>
  );
};

export default FavouritePoems;
