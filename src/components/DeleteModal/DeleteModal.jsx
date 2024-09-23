import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./DeleteModal.scss";

const DeleteModal = ({ setIsOpen, title, id, onClick }) => {
  const handleDelete = () => {
    if (id) {
      setIsOpen(false);
      onClick(id);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="delete-modal">
        <div className="delete-modal__inner">
          <button
            className="delete-modal__popup-button"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseOutline
              size={30}
              onClick={() => setIsOpen(false)}
              className="delete-modal__close-icon"
            />
          </button>
          <div className="delete-modal__container">
            <h1 className="delete-modal__heading">Delete {title}?</h1>
            <p className="body-large">
              Please confirm that you'd like to delete the {title}. You won't be
              able to undo this action.
            </p>
          </div>
          <div className="delete-modal__buttons">
            <button
              className="delete-modal__button delete-modal__button--cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="delete-modal__button delete-modal__button--delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
