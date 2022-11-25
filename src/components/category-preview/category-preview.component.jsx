import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  CategoryTitle,
  Preview,
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <CategoryTitle to={`/shop/${title}`}>{title.toUpperCase()}</CategoryTitle>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
