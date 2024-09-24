import { useEffect } from "react";
import "./NoAccountPage.scss";

const NoAccountPage = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <div className="noaccount-found">
      <h1>NotFound</h1>
    </div>
  );
};

export default NoAccountPage;
