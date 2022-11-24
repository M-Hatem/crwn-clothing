import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";

import "./product-card.styles.scss";

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
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>

      <Button buttonType="inverted" onClick={addItem}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
