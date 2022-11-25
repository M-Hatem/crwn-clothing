import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import {
  Quantity,
  ImageContainer,
  CheckoutItemContainer,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ item }) => {
  const { name, price, imageUrl, quantity } = item;

  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <span className="name">{name}</span>
      <Quantity>
        <div className="arrow" onClick={() => removeItemFromCart(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCart(item)}>
          &#10095;
        </div>
      </Quantity>
      <span className="price">{price}</span>
      <RemoveButton onClick={() => clearItemFromCart(item)}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
