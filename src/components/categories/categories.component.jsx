import DirectoryItem from "./directory-item/directory-item.component";

import "./categories.styles.scss";

const Categories = ({ categories }) => {
  return categories.map((category) => {
    return <DirectoryItem key={category.id} category={category} />;
  });
};

export default Categories;
