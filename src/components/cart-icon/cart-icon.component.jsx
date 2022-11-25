import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  // To toggle cart menu
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
