// import { Link } from "react-router-dom";

import "./directory-item.styles.scss";

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <div className="directory-item-container">
      {/* <Link to={`/shop/${title.toLowerCase()}`} className="category-link"> */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default DirectoryItem;
