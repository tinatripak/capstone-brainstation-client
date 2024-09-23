import "./PageHeading.scss";

const PageHeading = ({ text1, text2 }) => {
  return (
    <div className="page-heading">
      <h1 className="page-heading__content">{text1}</h1>
      <p className="page-heading__content page-heading__content--second">
        & <span className="page-heading__border-bottom">{text2}</span>
      </p>
    </div>
  );
};

export default PageHeading;
