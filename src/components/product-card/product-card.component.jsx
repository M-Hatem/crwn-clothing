import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { Button, buttonStyles } from "../button/button.component";

import {
  ProductCardContainer,
  ProductImage,
  ProductFooter,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  // De-structuring the product object
  const { name, imageUrl, price } = product;

  // To access Cart Context
  const { addItemToCart } = useContext(CartContext);

  // To add the product into the cart by using addItemToCart function from Cart Context
  const addItem = () => {
    addItemToCart(product);
  };

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductFooter>
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </ProductFooter>

      <Button buttonType={buttonStyles.inverted} onClick={addItem}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
