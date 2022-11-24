import { createContext, useState } from "react";

const addCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const increaseItemsCount = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 1);
};

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  cartCount: 0,
  setCartCount: () => null,
});

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
    setCartCount(increaseItemsCount(cartItems));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
