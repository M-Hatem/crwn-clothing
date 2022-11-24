import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  // To be able to access cartItems array from Cart Context
  const { cartItems } = useContext(CartContext);

  // To navigate to checkout page
  const navigator = useNavigate();
  const navigateToCheckout = () => {
    navigator("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </div>
      <Button onClick={navigateToCheckout}>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;