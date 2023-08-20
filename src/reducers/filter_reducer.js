import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      filtered_Products: [...action.payload],
      all_Products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_View: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_View: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_Products } = state;
    let temp_Products = filtered_Products;
    if (sort === "price-lowest") {
      temp_Products = temp_Products.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      temp_Products = temp_Products.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      temp_Products = temp_Products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === "name-z") {
      temp_Products = temp_Products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return { ...state, temp_Products };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if(action.type === FILTER_PRODUCTS){
    return {...state}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
