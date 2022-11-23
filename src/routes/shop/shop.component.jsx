import { useContext } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../context/products.context";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <section className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </section>
  );
};

export default Shop;
