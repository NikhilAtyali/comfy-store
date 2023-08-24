import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if(newAmount > item.max) newAmount = item.max
          return {...state, amount: newAmount}
        }
      });
      return {...state, cart:tempCart}
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        amount,
        color,
        price: product.price,
        image: product.images[0].url,
        max: product.stock,
      };
      return { ...state, cart: { ...state.cart, newItem } };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
