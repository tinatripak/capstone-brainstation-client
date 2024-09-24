import { toast } from "react-toastify";
import { deletePoem, getPoetry } from "../../../scripts/poetry-api";
import Loading from "../../../components/Loading/Loading";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AllPoemsOfUsers = () => {
  const [cookies] = useCookies(["token"]);
  const [poems, setPoems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idForDeleting, setIdForDeleting] = useState(null);
  const [titleForDeleting, setTitleForDeleting] = useState(null);

  const fetchPoems = async () => {
    const { data } = await getPoetry();
    setPoems(data);
  };

  const removePoem = async (id) => {
    try {
      await deletePoem(id, cookies?.token);
      setPoems((prevPoems) => prevPoems.filter((poem) => poem._id !== id));
      toast.error("The poem was removed");
    } catch (err) {
      toast.error(`The poem wasn't removed`);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPoems();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="poem-wrapper">
          <div className="account-poems">
            <h1 className="account-poems__own-heading">All User Poems</h1>
            {poems.length > 0 ? (
              <ul className="account-poems__list">
                {poems.map((poetry) => (
                  <li key={poetry._id} className="account-poems__poem">
                    <div className="account-poems__poem-heading">
                      <p className="account-poems__poem-title">
                        {poetry.title}
                      </p>
                      <div className="account-poems__poem-icons">
                        <AiOutlineDelete
                          size={20}
                          className="account-poems__poem-icon account-poems__poem-icon--remove"
                          onClick={() => {
                            setIsOpenDelete(true);
                            setIdForDeleting(poetry._id);
                            setTitleForDeleting(poetry.title);
                          }}
                        />
                      </div>
                    </div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: poetry.poem.replace(/\n/g, "<br>"),
                      }}
                    />

                    {isOpenDelete && idForDeleting && (
                      <DeleteModal
                        setIsOpen={setIsOpenDelete}
                        title={titleForDeleting}
                        id={idForDeleting}
                        onClick={removePoem}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>The database hasn't any poems yet</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllPoemsOfUsers;
