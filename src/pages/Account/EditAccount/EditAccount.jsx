import { useEffect, useState } from "react";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { useNavigate } from "react-router-dom";
import { editUserById, getUserById } from "../../../scripts/auth-api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import defaultUserPhoto from "../../../assets/images/default-user-photo.jpg";
import "./EditAccount.scss";

const EditAccount = ({ userId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [photo, setPhoto] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const { data } = await getUserById(userId);
    setFirstName(data?.firstName || "");
    setLastName(data?.lastName || "");
    setNickName(data?.nickName || "");
    setPhoto(data?.photo || "");
    setIsLoading(false);
  };

  const cancelEdit = () => {
    navigate("/account");
  };

  const changeDetails = async (e) => {
    e.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setNickNameError(false);

    if (!firstName.trim()) setFirstNameError(true);
    if (!lastName.trim()) setLastNameError(true);
    if (!nickName.trim()) setNickNameError(true);

    if (!firstName.trim() || !lastName.trim() || !nickName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const updatedUser = {
        firstName,
        lastName,
        nickName,
        photo: imageUrl || photo,
      };
      const data = await editUserById(userId, updatedUser, cookies?.token);
      if (data?.success) {
        navigate("/account");
        toast.success("Account details updated successfully");
      }
    } catch (err) {
      toast.error("The account details weren't changed");
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    document.title = "Edit My Account";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="edit-account">
          <div>
            {photo !== "" ? (
              <ImageUpload
                photo={photo}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            ) : (
              <ImageUpload
                photo={defaultUserPhoto}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            )}
          </div>
          <div className="edit-account__form">
            <div className="edit-account__first">
              <div className="edit-account__first-name">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {firstNameError && (
                  <p className="error-message">
                    <HiMiniExclamationCircle />
                    The field shouldn't be empty
                  </p>
                )}
              </div>
              <div className="edit-account__last-name">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {lastNameError && (
                  <p className="error-message">
                    <HiMiniExclamationCircle />
                    The field shouldn't be empty
                  </p>
                )}
              </div>
            </div>
            <div className="edit-account__second">
              <input
                type="text"
                placeholder="Nickname"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              {nickNameError && (
                <p className="error-message">
                  <HiMiniExclamationCircle />
                  The field shouldn't be empty
                </p>
              )}
            </div>
            <div className="edit-account__buttons">
              <button
                className="edit-account__button edit-account__button--cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className="edit-account__button edit-account__button--save"
                onClick={changeDetails}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAccount;
