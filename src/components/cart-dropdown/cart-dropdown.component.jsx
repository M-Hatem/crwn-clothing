import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import { Button, buttonStyles } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  // To be able to access cartItems array from Cart Context
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  // To navigate to checkout page
  const navigator = useNavigate();
  const navigateToCheckout = () => {
    // To close cart dropdown after going to checkout
    setIsCartOpen(false);

    navigator("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType={buttonStyles.base} onClick={navigateToCheckout}>
        Go to checkout
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
