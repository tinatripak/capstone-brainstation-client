import { useEffect, useRef, useState } from "react";
import {
  deletePoem,
  getPoemsByAuthor,
  postPoem,
} from "../../../scripts/poetry-api";
import { useCookies } from "react-cookie";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { FaRobot } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { ninjas_api_url } from "../../../utils/config";
import Loading from "../../../components/Loading/Loading";
import "./MyPoems.scss";

const MyPoems = ({ userId }) => {
  const [cookies] = useCookies(["token"]);
  const [poems, setPoems] = useState([]);
  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idForDeleting, setIdForDeleting] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [poemError, setPoemError] = useState(false);
  const [showBotWindow, setShowBotWindow] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [titleForDeleting, setTitleForDeleting] = useState(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fetchOwnPoems = async () => {
    const { data } = await getPoemsByAuthor(userId);
    setPoems(data);
  };

  useEffect(() => {
    if (userId) {
      fetchOwnPoems();
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    document.title = "My Poems";
  }, []);

  const addNewPoem = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setPoemError(false);

    if (!title.trim()) {
      setTitleError(true);
    }
    if (!poem.trim()) {
      setPoemError(true);
    }

    if (!title.trim() || !poem.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await postPoem({ title, poem }, cookies?.token);
      setPoems((prevPoems) => [...prevPoems, data]);
      setTitle("");
      setPoem("");
      toast.success(`The poem '${title}' was added`);
    } catch (err) {
      toast.error(`The poem wasn't added`);
      console.error(err);
    }
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

  const sendMessage = async () => {
    if (!inputValue.trim()) {
      toast.error("You have not entered a word to search for rhymes with");
      return;
    }

    const newMessage = {
      content: inputValue,
      sender: "user",
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    const response = await fetch(
      `https://api.api-ninjas.com/v1/rhyme?word=${inputValue}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": ninjas_api_url,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const botResponseContent =
      data.length > 0
        ? data.slice(0, 10)
        : "We could not find any rhymes, sorry";
    const botResponse = {
      content: botResponseContent,
      sender: "bot",
    };
    setTimeout(() => {
      setChatMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 500);

    setInputValue("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="poem-wrapper">
          <div className="account-poems">
            <div className="account-poems__create">
              <h2 className="account-poems__create-heading">Create a poem</h2>
              <form className="account-poems__form" onSubmit={addNewPoem}>
                <label className="account-poems__label">
                  Title of the poem
                  <input
                    placeholder="Type the title of the poem"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {titleError && (
                    <p className="error-message">
                      <HiMiniExclamationCircle />
                      The field shouldn't be empty
                    </p>
                  )}
                </label>
                <label className="account-poems__label">
                  Poem
                  <textarea
                    placeholder="Type the poem"
                    value={poem}
                    onChange={(e) => setPoem(e.target.value)}
                  />
                </label>
                {poemError && (
                  <p className="error-message">
                    <HiMiniExclamationCircle />
                    The field shouldn't be empty
                  </p>
                )}
                <button type="submit" className="account-poems__button">
                  Add
                </button>
              </form>
            </div>
            <div className="account-poems__own">
              <h1 className="account-poems__own-heading">My Poems</h1>
              {poems.length > 0 ? (
                <ul className="account-poems__list">
                  {poems.map((poetry) => (
                    <li key={poetry._id} className="account-poems__poem">
                      <div className="account-poems__poem-heading">
                        <p className="account-poems__poem-title">
                          {poetry.title}
                        </p>
                        <div className="account-poems__poem-icons">
                          <FiEdit
                            size={20}
                            className="account-poems__poem-icon account-poems__poem-icon--edit"
                            onClick={() => {
                              navigate(`/account/poems/${poetry._id}/edit`);
                            }}
                          />
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
                <p>You don't have any own poems yet</p>
              )}
            </div>
          </div>
          <div className="bot" onClick={() => setShowBotWindow(!showBotWindow)}>
            <FaRobot size={40} />
          </div>
          {showBotWindow && (
            <div className="bot-window">
              <div className="bot-window__heading">
                <h3>Hi, Dear User</h3>
                <RiCloseLargeLine
                  className="bot-window__icon"
                  size={20}
                  onClick={() => setShowBotWindow(!showBotWindow)}
                />
              </div>
              <h4>I can help you with rhymes</h4>
              <h4 className="bot-window__question">
                Tell me which word you need a rhyme for
              </h4>
              <div className="bot-window__chat" ref={chatContainerRef}>
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`bot-window__message ${
                      msg.sender === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    {Array.isArray(msg.content) ? (
                      <ul>
                        {msg.content.map((word, index) => (
                          <li key={index}>{word}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="bot-window__input-section">
                <input
                  type="text"
                  placeholder="Enter your word"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyPoems;
