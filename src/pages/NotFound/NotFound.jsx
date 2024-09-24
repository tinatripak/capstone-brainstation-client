import { useEffect } from "react";
import "./NotFound.scss";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <div className="not-found">
      <h1>NotFound</h1>
    </div>
  );
};

export default NotFound;
