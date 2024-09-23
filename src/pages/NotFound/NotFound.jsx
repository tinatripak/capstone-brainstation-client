import { useEffect } from "react";
import "./NotFound.scss";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return <div>NotFound</div>;
};

export default NotFound;
