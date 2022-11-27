import { createContext, useReducer } from "react";

import { createAction } from "../helper/reducer.helper";

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
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

// To remove an item from cartItems
const clearItem = (cartItems, product) =>
  cartItems.filter((item) => item.id !== product.id);

// Initial values for cart reducer
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

// Types for cart reducer
const CART_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART: "TOGGLE_CART",
};

// To Initialize the reducer
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled Type Error ${type}`);
  }
};

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  cartCount: 0,
  setCartCount: () => null,
  cartTotal: 0,
  setCartTotal: () => null,
});

const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartTotal, cartCount }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItems(newCartItems);
  };

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItems(newCartItems);
  };

  const clearItemFromCart = (product) => {
    const newCartItems = clearItem(cartItems, product);
    updateCartItems(newCartItems);
  };

  const updateCartItems = (newCartItems) => {
    const newCartTotal = newCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newCartCount = newCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    dispatch(
      createAction(CART_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = () => {
    dispatch(createAction(CART_TYPES.TOGGLE_CART, !isCartOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
