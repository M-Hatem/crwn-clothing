import CategoryItem from "./categoryItem/categoryItem.component";

import "./categories.styles.scss";

const Categories = ({ categories }) => {
  return categories.map((category) => {
    return <CategoryItem key={category.id} category={category} />;
  });
};

export default Categories;
