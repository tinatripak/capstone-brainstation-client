import { useEffect } from "react";

const NoAccountPage = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return <div>NotFound</div>;
};

export default NoAccountPage;
