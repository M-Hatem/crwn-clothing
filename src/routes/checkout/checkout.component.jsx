import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutTotal,
} from "./checkout.styles";

const Checkout = () => {
  const { cartItems, cardTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </CheckoutHeader>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <CheckoutTotal>Total: ${cardTotal}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export default Checkout;
