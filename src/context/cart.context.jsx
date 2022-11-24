import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, product) => {
  // To check whether the item exists or not
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  // If it exists and it's quantity is 1, just remove it
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== product.id);
  }

  // Else reduce the quantity by 1
  // return [...cartItems, { ...product, quantity: product.quantity - 1 }];
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

const clearItem = (cartItems, product) =>
  cartItems.filter((item) => item.id !== product.id);

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  cartCount: 0,
  setCartCount: () => null,
  cardTotal: 0,
  setCardTotal: () => null,
});

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cardTotal, setCardTotal] = useState(0);

  // To calculate the total quantity of cart items
  useEffect(() => {
    const number = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return setCartCount(number);
  }, [cartItems]);

  // To calculate the total price of cart items
  useEffect(() => {
    const number = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return setCardTotal(number);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    setCartItems(clearItem(cartItems, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cardTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
