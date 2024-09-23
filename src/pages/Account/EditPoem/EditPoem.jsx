import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPoem, updatePoem } from "../../../scripts/poetry-api";
import { useCookies } from "react-cookie";
import "./EditPoem.scss";
import Loading from "../../../components/Loading/Loading";

const EditPoem = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["token"]);
  const [poem, setPoem] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedPoem, setUpdatedPoem] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      if (id) {
        const { data } = await getPoem(id);
        setPoem(data);
        setUpdatedTitle(data.title || "");
        setUpdatedPoem(data.poem || "");
        setIsLoading(false);
      }
    };
    fetchPoem();
  }, [id]);

  useEffect(() => {
    document.title = "Edit My Poem";
  }, []);

  const editPoem = async (e, id) => {
    try {
      e.preventDefault();
      const updatedPoemData = { title: updatedTitle, poem: updatedPoem };
      const data = await updatePoem(id, updatedPoemData, cookies?.token);
      if (data?.success) {
        setUpdatedTitle("");
        setUpdatedPoem("");
        navigate("/account/poems");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="edit-poem">
          <h1 className="edit-poem__heading">Edit {poem.title} poem?</h1>
          <form className="edit-poem__form">
            <label className="edit-poem__label">
              Title of the poem
              <input
                placeholder="Type the title of the poem"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </label>
            <label className="edit-poem__label">
              Poem
              <textarea
                placeholder="Type the poem"
                value={updatedPoem}
                onChange={(e) => setUpdatedPoem(e.target.value)}
              />
            </label>
            <div className="edit-poem__buttons">
              <button className="edit-poem__button edit-poem__button--cancel">
                Cancel
              </button>
              <button
                className="edit-poem__button edit-poem__button--delete"
                onClick={(e) => editPoem(e, poem._id)}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPoem;
