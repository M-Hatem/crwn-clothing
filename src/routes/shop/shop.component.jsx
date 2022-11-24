import { Fragment, useContext } from "react";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../context/products.context";

import "./shop.styles.scss";

const Shop = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categories).map((title) => (
        <Fragment>
          <h2>{title}</h2>
          <div className="products-container">
            {categories[title].map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;
