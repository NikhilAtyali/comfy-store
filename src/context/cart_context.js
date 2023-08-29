import React, { useEffect, useContext, useReducer } from "react";
import cart_Reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
import { type } from "@testing-library/user-event/dist/type";
import { json } from "react-router-dom";


const getLocalStorage = () => {
  const cartJSON = localStorage.getItem('cart'); // Retrieve the cart data
  if (cartJSON !== null) {
    try {
      return JSON.parse(cartJSON); // Attempt to parse the retrieved data
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_Items: 0,
  total_Amount: 0,
  shipping_Fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_Reducer, initialState);
  //Add to Crt
  const addToCart = ({ id, color, amount, product }) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  //Remove item
  const removeItem = (id) =>{}
  //toggle value
  const toggleValue = (id, value) =>{}
  //empty cart
  const emptyCart = () =>{}

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, toggleValue, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
