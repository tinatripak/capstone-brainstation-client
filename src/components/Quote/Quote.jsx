import "./Quote.scss";

const Quote = ({ quoteText, author }) => {
  return (
    <div className="quote">
      <div className="quote__content">
        <p className="quote__text">{quoteText}</p>
        <p className="quote__author">{author}</p>
      </div>
    </div>
  );
};

export default Quote;
