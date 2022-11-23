import { useState, createContext } from "react";

import PRODUCTS from "../shop-data.json";

const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
