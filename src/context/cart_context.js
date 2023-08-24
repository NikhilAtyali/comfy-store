import React, { useEffect, useContext, useReducer } from 'react'
import cart_Reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
import { type } from '@testing-library/user-event/dist/type'

const initialState = {
  cart:[],
  total_Items:0,
  total_Amount:0,
  shipping_Fee: 534
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_Reducer, initialState)
  const addToCart = ({id, color, amount, product}) =>{
    dispatch({type: ADD_TO_CART, payload: {id, color, amount, product}})
  }
  return (
    <CartContext.Provider value={{...state, addToCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
