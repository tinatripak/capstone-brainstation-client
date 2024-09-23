import { useEffect, useState } from "react";
import { getUserById } from "../../../scripts/auth-api";
import { Link } from "react-router-dom";
import "./MyAccount.scss";
import Loading from "../../../components/Loading/Loading";
import defaultUserPhoto from "../../../assets/images/default-user-photo.jpg";

const MyAccount = ({ userId }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const { data } = await getUserById(userId);
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = "My Account";
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-account">
          {user.photo !== "" ? (
            <img src={user.photo} alt={user.nickName} />
          ) : (
            <img src={defaultUserPhoto} alt={user.nickName} />
          )}
          <div className="my-account__form">
            <div className="my-account__first">
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
            </div>
            <div className="my-account__second">
              <p>{user.nickName}</p>
              <p>{user.email}</p>
            </div>
            <div className="my-account__buttons">
              <Link
                to="/account/edit"
                className="my-account__button my-account__button--save"
              >
                Change Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccount;
